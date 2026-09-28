import React from "react";
import { Container } from "@/components/ui/container";
import { Quote } from "lucide-react";

export function TestimonialQuote() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F8FA]/60 border-b border-[#E5E7EB]">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center">
            <Quote className="w-5 h-5 fill-current" />
          </div>

          <blockquote className="text-2xl md:text-3xl font-semibold text-[#111111] leading-snug tracking-tight max-w-2xl">
            &ldquo;Working with the team completely changed how we approached our digital product. The build speed, attention to detail, and modern design quality exceeded every expectation.&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-1 mt-2">
            <span className="text-base font-bold text-[#111111]">
              Alexander Wright
            </span>
            <span className="text-xs font-mono text-[#5F6368]">
              CEO & Founder &middot; Nexus Intelligence Platform
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
