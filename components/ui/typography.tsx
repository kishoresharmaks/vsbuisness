import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export function HeroHeading({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn("text-hero text-[#111111] tracking-tighter font-semibold", className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export function BodyText({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={cn("text-base md:text-lg text-[#5F6368] leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function Badge({ children, className, ...props }: TypographyProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-[#F7F8FA] border border-[#E5E7EB] text-[#5F6368]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
