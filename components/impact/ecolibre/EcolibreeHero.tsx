
'use client';
import { WobbleCard } from '@/components/ui/wobble-card';
import { FlipWords } from '@/components/ui/flip-words';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Users, Heart, Shield, Eye, Sparkles } from 'lucide-react';
import { Meteors } from '@/components/ui/meteors';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function EcolibreeHero() {
  const t = useTranslations('Ecolibree.Hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const words = t.raw('words') as string[];
  const heroImage = PlaceHolderImages.find(img => img.id === 'ecolibree-hero');


  const stats = [
    {
      icon: Users,
      label: '15,000+',
      desc: t('stats.girlsEmpowered'),
      color: 'text-ecolibre-dark-teal',
    },
    {
      icon: Heart,
      label: '3 Years',
      desc: t('stats.sustainedImpact'),
      color: 'text-ecolibre-pink',
    },
    {
      icon: Shield,
      label: '100%',
      desc: t('stats.ecoFriendly'),
      color: 'text-ecolibre-medium-teal',
    },
    {
      icon: Eye,
      label: 'Global',
      desc: t('stats.globalReach'),
      color: 'text-ecolibre-dark-teal/80',
    },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-16 md:py-24 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ecolibre-pink/20 to-white" />
      <Meteors number={20} />

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-3 text-center lg:text-left space-y-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 border border-ecolibre-pink/30 shadow-lg"
            >
              <Sparkles className="w-6 h-6 text-ecolibre-dark-teal" />
              <span className="text-ecolibre-dark-teal font-semibold text-base tracking-wide">
                {t('badge')}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h1
                className={`text-5xl md:text-7xl font-headline font-bold text-ecolibre-dark-teal tracking-tighter leading-tight ${
                  isRTL ? 'leading-[1.3]' : ''
                }`}
              >
                {t('titlePrefix')}{' '}
                <span className="relative inline-block">
                  <FlipWords
                    words={words}
                    className="text-ecolibre-medium-teal"
                  />
                  <motion.div
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-ecolibre-pink to-ecolibre-medium-teal rounded-full"
                  />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('subtitle')}
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.5,
                  },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center border border-ecolibre-pink/20 shadow-md"
                >
                  <stat.icon
                    className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}
                  />
                  <div className="text-2xl font-bold text-ecolibre-dark-teal">
                    {stat.label}
                  </div>
                  <div className="text-sm text-slate-500">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <WobbleCard
              containerClassName="w-full h-full min-h-[450px] lg:min-h-[500px]"
              className="!bg-transparent"
            >
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover rounded-3xl"
                data-ai-hint={heroImage.imageHint}
              />
            )}
              <div className="absolute inset-0 bg-black/30 rounded-3xl" />
              <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4 tracking-tight">
                  {t('originTitle')}
                </h2>
                <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-lg">
                  {t('originParagraph')}
                </p>
                <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <p className="font-semibold italic text-center text-white">
                    "{t('inspirationalQuote')}"
                  </p>
                </div>
              </div>
            </WobbleCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
