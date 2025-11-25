'use client';
import { motion } from 'framer-motion';

export function Hero({
  title,
  subtitle,
  tickerText,
}: {
  title: string;
  subtitle: string;
  tickerText: string;
}) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-primary leading-none tracking-tighter"
        >
          {title}
          <span className="text-accent">&</span>
          {subtitle}.
        </motion.h1>
      </div>
      <div className="w-full mt-16 py-4 bg-primary overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            ease: 'linear',
            duration: 40,
            repeat: Infinity,
          }}
        >
          <span className="text-lg font-semibold text-primary-foreground px-8">
            {tickerText}
          </span>
          <span className="text-lg font-semibold text-primary-foreground px-8">
            {tickerText}
          </span>
        </motion.div>
      </div>
    </section>
  );
}