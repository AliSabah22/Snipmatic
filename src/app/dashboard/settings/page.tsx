'use client';

import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from '@/context/ThemeContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Base structure for settings, Light Mode will be updated by context
const baseSettings = [
  {
    id: 'emailNotifications',
    name: 'Email Notifications',
    description: 'Receive email notifications for important updates.',
    enabled: true, // Default or fetched from user preferences
  },
  {
    id: 'lightMode', // Changed from darkMode
    name: 'Light Mode', // Changed label
    description: 'Switch to light mode for the application.', // Changed description
    enabled: false, // This will be dynamically set by ThemeContext
  },
  {
    id: 'twoFactorAuth',
    name: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account.',
    enabled: false, // Default or fetched from user preferences
  },
];

// SVG paths for icons from ThemeToggle.tsx
const sunIconPath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
const moonIconPath = "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z";

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [currentSettings, setCurrentSettings] = useState(baseSettings);

  // Effect to synchronize the 'Light Mode' toggle with the actual theme state
  useEffect(() => {
    setCurrentSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === 'lightMode' ? { ...setting, enabled: !isDarkMode } : setting
      )
    );
  }, [isDarkMode]);

  const handleToggle = (settingId: string) => {
    if (settingId === 'lightMode') {
      toggleDarkMode(); // This will trigger the useEffect above to update the local state
      // API call to save theme preference would go here if needed
    } else {
      // Handle other toggles (e.g., emailNotifications, twoFactorAuth)
      setCurrentSettings((prevSettings) =>
        prevSettings.map((setting) =>
          setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting
        )
      );
      // API call to save other setting preferences
      console.log(`Setting ${settingId} toggled to: ${!currentSettings.find(s => s.id === settingId)?.enabled}`);
    }
  };

  return (
    <div className="space-y-8"> {/* Consistent spacing */}
      <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-lg sm:rounded-xl border border-neutral-200 dark:border-amber-500/30">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Settings
          </h3>
          <div className="mt-6 space-y-6">
            {currentSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-amber-500/20 last:border-b-0">
                <div className="flex-grow">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {setting.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-amber-100/80">
                      {setting.description}
                    </span>
                  </div>
                </div>
                <Switch
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.id)}
                  className={classNames(
                    setting.enabled 
                      ? (setting.id === 'lightMode' ? 'bg-gradient-to-r from-amber-50 via-pink-100 to-emerald-100' : 'bg-pink-500') 
                      : 'bg-neutral-200 dark:bg-neutral-700',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-black/20'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={classNames(
                      setting.enabled ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    {/* Span for OFF state icon */}
                    <span
                      className={classNames(
                        setting.enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      {setting.id === 'lightMode' ? (
                        <svg className="h-3 w-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={sunIconPath} />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 12 12">
                          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    {/* Span for ON state icon */}
                    <span
                      className={classNames(
                        setting.enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      {setting.id === 'lightMode' ? (
                        <svg className="h-3 w-3 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d={moonIconPath} />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3 text-pink-500" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      )}
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