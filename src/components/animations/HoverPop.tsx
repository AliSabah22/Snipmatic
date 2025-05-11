'use client';

import React from 'react';

interface HoverPopProps {
  children: React.ReactNode;
  className?: string;
}

const HoverPop: React.FC<HoverPopProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`transition-all duration-300 hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
};

export default HoverPop; 