
'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const projectImages = {
  green_school: { imageUrl: "/gree.png", description: "Green School Project Image", imageHint: "green school" },
  kidchen: { imageUrl: "/kidch.jpg", description: "Kid'chen Project Image", imageHint: "children cooking" },
  ecolibre: { imageUrl: "/ecoli.jpg", description: "Écolibr'Ê Project Image", imageHint: "young entrepreneurs" },
  worldwide: { imageUrl: "/wwpr.jpg", description: "Worldwide Project Image", imageHint: "world map" },
  crescendo: { imageUrl: "/cresc.jpg", description: "Crescendo Project Image", imageHint: "music concert" },
  ambassade: { imageUrl: "/prot.jpg", description: "Ambassade de l'Enfance Project Image", imageHint: "child protection" },
};

const ProjectCard = ({ projectKey, t }: { projectKey: string; t: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [-0.5, 0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [-0.5, 0.5], ["40%", "60%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const project = projectKey as keyof typeof projectImages;
  const image = projectImages[project];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="relative w-full"
    >
      <Card className="overflow-hidden group flex flex-col h-full transition-all duration-300">
        {image && (
          <div className="relative h-60 w-full overflow-hidden">
            <motion.div
              style={{
                top,
                left,
                translateX: "-50%",
                translateY: "-50%",
              }}
              variants={{
                initial: { scale: 0, rotate: "-12.5deg" },
                whileHover: { scale: 1, rotate: "12.5deg" },
              }}
              transition={{ type: "spring" }}
              className="absolute z-0 h-48 w-48 rounded-lg bg-gradient-to-br from-accent/50 to-primary/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">
            {t(`${project}.title`)}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <p className="text-foreground/90 flex-grow">
            {t(`${project}.description`)}
          </p>
          <Button asChild variant="link" className="mt-4 self-start p-0 h-auto font-bold text-accent hover:no-underline">
            <Link href={t(`${project}.link`)}>
              <span className="flex items-center">
                <span className="bg-accent/20 px-1 group-hover:bg-accent/30 transition-colors">{t("cta")}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MobileProjectAccordion = ({ projects, t }: { projects: string[], t: any }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {projects.map((projectKey) => {
         const project = projectKey as keyof typeof projectImages;
         const image = projectImages[project];
        return (
          <AccordionItem value={projectKey} key={projectKey} className="border-b">
            <AccordionTrigger className="text-lg font-headline text-primary py-4">
              {t(`${project}.title`)}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 pt-2">
                 {image && (
                  <div className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <p className="text-foreground/90">
                  {t(`${project}.description`)}
                </p>
                <Button asChild variant="link" className="self-start p-0 h-auto font-bold text-accent">
                  <Link href={t(`${project}.link`)}>
                      {t("cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  );
};

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const projects = ["green_school", "kidchen", "ecolibre", "worldwide", "crescendo", "ambassade"];
  const isMobile = useIsMobile();

  return (
    <AnimatedSection id="projects" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {t("title")}
          </h2>
        </div>

        <div className="mt-12">
          {isMobile ? (
            <MobileProjectAccordion projects={projects} t={t} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((projectKey) => (
                <ProjectCard key={projectKey} projectKey={projectKey} t={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
