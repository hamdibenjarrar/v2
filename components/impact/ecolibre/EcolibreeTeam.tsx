
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Quote } from "lucide-react"
import { useTranslations, useLocale } from 'next-intl'
import { motion } from "framer-motion"
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const teamMembersData = [
  {
    key: 'imen',
    imageId: 'team-imen-majed'
  },
  {
    key: 'nesrine',
    imageId: 'team-nesrine-morjane'
  },
  {
    key: 'saja',
    imageId: 'team-saja-najar'
  },
]

export function EcolibreeTeam() {
  const t = useTranslations('Ecolibree.Team');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const safeT = (path: string, fallback = '') => {
    try {
      return t(path as any);
    } catch {
      return fallback;
    }
  };
  
  const teamMembers = teamMembersData.map(member => ({
    ...member,
    name: safeT(`members.${member.key}.name`),
    role: safeT(`members.${member.key}.role`),
    description: safeT(`members.${member.key}.description`),
    image: PlaceHolderImages.find(p => p.id === member.imageId)
  }));
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      className="py-24 md:py-32 bg-ecolibre-pink/10"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-ecolibre-medium-teal to-transparent" />
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          {teamMembers.map((member) => (
            <motion.div key={member.key} variants={itemVariants}>
                <Card className="bg-white shadow-lg rounded-2xl border border-gray-200/50 h-full overflow-hidden group">
                  {member.image && (
                    <div className="relative h-60 w-full">
                        <Image src={member.image.imageUrl} alt={member.image.description} data-ai-hint={member.image.imageHint} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <CardHeader className="items-center text-center -mt-10 z-10 relative">
                     <div className="w-20 h-20 rounded-full bg-ecolibre-dark-teal text-white flex items-center justify-center shadow-lg border-4 border-white">
                        <Users aria-hidden="true" className="h-10 w-10" />
                      </div>
                    <CardTitle className="pt-2 font-headline text-2xl text-ecolibre-dark-teal">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm text-ecolibre-medium-teal font-semibold">{member.role}</p>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 text-center">
                    <p className="text-base text-slate-600 leading-relaxed italic">
                      "{member.description}"
                    </p>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
