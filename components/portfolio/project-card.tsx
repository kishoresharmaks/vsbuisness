"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import {
  ArrowRight,
  Globe,
  ShoppingBag,
  Building2,
  Cpu,
  Sparkles,
  Search,
  Check,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  Database,
  BarChart3,
  Bot,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  // Category Icon helper
  const getCategoryIcon = () => {
    switch (project.category) {
      case "E-Commerce":
        return <ShoppingBag className="w-3.5 h-3.5 text-[#FF5722]" />;
      case "Enterprise Systems":
        return <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />;
      case "AI & Web Platforms":
        return <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-[#2563EB]" />;
    }
  };

  // Custom Browser Graphic Mockup per Project
  const renderBrowserGraphic = () => {
    if (project.slug === "1handindia") {
      return (
        <div className="w-full bg-gradient-to-br from-[#FFF5F2] via-white to-[#FEEAE3] rounded-xl p-4 sm:p-5 border border-[#FEE2E2] flex flex-col gap-3 min-h-[160px] justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-slate-800 font-mono tracking-tight">1HandIndia</span>
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-slate-200 text-[10px] text-slate-500 shadow-2xs">
              <Search className="w-3 h-3 text-[#FF5722]" />
              <span>Search 10,000+ Products...</span>
            </div>
          </div>
          <div className="bg-[#FF5722] text-white p-3.5 rounded-xl shadow-xs flex flex-col gap-1 text-left">
            <span className="text-[10px] font-mono uppercase font-bold text-white/80">Multi-Vendor Marketplace</span>
            <span className="text-xs font-bold leading-tight">Everything you need, One Marketplace</span>
            <span className="text-[9px] bg-white/20 self-start px-2 py-0.5 rounded text-white font-mono font-medium mt-1">Shop Wholesale →</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-center">
            {["Mobiles", "Electronics", "Fashion", "Beauty"].map((c) => (
              <div key={c} className="bg-white p-1.5 rounded-lg border border-slate-100 text-[9px] font-bold text-slate-700 shadow-2xs">
                {c}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (project.slug === "cowork30") {
      return (
        <div className="w-full bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE] rounded-xl p-4 sm:p-5 border border-[#BFDBFE] flex flex-col gap-3 min-h-[160px] justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="font-mono text-[#2563EB]">Cowork30</span>
            <span className="text-[10px] font-mono bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full">Book Desk</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs text-left">
            <span className="text-xs font-bold text-slate-900 block">Find Your Perfect Workspace</span>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
              <span className="bg-slate-100 px-2 py-1 rounded flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#2563EB]" /> Any Location
              </span>
              <span className="bg-slate-100 px-2 py-1 rounded flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 text-[#2563EB]" /> Select Date
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-700 font-mono font-bold">
            <span>Live Floor Map</span>
            <span>🟢 14 Desks Available</span>
          </div>
        </div>
      );
    }

    if (project.slug === "indian-agri") {
      return (
        <div className="w-full bg-gradient-to-br from-[#ECFDF5] via-white to-[#D1FAE5] rounded-xl p-4 sm:p-5 border border-[#A7F3D0] flex flex-col gap-3 min-h-[160px] justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="font-mono text-[#059669]">Indian Agriculture B2B</span>
            <span className="text-[10px] bg-[#059669] text-white px-2.5 py-0.5 rounded-full font-mono">B2B Portal</span>
          </div>
          <div className="bg-[#059669] text-white p-3 rounded-xl shadow-xs text-left">
            <span className="text-xs font-bold block">Connecting Farmers with Global Markets</span>
            <span className="text-[9px] opacity-90 block mt-1">Direct Wholesale Seeds, Fertilizer &amp; Farming POS</span>
          </div>
          <div className="flex items-center justify-between text-[10px] bg-white p-2 rounded-lg border border-emerald-100 text-slate-700 font-mono font-semibold">
            <span>Verified Suppliers</span>
            <span className="text-[#059669] font-bold">10K+ Orders</span>
          </div>
        </div>
      );
    }

    if (project.slug === "beeshub") {
      return (
        <div className="w-full bg-gradient-to-br from-[#FFFBEB] via-white to-[#FEF3C7] rounded-xl p-4 sm:p-5 border border-[#FDE68A] flex flex-col gap-3 min-h-[160px] justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="font-mono text-[#D97706]">BeesHub Store</span>
            <span className="text-[10px] bg-[#D97706] text-white px-2.5 py-0.5 rounded-full font-mono">Live Color Swatches</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs text-left">
            <span className="text-xs font-bold text-slate-900 block">Interactive Variant Picker</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white shadow-2xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-white shadow-2xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white shadow-2xs" />
              <span className="text-[10px] text-slate-500 font-mono ml-1">Live Swatches</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-800 font-mono font-bold">
            <span>Slide-out Cart Drawer</span>
            <span>Fast Checkout</span>
          </div>
        </div>
      );
    }

    if (project.slug === "nl2mongo") {
      return (
        <div className="w-full bg-gradient-to-br from-[#F3E8FF] via-white to-[#E9D5FF] rounded-xl p-4 sm:p-5 border border-[#DDD6FE] flex flex-col gap-3 min-h-[160px] justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="font-mono text-[#7C3AED] flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" /> NL2Mongo AI
            </span>
            <span className="text-[10px] bg-[#7C3AED] text-white px-2 py-0.5 rounded-full font-mono">NLP Assistant</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-2xs text-left">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">PROMPT:</span>
            <span className="text-xs font-bold text-slate-800 font-mono block">&quot;Show top 5 sales this month&quot;</span>
          </div>
          <div className="flex items-center justify-between bg-purple-50 border border-purple-200 p-2 rounded-lg text-[10px] font-mono text-purple-900">
            <span className="flex items-center gap-1 font-bold">
              <BarChart3 className="w-3 h-3 text-[#7C3AED]" /> Auto Charts Generated
            </span>
            <span className="text-[#7C3AED] font-bold">Mongo Query Ready</span>
          </div>
        </div>
      );
    }

    // Default Graphic for StudyFlow
    return (
      <div className="w-full bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0E7FF] rounded-xl p-4 sm:p-5 border border-[#C7D2FE] flex flex-col gap-3 min-h-[160px] justify-between">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="font-mono text-[#4F46E5]">StudyFlow AI</span>
          <span className="text-[10px] bg-[#4F46E5] text-white px-2 py-0.5 rounded-full font-mono">Offline-First</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs text-left">
          <span className="text-xs font-bold text-slate-900 block">Smart Repetition Flashcards</span>
          <span className="text-[10px] text-slate-500 font-mono block mt-1">24/7 AI Tutor Chat &amp; Code Sandbox</span>
        </div>
        <div className="flex items-center justify-between text-[10px] bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-indigo-800 font-mono font-bold">
          <span>PWA App</span>
          <span>100% Offline Functional</span>
        </div>
      </div>
    );
  };

  return (
    <div className="group relative rounded-3xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full w-[84vw] sm:w-[380px] shrink-0 snap-center">
      <div className="flex flex-col gap-4">
        {/* Top Badge Bar */}
        <div className="flex items-center justify-between gap-2">
          {/* Category Pill Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
            {getCategoryIcon()}
            <span className="text-[11px] font-bold text-slate-700 tracking-tight">
              {project.category}
            </span>
          </div>

          {/* Status Live Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Platform</span>
          </div>
        </div>

        {/* Realistic Browser Window Frame Container */}
        <Link
          href={`/work/${project.slug}`}
          className="w-full rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-3 sm:p-4 flex flex-col gap-3 relative overflow-hidden group-hover:border-[#FF5722]/30 transition-all duration-300"
        >
          {/* Simulated Browser Bar Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB] text-[11px] text-[#5F6368]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
            </div>

            {/* URL Address Search Bar */}
            <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] px-3 py-0.5 rounded-full font-mono text-[10px] text-slate-500 truncate max-w-[160px] sm:max-w-[200px]">
              <Search className="w-2.5 h-2.5 text-slate-400 shrink-0" />
              <span className="truncate">
                {project.liveUrl
                  ? project.liveUrl.replace("https://", "").replace("http://", "").replace("/", "")
                  : `work/${project.slug}`}
              </span>
            </div>

            {/* Favicon Logo */}
            {project.faviconUrl && !imgError ? (
              <img
                src={project.faviconUrl}
                alt={`${project.title} logo`}
                onError={() => setImgError(true)}
                className="w-4 h-4 object-contain rounded-xs shrink-0"
              />
            ) : (
              <Globe className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            )}
          </div>

          {/* Browser Content Inner Mock Graphic */}
          {renderBrowserGraphic()}
        </Link>

        {/* Project Title & Subtitle */}
        <div className="mt-1">
          <Link href={`/work/${project.slug}`}>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] tracking-tight group-hover:text-[#FF5722] transition-colors leading-snug">
              {project.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Feature Pill Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-slate-700"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded-full bg-[#F8FAFC] text-slate-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] group-hover:text-[#FF5722] transition-colors"
        >
          <span>View Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Round Circular Coral Action Icon Button */}
        <Link
          href={`/work/${project.slug}`}
          className="w-10 h-10 rounded-full bg-[#FFF3EE] text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs shrink-0"
          title={`View ${project.title} case study`}
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}


