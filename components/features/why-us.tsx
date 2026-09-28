"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionVectors } from "@/components/ui/bg-vectors";
import { CheckCircle2, Layers, Palette, ShieldCheck, Zap } from "lucide-react";

export function WhyUs() {
  const pillars = [
    {
      number: "01",
      title: "LIGHTNING SPEED",
      icon: Zap,
      description: "Sub-second page loading speeds that lower bounce rates, boost Google SEO rankings, and captivate visitors.",
      highlights: ["Sub-second page speeds", "100/100 Core Web Vitals", "Higher Search Rankings"],
    },
    {
      number: "02",
      title: "PREMIUM DESIGN",
      icon: Palette,
      description: "Intuitive UI/UX interfaces built with Geist fluid typography, clean layouts, and touch-perfect mobile ease.",
      highlights: ["Pixel-perfect responsive UI", "Linear-level visual polish", "Touch-first mobile UX"],
    },
    {
      number: "03",
      title: "CLOUD SCALABILITY",
      icon: Layers,
      description: "Modern Next.js 16+ App Router architecture designed to effortlessly handle growing traffic and new features.",
      highlights: ["Next.js 16+ SSR & SSG", "PostgreSQL database layer", "Edge CDN CDN deployment"],
    },
    {
      number: "04",
      title: "ENTERPRISE CODE",
      icon: ShieldCheck,
      description: "Clean, maintainable, 100% type-safe TypeScript code engineered to strict production quality standards.",
      highlights: ["TypeScript strict safety", "Zero production build errors", "30-Day support warranty"],
    },
  ];

  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        <SectionHeading
          eyebrow="WHY WORK WITH US"
          title="Four core principles behind every product."
          subtitle="We eliminate clutter, focus on execution quality, and build software that delivers real business value."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.number}
                className="group p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#F7F8FA] border border-[#E5E7EB] flex flex-col justify-between h-full gap-5 transition-all duration-300 hover:bg-white hover:border-[#2563EB]/40 hover:shadow-md hover:-translate-y-1 cursor-pointer"
              >
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white transition-colors duration-200 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-mono font-extrabold text-[#5F6368] bg-white border border-[#E5E7EB] px-2.5 py-0.5 rounded-full">
                    {pillar.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <span className="block text-base sm:text-xl font-bold text-[#111111] tracking-tight mb-2 group-hover:text-[#2563EB] transition-colors">
                    {pillar.title}
                  </span>
                  <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Highlights List */}
                <ul className="pt-3 border-t border-[#E5E7EB]/70 flex flex-col gap-1.5 text-[11px] sm:text-xs text-[#111111] font-medium">
                  {pillar.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
