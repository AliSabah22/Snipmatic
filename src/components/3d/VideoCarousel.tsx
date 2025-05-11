'use client';

import React from 'react';
import ThreeCanvas from './ThreeCanvas';

const VideoCarousel: React.FC = () => {
  return (
    <div className="relative h-[600px] w-full">
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Explore Our Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Hover over the cards to learn more
          </p>
        </div>
      </div>
      <div className="absolute inset-0">
        <ThreeCanvas />
      </div>
    </div>
  );
};

export default VideoCarousel; 