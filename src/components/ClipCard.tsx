import React from 'react';
import { Clip } from '@/lib/video/processVideo';
import { supabase } from '@/lib/supabase/client';

interface ClipCardProps {
  clip: Clip;
}

export function ClipCard({ clip }: ClipCardProps) {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (clip.storage_path) {
      const { data } = supabase.storage
        .from('videos')
        .getPublicUrl(clip.storage_path);
      setVideoUrl(data.publicUrl);
    }
  }, [clip.storage_path]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[clip.status]
            }`}
          >
            {clip.status.charAt(0).toUpperCase() + clip.status.slice(1)}
          </span>
          <span className="text-sm text-gray-500">
            Score: {Math.round(clip.score * 100)}%
          </span>
        </div>

        {videoUrl && (
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatTime(clip.start_time)}</span>
          <span>{formatTime(clip.end_time)}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              if (videoUrl) {
                window.open(videoUrl, '_blank');
              }
            }}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Download
          </button>
          <button
            onClick={() => {
              if (videoUrl) {
                navigator.clipboard.writeText(videoUrl);
              }
            }}
            className="text-sm font-medium text-gray-600 hover:text-gray-500"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
} 