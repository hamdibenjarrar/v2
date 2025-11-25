
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animated-section';
import { NewsletterSection } from '@/components/sections/newsletter-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';

export default function EventsPage() {
  const t = useTranslations('Events');

  const events = [
    {
      key: 'dinner_of_princes',
      image: '/din.jpg',
      href: '/stories/events/diner-des-princes',
      disabled: false,
    },
    {
      key: 'crescendo',
      image: '/cresc.jpg',
      href: '/stories/events/crescendo',
      disabled: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {events.map((event) => (
              <motion.div key={event.key} variants={itemVariants}>
                <Card className="overflow-hidden group flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border">
                  <div className="relative h-64 w-full">
                    <Image
                      src={event.image}
                      alt={t(`events.${event.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-headline font-bold text-primary mb-2">
                      {t(`events.${event.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground flex-grow mb-6">
                      {t(`events.${event.key}.description`)}
                    </p>
                    <Button asChild variant="link" className="p-0 h-auto mt-4 self-start text-accent font-bold group-hover:text-accent/80 transition-colors duration-300" disabled={event.disabled}>
                      <Link href={event.href}>
                        {t('read_more')}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <NewsletterSection />
      </AnimatedSection>
    </div>
  );
}
