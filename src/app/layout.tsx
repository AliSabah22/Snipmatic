import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Snipmatic',
  description: 'Your AI-powered video editing assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-gradient-to-b dark:from-emerald-950 dark:via-pink-950 dark:to-emerald-950`}>
        <Providers>
          <main className="min-h-screen">{/* Removed bg-gray-50 and any overlays */}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
} 