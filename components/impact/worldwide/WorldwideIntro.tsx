'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function WorldwideIntro() {
  const t = useTranslations('Worldwide.Intro');
  const countries = t.raw('countries') as string[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="bg-card shadow-lg rounded-2xl border border-border/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-headline text-primary">
                    {t('reachTitle')}
                  </h3>
                </div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={containerVariants}
                >
                  {countries.map((country, index) => (
                    <motion.div
                      key={country}
                      variants={itemVariants}
                      className="flex-1"
                    >
                      <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                        <MapPin className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-primary">
                          {country}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
