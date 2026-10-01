'use client';

import React from 'react';

interface FirstViewLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const FirstViewLogo: React.FC<FirstViewLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const heightClass = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
  }[size];

  if (!showText) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src="/brand/icon.png"
          alt="First View"
          className={`${heightClass} w-auto object-contain select-none transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/brand/logo.png"
        alt="First View Films"
        className={`${heightClass} w-auto object-contain select-none transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
};
