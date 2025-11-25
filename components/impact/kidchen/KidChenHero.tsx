"use client"

import { FlipWords } from "@/components/ui/flip-words"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"

export function KidChenHero() {
  const t = useTranslations("KidChen.Hero")
  const words = t.raw("words") as string[]
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const images = ['/fer.jpeg', '/fer2.jpg', '/fer3.jpeg'];

  return (
    <AnimatedSection className="py-20 md:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1 
            className={`text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary tracking-tight mb-4 ${isRTL ? 'leading-[1.5]' : ''}`}
            variants={itemVariants}
          >
            {t("titlePrefix")}{" "}
            <FlipWords
              words={words}
              className="text-accent"
              duration={2500}
            />
          </motion.h1>
          <motion.div 
            className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            variants={itemVariants}
          />
           <motion.p 
            className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-4xl mx-auto font-medium mt-6"
            variants={itemVariants}
          >
            {t("tagline")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.2 }}
                 variants={containerVariants}
            >
                <Card className="bg-card shadow-lg rounded-2xl border border-border/50">
                    <CardContent className="p-6 md:p-8">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-headline text-primary mb-3 tracking-tight">
                        {t("approachTitle")}
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-accent mb-6" />
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {t("approachParagraph")}
                        </p>
                    </div>
                    </CardContent>
                </Card>
            </motion.div>
             <motion.div 
                className="grid grid-cols-2 grid-rows-2 gap-4 h-96"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.3 }}
                 variants={containerVariants}
             >
                <motion.div variants={itemVariants} className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={images[0]} alt="Farm image 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </motion.div>
                <motion.div variants={itemVariants} className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={images[1]} alt="Farm image 2" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </motion.div>
                <motion.div variants={itemVariants} className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={images[2]} alt="Farm image 3" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </motion.div>
            </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
