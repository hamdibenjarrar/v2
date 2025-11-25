'use client';
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import Image from "next/image";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ICONS: Record<string, string> = {
  "economique": "/self.png",
  "sustainable": "/sus.png",
  "eco-friendly": "/eco.png",
};

function Principle({ id, iconSrc }: { id: string; iconSrc: string }) {
  const t = useTranslations("SocialEnterprise");
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // More subtle parallax effect
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [-5, 5] : [-20, 20]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="flex flex-col items-center text-center gap-2"
    >
      <div className="relative w-16 h-16">
        <Image
          src={iconSrc}
          alt={t(id)}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-headline text-base text-primary font-bold">{t(id)}</h3>
    </motion.div>
  );
}

export function SocialEnterpriseSection() {
  const t = useTranslations("SocialEnterprise");
  const principles = ["economique", "sustainable", "eco-friendly"];

  return (
    <AnimatedSection as="div" className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <p className="mt-4 text-lg text-foreground/90">
            {t("text")}
          </p>
        </div>

        <div className="mt-16 flex flex-row justify-around items-start gap-8 max-w-4xl mx-auto">
          {principles.map((principle) => {
            const iconSrc = ICONS[principle];
            return (
              <Principle key={principle} id={principle} iconSrc={iconSrc} />
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
