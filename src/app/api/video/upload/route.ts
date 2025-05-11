import { NextRequest, NextResponse } from 'next/server';
import { uploadVideo, processVideo } from '@/lib/video/processVideo';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get user session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Upload video
    const video = await uploadVideo(file, session.user.id);

    // Start processing in the background
    processVideo(video.id).catch(console.error);

    return NextResponse.json({ video });
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}

// Increase payload size limit for video uploads
export const config = {
  api: {
    bodyParser: false,
  },
}; 