
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Eye, Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';
import Image from 'next/image';

export function CrescendoEpisode1() {
  const t = useTranslations('Crescendo.Episode1');
  const stats = [
    { value: 1000000, suffix: '+', label: t('stats.views72h') },
    { value: 6000000, suffix: '+', label: t('stats.viewsTotal') },
  ];
  const images = ['/cree1.jpg', '/cree2.jpg', '/cree3.jpg', '/cree4.jpg'];

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
            <p className="font-headline text-lg text-accent mb-2">{t('title')}</p>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              {t('subtitle')}
            </h2>
            <p className="text-muted-foreground mb-8">{t('description')}</p>

            <div className="grid grid-cols-2 gap-6 text-center mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <AnimatedCounter value={stat.value} />{stat.suffix}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="grid grid-cols-2 gap-4">
              {images.map((src, index) => (
                <motion.div
                  key={src}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image src={src} alt={`${t('subtitle')} image ${index + 1}`} fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <iframe
                    src="https://www.youtube.com/embed/I4csrYWotTs?si=uRYrpuC7g0lasWpb&amp;start=3"
                    title={t('videos.main')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    ></iframe>
                </div>
                 <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <iframe
                    src="https://www.youtube.com/embed/JVfukRb6SWU?si=yrMlzI5dxEMivilo&amp;start=2"
                    title={t('videos.makingOf')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    ></iframe>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
