
'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import type simpleParallax from 'simple-parallax-js';

interface ParallaxProps {
  children: ReactNode;
  orientation?: 'up' | 'down' | 'left' | 'right' | 'up left' | 'up right' | 'down left' | 'down right';
  scale?: number;
  overflow?: boolean;
  delay?: number;
  transition?: string;
  maxTransition?: number;
}

const Parallax: React.FC<ParallaxProps> = ({ children, ...options }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== "undefined") {
      import('simple-parallax-js').then((module) => {
        const simpleParallax = module.default;
        if (parallaxRef.current) {
          const imgElement = parallaxRef.current.querySelector('img');
          if (imgElement) {
            new simpleParallax(imgElement, options);
          }
        }
      });
    }
  }, [options]);

  return <div ref={parallaxRef}>{children}</div>;
};

export default Parallax;
