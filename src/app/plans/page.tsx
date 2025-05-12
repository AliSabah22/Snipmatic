'use client';

import React from 'react';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    price: { monthly: '$0' },
    description: 'Perfect for trying out our service.',
    features: [
      'Up to 5 video uploads per month',
      'Basic video analysis',
      'Standard support',
      '720p video quality',
      'Basic analytics',
    ],
    cta: 'Get started',
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    price: { monthly: '$29' },
    description: 'Everything you need for professional content creation.',
    features: [
      'Unlimited video uploads',
      'Advanced video analysis',
      'Priority support',
      '4K video quality',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
    cta: 'Start free trial',
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: { monthly: '$99' },
    description: 'For large teams and organizations.',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Custom AI models',
      'White-label solution',
    ],
    cta: 'Contact sales',
    mostPopular: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PlansPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-pink-50 to-emerald-50 dark:from-emerald-950 dark:via-pink-950 dark:to-emerald-950">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-pink-600 to-emerald-600 dark:from-amber-100 dark:via-pink-300 dark:to-emerald-300 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-amber-100">
              Select the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? 'ring-2 ring-emerald-500/50 dark:ring-amber-500/50' : '',
                  'relative flex flex-col rounded-2xl bg-white dark:bg-black/20 border border-emerald-200 dark:border-amber-500/20 p-8 shadow-lg'
                )}
              >
                {tier.mostPopular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-emerald-500 to-pink-500 dark:from-amber-200 dark:to-pink-300 px-3 py-1 text-sm font-semibold text-white dark:text-emerald-950 text-center">
                    Most Popular
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-amber-100">{tier.name}</h3>
                  <p className="mt-4 text-sm text-gray-600 dark:text-amber-100/80">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-gray-900 dark:text-amber-100">{tier.price.monthly}</span>
                    <span className="text-base font-medium text-gray-600 dark:text-amber-100/80">/month</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-5 w-5 text-emerald-500 dark:text-amber-200" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-sm text-gray-600 dark:text-amber-100/80">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-gradient-to-r from-emerald-500 to-pink-500 hover:from-emerald-600 hover:to-pink-600 dark:from-amber-200 dark:to-pink-300 dark:hover:from-amber-300 dark:hover:to-pink-400 text-white dark:text-emerald-950'
                      : 'bg-white text-gray-900 hover:bg-gray-50 dark:bg-black/20 dark:text-amber-100 dark:hover:bg-black/30 border border-emerald-200 dark:border-amber-500/20',
                    'mt-8 block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold transition-all duration-300'
                  )}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button or Login Button */}
      <div className="fixed bottom-8 right-8">
        {status === 'authenticated' ? (
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-pink-500 hover:from-emerald-600 hover:to-pink-600 dark:from-amber-200 dark:to-pink-300 dark:hover:from-amber-300 dark:hover:to-pink-400 text-white dark:text-emerald-950 shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-pink-500 hover:from-emerald-600 hover:to-pink-600 dark:from-amber-200 dark:to-pink-300 dark:hover:from-amber-300 dark:hover:to-pink-400 text-white dark:text-emerald-950 shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </Link>
        )}
      </div>
    </div>
  );
} 