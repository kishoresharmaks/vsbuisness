"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionVectors } from "@/components/ui/bg-vectors";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Palette,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Terminal,
  Layers,
  LucideIcon,
} from "lucide-react";

interface Deliverable {
  name: string;
  desc: string;
  badge: string;
}

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  objectives: string[];
  deliverables: Deliverable[];
  clientRole: string;
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
}

export function ProcessTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"overview" | "deliverables" | "spec">("overview");

  const steps: ProcessStep[] = [
    {
      id: "discover",
      number: "01",
      title: "DISCOVER",
      subtitle: "Strategy & Scope Roadmap",
      icon: Search,
      description:
        "We start by understanding your business goals, target audience, and project scope. We outline a transparent delivery calendar so you know exactly what is being built.",
      objectives: [
        "Clarify brand positioning & lead generation goals",
        "Define fixed scope & milestone timeline",
        "Map full website navigation & feature checklist",
      ],
      deliverables: [
        { name: "Product Strategy Blueprint", desc: "Detailed scope outlining pages & key features", badge: "Scope Locked" },
        { name: "System Architecture Map", desc: "Technical blueprint & data layout design", badge: "Tech Spec" },
        { name: "Milestone Roadmap", desc: "Clear delivery calendar with milestone dates", badge: "Timeline" },
      ],
      clientRole: "45-minute discovery kickoff & goal alignment.",
      codeSnippet: {
        filename: "01-discovery-spec.json",
        language: "json",
        code: `{
  "projectName": "VS Business Solutions Platform",
  "phase": "01_DISCOVER",
  "status": "APPROVED_SCOPE",
  "architecture": {
    "framework": "Next.js 16 (App Router)",
    "language": "TypeScript 5.x",
    "styling": "Tailwind CSS v4",
    "database": "PostgreSQL / Supabase",
    "targetLighthouseScore": 100
  },
  "deliverablesCount": 3
}`,
      },
    },
    {
      id: "design",
      number: "02",
      title: "DESIGN",
      subtitle: "Visual Design & Mobile UX",
      icon: Palette,
      description:
        "We create beautiful visual screens and interactive mobile-first design prototypes. You get to preview and approve your entire site layout before coding begins.",
      objectives: [
        "Develop custom brand color system & typography",
        "Build interactive prototypes & mobile responsive views",
        "Refine navigation flow & touch-friendly buttons",
      ],
      deliverables: [
        { name: "Interactive Figma Prototype", desc: "Pixel-perfect visual design flows for all screens", badge: "UX Approved" },
        { name: "Design System Tokens", desc: "Centralized colors, fonts, spacing & icons", badge: "Tokens Ready" },
        { name: "Mobile UX Layout Kit", desc: "Thumb-friendly mobile navigation layout", badge: "Mobile First" },
      ],
      clientRole: "Review visual prototype & provide feedback.",
      codeSnippet: {
        filename: "02-theme-tokens.ts",
        language: "typescript",
        code: `export const themeTokens = {
  colors: {
    brand: "#2563EB",
    surface: "#FFFFFF",
    surfaceMuted: "#F7F8FA",
    border: "#E5E7EB",
    textPrimary: "#111111",
    textSecondary: "#5F6368",
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
    heroTitle: "clamp(2.5rem, 5vw + 1rem, 4.25rem)",
    sectionTitle: "clamp(1.75rem, 3vw + 1rem, 2.75rem)",
  },
};`,
      },
    },
    {
      id: "build",
      number: "03",
      title: "BUILD",
      subtitle: "Coding & Speed Engineering",
      icon: Code2,
      description:
        "Our engineers build your website using Next.js 16 for sub-second load speeds, top Google Search rankings, and secure backend integrations.",
      objectives: [
        "Clean component-driven web development",
        "Sub-100ms Server-Side Rendering speed optimizations",
        "Payment gateway & database API integration",
      ],
      deliverables: [
        { name: "Production-Grade Codebase", desc: "Clean Next.js App Router website repository", badge: "Clean Code" },
        { name: "Performance Audit", desc: "Verified 95+ Google speed & accessibility scores", badge: "Fast CDN" },
        { name: "SEO Metadata Engine", desc: "Automated search engine indexing & preview meta", badge: "SEO Ready" },
      ],
      clientRole: "Test live staging environment link.",
      codeSnippet: {
        filename: "03-page-component.tsx",
        language: "tsx",
        code: `import { Suspense } from "react";
import { Hero } from "@/components/hero/hero";
import { ServicesList } from "@/components/services/services-list";

export default async function Page() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] antialiased">
      <Hero />
      <Suspense fallback={<LoadingSkeleton />}>
        <ServicesList />
      </Suspense>
    </main>
  );
}`,
      },
    },
    {
      id: "launch",
      number: "04",
      title: "LAUNCH",
      subtitle: "Going Live & Dedicated Support",
      icon: Rocket,
      description:
        "We handle domain connection, SSL security encryption, Google Search Console indexing, and provide 30 days of dedicated post-launch support.",
      objectives: [
        "Deploy to global Edge CDN with zero downtime",
        "Google Search Console & analytics setup",
        "Continuous performance monitoring & technical support",
      ],
      deliverables: [
        { name: "Live Production Site", desc: "SSL secured, CDN cached global deployment", badge: "Live URL" },
        { name: "Analytics Dashboard", desc: "Real-time traffic & page speed performance tracking", badge: "Monitored" },
        { name: "30-Day Support Warranty", desc: "Dedicated support for tweaks & bug fixes", badge: "Guaranteed" },
      ],
      clientRole: "Final sign-off & celebrate project launch!",
      codeSnippet: {
        filename: "04-deployment-config.yml",
        language: "yaml",
        code: `name: Production Deployment
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build & Run Verification
        run: npm run build
      - name: Deploy to Production CDN
        run: vercel --prod --token=\${{ secrets.VERCEL_TOKEN }}`,
      },
    },
  ];

  const currentStep = steps[activeStepIndex];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="process" className="relative py-14 sm:py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        {/* Section Header */}
        <SectionHeading
          eyebrow="OUR PROCESS"
          title="A disciplined approach to digital execution."
          subtitle="From initial strategy to production launch, every step is optimized for visual excellence, speed, and business growth."
        />

        {/* Mobile-Only Horizontal Step Bar (Only visible on small mobile screens) */}
        <div className="block md:hidden mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1 rounded-full">
              Phase {currentStep.number} of {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto snap-x scrollbar-none pb-2 -mx-3.5 px-3.5">
            {steps.map((s, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`snap-center shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                      : "bg-[#F7F8FA] text-[#5F6368] border-[#E5E7EB]"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono ${
                      isActive ? "bg-[#2563EB] text-white" : "bg-white text-[#111111] border border-[#E5E7EB]"
                    }`}
                  >
                    {s.number}
                  </span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Process Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Step Navigation Cards (Desktop 4-cols / Mobile 12-cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            {steps.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-md border-l-4 border-l-[#2563EB]"
                      : "bg-[#F7F8FA] text-[#5F6368] border-[#E5E7EB] hover:bg-white hover:border-[#2563EB]/40 hover:shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                          isActive
                            ? "bg-[#2563EB] text-white shadow-xs"
                            : "bg-white border border-[#E5E7EB] text-[#111111] group-hover:text-[#2563EB]"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div>
                        <h3
                          className={`text-base font-bold tracking-tight ${
                            isActive ? "text-white" : "text-[#111111] group-hover:text-[#2563EB]"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-xs font-medium ${
                            isActive ? "text-gray-400" : "text-[#5F6368]"
                          }`}
                        >
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Transparency Badge */}
            <div className="mt-2 p-4 rounded-2xl bg-[#2563EB]/5 border border-[#2563EB]/20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111111]">100% Transparent Execution</p>
                <p className="text-[11px] text-[#5F6368]">Weekly video demos & live staging links.</p>
              </div>
            </div>
          </div>

          {/* Right Active Step Showcase Window (Desktop 8-cols / Mobile 12-cols) */}
          <div className="md:col-span-8 bg-[#F7F8FA] border border-[#E5E7EB] rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col h-full justify-between gap-6"
              >
                {/* Header & Sub-Tab Switcher */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#E5E7EB] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-xs">
                        <StepIcon className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#2563EB]">
                            PHASE {currentStep.number} SPECIFICATION
                          </span>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                            ACTIVE
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                          {currentStep.title}: {currentStep.subtitle}
                        </h3>
                      </div>
                    </div>

                    {/* View Switcher Tabs */}
                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E7EB]">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          activeTab === "overview"
                            ? "bg-[#111111] text-white shadow-2xs"
                            : "text-[#5F6368] hover:text-[#111111]"
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab("deliverables")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          activeTab === "deliverables"
                            ? "bg-[#111111] text-white shadow-2xs"
                            : "text-[#5F6368] hover:text-[#111111]"
                        }`}
                      >
                        Deliverables
                      </button>
                      <button
                        onClick={() => setActiveTab("spec")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          activeTab === "spec"
                            ? "bg-[#111111] text-white shadow-2xs"
                            : "text-[#5F6368] hover:text-[#111111]"
                        }`}
                      >
                        Code Spec
                      </button>
                    </div>
                  </div>

                  {/* Tab 1: Overview & Objectives */}
                  {activeTab === "overview" && (
                    <div className="space-y-5">
                      <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">
                        {currentStep.description}
                      </p>

                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#2563EB]" />
                          Key Objectives & Milestones
                        </h4>
                        <ul className="space-y-2.5">
                          {currentStep.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111111] font-medium">
                              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-xl p-3.5 text-xs text-[#111111]">
                        <span className="font-semibold text-[#5F6368]">Client Commitment:</span>
                        <span className="font-bold text-[#2563EB]">{currentStep.clientRole}</span>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Key Deliverables Grid */}
                  {activeTab === "deliverables" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentStep.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col justify-between h-full gap-3 shadow-2xs hover:border-[#2563EB]/40 transition-colors"
                        >
                          <div>
                            <span className="text-[10px] font-mono font-extrabold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full inline-block mb-2">
                              {item.badge}
                            </span>
                            <h4 className="text-sm font-bold text-[#111111]">
                              {item.name}
                            </h4>
                            <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] font-bold pt-2 border-t border-[#E5E7EB]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>100% Guaranteed</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 3: Code Spec Preview */}
                  {activeTab === "spec" && (
                    <div className="bg-[#111111] text-white rounded-2xl p-4 font-mono text-xs overflow-x-auto shadow-md border border-[#222222]">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-gray-400 text-[11px]">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{currentStep.codeSnippet.filename}</span>
                        </div>
                        <span className="uppercase text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                          {currentStep.codeSnippet.language}
                        </span>
                      </div>
                      <pre className="text-gray-300 leading-relaxed overflow-x-auto whitespace-pre">
                        <code>{currentStep.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Footer Controls (Prev/Next buttons) */}
                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-4 mt-4">
                  <button
                    onClick={handlePrev}
                    disabled={activeStepIndex === 0}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      activeStepIndex === 0
                        ? "opacity-40 cursor-not-allowed bg-white border-[#E5E7EB] text-[#5F6368]"
                        : "bg-white border-[#E5E7EB] text-[#111111] hover:bg-[#EAECEF]"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Phase</span>
                  </button>

                  <div className="hidden sm:flex items-center gap-1">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeStepIndex === i ? "w-6 bg-[#2563EB]" : "bg-[#E5E7EB]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={activeStepIndex === steps.length - 1}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer ${
                      activeStepIndex === steps.length - 1
                        ? "bg-[#111111] opacity-60 cursor-not-allowed"
                        : "bg-[#2563EB] hover:bg-[#1D4ED8] shadow-xs"
                    }`}
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}


