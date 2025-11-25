
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Leaf, DollarSign, Recycle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export function EcolibreeProduct() {
  const t = useTranslations('Ecolibree.Product');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const productImage = PlaceHolderImages.find(img => img.id === 'ecolibree-product');

  const values = [
    { key: 'eco', icon: Leaf, color: 'text-ecolibre-dark-teal' },
    { key: 'economical', icon: DollarSign, color: 'text-ecolibre-medium-teal' },
    { key: 'sustainable', icon: Recycle, color: 'text-ecolibre-pink' },
  ];
  
  const features = t.raw('features') as any[];

  return (
    <section className="py-24 md:py-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-ecolibre-dark-teal">{t('title')}</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-ecolibre-medium-teal to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[400px] md:h-[500px]">
           {productImage && (
             <Image
              src={productImage.imageUrl}
              alt={productImage.description}
              fill
              className="object-contain"
              data-ai-hint={productImage.imageHint}
            />
           )}
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={value.key}>
                    <Card className="p-4 bg-white border-ecolibre-pink/20">
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${value.color}`} />
                      <h3 className="font-semibold text-ecolibre-dark-teal">{t(`values.${value.key}`)}</h3>
                    </Card>
                  </div>
                );
              })}
            </div>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              {t('description')}
            </p>
            
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={feature.key} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-ecolibre-pink/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-ecolibre-pink" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ecolibre-dark-teal">{feature.title}</h4>
                    <p className="text-slate-500 text-sm">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
