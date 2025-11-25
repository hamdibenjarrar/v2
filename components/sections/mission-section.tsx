'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  HeartPulse,
  BookOpen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animated-section";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const ICONS: Record<string, React.ElementType> = {
  health: HeartPulse,
  education: BookOpen,
  protection: ShieldCheck,
  flourishing: Sparkles,
};

const imageMap: { [key: string]: string } = {
  health: "/helph.jpg",
  education: "/educaa.jpg",
  protection: "/prot.jpg",
  flourishing: "/self.jpeg",
};

export function MissionSection() {
  const t = useTranslations("Mission");
  const rights = ["health", "education", "protection", "flourishing"];
  
  return (
    <AnimatedSection id="mission" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-foreground/90">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rights.map((right) => {
            const Icon = ICONS[right];
            const imageSrc = imageMap[right];
            const imageAlt = t(`rights.${right}.title`);
            
            return (
              <Card key={right} className="text-center border-2 hover:border-primary transition-colors duration-300 shadow-lg hover:shadow-xl overflow-hidden group">
                {imageSrc && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
                <CardHeader className="pt-4">
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit -mt-12 relative z-10 border-4 border-accent group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="pt-2 font-headline text-xl">
                    {t(`rights.${right}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground text-sm">
                    {t(`rights.${right}.description`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="bg-primary text-primary-foreground overflow-hidden md:grid md:grid-cols-2">
            <div className="relative min-h-[300px] md:min-h-full">
                <Image
                  src="/lot.jpg"
                  alt={t("founder_name_short")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  data-ai-hint="man portrait"
                />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <blockquote className="text-2xl font-headline italic">
                “{t("founder_quote")}”
              </blockquote>
              <p className="mt-4 text-right font-semibold">
                - {t("founder_name_short")}, {t('founder_title_prefix')}{' '}
                <span className="text-accent">{t('founder_org')}</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
}
