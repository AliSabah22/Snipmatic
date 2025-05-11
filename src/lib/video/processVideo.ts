import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { supabase } from '../supabase/client';
import { Database } from '../supabase/client';

export interface Video {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  duration: number;
  storage_path: string;
}

export interface Clip {
  id: string;
  video_id: string;
  start_time: number;
  end_time: number;
  score: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  storage_path: string | null;
}

let ffmpeg: FFmpeg | null = null;

async function getFFmpeg() {
  if (ffmpeg) {
    return ffmpeg;
  }

  ffmpeg = new FFmpeg();

  // Load FFmpeg core
  await ffmpeg.load({
    coreURL: await toBlobURL(`/ffmpeg/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`/ffmpeg/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
}

export async function createClip(
  video: Video,
  startTime: number,
  endTime: number
): Promise<Blob> {
  const ffmpeg = await getFFmpeg();

  // Get video from Supabase Storage
  const { data: videoData } = await supabase.storage
    .from('videos')
    .download(video.storage_path);

  if (!videoData) {
    throw new Error('Video not found');
  }

  // Write video to FFmpeg's virtual filesystem
  await ffmpeg.writeFile('input.mp4', await fetchFile(videoData));

  // Create clip using FFmpeg
  await ffmpeg.exec([
    '-i', 'input.mp4',
    '-ss', startTime.toString(),
    '-to', endTime.toString(),
    '-c', 'copy',
    'output.mp4'
  ]);

  // Read the output file
  const data = await ffmpeg.readFile('output.mp4');
  return new Blob([data], { type: 'video/mp4' });
}

export async function processClip(clip: Clip): Promise<void> {
  try {
    // Get video details
    const { data: video } = await supabase
      .from('videos')
      .select('*')
      .eq('id', clip.video_id)
      .single();

    if (!video) {
      throw new Error('Video not found');
    }

    // Create clip
    const clipBlob = await createClip(video, clip.start_time, clip.end_time);

    // Upload clip to Supabase Storage
    const clipPath = `clips/${clip.id}.mp4`;
    await supabase.storage
      .from('videos')
      .upload(clipPath, clipBlob);

    // Update clip status and storage path
    await supabase
      .from('clips')
      .update({
        status: 'completed',
        storage_path: clipPath,
      })
      .eq('id', clip.id);
  } catch (error) {
    console.error('Error processing clip:', error);
    await supabase
      .from('clips')
      .update({ status: 'failed' })
      .eq('id', clip.id);
    throw error;
  }
}

export async function uploadVideo(
  file: File,
  userId: string
): Promise<Video> {
  // Generate a unique file name
  const fileName = `${userId}/${Date.now()}-${file.name}`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('videos')
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(`Failed to upload video: ${uploadError.message}`);
  }

  // Create video record in database
  const { data: video, error: dbError } = await supabase
    .from('videos')
    .insert({
      user_id: userId,
      title: file.name,
      status: 'processing',
      duration: 0, // Will be updated after processing
      storage_path: fileName,
    })
    .select()
    .single();

  if (dbError) {
    // Clean up storage if database insert fails
    await supabase.storage.from('videos').remove([fileName]);
    throw new Error(`Failed to create video record: ${dbError.message}`);
  }

  return video;
}

export async function processVideo(videoId: string): Promise<void> {
  // Get video details
  const { data: video, error: videoError } = await supabase
    .from('videos')
    .select('*')
    .eq('id', videoId)
    .single();

  if (videoError) {
    throw new Error(`Failed to get video: ${videoError.message}`);
  }

  try {
    // 1. Transcribe video using Whisper
    const transcription = await transcribeVideo(video.storage_path);

    // 2. Analyze content using GPT-4
    const analysis = await analyzeContent(transcription);

    // 3. Generate clips based on analysis
    const clips = await generateClips(video, analysis);

    // 4. Update video status
    await supabase
      .from('videos')
      .update({ status: 'completed' })
      .eq('id', videoId);

    // 5. Save clips to database
    await supabase.from('clips').insert(clips);
  } catch (error) {
    // Update video status to failed
    await supabase
      .from('videos')
      .update({ status: 'failed' })
      .eq('id', videoId);
    throw error;
  }
}

async function transcribeVideo(storagePath: string): Promise<string> {
  // TODO: Implement Whisper API integration
  throw new Error('Not implemented');
}

async function analyzeContent(transcription: string): Promise<any> {
  // TODO: Implement GPT-4 analysis
  throw new Error('Not implemented');
}

async function generateClips(video: Video, analysis: any): Promise<Clip[]> {
  // TODO: Implement clip generation logic
  throw new Error('Not implemented');
} 