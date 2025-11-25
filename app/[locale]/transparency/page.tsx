'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { TransparencyHero } from '@/components/transparency/TransparencyHero';
import { DocumentsHub } from '@/components/transparency/DocumentsHub';
import { RedesignedNewsletter } from '@/components/transparency/RedesignedNewsletter';
import { motion, useScroll } from 'framer-motion';
import { ScrollLines } from '@/components/ui/scroll-lines';

export default function TransparencyPage() {
  const t = useTranslations('Transparency');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="bg-background text-brand-navy relative">
      <ScrollLines scrollYProgress={scrollYProgress} />
      
      <TransparencyHero />

      <div className="relative z-20 bg-background pt-16">
        <DocumentsHub />
      </div>

      <div className="relative z-20 bg-background">
        <RedesignedNewsletter />
      </div>
    </div>
  );
}
