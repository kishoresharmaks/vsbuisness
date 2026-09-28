"use client";

import React from "react";
import { Container } from "@/components/ui/container";

export function PerformanceStats() {
  const stats = [
    {
      value: "98+",
      label: "Performance Rating",
      description: "Google Lighthouse Core Web Vitals optimization score",
    },
    {
      value: "<1s",
      label: "Fast Loading",
      description: "Sub-second initial paint and instant client routing",
    },
    {
      value: "99.9%",
      label: "System Uptime",
      description: "Deployed to edge CDN networks with zero single point of failure",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7EB]">
      <Container size="default">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5F6368]">
            PERFORMANCE ENGINEERING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mt-2">
            Engineered for the modern web.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-8 rounded-3xl bg-[#F7F8FA] border border-[#E5E7EB] text-center flex flex-col items-center justify-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="text-5xl md:text-6xl font-extrabold text-[#111111] tracking-tight">
                {stat.value}
              </span>
              <h3 className="text-base font-semibold text-[#111111]">
                {stat.label}
              </h3>
              <p className="text-xs text-[#5F6368] max-w-xs">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
