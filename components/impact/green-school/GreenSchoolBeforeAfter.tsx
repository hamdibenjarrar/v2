
'use client';

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Camera, Video, Eye } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function GreenSchoolBeforeAfter() {
  const t = useTranslations('GreenSchool.BeforeAfter');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const beforeImage = PlaceHolderImages.find(p => p.id === 'green-school-before');
  const afterImage = PlaceHolderImages.find(p => p.id === 'green-school-after');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <AnimatedSection className="py-24 md:py-32" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight">
            {t('title')}
          </h2>
           <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shadow-sm">
                    <ImageIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-headline text-primary">{t('before.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {beforeImage && (
                  <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                    <Image src={beforeImage.imageUrl} alt={beforeImage.description} data-ai-hint={beforeImage.imageHint} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                )}
                <p className="text-base text-muted-foreground leading-relaxed">{t('before.description')}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                    <Camera aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-headline text-primary">{t('after.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {afterImage && (
                  <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                    <Image src={afterImage.imageUrl} alt={afterImage.description} data-ai-hint={afterImage.imageHint} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                )}
                <p className="text-base text-muted-foreground leading-relaxed">{t('after.description')}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card className="bg-card shadow-lg rounded-2xl border border-border/50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                        <Video aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl font-headline text-primary">{t('videos.title')}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <iframe src="https://www.youtube.com/embed/oK8ecW_UuNI" title={t('videos.title')} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full"></iframe>
                    </div>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <iframe src="https://www.youtube.com/embed/DlmnMQpLv60" title={t('videos.title')} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full"></iframe>
                    </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Eye aria-hidden="true" className="h-4 w-4" />
                    <span className="text-sm">{t('videos.note')}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
