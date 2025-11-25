
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FlipWords } from '@/components/ui/flip-words';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Sparkles, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

export function GreenSchoolHero() {
  const t = useTranslations('GreenSchool.Hero');
  const words = t.raw('words') as string[];
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };
  
  const impacts = [
    { key: 'educational', icon: Target, color: 'text-green-600' },
    { key: 'social', icon: Users, color: 'text-blue-600' },
    { key: 'sustainable', icon: Sparkles, color: 'text-brand-orange' }
  ];

  return (
    <AnimatedSection className="py-20 md:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary tracking-tight mb-4"
            variants={itemVariants}
          >
            {t('title_prefix')} <FlipWords words={words} className="text-accent" />
          </motion.h1>
          <motion.div 
            className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            variants={itemVariants}
          />
          <motion.div 
            className="flex items-center justify-center gap-2 text-base md:text-lg text-muted-foreground font-semibold mt-6"
            variants={itemVariants}
          >
            <Clock aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2.5} />
            <span>{t('since')}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-card shadow-lg rounded-2xl border border-border/50">
            <CardContent className="p-6 md:p-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-headline text-primary mb-8 tracking-tight">
                  {t('headline')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {impacts.map((impact) => {
                    const Icon = impact.icon;
                    return (
                       <motion.div 
                        key={impact.key}
                        variants={itemVariants}
                       >
                        <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-secondary/50 border border-border/30 h-full">
                          <div className={`w-14 h-14 rounded-full bg-primary/10 ${impact.color} flex items-center justify-center shadow-sm`}>
                            <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
                          </div>
                          <div className="text-center">
                            <div className="font-bold font-headline text-primary text-lg mb-1">{t(`impacts.${impact.key}.title`)}</div>
                            <p className="text-sm text-muted-foreground">{t(`impacts.${impact.key}.desc`)}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                <div className="space-y-4 text-center max-w-4xl mx-auto">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t('p1')}</p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t('p2')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
