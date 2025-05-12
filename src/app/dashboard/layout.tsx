'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  UserIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: ClipboardDocumentListIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Plans', href: '/dashboard/plans', icon: CreditCardIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="text-xl font-bold text-gray-800 dark:text-white">
              Snipmatic
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-8">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              {/* Add header content here (notifications, profile menu, etc.) */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 