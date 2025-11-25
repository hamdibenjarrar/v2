
'use client';
import { AnimatedSection } from "@/components/animated-section";

export default function TeamPage() {
  return (
    <AnimatedSection className="py-16 md:py-24">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
          Our Team
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Meet the dedicated team behind Wallah We Can.
        </p>
      </div>
    </AnimatedSection>
  );
}
