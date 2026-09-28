"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionVectors } from "@/components/ui/bg-vectors";
import {
  Zap,
  ShieldCheck,
  Activity,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  badge: string;
  category: "Frontend & Speed" | "Backend & AI" | "Database & Cloud" | "Security & Payments";
  metric: string;
  highlighted?: boolean;
  iconUrl: string;
  bgColor?: string;
}

export function TechEcosystem() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  const categories = [
    { label: "All Ecosystem (24)", value: "All" },
    { label: "Frontend & Speed", value: "Frontend & Speed" },
    { label: "Backend & AI", value: "Backend & AI" },
    { label: "Database & Cloud", value: "Database & Cloud" },
    { label: "Security & Payments", value: "Security & Payments" },
  ];

  const technologies: TechItem[] = [
    // --- Frontend & Speed ---
    {
      id: "nextjs",
      name: "Next.js 16+",
      badge: "App Router & SSR",
      category: "Frontend & Speed",
      metric: "100/100 SEO & Vitals",
      highlighted: true,
      iconUrl: "https://cdn.simpleicons.org/nextdotjs/000000",
      bgColor: "bg-slate-100 border-slate-300",
    },
    {
      id: "react",
      name: "React 19",
      badge: "Concurrent Engine",
      category: "Frontend & Speed",
      metric: "Zero-Lag UI Render",
      highlighted: true,
      iconUrl: "https://cdn.simpleicons.org/react/61DAFB",
      bgColor: "bg-[#082F49]/10 border-[#0284C7]/30",
    },
    {
      id: "typescript",
      name: "TypeScript 5",
      badge: "Type Safety",
      category: "Frontend & Speed",
      metric: "Bank-Grade Reliability",
      iconUrl: "https://cdn.simpleicons.org/typescript/3178C6",
      bgColor: "bg-[#3178C6]/10 border-[#3178C6]/30",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS v4",
      badge: "Utility Styling",
      category: "Frontend & Speed",
      metric: "100% Mobile Responsive",
      iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      bgColor: "bg-[#06B6D4]/10 border-[#06B6D4]/30",
    },
    {
      id: "figma",
      name: "Figma",
      badge: "Design Systems",
      category: "Frontend & Speed",
      metric: "Pixel-Perfect UX",
      iconUrl: "https://cdn.simpleicons.org/figma/F24E1E",
      bgColor: "bg-purple-50 border-purple-200",
    },

    // --- Backend & AI ---
    {
      id: "nodejs",
      name: "Node.js 22",
      badge: "Async Runtime",
      category: "Backend & AI",
      metric: "<10ms Server Response",
      highlighted: true,
      iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      bgColor: "bg-emerald-50 border-emerald-200",
    },
    {
      id: "python",
      name: "Python 3.12",
      badge: "AI & Data Science",
      category: "Backend & AI",
      metric: "Machine Learning API",
      iconUrl: "https://cdn.simpleicons.org/python/3776AB",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      id: "openai",
      name: "OpenAI & Claude AI",
      badge: "LLM Orchestration",
      category: "Backend & AI",
      metric: "Smart Bots",
      highlighted: true,
      iconUrl: "https://cdn.simpleicons.org/openai/10A37F",
      bgColor: "bg-emerald-50 border-emerald-300",
    },
    {
      id: "graphql",
      name: "GraphQL & REST",
      badge: "API Gateways",
      category: "Backend & AI",
      metric: "Modular Endpoint Sync",
      iconUrl: "https://cdn.simpleicons.org/graphql/E535AB",
      bgColor: "bg-fuchsia-50 border-fuchsia-200",
    },
    {
      id: "websockets",
      name: "WebSockets",
      badge: "Realtime Push",
      category: "Backend & AI",
      metric: "Sub-Second Sync",
      iconUrl: "https://cdn.simpleicons.org/socketdotio/010101",
      bgColor: "bg-purple-50 border-purple-200",
    },

    // --- Database & Cloud ---
    {
      id: "postgresql",
      name: "PostgreSQL 16",
      badge: "ACID Database",
      category: "Database & Cloud",
      metric: "99.999% Data Safety",
      highlighted: true,
      iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      id: "mongodb",
      name: "MongoDB Atlas",
      badge: "NoSQL Documents",
      category: "Database & Cloud",
      metric: "High Scalability",
      iconUrl: "https://cdn.simpleicons.org/mongodb/47A248",
      bgColor: "bg-emerald-50 border-emerald-200",
    },
    {
      id: "prisma",
      name: "Prisma ORM",
      badge: "Type-Safe Queries",
      category: "Database & Cloud",
      metric: "Auto Migrations",
      iconUrl: "https://cdn.simpleicons.org/prisma/2DD4BF",
      bgColor: "bg-teal-50 border-teal-200",
    },
    {
      id: "redis",
      name: "Redis Cache",
      badge: "In-Memory Store",
      category: "Database & Cloud",
      metric: "Sub-Millisecond",
      iconUrl: "https://cdn.simpleicons.org/redis/DC382D",
      bgColor: "bg-red-50 border-red-200",
    },
    {
      id: "cloudflare",
      name: "Cloudflare Edge",
      badge: "Global CDN",
      category: "Database & Cloud",
      metric: "250+ Edge Cities",
      highlighted: true,
      iconUrl: "https://cdn.simpleicons.org/cloudflare/F38020",
      bgColor: "bg-amber-50 border-amber-200",
    },
    {
      id: "aws",
      name: "AWS Cloud",
      badge: "S3, EC2 & Lambda",
      category: "Database & Cloud",
      metric: "Enterprise Infra",
      iconUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
      bgColor: "bg-orange-50 border-orange-200",
    },
    {
      id: "vercel",
      name: "Vercel",
      badge: "Serverless Edge",
      category: "Database & Cloud",
      metric: "Instant Deploy",
      iconUrl: "https://cdn.simpleicons.org/vercel/000000",
      bgColor: "bg-slate-100 border-slate-300",
    },
    {
      id: "docker",
      name: "Docker & K8s",
      badge: "Containerization",
      category: "Database & Cloud",
      metric: "Zero Downtime",
      iconUrl: "https://cdn.simpleicons.org/docker/2496ED",
      bgColor: "bg-sky-50 border-sky-200",
    },
    {
      id: "supabase",
      name: "Supabase",
      badge: "Realtime Postgres",
      category: "Database & Cloud",
      metric: "Row Level Security",
      iconUrl: "https://cdn.simpleicons.org/supabase/3ECF8E",
      bgColor: "bg-emerald-50 border-emerald-200",
    },

    // --- Security & Payments ---
    {
      id: "stripe",
      name: "Stripe & UPI",
      badge: "Payment Checkout",
      category: "Security & Payments",
      metric: "PCI-DSS Level 1",
      highlighted: true,
      iconUrl: "https://cdn.simpleicons.org/stripe/635BFF",
      bgColor: "bg-indigo-50 border-indigo-200",
    },
    {
      id: "razorpay",
      name: "Razorpay",
      badge: "Indian Payments",
      category: "Security & Payments",
      metric: "UPI & Netbanking",
      iconUrl: "https://cdn.simpleicons.org/razorpay/0284C7",
      bgColor: "bg-sky-50 border-sky-200",
    },
    {
      id: "auth0",
      name: "Auth0 & OAuth 2.0",
      badge: "Identity Auth",
      category: "Security & Payments",
      metric: "2FA & SSO",
      iconUrl: "https://cdn.simpleicons.org/auth0/EB5424",
      bgColor: "bg-orange-50 border-orange-200",
    },
    {
      id: "git",
      name: "Git & Actions",
      badge: "CI/CD Pipeline",
      category: "Security & Payments",
      metric: "Auto Test Build",
      iconUrl: "https://cdn.simpleicons.org/git/F05032",
      bgColor: "bg-red-50 border-red-200",
    },
    {
      id: "nginx",
      name: "Linux & Nginx",
      badge: "Reverse Proxy",
      category: "Security & Payments",
      metric: "DDoS Mitigation",
      iconUrl: "https://cdn.simpleicons.org/nginx/009639",
      bgColor: "bg-emerald-50 border-emerald-200",
    },
  ];

  const filteredTechnologies =
    activeFilter === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeFilter);

  const displayedTechnologies =
    activeFilter === "All" && !showAllMobile
      ? filteredTechnologies.slice(0, 8)
      : filteredTechnologies;

  return (
    <section id="technology" className="relative py-14 sm:py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        
        {/* Header Section matching website blue theme */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="h-0.5 w-6 bg-[#2563EB] rounded-full inline-block" />
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#2563EB] uppercase">
              TECHNOLOGY ECOSYSTEM
            </span>
            <span className="h-0.5 w-6 bg-[#2563EB] rounded-full inline-block" />
          </div>

          <h2 className="text-2.5xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            Built with world-class <br className="hidden sm:inline" />
            engineering <span className="text-[#2563EB]">standards.</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5F6368] mt-2.5 sm:mt-3.5 leading-relaxed max-w-2xl">
            We architect high-performance digital platforms using enterprise-grade technologies for sub-second speeds, bank-grade security, and 24/7 reliability.
          </p>

          {/* Interactive Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {categories.map((c) => {
              const isActive = activeFilter === c.value;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => {
                    setActiveFilter(c.value);
                    setShowAllMobile(false);
                  }}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20 scale-102"
                      : "bg-[#F8FAFC] text-[#5F6368] hover:text-[#111111] border border-[#E5E7EB] hover:border-[#2563EB]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sleek 2-Column Mobile & 4-Column Desktop Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-7xl mx-auto">
          {displayedTechnologies.map((tech) => (
            <div
              key={tech.id}
              className={`group relative rounded-2xl p-3 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 border ${
                tech.highlighted
                  ? "bg-gradient-to-br sm:bg-gradient-to-r from-[#EFF6FF]/90 via-white to-[#DBEAFE]/40 border-[#2563EB]/40 shadow-2xs hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/10 hover:-translate-y-1"
                  : "bg-white border-[#E5E7EB] shadow-2xs hover:border-[#2563EB]/60 hover:shadow-lg hover:shadow-[#2563EB]/5 hover:-translate-y-1"
              }`}
            >
              {/* Logo Badge Icon from SimpleIcons Official CDN */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border p-2.5 flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform ${
                  tech.bgColor || "bg-[#F8FAFC] border-[#E5E7EB]"
                }`}
              >
                <img
                  src={tech.iconUrl}
                  alt={`${tech.name} logo`}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Tech Title & Badges */}
              <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 grow w-full">
                <h3 className="text-xs sm:text-base font-extrabold text-[#111111] tracking-tight group-hover:text-[#2563EB] transition-colors truncate">
                  {tech.name}
                </h3>

                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-1.5 sm:px-2 py-0.5 rounded-md self-start truncate max-w-full">
                  {tech.badge}
                </span>

                {/* Metric Status Pill */}
                <div className="flex items-center gap-1 mt-0.5 text-[9px] sm:text-[10px] font-mono font-semibold text-slate-500 truncate max-w-full">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2563EB] shrink-0" />
                  <span className="truncate">{tech.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Show More Button on Mobile */}
        {activeFilter === "All" && filteredTechnologies.length > 8 && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="px-6 py-2.5 rounded-full border border-[#2563EB]/30 bg-[#EFF6FF] text-[#2563EB] hover:bg-[#2563EB] hover:text-white text-xs font-extrabold transition-all duration-200 shadow-2xs flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>
                {showAllMobile
                  ? "Collapse Stack ↑"
                  : `Show All 24 Technologies (${filteredTechnologies.length - 8} More) ↓`}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllMobile ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        {/* Bottom Technology Standards Banner */}
        <div className="mt-10 sm:mt-16 max-w-5xl mx-auto rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4 sm:p-6 flex flex-wrap items-center justify-around gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
            <span>100% Type-Safe TypeScript</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
            <span>Sub-100ms Global CDN Speed</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
            <span>24/7 Enterprise Security</span>
          </div>
        </div>

      </Container>
    </section>
  );
}
