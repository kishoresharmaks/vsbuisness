"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  LucideIcon,
} from "lucide-react";

interface CategoryOption {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  estimatedTimeline: string;
  speedRating: string;
  deliverables: string[];
}

export function ProjectSelector() {
  const categories: CategoryOption[] = [
    {
      id: "ecommerce",
      label: "E-Commerce",
      icon: ShoppingBag,
      title: "Multi-Vendor Stores & D2C Commerce",
      description:
        "High-conversion online storefronts engineered with instant cart checkout, seller store portals, inventory sync, and Razorpay/Stripe integration.",
      estimatedTimeline: "2 - 3 Weeks",
      speedRating: "99/100 PageSpeed",
      deliverables: ["Custom Storefront UI", "Admin Management Panel", "Sub-Second Cart Load"],
    },
    {
      id: "enterprise",
      label: "Enterprise Systems",
      icon: Building2,
      title: "Smart Coworking & B2B Supply Portals",
      description:
        "Real-time reactive booking portals, interactive 2D desk floor maps, automated QR code entry billing, and B2B customer ledgers.",
      estimatedTimeline: "3 - 4 Weeks",
      speedRating: "100/100 Reliability",
      deliverables: ["Collision-Free Scheduler", "Real-Time Push Sync", "POS Ledger Portal"],
    },
    {
      id: "ai-platforms",
      label: "AI & Web Platforms",
      icon: Sparkles,
      title: "AI NLP Translators & Smart Assistants",
      description:
        "Intelligent AI query tools converting plain English into database charts, 24/7 AI tutor bots, and offline-first PWA applications.",
      estimatedTimeline: "2 - 4 Weeks",
      speedRating: "<100ms AI Latency",
      deliverables: ["LLM Assistant Gateway", "Automated Analytics", "24/7 Bot Automation"],
    },
    {
      id: "websites",
      label: "Websites",
      icon: Globe,
      title: "High-Performance Modern Marketing Sites",
      description:
        "Fast, responsive marketing showcase sites built with fluid typography, sub-second page loads, and Google SEO architecture.",
      estimatedTimeline: "1 - 2 Weeks",
      speedRating: "100/100 Core Web Vitals",
      deliverables: ["Custom Brand UI/UX", "Google Indexing Setup", "Sub-Second Load Times"],
    },
    {
      id: "custom",
      label: "Custom Software",
      icon: Cpu,
      title: "Tailored Business Software & Microservices",
      description:
        "Bespoke software solutions, high-throughput microservice APIs, and automated workflow orchestrations built around your specific business rules.",
      estimatedTimeline: "3 - 5 Weeks",
      speedRating: "99.99% Uptime",
      deliverables: ["Microservice Architecture", "Role-Based Access", "24/7 Cloud Edge Infra"],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryOption>(categories[0]);

  const handleBuildClick = () => {
    // Map selector category ID to ProjectBuilder projectType
    const typeMap: { [key: string]: { projectType: string; features: string[] } } = {
      ecommerce: {
        projectType: "E-commerce",
        features: ["responsive", "seo", "speed", "payments", "cms"],
      },
      enterprise: {
        projectType: "Custom Software",
        features: ["responsive", "cms", "database", "security", "speed"],
      },
      "ai-platforms": {
        projectType: "Web App",
        features: ["responsive", "seo", "speed", "database", "security"],
      },
      websites: {
        projectType: "Website",
        features: ["responsive", "seo", "speed", "whatsapp"],
      },
      custom: {
        projectType: "Custom Software",
        features: ["responsive", "database", "security", "cms", "speed"],
      },
    };

    const mapped = typeMap[activeCategory.id] || {
      projectType: "Website",
      features: ["responsive", "seo", "speed"],
    };

    // Dispatch custom event to ProjectBuilder
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("selectProjectScope", {
          detail: {
            projectType: mapped.projectType,
            title: activeCategory.title,
            description: `${activeCategory.title} — ${activeCategory.description}`,
            features: mapped.features,
          },
        })
      );
    }

    // Smooth scroll down to ProjectBuilder form
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
              <span>Swipe or click a category</span>
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
                  onClick={() => setActiveCategory(cat)}
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

          {/* Clean Contextual Scope Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-7 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 items-stretch shadow-2xs text-left"
            >
              
              {/* Left Column: Scope Overview */}
              <div className="flex flex-col gap-3 max-w-xl grow justify-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight leading-snug">
                    {activeCategory.title}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed font-medium">
                  {activeCategory.description}
                </p>
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
                  <span>Build this project</span>
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
