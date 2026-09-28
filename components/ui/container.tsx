import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
  className?: string;
}

export function Container({
  children,
  size = "default",
  className,
  ...props
}: ContainerProps) {
  const maxWidth =
    size === "wide"
      ? "max-w-[1400px]"
      : size === "narrow"
      ? "max-w-[960px]"
      : "max-w-[1280px]";

  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-8",
        maxWidth,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
