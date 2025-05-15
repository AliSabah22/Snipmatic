'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

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
  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600 dark:text-pink-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-amber-100/80">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'lg:z-10 lg:rounded-b-none border-pink-500 dark:border-pink-500 shadow-pink-500/20' : 'lg:mt-8 border-neutral-200 dark:border-amber-500/30',
                'flex flex-col justify-between rounded-3xl bg-white dark:bg-black/20 dark:backdrop-blur-sm p-8 border shadow-lg xl:p-10'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    className={classNames(
                      tier.mostPopular ? 'text-pink-600 dark:text-pink-400' : 'text-gray-900 dark:text-white',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-pink-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-pink-600 dark:text-pink-300">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-amber-100/80">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-amber-100/70">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-amber-100/80">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-emerald-500 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={classNames(
                  tier.mostPopular
                    ? 'bg-gradient-to-r from-amber-300 to-pink-400 hover:from-amber-400 hover:to-pink-500 text-emerald-950 shadow-md hover:shadow-pink-500/25' 
                    : 'bg-neutral-100 dark:bg-black/30 hover:bg-neutral-200 dark:hover:bg-black/40 text-emerald-900 dark:text-white border border-neutral-200 dark:border-amber-500/30 shadow-sm',
                  'mt-8 block rounded-full px-8 py-3 text-center text-sm font-semibold leading-6 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500'
                )}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 