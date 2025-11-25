
'use client';

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Globe, Users, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";

export function WhyIntern() {
    const t = useTranslations("Internship.why");

    const benefits = [
        { icon: Globe, key: "experience" },
        { icon: Users, key: "impact" },
        { icon: TrendingUp, key: "mentorship" },
        { icon: Award, key: "mission" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
      };
    
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };

    return (
        <section className="py-24 md:py-32 bg-secondary">
            <div className="container">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t("title")}</h2>
                </motion.div>
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div key={benefit.key} variants={itemVariants}>
                                <Card className="h-full bg-card shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                        <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-lg font-semibold text-primary">{t(`items.${benefit.key}.title`)}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{t(`items.${benefit.key}.description`)}</p>
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
