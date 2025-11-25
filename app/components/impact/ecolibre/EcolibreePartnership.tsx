
'use client';

import { CheckCircle, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export function EcolibreePartnership() {
  const t = useTranslations('Ecolibree.Partnership');
  const features = (t.raw('features') as string[]) || [];
  const partnershipImage = PlaceHolderImages.find(img => img.id === 'ecolibree-partnership-bg');

  return (
    <section className="py-24 md:py-32 bg-ecolibre-pink/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal">{t('title')}</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-ecolibre-medium-teal to-transparent" />
        </div>

        <Card className="overflow-hidden rounded-2xl shadow-lg border border-gray-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[300px] lg:min-h-full">
              {partnershipImage && (
                <Image
                    src={partnershipImage.imageUrl}
                    alt={partnershipImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={partnershipImage.imageHint}
                  />
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="p-8 md:p-12">
               <h3 className="text-2xl font-bold font-headline text-ecolibre-dark-teal mb-2">
                {t('heading')}
              </h3>
              <p className="text-slate-600 mb-6">
                {t('collaboration')}
              </p>
              
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-ecolibre-medium-teal text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md">
                  <Sparkles className="h-5 w-5" />
                  {t('banner')}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-ecolibre-dark-teal mb-2">{t('highlights')}</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-ecolibre-medium-teal flex-shrink-0 mt-1" />
                        <span className="text-slate-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-ecolibre-dark-teal mb-2">{t('impactTitle')}</h4>
                  <p className="text-slate-600">
                    {t('impact')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
