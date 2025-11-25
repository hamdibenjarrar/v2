
'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function DinerGalaDior() {
  const t = useTranslations('DinerDesPrinces.GalaDior');
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = [
    { src: '/dior1.jpg', alt: 'Dior Gala Event 1' },
    { src: '/dior2.jpg', alt: 'Dior Gala Event 2' },
    { src: '/dior3.jpg', alt: 'Dior Gala Event 3' },
    { src: '/dior4.jpg', alt: 'Dior Gala Event 4' },
    { src: '/dior5.jpg', alt: 'Dior Gala Event 5' },
    { src: '/dior6.jpg', alt: 'Dior Gala Event 6' },
    { src: '/dior7.jpg', alt: 'Dior Gala Event 7' },
  ];

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
        const sections = gsap.utils.toArray('.panel');
        let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.horizontal-scroll-container',
            pin: true,
            scrub: 1,
            end: () => '+=' + (document.querySelector('.horizontal-scroll-container') as HTMLElement)?.offsetWidth * (sections.length -1),
        },
        });

        return () => {
            if (scrollTween) {
                scrollTween.kill();
            }
            ScrollTrigger.getAll().forEach(st => st.kill());
        }
    }
  }, []);

  return (
    <section ref={scrollRef} className="horizontal-scroll-container h-screen w-full relative bg-secondary overflow-hidden">
        <div className="w-[800vw] h-full flex items-center">
            <div className="panel w-screen h-full flex items-center justify-center px-4 md:px-12">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center container">
                    <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        <Sparkles className="h-4 w-4" />
                        <span>{t('badge')}</span>
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl font-headline">
                        {t('title')}
                    </h2>
                    <div className="space-y-4 text-muted-foreground max-w-lg">
                        <p>{t('p1')}</p>
                        <p>{t('p2')}</p>
                    </div>
                    </motion.div>
                     <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
                        <motion.div 
                          className="absolute w-full h-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Image src="/dior1.jpg" alt="Dior Gala Event" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-2xl shadow-xl" />
                        </motion.div>
                     </div>
                 </div>
            </div>
            {images.map((image, i) => (
                <div key={i} className="panel w-screen h-screen flex items-center justify-center p-4 sm:p-8 md:p-12">
                   <motion.div 
                     className="relative w-full h-[70vh] max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
                     initial={{ opacity: 0.8, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ amount: 0.5 }}
                     transition={{ duration: 0.5 }}
                   >
                       <Image
                         src={image.src}
                         alt={image.alt}
                         fill
                         sizes="100vw"
                         className="object-cover"
                       />
                   </motion.div>
                </div>
             ))}
        </div>
    </section>
  );
}
