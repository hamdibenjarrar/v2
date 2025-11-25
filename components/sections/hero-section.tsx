
"use client";

import { HeroVideo } from "./HeroVideo";
import { HeroText } from "./HeroText";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-end justify-center text-white -mt-20 overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
      
      <motion.div
        className="relative z-10 text-center px-4 pb-16 md:pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroText />
      </motion.div>
    </section>
  );
}
