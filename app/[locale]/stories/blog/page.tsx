
'use client';
import { AnimatedSection } from "@/components/animated-section";

export default function BlogPage() {
  return (
    <AnimatedSection className="py-16 md:py-24">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Latest news and stories from our team.
        </p>
      </div>
    </AnimatedSection>
  );
}
