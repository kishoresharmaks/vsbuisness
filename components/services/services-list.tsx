"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/typography";
import { SectionVectors } from "@/components/ui/bg-vectors";
import { servicesData, ServiceItem } from "@/lib/services";
import { ArrowRight, ChevronDown } from "lucide-react";

export function ServicesList() {
  const [activeId, setActiveId] = useState<string | null>(servicesData[0].id);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="relative py-14 sm:py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        <SectionHeading
          eyebrow="SERVICES"
          title="Engineered for performance and clarity."
          subtitle="We build high-performance web products, from modern marketing sites to scalable web platforms."
        />

        <div className="flex flex-col border-t border-[#E5E7EB]">
          {servicesData.map((service: ServiceItem) => {
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => handleToggle(service.id)}
                onMouseEnter={() => setActiveId(service.id)}
                className={`group border-b border-[#E5E7EB] transition-all duration-300 cursor-pointer p-4 sm:p-6 md:p-8 ${
                  isActive ? "bg-[#F7F8FA]" : "bg-white hover:bg-[#F7F8FA]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left Number & Title */}
                  <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
                    <span className="text-[10px] sm:text-xs font-mono font-bold bg-[#F7F8FA] border border-[#E5E7EB] text-[#5F6368] px-2 py-0.5 rounded-full shrink-0">
                      {service.number}
                    </span>
                    <h3
                      className={`text-base sm:text-2xl md:text-3xl font-bold transition-colors duration-200 ${
                        isActive ? "text-[#2563EB]" : "text-[#111111]"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Summary & Toggle Arrow */}
                  <div className="flex items-center gap-4 shrink-0">
                    <p className="text-xs sm:text-sm text-[#5F6368] max-w-xs hidden md:block">
                      {service.summary}
                    </p>
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#E5E7EB] flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? "bg-[#2563EB] border-[#2563EB] text-white rotate-90 md:rotate-0"
                          : "bg-white text-[#111111]"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 hidden md:block" />
                      <ChevronDown className="w-4 h-4 md:hidden" />
                    </div>
                  </div>
                </div>

                {/* Mobile Summary Subline */}
                <p className="text-xs text-[#5F6368] mt-1.5 sm:mt-2 block md:hidden line-clamp-1">
                  {service.summary}
                </p>

                {/* Expanded Details Panel */}
                {isActive && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#E5E7EB]/70 flex flex-col gap-3.5 animate-fadeIn">
                    <p className="text-xs sm:text-sm text-[#5F6368] max-w-3xl leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                        <span className="font-extrabold text-[#2563EB] uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-md bg-[#2563EB]/10">
                          Business Outcome
                        </span>
                        <span className="text-[#111111]">{service.businessValue}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 shrink-0">
                        {service.tags.map((tag) => (
                          <Badge key={tag} className="text-[10px] sm:text-xs py-0.5 px-2.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
