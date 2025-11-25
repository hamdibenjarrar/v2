"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"

export function KidChenBeneficiaries() {
  const t = useTranslations("KidChen.Beneficiaries")

  const beneficiaries = [
    {
      key: 'parents',
      icon: Users,
      image: '/pare.jpeg',
      imageHint: 'happy farmers'
    },
    {
      key: 'students',
      icon: GraduationCap,
      image: '/ele.jpg',
      imageHint: 'students eating'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container">
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

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {beneficiaries.map((beneficiary) => {
            const Icon = beneficiary.icon;
            return (
              <motion.div key={beneficiary.key} variants={itemVariants}>
                <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full overflow-hidden group">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={beneficiary.image}
                      alt={t(`${beneficiary.key}.title`)}
                      fill
                      sizes="(max-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={beneficiary.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader className="items-center text-center -mt-10 z-10 relative">
                     <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-4 border-background">
                        <Icon aria-hidden="true" className="h-8 w-8" />
                      </div>
                    <CardTitle className="pt-2 font-headline text-2xl text-primary">
                      {t(`${beneficiary.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 text-center">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {t(`${beneficiary.key}.description`)}
                    </p>
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
