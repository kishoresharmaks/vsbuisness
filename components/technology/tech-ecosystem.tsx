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
  Bot,
  Cloud,
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
  fallback: React.ReactNode;
}

function TechLogoImage({ name, iconUrl, fallback }: { name: string; iconUrl: string; fallback: React.ReactNode }) {
  const [error, setError] = useState(false);

  if (error) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={iconUrl}
      alt={`${name} logo`}
      onError={() => setError(true)}
      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
      loading="lazy"
    />
  );
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
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-black" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="64" fill="black" />
          <path d="M100 100L48 36H36v56h12V52l42 50h10V36h-12v64z" fill="white" />
        </svg>
      ),
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
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" viewBox="0 0 100 100" fill="none" stroke="#38BDF8" strokeWidth="5">
          <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="7" fill="#38BDF8" stroke="none" />
        </svg>
      ),
    },
    {
      id: "typescript",
      name: "TypeScript 5",
      badge: "Type Safety",
      category: "Frontend & Speed",
      metric: "Bank-Grade Reliability",
      iconUrl: "https://cdn.simpleicons.org/typescript/3178C6",
      bgColor: "bg-[#3178C6]/10 border-[#3178C6]/30",
      fallback: <span className="font-mono font-black text-xs text-[#3178C6]">TS</span>,
    },
    {
      id: "tailwind",
      name: "Tailwind CSS v4",
      badge: "Utility Styling",
      category: "Frontend & Speed",
      metric: "100% Mobile Responsive",
      iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      bgColor: "bg-[#06B6D4]/10 border-[#06B6D4]/30",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#06B6D4]" viewBox="0 0 24 24">
          <path d="M12 6c-3.3 0-5.5 1.7-6.6 5 1.1-1.7 2.5-2.2 4.1-1.7 1 .3 1.7 1 2.5 1.8C13.2 12.3 14.8 14 18.6 14c3.3 0 5.5-1.7 6.6-5-1.1 1.7-2.5 2.2-4.1 1.7-1-.3-1.7-1-2.5-1.8C17.4 7.7 15.8 6 12 6zM5.4 14c-3.3 0-5.5 1.7-6.6 5 1.1-1.7 2.5-2.2 4.1-1.7 1 .3 1.7 1 2.5 1.8C6.6 20.3 8.2 22 12 22c3.3 0 5.5-1.7 6.6-5-1.1 1.7-2.5 2.2-4.1 1.7-1-.3-1.7-1-2.5-1.8C10.8 15.7 9.2 14 5.4 14z" />
        </svg>
      ),
    },
    {
      id: "figma",
      name: "Figma",
      badge: "Design Systems",
      category: "Frontend & Speed",
      metric: "Pixel-Perfect UX",
      iconUrl: "https://cdn.simpleicons.org/figma/F24E1E",
      bgColor: "bg-purple-50 border-purple-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
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
      iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      bgColor: "bg-emerald-50 border-emerald-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#5FA04E]" viewBox="0 0 24 24">
          <path d="M12 1.8L2.5 7.3v10.9L12 23.7l9.5-5.5V7.3L12 1.8zm0 2.5l7.3 4.2v8.4L12 21.1 4.7 16.9V8.5L12 4.3z" />
        </svg>
      ),
    },
    {
      id: "python",
      name: "Python 3.12",
      badge: "AI & Data Science",
      category: "Backend & AI",
      metric: "Machine Learning API",
      iconUrl: "https://cdn.simpleicons.org/python/3776AB",
      bgColor: "bg-blue-50 border-blue-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2c-5.5 0-5.2 2.4-5.2 2.4v2.5h5.3v.7H4.4S1.2 7.3 1.2 12.8c0 5.5 2.8 5.3 2.8 5.3h1.7v-2.4s-.1-2.8 2.9-2.8h5.3s2.7 0 2.7-2.6V4.4S17.4 2 11.9 2zm-3 1.7a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="#3776AB" />
          <path d="M12.1 22c5.5 0 5.2-2.4 5.2-2.4v-2.5h-5.3v-.7h7.6s3.2.3 3.2-5.2c0-5.5-2.8-5.3-2.8-5.3h-1.7v2.4s.1 2.8-2.9 2.8h-5.3s-2.7 0-2.7 2.6v8.2s-.8 2.4 4.7 2.4zm3-1.7a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#FFD43B" />
        </svg>
      ),
    },
    {
      id: "openai",
      name: "OpenAI & Claude AI",
      badge: "LLM Orchestration",
      category: "Backend & AI",
      metric: "Smart Bots",
      highlighted: true,
      iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
      bgColor: "bg-emerald-50 border-emerald-300",
      fallback: (
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#10A37F] text-white flex items-center justify-center font-bold">
          <Bot className="w-4 h-4 text-white" />
        </div>
      ),
    },
    {
      id: "graphql",
      name: "GraphQL & REST",
      badge: "API Gateways",
      category: "Backend & AI",
      metric: "Modular Endpoint Sync",
      iconUrl: "https://cdn.simpleicons.org/graphql/E535AB",
      bgColor: "bg-fuchsia-50 border-fuchsia-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#E535AB]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" />
          <circle cx="12" cy="2" r="1.5" fill="#E535AB" />
        </svg>
      ),
    },
    {
      id: "websockets",
      name: "WebSockets",
      badge: "Realtime Push",
      category: "Backend & AI",
      metric: "Sub-Second Sync",
      iconUrl: "https://cdn.simpleicons.org/socketdotio/010101",
      bgColor: "bg-purple-50 border-purple-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#A855F7]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#A855F7" />
        </svg>
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
      iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
      bgColor: "bg-blue-50 border-blue-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#336791]" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 14.5v-5h2v5h-2zm-3-3v-2h8v2h-8z" />
        </svg>
      ),
    },
    {
      id: "mongodb",
      name: "MongoDB Atlas",
      badge: "NoSQL Documents",
      category: "Database & Cloud",
      metric: "High Scalability",
      iconUrl: "https://cdn.simpleicons.org/mongodb/47A248",
      bgColor: "bg-emerald-50 border-emerald-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#47A248]" viewBox="0 0 24 24">
          <path d="M12 2C11.5 5 5 10 5 15.5 5 19.5 8 22 12 22s7-2.5 7-6.5C19 10 12.5 5 12 2zm0 18c-3 0-5-2-5-5 0-4 4-8 5-11 1 3 5 7 5 11 0 3-2 5-5 5z" />
        </svg>
      ),
    },
    {
      id: "prisma",
      name: "Prisma ORM",
      badge: "Type-Safe Queries",
      category: "Database & Cloud",
      metric: "Auto Migrations",
      iconUrl: "https://cdn.simpleicons.org/prisma/2DD4BF",
      bgColor: "bg-teal-50 border-teal-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#2DD4BF]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polygon points="12 2 2 22 22 22" />
        </svg>
      ),
    },
    {
      id: "redis",
      name: "Redis Cache",
      badge: "In-Memory Store",
      category: "Database & Cloud",
      metric: "Sub-Millisecond",
      iconUrl: "https://cdn.simpleicons.org/redis/DC382D",
      bgColor: "bg-red-50 border-red-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#DC382D]" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l6.5 3.3L12 11.5 5.5 8.3 12 5z" />
        </svg>
      ),
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
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#F38020]" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      ),
    },
    {
      id: "aws",
      name: "AWS Cloud",
      badge: "S3, EC2 & Lambda",
      category: "Database & Cloud",
      metric: "Enterprise Infra",
      iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonwebservices.svg",
      bgColor: "bg-orange-50 border-orange-200",
      fallback: (
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#FF9900] text-slate-900 flex items-center justify-center font-bold">
          <Cloud className="w-4 h-4 text-slate-900" />
        </div>
      ),
    },
    {
      id: "vercel",
      name: "Vercel",
      badge: "Serverless Edge",
      category: "Database & Cloud",
      metric: "Instant Deploy",
      iconUrl: "https://cdn.simpleicons.org/vercel/000000",
      bgColor: "bg-slate-100 border-slate-300",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-black" viewBox="0 0 24 24">
          <polygon points="12 2 24 22 0 22" />
        </svg>
      ),
    },
    {
      id: "docker",
      name: "Docker & K8s",
      badge: "Containerization",
      category: "Database & Cloud",
      metric: "Zero Downtime",
      iconUrl: "https://cdn.simpleicons.org/docker/2496ED",
      bgColor: "bg-sky-50 border-sky-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#2496ED]" viewBox="0 0 24 24">
          <path d="M13 4h3v3h-3V4zm-4 0h3v3H9V4zm-4 4h3v3H5V8zm4 0h3v3H9V8zm4 0h3v3h-3V8zm4 0h3v3h-3V8zm-12 4h3v3H5v-3zm4 0h3v3H9v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3z" />
        </svg>
      ),
    },
    {
      id: "supabase",
      name: "Supabase",
      badge: "Realtime Postgres",
      category: "Database & Cloud",
      metric: "Row Level Security",
      iconUrl: "https://cdn.simpleicons.org/supabase/3ECF8E",
      bgColor: "bg-emerald-50 border-emerald-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#3ECF8E]" viewBox="0 0 24 24">
          <path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z" />
        </svg>
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
      iconUrl: "https://cdn.simpleicons.org/stripe/635BFF",
      bgColor: "bg-indigo-50 border-indigo-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#635BFF]" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="3" fill="none" stroke="#635BFF" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "razorpay",
      name: "Razorpay",
      badge: "Indian Payments",
      category: "Security & Payments",
      metric: "UPI & Netbanking",
      iconUrl: "https://cdn.simpleicons.org/razorpay/0284C7",
      bgColor: "bg-sky-50 border-sky-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#0284C7]" viewBox="0 0 24 24">
          <path d="M7 21L14 3h6L13 21H7z" />
        </svg>
      ),
    },
    {
      id: "auth0",
      name: "Auth0 & OAuth 2.0",
      badge: "Identity Auth",
      category: "Security & Payments",
      metric: "2FA & SSO",
      iconUrl: "https://cdn.simpleicons.org/auth0/EB5424",
      bgColor: "bg-orange-50 border-orange-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#EB5424]" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" />
        </svg>
      ),
    },
    {
      id: "git",
      name: "Git & Actions",
      badge: "CI/CD Pipeline",
      category: "Security & Payments",
      metric: "Auto Test Build",
      iconUrl: "https://cdn.simpleicons.org/git/F05032",
      bgColor: "bg-red-50 border-red-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#F05032]" viewBox="0 0 24 24">
          <path d="M21.7 10.3l-8-8c-.4-.4-1-.4-1.4 0l-2.4 2.4 3 3c.7-.2 1.5 0 2 .6.6.6.7 1.5.3 2.2l2.9 2.9c.7-.4 1.6-.3 2.2.3.8.8.8 2.1 0 2.8s-2.1.8-2.8 0c-.6-.6-.7-1.5-.3-2.2l-2.7-2.7v6.6c.2.1.4.3.5.5.8.8.8 2.1 0 2.8s-2.1.8-2.8 0-2.1-.8 0-2.8c.3-.3.7-.5 1.1-.6V9.6c-.4-.1-.8-.3-1.1-.6-.8-.8-.8-2.1 0-2.8.6-.6 1.4-.7 2.1-.4l-3-3L2.3 10.3c-.4.4-.4 1 0 1.4l8 8c.4.4 1 .4 1.4 0l10-10c.4-.4.4-1 0-1.4z" />
        </svg>
      ),
    },
    {
      id: "nginx",
      name: "Linux & Nginx",
      badge: "Reverse Proxy",
      category: "Security & Payments",
      metric: "DDoS Mitigation",
      iconUrl: "https://cdn.simpleicons.org/nginx/009639",
      bgColor: "bg-emerald-50 border-emerald-200",
      fallback: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-[#009639]" viewBox="0 0 24 24">
          <path d="M5 3h3.6l7.4 11.2V3H19v18h-3.6L8 9.8V21H5V3z" />
        </svg>
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
              {/* Logo Badge Icon with Fail-Safe Fallback */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border p-2.5 flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform ${
                  tech.bgColor || "bg-[#F8FAFC] border-[#E5E7EB]"
                }`}
              >
                <TechLogoImage name={tech.name} iconUrl={tech.iconUrl} fallback={tech.fallback} />
              </div>

              {/* Tech Title & Badges */}
              <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 grow w-full">
                <span className="block text-xs sm:text-base font-extrabold text-[#111111] tracking-tight group-hover:text-[#2563EB] transition-colors truncate">
                  {tech.name}
                </span>

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
