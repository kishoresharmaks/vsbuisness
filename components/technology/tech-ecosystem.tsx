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
  Globe,
  Lock,
  Terminal,
  Activity,
  CheckCircle2,
  Database,
  Cloud,
  Server,
  Code2,
  Box,
  Key,
  Bot,
  CreditCard,
  Layout,
  GitBranch,
  ChevronDown,
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  badge: string;
  category: "Frontend & Speed" | "Backend & AI" | "Database & Cloud" | "Security & Payments";
  metric: string;
  highlighted?: boolean;
  logo: React.ReactNode;
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
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask_next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
              <circle cx="90" cy="90" r="90" fill="black" />
            </mask>
            <g mask="url(#mask_next)">
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
      name: "React 19",
      badge: "Concurrent Engine",
      category: "Frontend & Speed",
      metric: "Zero-Lag UI Render",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#082F49] flex items-center justify-center border border-[#0284C7]/30 text-[#38BDF8] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4.5" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4.5" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4.5" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="7.5" fill="#38BDF8" />
          </svg>
        </div>
      ),
    },
    {
      id: "typescript",
      name: "TypeScript 5",
      badge: "Type Safety",
      category: "Frontend & Speed",
      metric: "Bank-Grade Reliability",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#3178C6] flex items-center justify-center text-white font-mono font-extrabold text-lg sm:text-xl shadow-xs shrink-0">
          TS
        </div>
      ),
    },
    {
      id: "tailwind",
      name: "Tailwind CSS v4",
      badge: "Utility Styling",
      category: "Frontend & Speed",
      metric: "100% Mobile Responsive",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-[#06B6D4]/30 text-[#06B6D4] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="currentColor">
            <path d="M26 38c5-10 13-14 24-12 7 1 12 6 15 11 4 7 8 10 17 9 7-1 12-6 15-16-5 10-13 14-24 12-7-1-12-6-15-11-4-7-8-10-17-9-7 1-12 6-15 16zm-12 26c5-10 13-14 24-12 7 1 12 6 15 11 4 7 8 10 17 9 7-1 12-6 15-16-5 10-13 14-24 12-7-1-12-6-15-11-4-7-8-10-17-9-7 1-12 6-15 16z" />
          </svg>
        </div>
      ),
    },
    {
      id: "figma",
      name: "Figma",
      badge: "Design Systems",
      category: "Frontend & Speed",
      metric: "Pixel-Perfect UX",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E1B4B] flex items-center justify-center border border-purple-500/30 text-purple-300 shadow-xs shrink-0">
          <Layout className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
        </div>
      ),
    },

    // --- Backend & AI ---
    {
      id: "nodejs",
      name: "Node.js 22",
      badge: "Async Runtime",
      category: "Backend & AI",
      metric: "<10ms Server Response",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#064E3B] flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-mono font-bold shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 15L85 35V75L50 95L15 75V35L50 15Z" fill="none" stroke="currentColor" strokeWidth="6" />
            <path d="M50 35V65M35 42.5L65 57.5M65 42.5L35 57.5" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>
      ),
    },
    {
      id: "python",
      name: "Python 3.12",
      badge: "AI & Data Science",
      category: "Backend & AI",
      metric: "Machine Learning API",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E3A8A] flex items-center justify-center border border-blue-500/30 text-blue-300 shadow-xs shrink-0">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        </div>
      ),
    },
    {
      id: "openai",
      name: "OpenAI & Claude AI",
      badge: "LLM Orchestration",
      category: "Backend & AI",
      metric: "Smart Bots",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#111827] flex items-center justify-center border border-emerald-400/40 text-emerald-300 shadow-xs shrink-0">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
        </div>
      ),
    },
    {
      id: "graphql",
      name: "GraphQL & REST",
      badge: "API Gateways",
      category: "Backend & AI",
      metric: "Modular Endpoint Sync",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#701A75] flex items-center justify-center border border-fuchsia-500/30 text-fuchsia-300 shadow-xs shrink-0">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-300" />
        </div>
      ),
    },
    {
      id: "websockets",
      name: "WebSockets",
      badge: "Realtime Push",
      category: "Backend & AI",
      metric: "Sub-Second Sync",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#4C1D95] flex items-center justify-center border border-purple-500/30 text-purple-300 shadow-xs shrink-0">
          <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
        </div>
      ),
    },

    // --- Database & Cloud ---
    {
      id: "postgresql",
      name: "PostgreSQL 16",
      badge: "ACID Database",
      category: "Database & Cloud",
      metric: "99.999% Data Safety",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E3A8A] flex items-center justify-center text-white border border-blue-400/30 shadow-xs shrink-0">
          <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200" />
        </div>
      ),
    },
    {
      id: "mongodb",
      name: "MongoDB Atlas",
      badge: "NoSQL Documents",
      category: "Database & Cloud",
      metric: "High Scalability",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#064E3B] flex items-center justify-center border border-emerald-500/30 text-emerald-400 shadow-xs shrink-0">
          <Server className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
        </div>
      ),
    },
    {
      id: "prisma",
      name: "Prisma ORM",
      badge: "Type-Safe Queries",
      category: "Database & Cloud",
      metric: "Auto Migrations",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-slate-700 text-teal-400 shadow-xs shrink-0">
          <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
        </div>
      ),
    },
    {
      id: "redis",
      name: "Redis Cache",
      badge: "In-Memory Store",
      category: "Database & Cloud",
      metric: "Sub-Millisecond",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#7F1D1D] flex items-center justify-center border border-red-500/30 text-red-300 shadow-xs shrink-0">
          <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-red-300" />
        </div>
      ),
    },
    {
      id: "cloudflare",
      name: "Cloudflare Edge",
      badge: "Global CDN",
      category: "Database & Cloud",
      metric: "250+ Edge Cities",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#7C2D12] flex items-center justify-center border border-amber-500/30 text-amber-400 shadow-xs shrink-0">
          <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
        </div>
      ),
    },
    {
      id: "aws",
      name: "AWS Cloud",
      badge: "S3, EC2 & Lambda",
      category: "Database & Cloud",
      metric: "Enterprise Infra",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E293B] flex items-center justify-center border border-amber-500/30 text-amber-300 shadow-xs shrink-0">
          <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
        </div>
      ),
    },
    {
      id: "vercel",
      name: "Vercel",
      badge: "Serverless Edge",
      category: "Database & Cloud",
      metric: "Instant Deploy",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black flex items-center justify-center border border-slate-800 text-white shadow-xs shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 75 65">
            <path d="M37.5 0L75 65H0L37.5 0Z" />
          </svg>
        </div>
      ),
    },
    {
      id: "docker",
      name: "Docker & K8s",
      badge: "Containerization",
      category: "Database & Cloud",
      metric: "Zero Downtime",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white shadow-xs shrink-0">
          <Box className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      ),
    },
    {
      id: "supabase",
      name: "Supabase",
      badge: "Realtime Postgres",
      category: "Database & Cloud",
      metric: "Row Level Security",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#065F46] flex items-center justify-center border border-emerald-400/30 text-emerald-300 shadow-xs shrink-0">
          <Database className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
        </div>
      ),
    },

    // --- Security & Payments ---
    {
      id: "stripe",
      name: "Stripe & UPI",
      badge: "Payment Checkout",
      category: "Security & Payments",
      metric: "PCI-DSS Level 1",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#312E81] flex items-center justify-center border border-indigo-500/30 text-indigo-300 shadow-xs shrink-0">
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300" />
        </div>
      ),
    },
    {
      id: "razorpay",
      name: "Razorpay",
      badge: "Indian Payments",
      category: "Security & Payments",
      metric: "UPI & Netbanking",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white shadow-xs shrink-0">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      ),
    },
    {
      id: "auth0",
      name: "Auth0 & OAuth 2.0",
      badge: "Identity Auth",
      category: "Security & Payments",
      metric: "2FA & SSO",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E293B] flex items-center justify-center border border-slate-700 text-slate-200 shadow-xs shrink-0">
          <Key className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        </div>
      ),
    },
    {
      id: "git",
      name: "Git & Actions",
      badge: "CI/CD Pipeline",
      category: "Security & Payments",
      metric: "Auto Test Build",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-slate-800 text-amber-500 shadow-xs shrink-0">
          <GitBranch className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
        </div>
      ),
    },
    {
      id: "nginx",
      name: "Linux & Nginx",
      badge: "Reverse Proxy",
      category: "Security & Payments",
      metric: "DDoS Mitigation",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#064E3B] flex items-center justify-center border border-emerald-600/30 text-emerald-400 shadow-xs shrink-0">
          <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
        </div>
      ),
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
              {/* Logo Badge Icon */}
              {tech.logo}

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
