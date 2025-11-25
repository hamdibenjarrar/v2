
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CrescendoPress() {
  const t = useTranslations('Crescendo.Press');

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container max-w-3xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-12">
            {t('title')}
          </h2>

          <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <CardContent className="p-8 text-left">
              <h3 className="text-xl font-bold text-primary mb-2">{t('article.source')}</h3>
              <p className="text-muted-foreground mb-6">{t('article.title')}</p>
              <Button asChild variant="link" className="p-0 h-auto text-accent font-bold">
                <Link href={t('article.url')} target="_blank" rel="noopener noreferrer">
                  {t('article.cta')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
