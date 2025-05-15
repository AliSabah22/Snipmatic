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
    <div className="min-h-screen bg-neutral-100 dark:bg-gradient-to-b dark:from-emerald-950 dark:via-pink-950 dark:to-emerald-950">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-lg border-r border-neutral-200 dark:border-amber-500/30">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-neutral-200 dark:border-amber-500/30">
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
                      ? 'bg-neutral-200 dark:bg-black/30 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-amber-100 hover:bg-neutral-100 dark:hover:bg-black/30'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-emerald-700 dark:text-amber-200' : 'text-gray-400 dark:text-amber-100/70 group-hover:text-gray-500 dark:group-hover:text-amber-100'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-neutral-200 dark:border-amber-500/30">
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-amber-100 hover:bg-neutral-100 dark:hover:bg-black/30 rounded-lg group"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-gray-400 dark:text-amber-100/70 group-hover:text-gray-500 dark:group-hover:text-amber-100" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-sm border-b border-neutral-200 dark:border-amber-500/30">
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