
"use client";

export function HeroVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      aria-label="Background video of children playing"
    >
      <source
        src="https://res.cloudinary.com/dmxofpavo/video/upload/v1699999999/avenir.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
}
