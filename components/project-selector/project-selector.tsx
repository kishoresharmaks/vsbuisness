"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/typography";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  ShoppingBag,
  Building2,
  Globe,
  Cpu,
  Clock,
  Zap,
  ShieldCheck,
  Code2,
  Check,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

interface CategoryOption {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  estimatedTimeline: string;
  speedRating: string;
  techStack: string[];
  features: string[];
  deliverables: string[];
}

export function ProjectSelector() {
  const categories: CategoryOption[] = [
    {
      id: "ecommerce",
      label: "E-Commerce",
      icon: ShoppingBag,
      title: "Multi-Vendor Stores & D2C Commerce",
      subtitle: "High-Conversion Storefronts & Seller Portals",
      description:
        "Engineered for high conversion with instant cart checkout, seller store dashboards, automated inventory sync, and Stripe/Razorpay integration.",
      estimatedTimeline: "2 - 3 Weeks",
      speedRating: "99/100 PageSpeed",
      techStack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Razorpay", "Tailwind v4"],
      features: ["Multi-Vendor Marketplace", "Instant UPI & Stripe Checkout", "Inventory & Order Sync"],
      deliverables: ["Custom Storefront UI", "Admin Management Panel", "Sub-Second Cart Load"],
    },
    {
      id: "enterprise",
      label: "Enterprise Systems",
      icon: Building2,
      title: "Smart Coworking & B2B Supply Portals",
      subtitle: "Real-Time Booking & Ledger Management",
      description:
        "Real-time reactive booking engines, interactive 2D desk floor maps, collision-free scheduling, and automated B2B customer ledgers.",
      estimatedTimeline: "3 - 4 Weeks",
      speedRating: "100/100 Reliability",
      techStack: ["Next.js", "TypeScript", "Socket.io", "PostgreSQL", "Prisma", "Express"],
      features: ["Interactive 2D Desk Map", "Automated QR Billing", "B2B Ledger System"],
      deliverables: ["Collision-Free Scheduler", "Real-Time Push Sync", "POS Ledger Portal"],
    },
    {
      id: "ai-platforms",
      label: "AI & Web Platforms",
      icon: Sparkles,
      title: "AI NLP Translators & Smart Assistants",
      subtitle: "Intelligent Generative AI & Vector Search",
      description:
        "Intelligent AI query tools converting plain English into database charts, 24/7 AI tutor bots, and offline-first PWA applications.",
      estimatedTimeline: "2 - 4 Weeks",
      speedRating: "<100ms AI Latency",
      techStack: ["React 19", "TypeScript", "Node.js", "OpenAI / Claude AI", "Recharts", "PWA"],
      features: ["Plain English AI Query", "Dynamic Chart Generator", "Offline-First Storage"],
      deliverables: ["LLM Assistant Gateway", "Automated Analytics", "24/7 Bot Automation"],
    },
    {
      id: "websites",
      label: "Websites",
      icon: Globe,
      title: "High-Performance Modern Marketing Sites",
      subtitle: "Sub-Second Speeds & Maximum Search Visibility",
      description:
        "Fast, responsive marketing showcase sites built with fluid typography, sub-second page loads, and Google SEO architecture.",
      estimatedTimeline: "1 - 2 Weeks",
      speedRating: "100/100 Core Web Vitals",
      techStack: ["Next.js App Router", "Tailwind CSS", "TypeScript", "Framer Motion", "Headless CMS"],
      features: ["Fluid Responsive UX", "Structured JSON-LD Schema", "CMS Content Controls"],
      deliverables: ["Custom Brand UI/UX", "Google Indexing Setup", "Sub-Second Load Times"],
    },
    {
      id: "custom",
      label: "Custom Software",
      icon: Cpu,
      title: "Tailored Business Software & Microservices",
      subtitle: "Bespoke Enterprise Systems & APIs",
      description:
        "Bespoke software solutions, high-throughput microservice APIs, and automated workflow orchestrations built around your specific business rules.",
      estimatedTimeline: "3 - 5 Weeks",
      speedRating: "99.99% Uptime",
      techStack: ["TypeScript", "Node.js", "Prisma ORM", "PostgreSQL", "Cloudflare Edge", "AWS"],
      features: ["Custom Business Workflows", "High-Speed REST/GraphQL", "Bank-Grade Encryption"],
      deliverables: ["Microservice Architecture", "Role-Based Access", "24/7 Cloud Edge Infra"],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryOption>(categories[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: boolean }>({
    "0": true,
    "1": true,
    "2": true,
  });

  const toggleFeature = (index: number) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleBuildClick = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mt-6 mb-8">
      <div className="bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
        
        {/* Subtle Ambient Glowing Background Vector */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-[#2563EB]/20 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#DBEAFE]">
                    INTERACTIVE SCOPE BUILDER
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#111111] tracking-tight leading-tight mt-1">
                  What are you building with VS Business Solutions?
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5F6368] font-mono shrink-0 bg-white border border-[#E5E7EB] px-3.5 py-1.5 rounded-full shadow-2xs self-start sm:self-auto">
              <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Select scope category below</span>
            </div>
          </div>

          {/* Interactive Category Tabs Track */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-2 px-2 scrollbar-none snap-x">
            {categories.map((cat) => {
              const isActive = activeCategory.id === cat.id;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedFeatures({ "0": true, "1": true, "2": true });
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer snap-start flex items-center gap-2 ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25 scale-102"
                      : "bg-white text-[#5F6368] hover:text-[#111111] border border-[#E5E7EB] hover:border-[#2563EB]"
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? "text-white" : "text-[#2563EB]"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Contextual Scope Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-7 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 items-stretch shadow-2xs text-left"
            >
              
              {/* Left Column: Scope Details & Feature Checkboxes */}
              <div className="flex flex-col gap-4 max-w-2xl grow justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#2563EB] uppercase tracking-wider bg-[#EFF6FF] px-2 py-0.5 rounded-md">
                      {activeCategory.subtitle}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight leading-snug">
                    {activeCategory.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed mt-2 font-medium">
                    {activeCategory.description}
                  </p>
                </div>

                {/* Interactive Feature Selectors */}
                <div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Included Features & Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeCategory.features.map((feat, idx) => {
                      const isChecked = selectedFeatures[idx] !== false;
                      return (
                        <div
                          key={feat}
                          onClick={() => toggleFeature(idx)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                            isChecked
                              ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB] shadow-2xs"
                              : "bg-slate-50 border-slate-200 text-slate-400 line-through opacity-70"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                              isChecked
                                ? "bg-[#2563EB] border-[#2563EB] text-white"
                                : "bg-white border-slate-300"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="truncate">{feat}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-2 border-t border-[#E5E7EB]/70">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Architected With:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCategory.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-mono font-semibold text-slate-700 py-1 px-3 rounded-full shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Live Timeline, Metrics & CTA */}
              <div className="flex flex-col justify-between gap-5 min-w-[260px] lg:w-[280px] bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl shrink-0">
                
                <div className="flex flex-col gap-4">
                  {/* Estimated Timeline */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                      <Clock className="w-4 h-4 text-[#2563EB]" />
                      <span>Estimated Timeline</span>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#DBEAFE]">
                      {activeCategory.estimatedTimeline}
                    </span>
                  </div>

                  {/* Performance / Speed Rating */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                      <Zap className="w-4 h-4 text-[#2563EB]" />
                      <span>Speed Benchmark</span>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {activeCategory.speedRating}
                    </span>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Key Deliverables:
                    </span>
                    <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-800">
                      {activeCategory.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Build Button CTA */}
                <button
                  type="button"
                  onClick={handleBuildClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-extrabold transition-all duration-200 shadow-md shadow-[#2563EB]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Build this project →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
