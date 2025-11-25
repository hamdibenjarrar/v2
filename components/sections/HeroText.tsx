
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function HeroText() {
  const t = useTranslations("AnimatedHero");
  const animatedWords = [
    t("words.promising"),
    t("words.fair"),
    t("words.innovative"),
    t("words.sustainable"),
    t("words.united"),
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  const variants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div className="font-slab text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.4)] text-2xl font-medium md:text-4xl md:font-semibold lg:text-5xl lg:font-bold !leading-tight text-center">
      <h1>
        {t("title")}
        <br />
        {t("subtitle")}{' '}
        <span className="text-accent inline-block text-left min-w-[200px] md:min-w-[350px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="inline-block"
            >
              {animatedWords[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
    </div>
  );
}
