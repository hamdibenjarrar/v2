
'use client';

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { Banknote, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Parallax from "@/components/ui/parallax";

const BankDetailsCard = ({
  country,
  details,
}: {
  country: string;
  details: { label: string; value: string }[];
}) => {
  const t = useTranslations("DonatePage");
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t("toast.copied"),
      description: `${label} ${t("toast.clipboard")}`,
    });
  };

  return (
    <Card className="bg-card shadow-lg rounded-2xl border border-border/50 h-full transform hover:-translate-y-1 transition-transform duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{country}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 text-sm">
          {details.map((detail) => (
            <li key={detail.label} className="flex justify-between items-start gap-2">
              <div className="flex-grow">
                <p className="font-semibold text-gray-500">{detail.label}</p>
                <p className="text-gray-800 font-mono text-xs md:text-sm break-all">{detail.value}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(detail.value, detail.label)}
                aria-label={`${t('copy')} ${detail.label}`}
                className="text-gray-400 hover:text-accent flex-shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default function DonatePage() {
  const t = useTranslations("DonatePage");

  const tunisiaDetails = [
    { label: t("bank_transfer.tunisia.association"), value: "Association Wallah We Can (TUNISIA)" },
    { label: t("bank_transfer.tunisia.agency"), value: "Agence MARSA SAFSAF (K9)" },
    { label: t("bank_transfer.tunisia.phone"), value: "+216 27 068 084" },
    { label: "RIB", value: "08 055 0200920020517 04" },
    { label: "IBAN", value: "TN59 0805 5020 0920 0205 1704" },
    { label: "BIC/SWIFT", value: "BIATTNTT" },
    { label: t("bank_transfer.tunisia.currency"), value: "TND" },
    { label: t("bank_transfer.tunisia.address"), value: "Rue Abdelhafidh EL MEKKI 2070 LA MARSA" },
  ];

  const franceDetails = [
    { label: t("bank_transfer.france.association"), value: "Association Wallah We Can (FRANCE)" },
    { label: t("bank_transfer.france.agency"), value: "BNPPARB PARIS R DE PASSY (02302)" },
    { label: "RIB", value: "30004 02302 00010201268 43" },
    { label: "IBAN", value: "FR76 3000 4023 0200 0102 0126 843" },
    { label: "BIC/SWIFT", value: "BNPAFRPPXXX" },
    { label: t("bank_transfer.france.currency"), value: "EUR" },
    { label: t("bank_transfer.france.address"), value: "6 RUE VICTOR DEJEANTE 75020 PARIS" },
  ];
  

  return (
    <div className="bg-background">
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Parallax scale={1.4}>
            <Image
                src="/don2.jpg"
                alt={t("title")}
                fill
                className="object-cover"
                priority
                data-ai-hint="child smiling"
            />
          </Parallax>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1}} transition={{ duration: 0.8 }} className="relative z-10 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-shadow-lg !leading-tight">
                {t("title")}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                {t("subtitle")}
            </p>
        </motion.div>
      </section>

      <AnimatedSection className="py-24 md:py-32 bg-secondary">
        <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-headline font-bold text-primary">{t("why_donate.title")}</h2>
            <p className="mt-4 text-gray-800">{t("why_donate.description")}</p>
        </div>
      </AnimatedSection>
      
      <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <Parallax scale={1.5} orientation="down">
              <Image
                src="/don.jpg"
                alt={t("difference.title")}
                fill
                className="object-cover"
                data-ai-hint="charity event"
              />
            </Parallax>
          <div className="absolute inset-0 bg-primary" />
        </div>
        <div className="container relative z-10 text-center">
             <h3 className="text-4xl font-bold text-shadow-md">{t("difference.title")}</h3>
             <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">{t("difference.description")}</p>
        </div>
      </section>

      <AnimatedSection className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold text-primary flex items-center justify-center gap-3">
              <Banknote className="h-8 w-8 text-accent" />
              {t("bank_transfer.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <BankDetailsCard country={t("bank_transfer.tunisia.title")} details={tunisiaDetails} />
            <BankDetailsCard country={t("bank_transfer.france.title")} details={franceDetails} />
          </div>
        </div>
      </AnimatedSection>

       <AnimatedSection className="py-16 bg-secondary">
            <div className="container text-center">
                 <p className="text-sm text-gray-600 max-w-2xl mx-auto">{t("code_of_conduct.text1")} {t("code_of_conduct.text2")} <a href="/contact" className="text-accent underline hover:text-accent/80">{t("code_of_conduct.contact_us")}</a>.</p>
                <h3 className="font-headline font-bold text-primary text-xl mt-8">{t("receipt.title")}</h3>
                <p className="mt-2 text-gray-800">{t("receipt.description")} <a href="mailto:finances@wallahwecan.org" className="text-accent underline hover:text-accent/80">finances@wallahwecan.org</a></p>
            </div>
       </AnimatedSection>
    </div>
  );
}
