
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Heart } from "lucide-react";
import { useState } from "react";

export function CallToAction() {
  const t = useTranslations("About");
  const [isDonateHovered, setIsDonateHovered] = useState(false);

  return (
    <section className="relative py-28 md:py-40 text-white overflow-hidden bg-primary">
       <motion.div
        className="absolute inset-0"
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: 'circOut' }}
      />
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold !leading-tight">
            {t("cta_title")}
          </h2>
          <p className="mt-5 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {t("cta_subtitle")}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-10 bg-white text-primary font-bold hover:bg-white/90 hover:text-primary px-12 py-7 text-lg transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setIsDonateHovered(true)}
            onMouseLeave={() => setIsDonateHovered(false)}
          >
            <Link href="/donate">
              <motion.span
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: isDonateHovered ? 0 : 1, y: isDonateHovered ? -10 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {t("cta_button")}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isDonateHovered ? 1 : 0, y: isDonateHovered ? 0 : 10 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Heart className="h-6 w-6 fill-accent text-accent" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
