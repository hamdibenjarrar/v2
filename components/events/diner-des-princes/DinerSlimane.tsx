'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animated-section';
import { Music } from 'lucide-react';

export function DinerSlimane() {
  const t = useTranslations('DinerDesPrinces.Slimane');

  return (
    <AnimatedSection className="bg-secondary py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-sm"
          >
            <Image
              src="/sliman.png"
              alt={t('flyerAlt')}
              width={400}
              height={560}
              className="rounded-2xl object-cover shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
             <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Music className="h-4 w-4" />
              <span>{t('badge')}</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl font-headline">
              {t('title')}
            </h2>
            <p className="text-muted-foreground">{t('description')}</p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
