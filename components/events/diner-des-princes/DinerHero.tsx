'use client';

import { useTranslations } from 'next-intl';
import { motion, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

export function DinerHero({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const t = useTranslations('DinerDesPrinces.Hero');

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.8 } },
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <Image
          src="/din.jpg"
          alt={t('title')}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          data-ai-hint="royal dinner"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white"
        style={{ opacity, y }}
      >
        <div className="container">
          <motion.p
            className="mb-4 font-headline text-lg italic text-white/80"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {t('subtitle')}
          </motion.p>
          <motion.h1
            className="text-4xl font-extrabold !leading-tight tracking-tighter text-white md:text-6xl lg:text-7xl font-poppins"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {t('title')}
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}
