import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function TechEcosystem() {
  const techList = [
    { name: "Next.js 16+", category: "Framework & Speed", benefit: "Sub-second load speeds & Google SEO", highlighted: true },
    { name: "React 19", category: "UI Experience", benefit: "Smooth, fast interactive buttons & forms", highlighted: false },
    { name: "TypeScript", category: "Code Reliability", benefit: "Bank-grade code that never crashes", highlighted: true },
    { name: "Tailwind CSS", category: "Modern Styling", benefit: "Pixel-perfect mobile & desktop layouts", highlighted: false },
    { name: "Node.js", category: "Server Engine", benefit: "Fast backend processing for user requests", highlighted: false },
    { name: "PostgreSQL", category: "Secure Database", benefit: "Protects customer data with enterprise encryption", highlighted: true },
    { name: "Prisma ORM", category: "Data Management", benefit: "Fast database queries & reliable transactions", highlighted: false },
    { name: "Cloudflare", category: "Global Edge Network", benefit: "Keeps your website online 24/7 with zero downtime", highlighted: true },
    { name: "REST & APIs", category: "System Connectors", benefit: "Integrates payment gateways & 3rd-party tools", highlighted: false },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F7F8FA]/60 border-b border-[#E5E7EB]">
      <Container size="default">
        <SectionHeading
          eyebrow="TECHNOLOGY ECOSYSTEM"
          title="Battle-tested tools built for your business growth."
          subtitle="We use enterprise-grade web technology so your website is fast, secure, and ready to scale."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {techList.map((tech) => (
            <div
              key={tech.name}
              className={`p-5 rounded-2xl border flex flex-col justify-between gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                tech.highlighted
                  ? "bg-white border-[#2563EB]/40 shadow-xs"
                  : "bg-white border-[#E5E7EB]"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-md">
                  {tech.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#111111] mt-2">
                  {tech.name}
                </h4>
              </div>
              <p className="text-xs text-[#5F6368] font-medium pt-2 border-t border-[#E5E7EB]/70">
                {tech.benefit}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
