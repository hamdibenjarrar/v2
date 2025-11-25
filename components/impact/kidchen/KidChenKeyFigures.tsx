"use client"

import { motion } from "framer-motion"
import { LandPlot, BriefcaseBusiness, UtensilsCrossed, Leaf, Award } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/animated-counter"

type FigureItem = { 
  key: string;
  value?: number;
  icon: React.ElementType; 
}

const keyFiguresData: FigureItem[] = [
  { key: 'hectares', value: 8, icon: LandPlot },
  { key: 'jobs', value: 9, icon: BriefcaseBusiness },
  { key: 'meals', value: 104000, icon: UtensilsCrossed },
  { key: 'tons', value: 150, icon: Leaf },
  { key: 'smsa', icon: Award },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function KidChenKeyFigures() {
  const t = useTranslations("KidChen.KeyFigures")

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3 tracking-tight">
            {t("title")}
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent mb-6" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {keyFiguresData.map((figure) => {
            const Icon = figure.icon;
            const isLargeNumber = figure.value && figure.value >= 1000;
            return (
              <motion.div key={figure.key} variants={itemVariants}>
                <Card className="flex flex-col items-center text-center p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 bg-card h-full rounded-2xl border">
                  <CardHeader className="pb-2">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                      <Icon className="w-6 h-6" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-primary">
                      {figure.value ? (
                          <>
                            {isLargeNumber && "+"}
                            <AnimatedCounter value={figure.value} />
                          </>
                        ) : (
                          <span>{t(`items.${figure.key}.value`)}</span>
                        )
                      }
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground font-semibold">{t(`items.${figure.key}.main`)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t(`items.${figure.key}.sub`)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
