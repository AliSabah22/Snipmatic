import React from 'react';
import Link from 'next/link';
import VideoUploadClient from '@/components/video/VideoUploadClient';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/supabase/client';

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Get user's videos
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Upload your videos and let AI create viral clips for you.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Upload a new video
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Upload a video between 5 and 60 minutes long. We'll analyze it and
              create viral-worthy clips for you.
            </p>
          </div>
          <VideoUploadClient />
        </div>
      </div>

      {/* Recent Videos */}
      <div>
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Recent Videos
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.id}
                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/dashboard/videos/${video.id}`}
                    className="focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {video.title}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      Status: {video.status}
                    </p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
              <div className="min-w-0 flex-1">
                <Link href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    No videos yet
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    Upload your first video to get started
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 