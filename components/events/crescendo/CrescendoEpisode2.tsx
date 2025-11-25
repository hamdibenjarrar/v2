
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';
import Image from 'next/image';

export function CrescendoEpisode2() {
  const t = useTranslations('Crescendo.Episode2');
  const images = ['/hab1.jpg', '/hab2.jpg', '/hab3.jpg'];

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black mb-6">
                    <iframe
                    src="https://www.youtube.com/embed/v7SRyi-jMxA?si=ihpd1n3uHMpcf_Mb&amp;start=3"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    ></iframe>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((src, index) => (
                    <motion.div
                      key={src}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <Image src={src} alt={`${t('subtitle')} image ${index + 1}`} fill className="object-cover" />
                    </motion.div>
                  ))}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <p className="font-headline text-lg text-accent mb-2">{t('title')}</p>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
                {t('subtitle')}
                </h2>
                <p className="text-muted-foreground mb-8">{t('description')}</p>
                <Card className="bg-card shadow-sm w-fit">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <AnimatedCounter value={500000} />+
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{t('stats.views')}</p>
                  </CardContent>
                </Card>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
