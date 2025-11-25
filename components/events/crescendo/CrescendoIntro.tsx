
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function CrescendoIntro() {
  const t = useTranslations('Crescendo.Intro');
  const images = [
    { src: '/cre1.png', alt: t('alt.flyer1') },
    { src: '/cre2.png', alt: t('alt.flyer2') }
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary">
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
            <div className="space-y-4 text-muted-foreground">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
            </div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="bg-card p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold font-headline text-primary mb-2">{t('ambassadorTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('ambassadorDescription')}</p>
              </Card>
            </motion.div>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 }}
            }}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.src}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                variants={{
                  hidden: { opacity: 0, y: 30, rotate: index % 2 === 0 ? -5 : 5 },
                  visible: { opacity: 1, y: 0, rotate: 0 }
                }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
