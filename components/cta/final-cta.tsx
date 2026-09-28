import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-24 md:py-32 bg-[#F7F8FA] border-t border-[#E5E7EB]">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold tracking-wider text-[#5F6368] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            HAVE A PROJECT IN MIND?
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight max-w-xl">
            Let&apos;s build something remarkable<span className="text-[#2563EB]">.</span>
          </h2>

          <p className="text-base md:text-lg text-[#5F6368] max-w-md">
            Ready to elevate your digital presence? We are currently accepting select projects for this quarter.
          </p>

          <a href="#contact" className="mt-2">
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Start a project
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
