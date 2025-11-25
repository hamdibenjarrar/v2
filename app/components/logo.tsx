
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
  isScrolled?: boolean;
};

export function Logo({ className, isScrolled = false }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/wwc.png"
        alt="Wallah We Can Logo"
        width={150}
        height={33}
        className={cn(
          "transition-all duration-300 w-[120px] md:w-[150px]",
          isScrolled ? "brightness-0 invert" : ""
        )}
        style={{ height: 'auto' }}
        priority
      />
    </div>
  );
}
