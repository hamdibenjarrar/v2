'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

export function DinerIntro() {
  const t = useTranslations('DinerDesPrinces.Intro');

  return (
    <AnimatedSection className="py-24 md:py-32">
      <div className="container max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <Crown className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl font-headline">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
