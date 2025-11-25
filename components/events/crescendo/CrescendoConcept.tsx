
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Users, HeartHandshake } from 'lucide-react';

export function CrescendoConcept() {
  const t = useTranslations('Crescendo.Concept');
  const concepts = [
    { key: 'creation', icon: Music },
    { key: 'mobilization', icon: Users },
    { key: 'impact', icon: HeartHandshake },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <motion.div key={concept.key} variants={itemVariants}>
                <Card className="h-full text-center bg-card shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg border-t-4 border-accent">
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 text-primary rounded-full w-fit">
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="pt-2 font-headline text-xl text-primary">
                      {t(`items.${concept.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {t(`items.${concept.key}.description`)}
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
