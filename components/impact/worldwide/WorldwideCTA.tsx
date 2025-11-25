
'use client';

import { Link } from '@/navigation';
import { Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function WorldwideCTA() {
  const t = useTranslations('Worldwide.CTA');

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/donate">
                <Heart aria-hidden="true" className="mr-2 h-5 w-5" />{' '}
                {t('supportButton')}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/join/join-us">
                <Users aria-hidden="true" className="mr-2 h-5 w-5" />{' '}
                {t('involvedButton')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
