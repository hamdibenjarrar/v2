
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function CrescendoHero() {
  const t = useTranslations('Crescendo.Hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/hab4.jpg"
          alt={t('title')}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          data-ai-hint="rooftop concert"
        />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/60 to-transparent" />

      <motion.div
        className="relative z-10 text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-shadow-lg"
          variants={itemVariants}
        >
          {t('title')}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {t('subtitle')}
        </motion.p>
      </motion.div>
    </section>
  );
}
