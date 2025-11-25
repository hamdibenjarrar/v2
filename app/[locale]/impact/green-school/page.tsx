
'use client';

import { GreenSchoolHero } from '@/components/impact/green-school/GreenSchoolHero';
import { GreenSchoolPillars } from '@/components/impact/green-school/GreenSchoolPillars';
import { GreenSchoolBeforeAfter } from '@/components/impact/green-school/GreenSchoolBeforeAfter';
import { GreenSchoolTeam } from '@/components/impact/green-school/GreenSchoolTeam';
import { GreenSchoolCallToAction } from '@/components/impact/green-school/GreenSchoolCallToAction';

export default function GreenSchoolPage() {
  return (
    <div className="bg-background">
      <GreenSchoolHero />
      <GreenSchoolPillars />
      <GreenSchoolBeforeAfter />
      <GreenSchoolTeam />
      <GreenSchoolCallToAction />
    </div>
  );
}
