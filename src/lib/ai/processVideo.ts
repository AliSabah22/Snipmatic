import OpenAI from 'openai';
import { supabase } from '../supabase/client';
import { Video, Clip } from '../video/processVideo';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeVideo(storagePath: string): Promise<string> {
  // Get video URL from Supabase Storage
  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(storagePath);

  // Transcribe video using Whisper
  const transcription = await openai.audio.transcriptions.create({
    file: await fetch(publicUrl).then(r => r.blob()),
    model: 'whisper-1',
    response_format: 'text',
  });

  return transcription;
}

export async function analyzeContent(transcription: string): Promise<any> {
  const prompt = `Analyze this video transcript and identify the most engaging moments that would make good short-form clips. 
  Consider factors like:
  - Emotional peaks
  - High-energy moments
  - Clear, concise statements
  - Hook-worthy content
  - Natural breaks in conversation
  
  For each potential clip, provide:
  - Start time (in seconds)
  - End time (in seconds)
  - Score (0-1) based on viral potential
  - Brief explanation of why it's engaging
  
  Transcript:
  ${transcription}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert video editor who specializes in creating viral short-form content.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function generateClips(video: Video, analysis: any): Promise<Clip[]> {
  const clips: Clip[] = [];

  // Process each potential clip from the analysis
  for (const clip of analysis.clips) {
    clips.push({
      video_id: video.id,
      start_time: clip.start_time,
      end_time: clip.end_time,
      score: clip.score,
      status: 'pending',
      storage_path: null,
    });
  }

  return clips;
}

export async function processVideoWithAI(video: Video): Promise<void> {
  try {
    // 1. Transcribe video
    const transcription = await transcribeVideo(video.storage_path);

    // 2. Analyze content
    const analysis = await analyzeContent(transcription);

    // 3. Generate clips
    const clips = await generateClips(video, analysis);

    // 4. Update video status
    await supabase
      .from('videos')
      .update({ status: 'completed' })
      .eq('id', video.id);

    // 5. Save clips to database
    await supabase.from('clips').insert(clips);
  } catch (error) {
    console.error('Error processing video:', error);
    await supabase
      .from('videos')
      .update({ status: 'failed' })
      .eq('id', video.id);
    throw error;
  }
} 