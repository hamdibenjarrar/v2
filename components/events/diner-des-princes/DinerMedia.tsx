'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function DinerMedia() {
  const t = useTranslations('DinerDesPrinces.Media');
  const mediaItems = t.raw('items') as { name: string; url: string; image: string }[];

  return (
    <AnimatedSection className="py-24 md:py-32">
      <div className="container max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <Newspaper className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl font-headline">
            {t('title')}
          </h2>
          <div className="mt-8 flex justify-center gap-6">
            {mediaItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                whileHover={{ y: -5 }}
              >
                <Card className="bg-card p-4 shadow-lg transition-shadow hover:shadow-xl rounded-2xl w-80">
                   <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                       <Image src={item.image} alt={item.name} fill className="object-contain p-4" />
                   </div>
                  <CardContent className="p-0">
                    <p className="font-semibold text-primary mb-2">{item.name}</p>
                    <span className="text-sm text-accent flex items-center justify-center group-hover:underline">
                        {t('read_article')} <ExternalLink className="w-4 h-4 ml-2" />
                    </span>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
