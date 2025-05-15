import React from 'react';
import Link from 'next/link';
import VideoUploadClient from '@/components/video/VideoUploadClient';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/supabase/client';
import { 
  ChartBarIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Projects', value: '12', icon: DocumentTextIcon },
  { name: 'Active Users', value: '24', icon: UserGroupIcon },
  { name: 'Recent Activity', value: '8', icon: ClockIcon },
  { name: 'Success Rate', value: '94%', icon: ChartBarIcon },
];

const recentActivity = [
  {
    id: 1,
    type: 'project',
    name: 'Project Alpha',
    action: 'created',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'user',
    name: 'John Doe',
    action: 'joined',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'project',
    name: 'Project Beta',
    action: 'updated',
    time: '1 day ago',
  },
];

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
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-xl bg-white dark:bg-black/20 dark:backdrop-blur-sm px-4 py-5 shadow-lg border border-neutral-200 dark:border-amber-500/30 sm:px-6 sm:py-6 transition-all hover:shadow-amber-500/10"
          >
            <dt>
              <div className="absolute rounded-md bg-gradient-to-r from-amber-400 to-pink-500 p-3 shadow-md">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-amber-100/80">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="overflow-hidden rounded-xl bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-lg border border-neutral-200 dark:border-amber-500/30">
        <div className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-neutral-200 dark:divide-amber-500/30">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                        <span className="text-sm font-medium leading-none text-amber-600 dark:text-amber-300">
                          {activity.type === 'project' ? 'P' : 'U'}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {activity.name}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-amber-100/80">
                        {activity.action}
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-black/30 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-amber-100/70 border border-neutral-200 dark:border-amber-500/20">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-lg sm:rounded-xl border border-neutral-200 dark:border-amber-500/30">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Upload a new video
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-amber-100/80">
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
        <h2 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-4">
          Recent Videos
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.id}
                className="relative flex items-center space-x-3 rounded-xl bg-white dark:bg-black/20 dark:backdrop-blur-sm px-6 py-5 shadow-lg border border-neutral-200 dark:border-amber-500/30 focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-neutral-300 dark:hover:border-amber-500/50 transition-all hover:shadow-pink-500/10"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/dashboard/videos/${video.id}`}
                    className="focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {video.title}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-amber-100/80">
                      Status: {video.status}
                    </p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full relative flex flex-col items-center justify-center space-y-3 rounded-xl bg-white dark:bg-black/20 dark:backdrop-blur-sm px-6 py-10 shadow-lg border border-dashed border-neutral-300 dark:border-amber-500/40">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 dark:text-amber-100/50" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                No videos yet
              </p>
              <p className="text-sm text-gray-500 dark:text-amber-100/80">
                Upload your first video to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 