
"use client";

import { useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";

export function HeroVideo() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Image
        src="/wwpr.jpg"
        alt="Children playing background"
        fill
        priority
        fetchPriority="high"
        className="absolute z-0 object-cover"
        quality={40}
        sizes="100vw"
      />
      {!videoError && isDesktop && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
          aria-label="Background video of children playing"
          style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => {
            setVideoError(true);
            console.warn("Video failed to load, using fallback image");
          }}
        >
          <source
            src="https://res.cloudinary.com/dmxofpavo/video/upload/q_auto,f_auto/v1699999999/avenir.mp4"
            type="video/mp4"
          />
          <track
            kind="captions"
            src="/captions.vtt"
            srcLang="en"
            label="English captions"
          />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
}
