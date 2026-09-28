"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/typography";
import { ArrowRight, CheckCircle2, Layers, Sparkles } from "lucide-react";

interface CategoryOption {
  id: string;
  label: string;
  title: string;
  description: string;
  techStack: string[];
  deliverables: string[];
}

export function ProjectSelector() {
  const categories: CategoryOption[] = [
    {
      id: "ecommerce",
      label: "E-Commerce",
      title: "Multi-Vendor Stores & D2C Commerce",
      description:
        "High-conversion online storefronts engineered with instant cart checkout, seller store portals, inventory sync, and Razorpay/Stripe integration.",
      techStack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Razorpay"],
      deliverables: ["Multi-Vendor Marketplace", "Instant Payment Verification", "Sub-second Page Load"],
    },
    {
      id: "enterprise",
      label: "Enterprise Systems",
      title: "Smart Coworking & B2B Supply Portals",
      description:
        "Real-time reactive booking portals, interactive 2D desk floor maps, automated QR code entry billing, and B2B customer ledgers.",
      techStack: ["Next.js", "TypeScript", "Socket.io", "MySQL", "MongoDB", "Express"],
      deliverables: ["Real-Time Desk Maps", "Collision-Free Schedulers", "POS Ledger System"],
    },
    {
      id: "ai-platforms",
      label: "AI & Web Platforms",
      title: "AI NLP Translators & Smart Assistants",
      description:
        "Intelligent AI query tools converting plain English to database charts, 24/7 AI homework tutors, and offline-first PWA study applications.",
      techStack: ["React", "TypeScript", "Node.js", "AI NLP", "Recharts", "IndexedDB PWA"],
      deliverables: ["Plain English AI Search", "Dynamic Chart Generator", "Offline-First Sync"],
    },
    {
      id: "websites",
      label: "Websites",
      title: "High-Performance Modern Marketing Sites",
      description:
        "Fast, responsive marketing and showcase sites crafted with Geist fluid typography, sub-second load times, and flawless search engine visibility.",
      techStack: ["Next.js App Router", "Tailwind CSS", "Framer Motion", "Headless CMS"],
      deliverables: ["Custom UI/UX", "100% Core Web Vitals", "SEO Infrastructure"],
    },
    {
      id: "custom",
      label: "Custom Software",
      title: "Tailored Business Software & Microservices",
      description:
        "Bespoke enterprise software, high-throughput APIs, and workflow orchestrations built around your specific operational business rules.",
      techStack: ["TypeScript", "Node.js", "Prisma", "PostgreSQL", "Cloudflare Edge"],
      deliverables: ["Custom Business Workflows", "Secure High-Speed APIs", "Cloud Infrastructure"],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryOption>(categories[0]);

  return (
    <div className="w-full mt-6 mb-4">
      <div className="bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#E5E7EB] rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-4">
            <div className="flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#5F6368]">
                  INTERACTIVE SCOPE BUILDER
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#111111] leading-tight">
                  What are you building with VS Business Solutions?
                </h3>
              </div>
            </div>
            <span className="text-[11px] text-[#8A8F98] hidden md:block font-mono">
              Swipe or click a category
            </span>
          </div>

          {/* Horizontal Scroll Category Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-2 px-2 scrollbar-none snap-x">
            {categories.map((cat) => {
              const isActive = activeCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer snap-start ${
                    isActive
                      ? "bg-[#111111] text-white shadow-xs"
                      : "bg-[#F7F8FA] text-[#5F6368] hover:bg-[#EAECEF] hover:text-[#111111] border border-[#E5E7EB]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Contextual Preview Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center text-left"
            >
              <div className="flex flex-col gap-2.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <h4 className="text-base sm:text-lg font-bold text-[#111111]">
                    {activeCategory.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
                  {activeCategory.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeCategory.techStack.map((tech) => (
                    <Badge key={tech} className="bg-white border-[#E5E7EB] text-[11px] font-mono text-[#111111] py-0.5 px-2.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Deliverables List & Action */}
              <div className="flex flex-col gap-3.5 min-w-[220px] w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E5E7EB] lg:pl-6">
                <ul className="flex flex-col gap-1.5 text-xs font-medium text-[#111111]">
                  {activeCategory.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="w-full">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs py-2.5 min-h-[42px]"
                    iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Build this project →
                  </Button>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
