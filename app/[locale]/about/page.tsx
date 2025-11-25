
'use client';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionVision } from '@/components/about/MissionVision';
import { PilotProjects } from '@/components/about/PilotProjects';
import { Achievements } from '@/components/about/Achievements';
import { CallToAction } from '@/components/about/CallToAction';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <AboutHero />
      <MissionVision />
      <PilotProjects />
      <Achievements />
      <CallToAction />
    </div>
  );
}
