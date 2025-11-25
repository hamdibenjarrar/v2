
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Video = {
  title?: string;
  description?: string;
  embedUrl: string;
};

const VideoCard = ({ video }: { video: Video }) => {
  if (!video.embedUrl) {
    return null;
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="group"
    >
      <Card className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden border border-ecolibre-pink/30 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group h-full flex flex-col">
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="w-full bg-black aspect-video">
            <iframe
              src={video.embedUrl}
              title={video.title || 'Ecolibree Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-headline font-bold text-ecolibre-dark-teal mb-2 group-hover:text-ecolibre-medium-teal transition-colors">
              {video.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 min-h-[40px]">
              {video.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function EcolibreeVideos() {
  const t = useTranslations('Ecolibree.Videos');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const youtubeVideos: Video[] = (t.raw('YouTube.items') as any[]) || [];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-ecolibre-pink/20 via-white to-ecolibre-pink/10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-ecolibre-dark-teal/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-ecolibre-dark-teal/20"
          >
            <Play className="w-4 h-4 text-ecolibre-medium-teal" />
            <span className="text-ecolibre-dark-teal text-sm font-medium">{t('badge')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal text-center mb-6 tracking-tight">
            {t('title')}
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto h-1.5 rounded-full bg-gradient-to-r from-transparent via-ecolibre-medium-teal to-transparent mb-8"
          />

          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {youtubeVideos.map((video, index) => (
            <VideoCard key={`youtube-${index}`} video={video} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-lg mb-6">{t('cta.subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-ecolibre-dark-teal hover:bg-ecolibre-dark-teal/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full px-6 py-3">
              <a href="https://www.youtube.com/@wallahwecan" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                {t('cta.youtube')}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
