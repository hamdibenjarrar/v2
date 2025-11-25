'use client';

import { KidChenHero } from '@/components/impact/kidchen/KidChenHero';
import { KidChenKeyFigures } from '@/components/impact/kidchen/KidChenKeyFigures';
import { KidChenProcessDiagram } from '@/components/impact/kidchen/KidChenProcessDiagram';
import { KidChenBeneficiaries } from '@/components/impact/kidchen/KidChenBeneficiaries';
import { KidChenCallToAction } from '@/components/impact/kidchen/KidChenCallToAction';
import { AnimatedSection } from '@/components/animated-section';

export default function KidchenPage() {
  return (
    <div className="bg-background">
      <KidChenHero />
      <AnimatedSection>
        <KidChenKeyFigures />
      </AnimatedSection>
      <AnimatedSection>
        <KidChenProcessDiagram />
      </AnimatedSection>
      <AnimatedSection>
        <KidChenBeneficiaries />
      </AnimatedSection>
      <AnimatedSection>
        <KidChenCallToAction />
      </AnimatedSection>
    </div>
  );
}
