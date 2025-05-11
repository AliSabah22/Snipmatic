import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Snipmatic.AI - Transform Your Videos into Viral Clips',
  description: 'Upload your long-form videos and let our AI create engaging short clips perfect for social media.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 