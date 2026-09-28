"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      iconRight,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:opacity-50 disabled:pointer-events-none cursor-pointer group";

    const variants = {
      primary:
        "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm hover:shadow active:scale-[0.98]",
      secondary:
        "bg-[#F7F8FA] text-[#111111] hover:bg-[#EAECEF] border border-[#E5E7EB] active:scale-[0.98]",
      outline:
        "bg-transparent border border-[#E5E7EB] text-[#111111] hover:bg-[#F7F8FA] active:scale-[0.98]",
      dark: "bg-[#111111] text-white hover:bg-black active:scale-[0.98]",
      ghost: "bg-transparent text-[#111111] hover:bg-[#F7F8FA]",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 gap-1.5 min-h-[36px]",
      md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
      lg: "text-base px-7 py-3.5 gap-2.5 min-h-[52px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span>{children}</span>
        {iconRight && (
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
