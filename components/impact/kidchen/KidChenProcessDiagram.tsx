"use client"

import { Factory, Wheat, School, Salad, Recycle, Truck, ShoppingCart, Handshake, Sprout } from "lucide-react"
import React from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

const processStepsBase = [
  { id: "exploitation", icon: Factory },
  { id: "recoltes", icon: Wheat },
  { id: "cantine", icon: School },
  { id: "repas", icon: Salad },
  { id: "compostage", icon: Recycle },
  { id: "excedent", icon: Truck },
  { id: "vente", icon: ShoppingCart },
  { id: "emplois", icon: Handshake },
  { id: "terres", icon: Sprout },
]

export function KidChenProcessDiagram() {
  const t = useTranslations("KidChen.Process")
  const processSteps = processStepsBase.map((s) => ({
    ...s,
    label: t(`steps.${s.id}`),
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight">
            {t("title")}
          </h2>
           <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>
      
        <div className="relative mx-auto max-w-sm md:max-w-md">
           <div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/30 via-accent to-accent/30 rounded-full -translate-x-1/2"
            aria-hidden="true"
          />
          <motion.div
            className="flex flex-col gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return(
                <motion.div 
                  key={step.id} 
                  className="flex items-center gap-6 md:gap-8 w-full"
                  variants={itemVariants}
                >
                  <div className={`relative md:order-2`}>
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg z-10 relative border-4 border-background">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}/>
                  </div>
                  <div className={`flex-1 rounded-xl p-4 text-left bg-card shadow-md border ${isEven ? 'md:order-1 md:text-right' : 'md:order-3'}`}>
                    <p className="text-base font-semibold text-primary">
                      {step.label}
                    </p>
                  </div>
                   <div className="hidden md:block md:w-1/4 md:order-2"></div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
