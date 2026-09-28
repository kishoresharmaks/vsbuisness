import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-3 mb-12 md:mb-16", alignment, className)}>
      {eyebrow && (
        <span className="text-xs md:text-sm font-semibold tracking-widest text-[#5F6368] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-section-title text-[#111111] max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-[#5F6368] max-w-2xl font-normal leading-relaxed mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
