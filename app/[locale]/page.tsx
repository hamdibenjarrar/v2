
'use client';

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { AnimatedSection } from "@/components/animated-section";

// Lazy load below-the-fold sections
const MissionSection = dynamic(() => import("@/components/sections/mission-section").then(mod => ({ default: mod.MissionSection })), {
  loading: () => <div className="h-96" />
});

const SocialEnterpriseSection = dynamic(() => import("@/components/sections/social-enterprise-section").then(mod => ({ default: mod.SocialEnterpriseSection })), {
  loading: () => <div className="h-96" />
});

const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="h-96" />
});

const ImpactSection = dynamic(() => import("@/components/sections/impact-section").then(mod => ({ default: mod.ImpactSection })), {
  loading: () => <div className="h-96" />
});

const CtaSection = dynamic(() => import("@/components/sections/cta-section").then(mod => ({ default: mod.CtaSection })), {
  loading: () => <div className="h-96" />
});

const TeamSection = dynamic(() => import("@/components/sections/team-section").then(mod => ({ default: mod.TeamSection })), {
  loading: () => <div className="h-32" />
});

const PartnersSection = dynamic(() => import("@/components/sections/partners-section").then(mod => ({ default: mod.PartnersSection })), {
  loading: () => <div className="h-64" />
});

const NewsletterSection = dynamic(() => import("@/components/sections/newsletter-section").then(mod => ({ default: mod.NewsletterSection })), {
  loading: () => <div className="h-96" />
});

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
