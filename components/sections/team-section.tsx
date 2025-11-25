
'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedSection } from "@/components/animated-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <Avatar key={index} className="w-16 h-16 border-4 border-background">
              <AvatarImage src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} />
              <AvatarFallback>WWC</AvatarFallback>
            </Avatar>
          ))}
           <Avatar className="w-16 h-16 border-4 border-background bg-muted text-muted-foreground">
              <div className="flex items-center justify-center h-full w-full font-bold">+</div>
            </Avatar>
        </div>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>
    </AnimatedSection>
  );
}
