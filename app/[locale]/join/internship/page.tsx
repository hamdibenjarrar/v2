
'use client';

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { InternshipForm } from "@/components/join/InternshipForm";
import { WhyIntern } from "@/components/join/WhyIntern";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { AnimatedSection } from "@/components/animated-section";

export default function InternshipPage() {
  const t = useTranslations("Internship");

  return (
    <div className="bg-background">
      <AnimatedSection className="py-20 md:py-28 bg-secondary/30">
        <div className="container text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-headline text-primary font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </AnimatedSection>
      
      <AnimatedSection>
        <InternshipForm />
      </AnimatedSection>

      <AnimatedSection>
        <WhyIntern />
      </AnimatedSection>
      
      <AnimatedSection>
        <NewsletterSection />
      </AnimatedSection>
    </div>
  );
}
