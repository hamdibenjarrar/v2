"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedCounter } from "@/components/animated-counter";
import { HeartPulse, BookOpen, Zap, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const ICONS: Record<string, React.ElementType> = {
  health: HeartPulse,
  education: BookOpen,
  energy: Zap,
  agriculture: Sprout,
};

export function Achievements() {
  const t = useTranslations("About.achievements");
  const categories = ["health", "education", "energy", "agriculture"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <AnimatedSection className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <motion.h2 
          className="text-3xl md:text-4xl font-headline font-bold text-primary text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category) => {
            const Icon = ICONS[category];
            const stats = t.raw(`${category}.stats`);
            
            return(
            <motion.div key={category} className="flex flex-col items-start text-left p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300" variants={itemVariants}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-lg">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-primary tracking-widest uppercase text-lg">
                  {t(`${category}.title`)}
                </h3>
              </div>
              <ul className="mt-6 space-y-5">
                {Array.isArray(stats) && stats.map((stat: any, index: number) => (
                  <li key={index} className="flex items-start">
                    {stat.value ? (
                      <div className="flex flex-col">
                        <span className="text-4xl font-bold text-primary">
                          <AnimatedCounter value={parseInt(stat.value)} />
                        </span>
                        <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
                      </div>
                    ) : (
                      <span className="text-base text-muted-foreground leading-relaxed pl-4 border-l-2 border-accent/50">{stat.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )})}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
