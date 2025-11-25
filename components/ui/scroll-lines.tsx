
'use client';
import { motion, useTransform, MotionValue } from 'framer-motion';

export function ScrollLines({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

  // Animate lines to appear and animate during the transition phase (e.g., between 10% and 40% of scroll)
  const linesOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.35, 0.4], [0, 1, 1, 0]);

  // Each line has a different start/end point and duration to create a layered, cinematic effect.
  const line1Y = useTransform(scrollYProgress, [0.1, 0.4], ['-100vh', '100vh']);
  const line2Y = useTransform(scrollYProgress, [0.1, 0.4], ['100vh', '-100vh']);
  const line3Y = useTransform(scrollYProgress, [0.12, 0.38], ['-100vh', '100vh']);
  const line4Y = useTransform(scrollYProgress, [0.15, 0.35], ['100vh', '-100vh']);

  return (
    <motion.div 
      className="pointer-events-none fixed inset-0 z-10 flex justify-center"
      style={{ opacity: linesOpacity }}
    >
      <motion.div 
        className="h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent" 
        style={{ y: line1Y, x: '-20vw' }}
      />
      <motion.div 
        className="h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent" 
        style={{ y: line2Y, x: '-5vw' }}
      />
       <motion.div 
        className="h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent" 
        style={{ y: line3Y, x: '5vw' }}
      />
       <motion.div 
        className="h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent" 
        style={{ y: line4Y, x: '20vw' }}
      />
    </motion.div>
  );
}
