'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HoverPop from '../../../components/animations/HoverPop';
import AnimatedText from '../../../components/animations/AnimatedText';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.text();
        throw new Error(data);
      }

      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950/30 via-pink-950/30 to-emerald-950/30 dark:from-emerald-950 dark:via-pink-950 dark:to-emerald-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-50 via-pink-200 to-emerald-200 rounded-lg blur opacity-25"></div>
          <div className="relative bg-black/20 dark:bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-amber-500/20 dark:border-amber-500/30">
            <div className="text-center mb-8">
              <HoverPop>
                <AnimatedText
                  text="Create Account"
                  className="text-3xl font-bold bg-gradient-to-r from-amber-50 via-pink-200 to-emerald-200 dark:from-amber-100 dark:via-pink-300 dark:to-emerald-300 bg-clip-text text-transparent"
                />
              </HoverPop>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-100 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-black/20 border border-amber-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder-amber-100/50"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-100 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-black/20 border border-amber-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder-amber-100/50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-amber-100 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 bg-black/20 border border-amber-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder-amber-100/50"
                  placeholder="Create a password"
                />
              </div>

              {error && (
                <div className="text-pink-400 text-sm text-center">
                  {error}
                </div>
              )}

              <HoverPop>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-200 to-pink-300 hover:from-amber-300 hover:to-pink-400 dark:from-amber-300 dark:to-pink-400 dark:hover:from-amber-400 dark:hover:to-pink-500 text-emerald-950 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </HoverPop>
            </form>

            <div className="mt-6 text-center">
              <p className="text-amber-100">
                Already have an account?{' '}
                <Link href="/login" className="text-pink-300 hover:text-pink-400 transition-colors duration-300">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 