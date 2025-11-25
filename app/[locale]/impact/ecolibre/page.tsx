
'use client';

import { EcolibreeHero } from '@/components/impact/ecolibre/EcolibreeHero';
import { EcolibreeMissionVision } from '@/components/impact/ecolibre/EcolibreeMissionVision';
import { EcolibreePartnership } from '@/components/impact/ecolibre/EcolibreePartnership';
import { EcolibreeProduct } from '@/components/impact/ecolibre/EcolibreeProduct';
import { EcolibreeImpactAndGuide } from '@/components/impact/ecolibre/EcolibreeImpactAndGuide';
import { EcolibreeVideos } from '@/components/impact/ecolibre/EcolibreeVideos';
import { EcolibreeMediaPartners } from '@/components/impact/ecolibre/EcolibreeMediaPartners';
import { EcolibreeTeam } from '@/components/impact/ecolibre/EcolibreeTeam';
import { EcolibreeCallToAction } from '@/components/impact/ecolibre/EcolibreeCallToAction';
import { NewsletterSection } from '@/components/sections/newsletter-section';
import { AnimatedSection } from '@/components/animated-section';

export default function EcolibrePage() {
  return (
    <div className="bg-background">
      <EcolibreeHero />
      <AnimatedSection>
        <EcolibreeMissionVision />
      </AnimatedSection>
      <AnimatedSection>
        <EcolibreePartnership />
      </AnimatedSection>
      <AnimatedSection>
        <EcolibreeProduct />
      </AnimatedSection>
      <AnimatedSection>
        <EcolibreeImpactAndGuide />
      </AnimatedSection>
      <AnimatedSection>
        <EcolibreeVideos />
      </AnimatedSection>
      <AnimatedSection>
        <EcolibreeMediaPartners />
      </AnimatedSection>
      <AnimatedSection>
        <EcolibreeTeam />
      </AnimatedSection>
      <AnimatedSection>
        <EcolibreeCallToAction />
      </AnimatedSection>
      <AnimatedSection>
        <NewsletterSection />
      </AnimatedSection>
    </div>
  );
}
