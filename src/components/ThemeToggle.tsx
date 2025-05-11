'use client';

import { useTheme } from '../context/ThemeContext';
import HoverPop from './animations/HoverPop';

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <HoverPop>
      <button
        onClick={toggleDarkMode}
        className="relative p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-pink-200 to-emerald-200 rounded-full blur opacity-25 transition-opacity duration-300 dark:opacity-40"></div>
        <div className="relative bg-black/20 backdrop-blur-sm p-2 rounded-full border border-amber-500/20 dark:border-amber-500/30">
          {isDarkMode ? (
            <svg
              className="w-6 h-6 text-amber-100 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-amber-100 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </div>
      </button>
    </HoverPop>
  );
} 