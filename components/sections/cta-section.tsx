'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Parallax from "@/components/ui/parallax";

export function CtaSection() {
  const t = useTranslations("CTA");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="cta" className="relative py-24 md:py-40 text-white overflow-hidden">
      <Parallax scale={1.3}>
        <Image
          src="/lut.jpg"
          alt="Community and togetherness"
          fill
          sizes="100vw"
          className="object-cover"
          data-ai-hint="community togetherness"
        />
      </Parallax>
      
      <div className="absolute inset-0 bg-primary/70" />

      <motion.div 
        className="container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold max-w-4xl mx-auto !leading-tight"
        >
          {t("title")}
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="mt-4 text-lg text-primary-foreground/80"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div 
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full transition-transform hover:scale-105 shadow-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
            <Link href="/donate">{t("donate")}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full transition-transform hover:scale-105 shadow-lg">
            <Link href="/join/join-us">{t("volunteer")}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
