'use client';

import { WorldwideHero } from '@/components/impact/worldwide/WorldwideHero';
import { WorldwideIntro } from '@/components/impact/worldwide/WorldwideIntro';
import { WorldwideMissionVision } from '@/components/impact/worldwide/WorldwideMissionVision';
import { WorldwideProjectDetails } from '@/components/impact/worldwide/WorldwideProjectDetails';
import { WorldwideImpact } from '@/components/impact/worldwide/WorldwideImpact';
import { WorldwideCTA } from '@/components/impact/worldwide/WorldwideCTA';
import { AnimatedSection } from '@/components/animated-section';

export default function WorldwidePage() {
  return (
    <div className="bg-background">
      <WorldwideHero />
      <AnimatedSection>
        <WorldwideIntro />
      </AnimatedSection>
      <AnimatedSection>
        <WorldwideMissionVision />
      </AnimatedSection>
      <AnimatedSection>
        <WorldwideProjectDetails />
      </AnimatedSection>
      <WorldwideImpact />
      <AnimatedSection>
        <WorldwideCTA />
      </AnimatedSection>
    </div>
  );
}
