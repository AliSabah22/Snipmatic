'use client';

import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-16 w-16 text-gray-400" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                John Doe
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                john.doe@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Profile Information
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  defaultValue="John"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  defaultValue="Doe"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue="john.doe@example.com"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 text-right sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 