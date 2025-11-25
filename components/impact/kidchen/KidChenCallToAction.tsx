
"use client"

import { Link } from "@/navigation"
import { Leaf, Utensils, Handshake } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"

export function KidChenCallToAction() {
  const t = useTranslations("KidChen.CallToAction")

  const impacts = [
    { key: 'malnutrition', icon: Leaf },
    { key: 'meals', icon: Utensils },
    { key: 'jobs', icon: Handshake }
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3 tracking-tight">
            {t("title")}
          </h2>
           <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent mb-6" />
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
        >
          {impacts.map((impact) => {
            const Icon = impact.icon;
            return (
              <motion.div key={impact.key} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full text-center">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-primary text-base font-semibold block">{t(`cards.${impact.key}.title`)}</span>
                        <p className="text-sm text-muted-foreground mt-1">{t(`cards.${impact.key}.subtitle`)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/donate">
                <Utensils aria-hidden="true" className="mr-2 h-5 w-5" /> {t('donate')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-primary text-primary hover:bg-primary/10">
             <Link href="/join/join-us">
                <Handshake aria-hidden="true" className="mr-2 h-5 w-5" /> {t('getInvolved')}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
