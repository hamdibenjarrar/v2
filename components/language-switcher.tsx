
"use client";

import { usePathname, useRouter, locales } from "@/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ isScrolled }: { isScrolled?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger 
        aria-label="Select language"
        className={cn(
          "w-auto border-none bg-transparent gap-2 focus:ring-0 focus:ring-offset-0",
          isScrolled ? "text-white" : "text-primary"
        )}>
        <Globe className="h-4 w-4" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {(locales as unknown as string[]).map((loc) => (
          <SelectItem key={loc} value={loc}>
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
