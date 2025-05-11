'use client';

import React, { useEffect, useState } from 'react';

const WorkerInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const init = async () => {
      try {
        // Force next tick to ensure window is available
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsReady(true);
      } catch (error) {
        console.error('Worker initialization failed:', error);
      }
    };

    init();
  }, []);

  if (!isReady) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Loading 3D Scene...
          </h2>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WorkerInitializer; 