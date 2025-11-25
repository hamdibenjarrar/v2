
'use client';

import { Link } from '@/navigation';
import { Heart, Users, HandHeart, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

export function EcolibreeCallToAction() {
  const t = useTranslations('Ecolibree.CTA');
  const tFooter = useTranslations('Footer');
  const locale = useLocale();

  const impactCards = [
    { key: 'poverty', icon: Heart },
    { key: 'access', icon: HandHeart },
    { key: 'jobs', icon: Users },
  ];

  return (
    <section className="py-24 md:py-32">
       <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal mb-3">
            {t('title')}
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-ecolibre-medium-teal to-transparent mb-6" />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
        >
          {impactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.key} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card className="bg-white shadow-lg rounded-2xl border border-gray-200/50 h-full text-center">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-ecolibre-dark-teal/10 text-ecolibre-dark-teal flex items-center justify-center shadow-sm">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-ecolibre-dark-teal text-base font-semibold block">{t(`cards.${card.key}.title`)}</span>
                        <p className="text-sm text-slate-500 mt-1">{t(`cards.${card.key}.subtitle`)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto bg-ecolibre-medium-teal hover:bg-ecolibre-dark-teal text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/donate">
                <Heart aria-hidden="true" className="mr-2 h-5 w-5" /> {tFooter('donate')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-ecolibre-dark-teal text-ecolibre-dark-teal hover:bg-ecolibre-dark-teal/10">
             <Link href="/join/join-us">
                <HandHeart aria-hidden="true" className="mr-2 h-5 w-5" /> {tFooter('volunteer')}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
