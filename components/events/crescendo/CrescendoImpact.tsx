
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export function CrescendoImpact() {
  const t = useTranslations('Crescendo.Impact');
  const impactImage = PlaceHolderImages.find((img) => img.id === 'crescendo-impact');

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
                {t('title')}
                </h2>
                <p className="text-muted-foreground">{t('description')}</p>
            </motion.div>
            <motion.div
                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {impactImage && (
                <Image
                    src={impactImage.imageUrl}
                    alt={impactImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={impactImage.imageHint}
                />
                )}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
