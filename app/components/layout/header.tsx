
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Menu, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";


export function Header() {
  const t = useTranslations("Header");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDonateHovered, setIsDonateHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whoWeAreLinks = [
    { href: "/about", label: t("aboutUs") },
    { href: "/team", label: t("ourTeam"), disabled: true },
    { href: "/partners", label: t("ourPartners"), disabled: true },
    { href: "/transparency", label: t("transparency") },
    { href: "/contact", label: t("contact") },
  ];

  const ourImpactLinks = [
    { href: "/impact/green-school", label: t("greenSchool") },
    { href: "/impact/kidchen", label: t("kidchen") },
    { href: "/impact/ecolibre", label: t("ecolibre") },
    { href: "/impact/worldwide", label: t("worldwide") },
    { href: "/impact/crescendo", label: t("crescendo") },
    { href: "/impact/ambassade-de-lenfance", label: t("ambassade") },
  ];

  const joinMovementLinks = [
    { href: "/join/join-us", label: t("joinUs") },
    { href: "/join/internship", label: t("internship") },
    { href: "/get-involved", label: t("cta") },
  ];

  const storiesLinks = [
    { href: "/stories/media", label: t("media") },
    { href: "/stories/events", label: t("events") },
    { href: "/stories/blog", label: t("blog") },
  ];

  const NavMenu = ({
    trigger,
    links,
  }: {
    trigger: string;
    links: { href: string; label:string, disabled?: boolean }[];
  }) => (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "font-headline text-lg !bg-transparent focus:bg-white/10",
          isScrolled ? "text-white" : "text-primary"
        )}
      >
        {trigger}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white/30 backdrop-blur-md rounded-2xl border border-white/20">
          {links.map((link) => (
            <ListItem 
              key={link.label} 
              href={link.href} 
              title={link.label} 
              disabled={link.disabled}
            >
              {link.disabled ? "Bientôt disponible" : ""}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  const navItems = (
    <NavigationMenu>
      <NavigationMenuList>
        <NavMenu trigger={t("whoWeAre")} links={whoWeAreLinks} />
        <NavMenu trigger={t("ourImpact")} links={ourImpactLinks} />
        <NavMenu trigger={t("joinMovement")} links={joinMovementLinks} />
        <NavMenu trigger={t("stories")} links={storiesLinks} />
      </NavigationMenuList>
    </NavigationMenu>
  );

  const mobileNavItems = (
    <div className="flex flex-col gap-6 text-white">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold font-headline text-accent">{t('whoWeAre')}</h3>
        {whoWeAreLinks.map(link => 
            <Link 
              key={link.href} 
              href={link.disabled ? "#" : link.href}
              className={cn(
                "text-primary-foreground/80 hover:text-white",
                link.disabled && "pointer-events-none opacity-50"
              )}
              aria-disabled={link.disabled}
              tabIndex={link.disabled ? -1 : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold font-headline text-accent">{t('ourImpact')}</h3>
        {ourImpactLinks.map(link => <Link key={link.href} href={link.href} className="text-primary-foreground/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>)}
      </div>
       <div className="flex flex-col gap-2">
        <h3 className="font-bold font-headline text-accent">{t('joinMovement')}</h3>
        {joinMovementLinks.map(link => <Link key={link.href} href={link.href} className="text-primary-foreground/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>)}
      </div>
       <div className="flex flex-col gap-2">
        <h3 className="font-bold font-headline text-accent">{t('stories')}</h3>
        {storiesLinks.map(link => <Link key={link.href} href={link.href} className="text-primary-foreground/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>)}
      </div>
    </div>
  );


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 h-20",
        isScrolled
          ? "bg-primary/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 rtl:ml-6 rtl:mr-0 flex items-center space-x-2 rtl:space-x-reverse" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo isScrolled={isScrolled} />
          </Link>
        </div>

        <nav className="hidden items-center justify-center md:flex">
          {navItems}
        </nav>

        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher isScrolled={isScrolled} />
            <Button
              asChild
              className={cn(
                "rounded-full font-bold text-white transition-all duration-300 px-6 py-3 bg-accent hover:bg-accent/90",
                "shadow-lg hover:shadow-xl hover:scale-105"
                )}
              onMouseEnter={() => setIsDonateHovered(true)}
              onMouseLeave={() => setIsDonateHovered(false)}
            >
              <Link href="/get-involved">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isDonateHovered ? "icon" : "text"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center h-5 w-auto"
                  >
                    {isDonateHovered ? <Heart className="h-5 w-5 fill-white" /> : t("cta")}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    isScrolled ? "text-white" : "text-primary",
                    "hover:bg-transparent"
                  )}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm overflow-y-auto bg-primary text-primary-foreground p-6">
                <div className="footer-bg absolute inset-0 opacity-10"></div>
                  <div className="relative z-10 flex flex-col h-full">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <nav className="grid gap-6 text-lg font-medium mt-10">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Logo isScrolled={true} />
                    </Link>
                    {mobileNavItems}
                  </nav>
                    <div className="mt-auto flex flex-col gap-4 pt-4">
                      <LanguageSwitcher isScrolled={true} />
                      <Button asChild className="bg-accent hover:bg-accent/90" onClick={() => setIsMobileMenuOpen(false)}><Link href="/get-involved">{t("cta")}</Link></Button>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { disabled?: boolean }
>(({ className, title, children, disabled, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={disabled ? '#' : props.href || '#'}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors",
            disabled 
              ? "pointer-events-none opacity-50 cursor-not-allowed" 
              : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
