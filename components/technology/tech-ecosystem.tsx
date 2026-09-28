"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionVectors } from "@/components/ui/bg-vectors";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpRight,
  Database,
  Globe,
  Lock,
  Terminal,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  version?: string;
  category: "Frontend & Speed" | "Backend & APIs" | "Database & Cloud" | "Security & Payments";
  description: string;
  metric: string;
  highlighted?: boolean;
  spanCol?: string; // Tailwind grid span e.g. "col-span-1 md:col-span-2"
  logo: React.ReactNode;
}

export function TechEcosystem() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = [
    { label: "All Ecosystem", value: "All" },
    { label: "Frontend & Speed", value: "Frontend & Speed" },
    { label: "Backend & APIs", value: "Backend & APIs" },
    { label: "Database & Cloud", value: "Database & Cloud" },
    { label: "Security & Payments", value: "Security & Payments" },
  ];

  const technologies: TechItem[] = [
    {
      id: "nextjs",
      name: "Next.js",
      version: "16+",
      category: "Frontend & Speed",
      description: "App Router, React Server Components & sub-second page rendering optimized for Google SEO.",
      metric: "100/100 Core Web Vitals",
      highlighted: true,
      spanCol: "col-span-1 md:col-span-2",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
              <circle cx="90" cy="90" r="90" fill="black" />
            </mask>
            <g mask="url(#mask0)">
              <circle cx="90" cy="90" r="90" fill="black" />
              <path d="M149.508 157.52L69.143 54H54V125.97H66.8136V69.215L138.864 162.616C142.619 161.087 146.184 159.38 149.508 157.52Z" fill="white" />
              <path d="M115 54H127.814V126H115V54Z" fill="white" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      id: "react",
      name: "React",
      version: "19",
      category: "Frontend & Speed",
      description: "Concurrent rendering, client state management, and fluid UI micro-interactions.",
      metric: "Zero-Lag User UI",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#082F49] flex items-center justify-center border border-[#0284C7]/30 text-[#38BDF8] shadow-xs shrink-0">
          <svg className="w-6 h-6 animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="7" fill="#38BDF8" />
          </svg>
        </div>
      ),
    },
    {
      id: "typescript",
      name: "TypeScript",
      version: "5.x",
      category: "Frontend & Speed",
      description: "Strict end-to-end type safety preventing runtime errors and ensuring code reliability.",
      metric: "Bank-Grade Stability",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#3178C6] flex items-center justify-center text-white font-mono font-bold text-lg shadow-xs shrink-0">
          TS
        </div>
      ),
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      version: "v4",
      category: "Frontend & Speed",
      description: "Utility-first design system with fluid typography, responsive grid & dark mode.",
      metric: "Pixel-Perfect Layouts",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center border border-[#06B6D4]/30 text-[#06B6D4] shadow-xs shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
            <path d="M26 38c5-10 13-14 24-12 7 1 12 6 15 11 4 7 8 10 17 9 7-1 12-6 15-16-5 10-13 14-24 12-7-1-12-6-15-11-4-7-8-10-17-9-7 1-12 6-15 16zm-12 26c5-10 13-14 24-12 7 1 12 6 15 11 4 7 8 10 17 9 7-1 12-6 15-16-5 10-13 14-24 12-7-1-12-6-15-11-4-7-8-10-17-9-7 1-12 6-15 16z" />
          </svg>
        </div>
      ),
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      version: "16",
      category: "Database & Cloud",
      description: "Enterprise relational database with ACID compliance, row-level security & JSONB speed.",
      metric: "99.999% Data Integrity",
      highlighted: true,
      spanCol: "col-span-1 md:col-span-2",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white border border-blue-400/30 shadow-xs shrink-0">
          <Database className="w-5 h-5 text-blue-200" />
        </div>
      ),
    },
    {
      id: "nodejs",
      name: "Node.js",
      version: "v22 LTS",
      category: "Backend & APIs",
      description: "Non-blocking event loop runtime built for scalable microservices and rapid API endpoints.",
      metric: "<15ms Server Response",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#064E3B] flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-mono font-bold shadow-xs shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 15L85 35V75L50 95L15 75V35L50 15Z" fill="none" stroke="currentColor" strokeWidth="6" />
            <path d="M50 35V65M35 42.5L65 57.5M65 42.5L35 57.5" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>
      ),
    },
    {
      id: "prisma",
      name: "Prisma ORM",
      category: "Database & Cloud",
      description: "Automated type-safe database queries, migration tracking, and relational connection pooling.",
      metric: "Instant Schema Sync",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center border border-slate-700 text-teal-400 shadow-xs shrink-0">
          <Layers className="w-5 h-5 text-teal-400" />
        </div>
      ),
    },
    {
      id: "cloudflare",
      name: "Cloudflare Edge",
      category: "Database & Cloud",
      description: "Global CDN edge network, Anycast DNS, DDoS mitigation, and SSL encryption.",
      metric: "250+ Edge Locations",
      highlighted: true,
      spanCol: "col-span-1 md:col-span-2",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#7C2D12] flex items-center justify-center border border-amber-500/30 text-amber-400 shadow-xs shrink-0">
          <Globe className="w-5 h-5 text-amber-400" />
        </div>
      ),
    },
    {
      id: "redis",
      name: "Redis",
      category: "Database & Cloud",
      description: "Ultra-fast in-memory cache, rate limiting, pub/sub queues, and live session management.",
      metric: "Sub-Millisecond Read",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#7F1D1D] flex items-center justify-center border border-red-500/30 text-red-300 font-mono font-bold shadow-xs shrink-0">
          <Cpu className="w-5 h-5 text-red-300" />
        </div>
      ),
    },
    {
      id: "payments",
      name: "Stripe & Razorpay",
      category: "Security & Payments",
      description: "Secure payment gateways, UPI integration, automated subscriptions & instant webhooks.",
      metric: "PCI-DSS Level 1",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#312E81] flex items-center justify-center border border-indigo-500/30 text-indigo-300 shadow-xs shrink-0">
          <Lock className="w-5 h-5 text-indigo-300" />
        </div>
      ),
    },
    {
      id: "graphql",
      name: "REST & WebSockets",
      category: "Backend & APIs",
      description: "Real-time bi-directional communication, push notifications, and structured API gateways.",
      metric: "Live Data Stream",
      highlighted: false,
      spanCol: "col-span-1",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#701A75] flex items-center justify-center border border-fuchsia-500/30 text-fuchsia-300 shadow-xs shrink-0">
          <Terminal className="w-5 h-5 text-fuchsia-300" />
        </div>
      ),
    },
  ];

  const filteredTechnologies =
    activeFilter === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeFilter);

  return (
    <section id="technology" className="relative py-16 sm:py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-4 sm:px-6 md:px-8">
        
        {/* Header Section matching website blue theme */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-0.5 w-6 bg-[#2563EB] rounded-full inline-block" />
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#2563EB] uppercase">
              TECHNOLOGY ECOSYSTEM
            </span>
            <span className="h-0.5 w-6 bg-[#2563EB] rounded-full inline-block" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            Built with world-class <br className="hidden sm:inline" />
            engineering <span className="text-[#2563EB]">standards.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5F6368] mt-3.5 leading-relaxed max-w-2xl">
            We architect high-performance digital platforms using enterprise-grade web technologies for sub-second speeds, bank-grade security, and zero downtime.
          </p>

          {/* Interactive Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((c) => {
              const isActive = activeFilter === c.value;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setActiveFilter(c.value)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
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

        {/* Scattered Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {filteredTechnologies.map((tech) => (
            <div
              key={tech.id}
              className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between border ${
                tech.spanCol || "col-span-1"
              } ${
                tech.highlighted
                  ? "bg-gradient-to-br from-[#EFF6FF]/70 via-white to-[#DBEAFE]/30 border-[#2563EB]/30 shadow-sm hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/10"
                  : "bg-white border-[#E5E7EB] shadow-2xs hover:border-[#2563EB]/60 hover:shadow-lg hover:shadow-[#2563EB]/5"
              }`}
            >
              {/* Background Subtle Accent Watermark */}
              <div className="absolute top-4 right-4 text-slate-100 group-hover:text-[#2563EB]/10 transition-colors pointer-events-none">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <div>
                {/* Header Row with Logo & Category Tag */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  {tech.logo}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded-full">
                    {tech.category}
                  </span>
                </div>

                {/* Tech Title & Version */}
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] tracking-tight group-hover:text-[#2563EB] transition-colors">
                    {tech.name}
                  </h3>
                  {tech.version && (
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {tech.version}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs text-[#5F6368] leading-relaxed font-medium">
                  {tech.description}
                </p>
              </div>

              {/* Bottom Performance Metric Badge Bar */}
              <div className="mt-5 pt-3.5 border-t border-[#E5E7EB]/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#2563EB]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span>{tech.metric}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Technology Standards Banner */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4 sm:p-6 flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Zap className="w-4 h-4 text-[#2563EB]" />
            <span>100% Type-Safe TypeScript</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Activity className="w-4 h-4 text-[#2563EB]" />
            <span>Sub-100ms Global CDN Speed</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span>24/7 Enterprise Encryption</span>
          </div>
        </div>

      </Container>
    </section>
  );
}
