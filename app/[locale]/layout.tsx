
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "@/navigation";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import AuthProvider from "@/lib/supabase/auth-provider";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: {locale} }: Props) {
  if (!locales.includes(locale as any)) {
    notFound();
  }
  
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <div dir={dir} className={cn("flex min-h-screen flex-col relative")}>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
