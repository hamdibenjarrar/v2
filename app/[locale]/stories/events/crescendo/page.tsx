
'use client';

import { CrescendoHero } from '@/components/events/crescendo/CrescendoHero';
import { CrescendoIntro } from '@/components/events/crescendo/CrescendoIntro';
import { CrescendoConcept } from '@/components/events/crescendo/CrescendoConcept';
import { CrescendoEpisode1 } from '@/components/events/crescendo/CrescendoEpisode1';
import { CrescendoEpisode2 } from '@/components/events/crescendo/CrescendoEpisode2';
import { CrescendoPress } from '@/components/events/crescendo/CrescendoPress';
import { CrescendoImpact } from '@/components/events/crescendo/CrescendoImpact';
import { NewsletterSection } from '@/components/sections/newsletter-section';
import { AnimatedSection } from '@/components/animated-section';

export default function CrescendoPage() {
  return (
    <div className="bg-background">
      <CrescendoHero />
      <AnimatedSection>
        <CrescendoIntro />
      </AnimatedSection>
       <AnimatedSection>
        <CrescendoConcept />
      </AnimatedSection>
       <AnimatedSection>
        <CrescendoEpisode1 />
      </AnimatedSection>
      <AnimatedSection>
        <CrescendoEpisode2 />
      </AnimatedSection>
       <AnimatedSection>
        <CrescendoPress />
      </AnimatedSection>
      <AnimatedSection>
        <CrescendoImpact />
      </AnimatedSection>
      <AnimatedSection>
        <NewsletterSection />
      </AnimatedSection>
    </div>
  );
}
