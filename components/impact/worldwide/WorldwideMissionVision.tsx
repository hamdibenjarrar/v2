'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye } from 'lucide-react';

export function WorldwideMissionVision() {
  const t = useTranslations('Worldwide.MissionVision');

  const items = ['mission', 'vision'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const icons = {
    mission: Target,
    vision: Eye,
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => {
            const Icon = icons[item as keyof typeof icons];
            return (
              <motion.div key={item} variants={itemVariants}>
                <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full overflow-hidden group">
                  <CardHeader className="items-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-4 border-background mb-4">
                      <Icon aria-hidden="true" className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline text-2xl text-primary">
                      {t(`${item}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 text-center">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {t(`${item}.description`)}
                    </p>
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
