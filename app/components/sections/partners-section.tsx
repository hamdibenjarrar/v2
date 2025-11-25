
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animated-section';
import Image from 'next/image';

export function PartnersSection() {
  const t = useTranslations('Partners');
  const partnerLogos = [
    { src: '/partner/dior.webp', alt: 'Dior' },
    { src: '/partner/tv5.webp', alt: 'TV5 Monde' },
    { src: '/partner/republic.webp', alt: 'Republic of Tunisia' },
    { src: '/partner/dach.webp', alt: 'DACH' },
    { src: '/partner/medic.webp', alt: 'Medic' },
    { src: '/partner/colab.webp', alt: 'CoLab' },
    { src: '/partner/med.webp', alt: 'Med' },
    { src: '/partner/sante.webp', alt: 'Sante' },
    { src: '/partner/mabroyuka.webp', alt: 'Mabrouka' },
    { src: '/partner/value.webp', alt: 'Value' },
    { src: '/partner/atb.webp', alt: 'ATB' },
    { src: '/partner/aziza.webp', alt: 'Aziza' },
    { src: '/partner/agri.webp', alt: 'Agri' },
    { src: '/partner/labes.webp', alt: 'Labes' },
    { src_INVALID: '/partner/expensya.webp', alt: 'Expensya' }, // Intentionally invalid to demonstrate robustness
    { src: '/partner/chopard.webp', alt: 'Chopard' },
    { src: '/partner/dolce.png', alt: 'Dolce' },
    { src: '/partner/femme.webp', alt: 'Femme' },
    { src: '/partner/protection.png', alt: 'Protection Civile' },
    { src: '/partner/orange.png', alt: 'Orange' },
    { src: '/partner/lyance.png', alt: 'Lyance' },
    { src: '/partner/gs1.png', alt: 'GS1' },
    { src: '/partner/isolmax.png', alt: 'Isolmax' },
    { src: '/partner/instituefr.png', alt: 'Institut Français de Tunisie' },
    { src: '/partner/astral.png', alt: 'Astral' },
    { src: '/partner/carteassurence.png', alt: 'Carte Assurances' },
    { src: '/partner/cap.webp', alt: 'Cap' },
    { src: '/partner/hasdrubal.png', alt: 'Hasdrubal' },
    { src: '/partner/sofrecom.png', alt: 'Sofrecom' },
    { src: '/partner/cotugrain.png', alt: 'Cotugrain' },
    { src: '/partner/ctab.png', alt: 'CTAB' },
    { src: '/partner/GALERIEDESDECORS.png', alt: 'Galerie Des Decors' },
    { src: '/partner/soli.png', alt: 'Soli' },
    { src: '/partner/ahkili.png', alt: 'Ahkili' },
    { src: '/partner/TLScontact.png', alt: 'TLScontact' },
    { src: '/partner/OneTech.png', alt: 'OneTech' },
    { src: '/partner/MAPED.png', alt: 'MAPED' },
    { src: '/partner/chantelle.png', alt: 'Chantelle' }
  ].filter(logo => logo.src && logo.src.trim() !== '');

  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  const carouselVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,
          ease: "linear",
        },
      },
    },
  };

  return (
    <AnimatedSection className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {t('title')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
        </div>
        
        <div className="mt-16 w-full overflow-hidden relative">
           <motion.div
            className="flex"
            variants={carouselVariants}
            animate="animate"
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-4"
              >
                <div className="group relative flex items-center justify-center h-28 bg-white/50 rounded-lg p-4 transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:bg-white border border-transparent hover:border-accent hover:scale-105">
                  <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                      unoptimized
                    />
                </div>
              </div>
            ))}
          </motion.div>
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-secondary to-transparent" />
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-secondary to-transparent" />
        </div>
      </div>
    </AnimatedSection>
  );
}
