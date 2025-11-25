"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Link } from "@/navigation";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../animated-section";

export function PilotProjects() {
  const t = useTranslations("About");
  const projects = [
    {
      key: "green_school",
      image: PlaceHolderImages.find((img) => img.id === "about-project-greenschool"),
      link: "/impact/green-school"
    },
    {
      key: "ecolibre",
      image: PlaceHolderImages.find((img) => img.id === "about-project-ecolibre"),
      link: "/impact/ecolibre"
    },
  ];

  return (
    <AnimatedSection className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
          {t("projects_title")}
        </h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
          {projects.map((project, index) => (
             <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden group flex flex-col md:flex-row transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full rounded-xl bg-card">
                {project.image && (
                  <div className="relative h-64 md:h-auto md:w-2/5 w-full">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={project.image.imageHint}
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 md:w-3/5 p-6">
                  <CardHeader className="p-0">
                    <CardTitle className="font-headline text-2xl text-primary">
                      {t(`projects.${project.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow flex flex-col mt-4">
                    <p className="text-muted-foreground flex-grow">
                      {t(`projects.${project.key}.description`)}
                    </p>
                    <Button asChild variant="link" className="p-0 h-auto mt-6 self-start text-accent font-bold group-hover:text-accent/80 transition-colors duration-300">
                      <Link href={project.link}>
                        {t(`projects.${project.key}.cta`)}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
