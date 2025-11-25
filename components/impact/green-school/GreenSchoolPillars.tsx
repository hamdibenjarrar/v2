
'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';
import { Heart, BookOpen, Utensils, Zap, Target, Shield, Leaf, Sun } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pillarIcons = {
  health: Heart,
  education: BookOpen,
  food: Utensils,
  energy: Zap
};

const sdgIcons = {
  education: Target,
  health: Shield,
  hunger: Leaf,
  energy: Sun
};


export function GreenSchoolPillars() {
  const t = useTranslations('GreenSchool.Pillars');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const pillars = [
    { key: 'health', imageId: 'green-school-health' },
    { key: 'education', imageId: 'green-school-education' },
    { key: 'food', imageId: 'green-school-food' },
    { key: 'energy', imageId: 'green-school-energy' }
  ];
  const sdgs = ['education', 'health', 'hunger', 'energy'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <AnimatedSection className="py-24 md:py-32 bg-secondary" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-6">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.key as keyof typeof pillarIcons];
            const image = PlaceHolderImages.find(p => p.id === pillar.imageId);
            return (
              <motion.div key={pillar.key} variants={itemVariants}>
                <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full overflow-hidden group">
                   {image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={image.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        {Icon && <Icon aria-hidden="true" className="h-6 w-6" />}
                      </div>
                      <CardTitle className="text-xl font-headline text-primary">{t(`items.${pillar.key}.title`)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t(`items.${pillar.key}.description`)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <Card className="bg-card shadow-lg rounded-2xl border border-border/50">
                <CardContent className="p-6 md:p-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-4 md:gap-8 mb-6 flex-wrap">
                            {sdgs.map(sdg => {
                                const Icon = sdgIcons[sdg as keyof typeof sdgIcons];
                                return (
                                <div key={sdg} className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
                                    </div>
                                    <span className="text-sm md:text-base font-semibold text-primary">{t(`sdgs.${sdg}`)}</span>
                                </div>
                                )
                            })}
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">{t('conclusion')}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>

      </div>
    </AnimatedSection>
  );
}
