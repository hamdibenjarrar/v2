
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

type VideoEntry = {
  label: string;
  url: string;
};

export function VideoSection({
  id,
  title,
  description,
  videos,
  isYoutube = false,
}: {
  id: string;
  title: string;
  description?: string;
  videos: VideoEntry[];
  isYoutube?: boolean;
}) {
  const [activeVideo, setActiveVideo] = useState(0);

  if (!Array.isArray(videos) || videos.length === 0) return null;

  const activeVideoData = videos[activeVideo];

  return (
    <section id={id} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {videos.map((video, index) => (
            <Button
              key={`${id}-${index}`}
              variant={activeVideo === index ? 'default' : 'outline'}
              onClick={() => setActiveVideo(index)}
              className="transition-all duration-300"
            >
              {video.label}
            </Button>
          ))}
        </div>

        <motion.div
          key={activeVideo}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`overflow-hidden rounded-2xl shadow-2xl border bg-black ${isYoutube ? 'aspect-video' : ''}`}
          >
            {activeVideoData && (
              <iframe
                src={activeVideoData.url}
                title={activeVideoData.label}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={`w-full ${isYoutube ? 'h-full' : 'h-[550px]'}`}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
