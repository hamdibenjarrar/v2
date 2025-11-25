
'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Award, Mic, Camera, BookOpen, Stethoscope, HeartHandshake } from 'lucide-react';

export function EcolibreeImpactAndGuide() {
  const t = useTranslations('Ecolibree.Actions');
  const tGuide = useTranslations('Ecolibree.GuideGallery');

  const actions = [
    { key: 'productionUnit', icon: Award },
    { key: 'workshops', icon: Mic },
    { key: 'photoCampaign', icon: Camera },
    { key: 'guide', icon: BookOpen },
    { key: 'medicalWorkshops', icon: Stethoscope },
    { key: 'medicalCare', icon: HeartHandshake },
  ];

  const galleryCount = 22;
  const galleryImages = Array.from({ length: galleryCount }, (_, i) => ({
    id: `ecolibree-guide-${i + 1}`,
    imageUrl: `/ecolibree/${i + 1}.png`,
    description: tGuide('imageTitle', { id: i + 1 }),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 md:py-32 bg-ecolibre-pink/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-ecolibre-accent to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Card className="bg-white/50 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-ecolibre-dark-teal text-center">{tGuide('title')}</CardTitle>
                <p className="text-center text-slate-600 text-sm">{tGuide('subtitle')}</p>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-md mx-auto" opts={{ loop: true }}>
                  <CarouselContent>
                    {galleryImages.map((image) => (
                      <CarouselItem key={image.id}>
                        <div className="p-1">
                          <Card className="overflow-hidden rounded-lg shadow-md">
                            <CardContent className="flex aspect-[3/4] items-center justify-center p-0">
                              <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={400}
                                height={533}
                                className="object-cover w-full h-full"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white border-ecolibre-medium-teal text-ecolibre-medium-teal" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white border-ecolibre-medium-teal text-ecolibre-medium-teal" />
                </Carousel>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.key} variants={itemVariants}>
                  <Card className="bg-white shadow-lg rounded-2xl border border-gray-200/50 h-full text-center hover:shadow-xl hover:border-ecolibre-accent transition-all duration-300">
                    <CardHeader className="items-center">
                      <div className="w-16 h-16 rounded-full bg-ecolibre-accent/20 text-ecolibre-dark-teal flex items-center justify-center shadow-lg border-4 border-white mb-4">
                        <Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="font-headline text-xl text-ecolibre-dark-teal">
                        {t(`items.${action.key}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {t(`items.${action.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
