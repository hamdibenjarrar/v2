
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function DotBackground({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative flex h-full w-full items-center justify-center bg-background overflow-hidden', className)}>
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{
           backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1), transparent 60%)',
           backgroundRepeat: 'no-repeat',
           backgroundPosition: 'center',
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div 
        className="pointer-events-none absolute inset-0 z-[-1] h-full w-full bg-transparent"
        style={{
          '--dot-bg': 'hsl(var(--background))',
          '--dot-color': 'hsl(var(--border))',
          '--dot-size': '1px',
          '--dot-space': '22px',
          background: `
            linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
            linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
            var(--dot-color)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {children}
    </div>
  );
}
