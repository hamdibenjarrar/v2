
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function EcolibreeMediaPartners() {
  const t = useTranslations('Ecolibree.MediaPartners');
  
  const mediaPartners = [
    {
      name: 'The Observers France 24',
      logo: '/fr24.png',
      url: 'https://observers.france24.com/en/tv-shows/the-observers/20210625-the-fight-against-period-poverty-in-tunisia'
    },
    {
      name: 'Jeune Afrique',
      logo: '/jf.png',
      url: 'https://www.jeuneafrique.com/1169018/societe/tunisie-lotfi-hamadi-un-entrepreneur-engage-contre-la-precarite-menstruelle/'
    }
  ];

  return (
    <section
      className="py-24 md:py-32"
    >
       <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-ecolibre-medium-teal to-transparent" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {mediaPartners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group block"
            >
              <Card className="bg-card shadow-lg rounded-2xl border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full">
                <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 w-48 h-24 bg-white rounded-lg shadow-md flex items-center justify-center p-2 border border-gray-100 mb-4"
                  >
                    <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={150}
                        height={80}
                        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </motion.div>
                  <h3 className="text-lg font-headline font-bold text-ecolibre-dark-teal group-hover:text-ecolibre-medium-teal transition-colors duration-300">
                    {partner.name}
                  </h3>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
