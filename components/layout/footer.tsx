
'use client';
import { useTranslations } from "next-intl";
import { Logo } from "@/components/logo";
import { Link } from "@/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");

  const quickLinks = [
    { href: "/about", label: tHeader("aboutUs") },
    { href: "/impact/green-school", label: tHeader("ourImpact") },
    { href: "/contact", label: tHeader("contact") },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/wallahwecan", "aria-label": "Facebook" },
    { Icon: Instagram, href: "https://www.instagram.com/wallah_we_can/", "aria-label": "Instagram" },
    { Icon: Youtube, href: "https://www.youtube.com/@wallahwecan", "aria-label": "Youtube" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/wallah-we-can-worldwide", "aria-label": "LinkedIn" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 footer-bg opacity-10"></div>
      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <Logo isScrolled={true} />
            <p className="text-sm text-primary-foreground/80">{t("description")}</p>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold font-headline text-lg mb-4 border-b-2 border-accent pb-2 inline-block">{t("quickLinks")}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/80 hover:text-white hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold font-headline text-lg mb-4 border-b-2 border-accent pb-2 inline-block">{t("contactUs")}</h3>
               <ul className="space-y-2 text-sm text-primary-foreground/80">
                 <li>11 Rue de Belgique, Tunis 1001, Tunisia</li>
                 <li><a href="mailto:contact@wallahwecan.org" className="hover:text-white hover:underline">contact@wallahwecan.org</a></li>
                 <li><a href="tel:+21655527277" className="hover:text-white hover:underline">+216 55 527 277</a></li>
               </ul>
            </div>
            
            <div>
              <h3 className="font-bold font-headline text-lg mb-4 border-b-2 border-accent pb-2 inline-block">{t("joinUs")}</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">{t("newsletter")}</p>
              <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
                <Link href="/donate">{t("donate")}</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-12 bg-primary-foreground/20" />
        
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-center md:text-left text-sm text-primary-foreground/60">
          <p className="mt-4 md:mt-0">{t("copyright")}</p>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, "aria-label": ariaLabel }) => (
                <a key={ariaLabel} href={href} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="flex gap-4">
                <Link href="#" className="hover:text-white hover:underline transition-colors">
                    {t("privacy")}
                </Link>
                <Link href="#" className="hover:text-white hover:underline transition-colors">
                    {t("terms")}
                </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
