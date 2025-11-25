
'use client';
import { useMessages, useTranslations } from "next-intl";
import {
  School,
  TestTube2,
  FlaskConical,
  Users,
  ShowerHead,
  Apple,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Droplets,
  Sprout,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedCounter } from "@/components/animated-counter";

const ICONS: Record<string, React.ElementType> = {
  farms: School,
  beekeeping_labs: TestTube2,
  cosmetics_labs: FlaskConical,
  students_benefiting: Users,
  boarders_showers: ShowerHead,
  produce_tons: Apple,
  balanced_meals: GraduationCap,
  graduates_employed: Briefcase,
  after_school_clubs: Users,
  menstrual_education: HeartHandshake,
  washable_pads: Droplets,
  farmer_parents: Sprout,
  energy_kwh: Zap,
};

const SUFFIXES: Record<string, string> = {
  produce_tons: "t",
  energy_kwh: " kWh",
};

export function ImpactSection() {
  const t = useTranslations("Impact");
  const messages = useMessages();
  const impactMessages = messages.Impact as any;
  const statsKeys = Object.keys(impactMessages.stats);
  const values = impactMessages.values;

  return (
    <AnimatedSection id="impact" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {t("title")}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statsKeys.map((key) => {
            const Icon = ICONS[key];
            const value = values[key] as number;
            const suffix = SUFFIXES[key] || "";
            const isLargeNumber = value >= 1000;
            return (
              <Card key={key} className="flex flex-col items-center text-center p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-primary">
                    {isLargeNumber && "+"}
                    <AnimatedCounter value={value} />
                    {suffix}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`stats.${key}`)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
