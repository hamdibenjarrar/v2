'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DotBackground } from '@/components/ui/dot-background';

export function TransparencyHero() {
  const t = useTranslations('Transparency.hero');
  const descriptionText = t('description');
  const words = descriptionText.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
  
    const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-brand-navy">
      <DotBackground className="absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-left"
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            variants={titleItemVariants}
            className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold !leading-tight tracking-tight"
          >
            {t('title1')}
            <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
               {t('title2')}
               <motion.div
                 className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ duration: 1.5, ease: "circOut", delay: 0.8 }}
                 style={{ transformOrigin: 'left' }}
               />
            </span>
          </motion.h1>
          <motion.p
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 font-slab text-lg md:text-xl max-w-3xl text-brand-navy/90"
          >
            {words.map((word, index) => (
              <motion.span key={index} variants={wordVariants} className="inline-block mr-1.5">
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
