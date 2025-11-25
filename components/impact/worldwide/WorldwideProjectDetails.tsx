'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench, Zap, Sprout, BookOpen } from 'lucide-react';

export function WorldwideProjectDetails() {
  const t = useTranslations('Worldwide.ProjectDetails');
  const details = [
    { key: 'rehabilitation', icon: Wrench },
    { key: 'energy', icon: Zap },
    { key: 'food', icon: Sprout },
    { key: 'education', icon: BookOpen },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <motion.div key={detail.key} variants={itemVariants}>
                <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                        <Icon aria-hidden="true" className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-headline text-primary font-bold">
                        {t(`details.${detail.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`details.${detail.key}.description`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
