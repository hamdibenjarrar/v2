
'use client';

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AnimatedSection } from "@/components/animated-section";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, Leaf, Activity, Heart, Trophy, ChefHat } from "lucide-react";

const teamMembers = [
    { key: 'abrar', icon: Trophy, color: 'text-blue-600' },
    { key: 'takwa', icon: Leaf, color: 'text-green-600' },
    { key: 'jamil', icon: ChefHat, color: 'text-orange-600' },
    { key: 'hela', icon: Leaf, color: 'text-green-600' },
    { key: 'rahma', icon: Leaf, color: 'text-green-600' },
    { key: 'douha', icon: Leaf, color: 'text-green-600' },
    { key: 'lina', icon: Activity, color: 'text-yellow-600' },
    { key: 'arij', icon: Activity, color: 'text-yellow-600' },
    { key: 'ameni', icon: Activity, color: 'text-yellow-600' },
    { key: 'mariem', icon: Activity, color: 'text-yellow-600' },
];

const stats = [
    { key: 'coordinators', icon: Award, color: 'text-blue-600'},
    { key: 'agronomists', icon: Leaf, color: 'text-green-600'},
    { key: 'nutritionists', icon: Activity, color: 'text-yellow-600'},
    { key: 'team', icon: Heart, color: 'text-red-600'}
]

export function GreenSchoolTeam() {
  const t = useTranslations('GreenSchool.Team');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <AnimatedSection className="py-24 md:py-32 bg-secondary" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card shadow-lg rounded-2xl border border-border/50">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.key} className="flex flex-col items-center">
                             <div className={`w-12 h-12 rounded-full ${stat.color} bg-primary/10 flex items-center justify-center shadow-sm mb-2`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-semibold text-primary">{t(`stats.${stat.key}`)}</span>
                        </div>
                    )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => {
              const image = PlaceHolderImages.find(p => p.id === `team-${member.key}`);
              const Icon = member.icon;
              return (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-card shadow-lg rounded-2xl border border-border/50 overflow-hidden h-full">
                       <CardHeader>
                        {image && (
                            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                <Image src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} fill className="object-cover" />
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${member.color} bg-primary/10 flex items-center justify-center shadow-sm`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-headline text-primary">{t(`members.${member.key}.name`)}</CardTitle>
                                <p className="text-sm text-muted-foreground">{t(`members.${member.key}.role`)}</p>
                            </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">"{t(`members.${member.key}.description`)}"</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 hidden sm:flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 hidden sm:flex" />
        </Carousel>
      </div>
    </AnimatedSection>
  );
}
