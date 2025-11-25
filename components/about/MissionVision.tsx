"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animated-section";

const ICONS: Record<string, React.ElementType> = {
  education: BookOpen,
  health: HeartPulse,
  protection: ShieldCheck,
  self_accomplishment: Sparkles,
  dignified_life: Award,
};

export function MissionVision() {
  const t = useTranslations("About");
  const rightsKeys = [
    "education",
    "health",
    "protection",
    "self_accomplishment",
    "dignified_life",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatedSection as="div" className="py-24 md:py-32 bg-background">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{t('intro_text')}</p>
          <h2 className="mt-16 text-3xl md:text-4xl font-headline text-primary font-bold max-w-4xl mx-auto !leading-snug">
            {t("mission_title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t('rights_title')}</p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {rightsKeys.map((key) => {
            const Icon = ICONS[key];
            return (
              <motion.div key={key} variants={itemVariants}>
                <Card className="h-full text-center bg-card shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg border-t-4 border-accent">
                  <CardHeader className="items-center">
                    <div className="p-3 bg-primary/10 text-primary rounded-full w-fit">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="pt-2 font-headline text-lg text-primary">
                      {t(`rights.${key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {t(`rights.${key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
