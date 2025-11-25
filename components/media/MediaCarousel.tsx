'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FileText } from 'lucide-react';
import type { ImageLoaderProps } from 'next/image';

type MediaCardData = {
  title: string;
  href: string;
  label: string;
  desc: string;
  image?: string;
  type: 'external' | 'pdf';
};

const supabaseLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

export function MediaCarousel({
  cards,
  title,
}: {
  cards: MediaCardData[];
  title: string;
}) {
  if (!Array.isArray(cards) || cards.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-12"
        >
          {title}
        </motion.h2>

        <Carousel
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {cards.map((card, index) => (
              <CarouselItem
                key={`${card.href}-${index}`}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="h-full rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative w-full aspect-[3/4]">
                        {card.image ? (
                          <Image
                            loader={supabaseLoader}
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <FileText className="w-12 h-12 text-primary/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-lg mb-1 leading-tight group-hover:text-accent transition-colors">
                            {card.label || card.title}
                          </h3>
                          {card.desc && (
                            <p className="text-sm text-white/80 line-clamp-2">
                              {card.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 hidden sm:flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
