'use client';

import { useMessages, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function WorldwideImpact() {
  const t = useTranslations('Worldwide.Impact');
  const messages = useMessages();
  const countries = ['france', 'palestine_bustan', 'palestine_dura'];

  // A helper function to safely get nested properties
  const get = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
  
  const impactMessages: any = get(messages, 'Worldwide.Impact');

  return (
    <section className="py-24 md:py-32 bg-secondary">
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

        <Accordion
          type="single"
          defaultValue="france"
          collapsible
          className="w-full max-w-4xl mx-auto space-y-6"
        >
          {countries.map((country) => {
             const countryData = impactMessages?.countries?.[country];
             const points = countryData?.points;
             const image = PlaceHolderImages.find(p => p.id === `worldwide-${country}`);

            return (
              <AccordionItem
                key={country}
                value={country}
                className="bg-card shadow-lg rounded-2xl border border-border/50 overflow-hidden"
              >
                <AccordionTrigger className="p-6 text-xl font-headline text-primary hover:no-underline">
                  {t(`countries.${country}.title`)}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {image && (
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      <p className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: t.raw(`countries.${country}.description`)}}
                      />
                      {points && Array.isArray(points) && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {points.map(
                            (point: string, index: number) => (
                              <li key={index}>{point}</li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
