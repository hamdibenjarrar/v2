'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export function DinerInternational() {
  const t = useTranslations('DinerDesPrinces.International');
  const countries = t.raw('countries') as string[];
  const gallery = ['/groupe.webp', '/groupe1.webp', '/groupe2.webp', '/groupe3.webp'];

  return (
    <AnimatedSection className="py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Globe className="h-4 w-4" />
              <span>{t('badge')}</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl font-headline">
              {t('title')}
            </h2>
            <p className="mb-6 text-muted-foreground">{t('description')}</p>
            <div className="flex flex-wrap gap-3">
              {countries.map((country, i) => (
                <motion.div
                  key={country}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                >
                  {country}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 w-full lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
             <Image
                src={'/wallah-we-can-internation.jpg'}
                alt={t('title')}
                width={800}
                height={600}
                className="rounded-2xl object-cover shadow-xl w-full"
              />
            <Carousel className="w-full max-w-xs mx-auto mt-6" opts={{loop: true}}>
              <CarouselContent>
                {gallery.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden rounded-lg">
                          <Image src={src} alt={`Gallery image ${index + 1}`} width={400} height={400} className="object-cover" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
