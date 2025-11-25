
'use client';

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { SocialEnterpriseSection } from "@/components/sections/social-enterprise-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { CtaSection } from "@/components/sections/cta-section";
import { TeamSection } from "@/components/sections/team-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnimatedSection as="div">
        <MissionSection />
      </AnimatedSection>
      <AnimatedSection as="div">
        <SocialEnterpriseSection />
      </AnimatedSection>
      <AnimatedSection as="div">
        <ProjectsSection />
      </AnimatedSection>
      <AnimatedSection as="div">
        <ImpactSection />
      </AnimatedSection>
      <AnimatedSection as="div">
        <CtaSection />
      </AnimatedSection>
      <AnimatedSection as="div">
        <TeamSection />
      </AnimatedSection>
      <AnimatedSection as="div">
        <PartnersSection />
      </AnimatedSection>
      <AnimatedSection as="div">
        <NewsletterSection />
      </AnimatedSection>
    </>
  );
}
