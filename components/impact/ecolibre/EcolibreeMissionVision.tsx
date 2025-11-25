
'use client';

import { Target, Telescope, Sparkles, CheckCircle } from 'lucide-react';
import { useTranslations, useLocale, useMessages } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Helper to safely get nested properties from the messages object
const get = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export function EcolibreeMissionVision() {
  const t = useTranslations('Ecolibree.MissionVision');
  const locale = useLocale();
  const messages = useMessages();
  const isRTL = locale === 'ar';

  const cards = [
    {
      icon: Target,
      color: 'text-ecolibre-dark-teal',
      key: 'mission',
    },
    {
      icon: Telescope,
      color: 'text-ecolibre-medium-teal',
      key: 'vision',
    },
    {
      icon: Sparkles,
      color: 'text-ecolibre-pink',
      key: 'objectives',
    },
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
    <section className="py-24 md:py-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-ecolibre-medium-teal to-transparent" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
                className="grid grid-cols-1 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
              {cards.map((cardData) => {
                const Icon = cardData.icon;
                
                const cardMessages: any = get(messages, `Ecolibree.MissionVision`);
                const goals = cardMessages?.[cardData.key]?.goals;
                const description = cardMessages?.[cardData.key]?.description;
                
                return (
                  <motion.div key={cardData.key} variants={itemVariants}>
                    <Card className="bg-white shadow-lg rounded-2xl border border-gray-200/50 h-full overflow-hidden group">
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className={`w-14 h-14 rounded-full bg-ecolibre-pink/10 ${cardData.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="font-headline text-2xl text-ecolibre-dark-teal">
                          {t(`${cardData.key}.title`)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {goals && Array.isArray(goals) ? (
                          <ul className="space-y-2 text-left">
                            {goals.map((goal, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-ecolibre-medium-teal mt-1 flex-shrink-0" />
                                <span className="text-slate-600">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        ) : description ? (
                          <p className="text-slate-600 leading-relaxed">
                            {description}
                          </p>
                        ) : null}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

             <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-200/50 overflow-hidden">
                <CardContent className="p-4">
                   <div className="w-full h-[550px] md:h-[600px]">
                      <iframe 
                        src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Ffaza.tn%2Fvideos%2F1158118691662511%2F&show_text=true&width=560&t=0" 
                        className="w-full h-full border-none overflow-hidden"
                        scrolling="no" 
                        frameBorder="0" 
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                </CardContent>
              </Card>
            </motion.div>
        </div>

      </div>
    </section>
  );
}
