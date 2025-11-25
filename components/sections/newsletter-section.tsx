
'use client';
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";

export function NewsletterSection() {
  const t = useTranslations("Newsletter");

  return (
    <AnimatedSection className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("description")}
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder={t("placeholder")}
              className="flex-grow"
              aria-label="Email for newsletter"
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {t("subscribe")}
            </Button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
