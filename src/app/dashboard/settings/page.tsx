'use client';

import React from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const settings = [
  {
    name: 'Email Notifications',
    description: 'Receive email notifications for important updates.',
    enabled: true,
  },
  {
    name: 'Dark Mode',
    description: 'Enable dark mode for the application.',
    enabled: false,
  },
  {
    name: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account.',
    enabled: false,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Settings
          </h3>
          <div className="mt-6 space-y-6">
            {settings.map((setting) => (
              <div key={setting.name} className="flex items-center justify-between">
                <div className="flex-grow">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {setting.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {setting.description}
                    </span>
                  </div>
                </div>
                <Switch
                  checked={setting.enabled}
                  className={classNames(
                    setting.enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={classNames(
                      setting.enabled ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        setting.enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        setting.enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 