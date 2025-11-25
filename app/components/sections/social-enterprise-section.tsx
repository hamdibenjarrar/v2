'use client';
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ICONS: Record<string, string> = {
  "economique": "/self.png",
  "sustainable": "/sus.png",
  "eco-friendly": "/eco.png",
};

function Principle({ id, iconSrc, index }: { id: string; iconSrc: string; index: number }) {
  const t = useTranslations("SocialEnterprise");
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [-10, 10] : [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  // Spring animations for smoother effect
  const smoothY = useSpring(y, { stiffness: 300, damping: 60 });
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 60 });
  const smoothRotate = useSpring(rotate, { stiffness: 300, damping: 60 });

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2 + index * 0.15
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center gap-2"
      style={{ y: smoothY, scale: smoothScale, rotate: smoothRotate }}
      variants={variants}
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
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section 
        ref={sectionRef}
        className="py-24 md:py-32 bg-secondary overflow-hidden"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <p className="mt-4 text-lg text-foreground/90">
            {t("text")}
          </p>
        </div>

        <motion.div
            className="mt-16 flex flex-row justify-around items-start gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
        >
          {principles.map((principle, index) => {
            const iconSrc = ICONS[principle];
            return (
              <Principle key={principle} id={principle} iconSrc={iconSrc} index={index} />
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
