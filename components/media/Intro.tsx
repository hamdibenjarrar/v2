'use client';
import { motion } from 'framer-motion';

export function Intro({
  headline,
  subheadline,
  paragraph,
}: {
  headline: string;
  subheadline: string;
  paragraph: string;
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-primary leading-none tracking-tight">
              {headline}
              <br />
              {subheadline}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}