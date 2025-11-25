
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function RedesignedNewsletter() {
  const t = useTranslations('Transparency.newsletter');
  const tButton = useTranslations('Transparency.buttons');
  const [isHovered, setIsHovered] = useState(false);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative py-24 md:py-32 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/ss.jpg"
          alt="Community hands together"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(110deg, transparent 40%, hsl(var(--primary) / 0.8) 75%, hsl(var(--primary)) 100%)' }}
        />
      </div>
      
      <motion.div 
        className="container relative z-10 mx-auto px-4 text-center md:text-right rtl:md:text-left"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="max-w-xl ml-auto rtl:ml-0 rtl:mr-auto">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-poppins font-extrabold !leading-tight tracking-tight text-shadow-lg"
            >
              {t('title')}
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder={t('placeholder')}
                className="h-14 flex-grow rounded-full border-white/50 bg-white/10 text-white placeholder:text-white/80 text-center sm:text-left rtl:sm:text-right px-6 shadow-inner backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-white/80 transition duration-300"
                aria-label="Email for newsletter"
              />
              <Button
                type="submit"
                className="h-14 rounded-full bg-white text-brand-navy font-bold text-base px-8 shadow-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 transform-gpu"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {tButton('subscribe')}
                <motion.div
                  animate={{
                    scale: isHovered ? [1, 1.3, 1] : 1,
                    transition: { duration: 0.4, ease: "easeInOut" }
                  }}
                >
                  <Heart 
                    className="ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5 text-brand-orange/80 transition-colors duration-300" 
                    style={{ fill: isHovered ? '#FC8413' : 'none' }}
                  />
                </motion.div>
              </Button>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
