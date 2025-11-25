
'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";

export function TeamSection() {
  const t = useTranslations("Team");
  const teamImages = [
    {
      imageUrl: "/hh.jpeg",
      description: "Team member",
      imageHint: "person portrait"
    },
    {
      imageUrl: "/mm.jpeg",
      description: "Team member",
      imageHint: "person portrait"
    },
    {
      imageUrl: "/sc.jpeg",
      description: "Team member",
      imageHint: "person portrait"
    },
  ].filter(Boolean);

  return (
    <AnimatedSection className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
          {t("title")}
        </h2>
        <div className="mt-8 flex justify-center -space-x-4">
          {teamImages.map((image, index) => image && (
            <div key={index} className="w-16 h-16 border-4 border-background rounded-full overflow-hidden relative">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                quality={40}
                sizes="64px"
              />
            </div>
          ))}
           <div className="w-16 h-16 border-4 border-background rounded-full overflow-hidden bg-muted text-muted-foreground flex items-center justify-center">
              <div className="font-bold">+</div>
            </div>
        </div>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>
    </AnimatedSection>
  );
}
