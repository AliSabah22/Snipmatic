'use client';

import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-lg sm:rounded-xl border border-neutral-200 dark:border-amber-500/30">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-16 w-16 text-gray-400 dark:text-amber-100/70" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                John Doe
              </h3>
              <p className="text-sm text-gray-500 dark:text-amber-100/80">
                john.doe@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-lg sm:rounded-xl border border-neutral-200 dark:border-amber-500/30">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Profile Information
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-amber-100/80">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  defaultValue="John"
                  className="block w-full rounded-md shadow-sm sm:text-sm bg-white dark:bg-black/25 border border-neutral-300 dark:border-amber-500/50 text-gray-900 dark:text-white focus:border-pink-500 focus:ring-pink-500 dark:focus:border-pink-500 dark:focus:ring-pink-500 placeholder-gray-400 dark:placeholder-amber-100/50"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-amber-100/80">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  defaultValue="Doe"
                  className="block w-full rounded-md shadow-sm sm:text-sm bg-white dark:bg-black/25 border border-neutral-300 dark:border-amber-500/50 text-gray-900 dark:text-white focus:border-pink-500 focus:ring-pink-500 dark:focus:border-pink-500 dark:focus:ring-pink-500 placeholder-gray-400 dark:placeholder-amber-100/50"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-amber-100/80">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue="john.doe@example.com"
                  className="block w-full rounded-md shadow-sm sm:text-sm bg-white dark:bg-black/25 border border-neutral-300 dark:border-amber-500/50 text-gray-900 dark:text-white focus:border-pink-500 focus:ring-pink-500 dark:focus:border-pink-500 dark:focus:ring-pink-500 placeholder-gray-400 dark:placeholder-amber-100/50"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6 bg-neutral-50 dark:bg-black/20 border-t border-neutral-200 dark:border-amber-500/30 rounded-b-xl">
          <button
            type="button"
            className="inline-flex justify-center rounded-full px-6 py-2.5 text-sm font-semibold shadow-md transition-all duration-300 bg-gradient-to-r from-amber-200 to-pink-300 hover:from-amber-300 hover:to-pink-400 text-emerald-950 dark:from-amber-300 dark:to-pink-400 dark:hover:from-amber-400 dark:hover:to-pink-500 dark:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 hover:shadow-pink-500/25"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 