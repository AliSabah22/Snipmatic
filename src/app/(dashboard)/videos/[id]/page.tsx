import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ClipCard } from '@/components/ClipCard';

interface VideoDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function VideoDetailsPage({ params }: VideoDetailsPageProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!video) {
    redirect('/dashboard');
  }

  const { data: clips } = await supabase
    .from('clips')
    .select('*')
    .eq('video_id', params.id)
    .order('score', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {video.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {video.description}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Math.round(video.duration / 60)} minutes
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Generated Clips
            </h2>
            {clips?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No clips generated yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {video.status === 'processing'
                    ? 'Your video is being processed. Please check back later.'
                    : 'No clips were generated for this video.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {clips?.map((clip) => (
                  <ClipCard key={clip.id} clip={clip} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 