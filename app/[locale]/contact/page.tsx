
"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  reason: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const t = useTranslations("Contact");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      reason: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: t("toast.successTitle"),
          description: t("toast.successDescription"),
        });
        form.reset();
      } else {
        throw new Error(result.error || t("toast.errorDescription"));
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("toast.errorTitle"),
        description: (error as Error).message || t("toast.errorDescription"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/wallahwecan", "aria-label": "Facebook" },
    { Icon: Twitter, href: "#", "aria-label": "Twitter" },
    { Icon: Instagram, href: "https://www.instagram.com/wallah_we_can/", "aria-label": "Instagram" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/wallah-we-can-worldwide", "aria-label": "LinkedIn" },
  ];

  return (
    <div className="bg-background">
      <AnimatedSection className="py-20 md:py-28 bg-secondary/30">
        <div className="container text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-headline text-primary font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <div className="space-y-12">
              <div className="p-8 bg-card rounded-2xl shadow-sm border">
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-2">
                  {t("formTitle")}
                </h2>
                <p className="text-muted-foreground mb-8">{t("formSubtitle")}</p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("nameLabel")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("namePlaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("emailLabel")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("emailPlaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("subjectLabel")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("subjectPlaceholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("reasonLabel")}</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("reasonPlaceholder")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">{t("reasons.general")}</SelectItem>
                              <SelectItem value="partnership">{t("reasons.partnership")}</SelectItem>
                              <SelectItem value="donation">{t("reasons.donation")}</SelectItem>
                              <SelectItem value="press">{t("reasons.press")}</SelectItem>
                              <SelectItem value="volunteer">{t("reasons.volunteer")}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("messageLabel")}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("messagePlaceholder")}
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                        {isSubmitting ? t("submitButton.sending") : t("submitButton.default")}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>

               <div className="p-8 bg-card rounded-2xl shadow-sm border">
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-8">
                  {t("detailsTitle")}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-full mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-primary">{t("emailTitle")}</h3>
                      <a href={`mailto:${t("emailValue")}`} className="text-muted-foreground hover:text-accent transition-colors">{t("emailValue")}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-full mt-1">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-primary">{t("phoneTitle")}</h3>
                       <a href={`tel:${t("phoneValue")}`} className="text-muted-foreground hover:text-accent transition-colors">{t("phoneValue")}</a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-bold text-primary mt-12 mb-4">
                      {t("socialTitle")}
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.map(({ Icon, href, "aria-label": ariaLabel }) => (
                        <motion.a
                          key={ariaLabel}
                          href={href}
                          aria-label={ariaLabel}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-primary text-primary-foreground rounded-full transition-colors hover:bg-accent"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28 space-y-6">
               <div className="p-8 bg-card rounded-2xl shadow-sm border">
                 <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-8">
                  {t("addressTitle")}
                </h2>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-full mt-1 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground">{t("addressValue")}</p>
                </div>
               </div>
               <div className="rounded-2xl overflow-hidden shadow-md border aspect-w-4 aspect-h-3">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.9279227452625!2d10.179539799999995!3d36.79627850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd35f3053f7337%3A0x57a77c75a4886c2!2sWallah%20We%20Can%20Global!5e0!3m2!1sen!2sus!4v1762526885087!5m2!1sen!2sus"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wallah We Can — Bureau (11 Rue de Belgique, Tunis)"
                    className="grayscale-[50%] contrast-125 hover:filter-none transition-all duration-300"
                ></iframe>
               </div>
            </div>

          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
