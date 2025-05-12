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
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
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
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                        <span className="text-sm font-medium leading-none text-indigo-600 dark:text-indigo-300">
                          {activity.type === 'project' ? 'P' : 'U'}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {activity.name}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {activity.action}
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-gray-50 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
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