'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ThreeCanvas component with no SSR
const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Loading 3D Scene...
        </h2>
      </div>
    </div>
  ),
});

const ClientCanvas: React.FC = () => {
  return <ThreeCanvas />;
};

export default ClientCanvas; 