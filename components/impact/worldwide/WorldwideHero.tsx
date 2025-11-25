'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FlipWords } from '@/components/ui/flip-words';

export function WorldwideHero() {
  const t = useTranslations('Worldwide.Hero');
  const words = t.raw('words') as string[];
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      className="py-24 md:py-32 bg-secondary"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1
            className={`text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary tracking-tight mb-4 ${
              isRTL ? 'leading-[1.5]' : ''
            }`}
            variants={itemVariants}
          >
            {t('titlePrefix')}
            <FlipWords
              words={words}
              className="text-accent"
              duration={2500}
            />
          </motion.h1>
          <motion.div
            className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            variants={itemVariants}
          />
          <motion.p
            className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl mx-auto font-medium mt-6"
            variants={itemVariants}
          >
            {t('tagline')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
