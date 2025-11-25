'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

const videoData = [
    { id: 'zQhXEgV8VbQ', labelKey: 'video1_label' },
    { id: '805xDaBYKXY', labelKey: 'video2_label' }
];

export function DinerVideos() {
    const t = useTranslations('DinerDesPrinces.Videos');
    const [activeVideo, setActiveVideo] = useState(videoData[0].id);

    return (
        <section className="py-24 md:py-32">
            <div className="container max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        <Video className="h-4 w-4" />
                        <span>{t('title')}</span>
                    </div>
                </motion.div>

                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {videoData.map((video) => (
                        <Button
                            key={video.id}
                            variant={activeVideo === video.id ? 'default' : 'outline'}
                            onClick={() => setActiveVideo(video.id)}
                            className="transition-all duration-300"
                        >
                            {t(video.labelKey)}
                        </Button>
                    ))}
                </div>

                <motion.div
                    key={activeVideo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-video overflow-hidden rounded-2xl shadow-2xl bg-black"
                >
                    <iframe
                        src={`https://www.youtube.com/embed/${activeVideo}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}
