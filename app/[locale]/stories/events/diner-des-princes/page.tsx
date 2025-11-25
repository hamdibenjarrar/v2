'use client';

import { DinerHero } from '@/components/events/diner-des-princes/DinerHero';
import { DinerIntro } from '@/components/events/diner-des-princes/DinerIntro';
import { DinerGalaDior } from '@/components/events/diner-des-princes/DinerGalaDior';
import { DinerInternational } from '@/components/events/diner-des-princes/DinerInternational';
import { DinerSlimane } from '@/components/events/diner-des-princes/DinerSlimane';
import { DinerMedia } from '@/components/events/diner-des-princes/DinerMedia';
import { DinerVideos } from '@/components/events/diner-des-princes/DinerVideos';
import { useRef, useEffect } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { ScrollLines } from '@/components/ui/scroll-lines';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DinerDesPrincesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  useEffect(() => {
    const sections = gsap.utils.toArray('.panel');
    const totalSections = sections.length;
    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (totalSections - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-scroll-container',
        pin: true,
        scrub: 1,
        end: () => '+=' + (document.querySelector('.horizontal-scroll-container') as HTMLElement)?.offsetWidth * (totalSections -1),
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
  }, []);

  return (
    <div ref={containerRef} className="bg-background relative">
      <DinerHero scrollYProgress={smoothScrollYProgress} />
      <div className="relative z-10 bg-background">
        <DinerIntro />
      </div>
      <DinerGalaDior />
      <div className="relative z-10 bg-background">
        <DinerVideos />
        <DinerInternational />
        <DinerSlimane />
        <DinerMedia />
      </div>
       <ScrollLines scrollYProgress={scrollYProgress} />
    </div>
  );
}
