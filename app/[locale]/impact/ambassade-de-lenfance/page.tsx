
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animated-section';
import { Shield, MessageCircle, HeartHandshake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function AmbassadeProjectPage() {
  const t = useTranslations('AmbassadeProject');

  const services = [
    {
      key: 'protection',
      icon: Shield,
    },
    {
      key: 'support',
      icon: MessageCircle,
    },
    {
      key: 'advocacy',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="bg-background">
      <AnimatedSection className="py-20 md:py-28 bg-secondary/30">
        <div className="container text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-headline text-primary font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
              <h2 className="text-3xl font-bold text-primary font-headline mb-4">{t('mission.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('mission.description')}</p>
            </div>
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/prot.jpg" alt={t('title')} fill className="object-cover" />
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-24 md:py-32 bg-secondary">
          <div className="container">
              <h2 className="text-3xl text-center font-bold text-primary font-headline mb-12">{t('services.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {services.map(service => {
                      const Icon = service.icon;
                      return (
                          <Card key={service.key} className="text-center">
                              <CardHeader>
                                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle>{t(`services.${service.key}.title`)}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">{t(`services.${service.key}.description`)}</p>
                              </CardContent>
                          </Card>
                      )
                  })}
              </div>
          </div>
      </AnimatedSection>
    </div>
  );
}
