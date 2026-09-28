"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Globe, Sparkles } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group relative rounded-3xl border border-[#E5E7EB] bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#2563EB]/40 hover:-translate-y-1 flex flex-col justify-between ${
        featured ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Top Accent Glow Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#111111] via-[#2563EB] to-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 sm:p-7 flex flex-col justify-between h-full gap-5">
        {/* Card Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]/70">
          <div className="flex items-center gap-2.5">
            {/* Favicon / Brand Badge */}
            {project.faviconUrl && !imgError ? (
              <img
                src={project.faviconUrl}
                alt={`${project.title} favicon`}
                onError={() => setImgError(true)}
                className="w-6 h-6 rounded-lg object-contain border border-[#E5E7EB] bg-white p-0.5 shrink-0 shadow-2xs"
              />
            ) : (
              <div className="w-6 h-6 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                <Globe className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="text-xs font-bold text-[#111111] tracking-tight">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live Platform
              </span>
            )}
            <Badge className="bg-[#2563EB]/5 text-[#2563EB] border-[#2563EB]/20 text-[10px] py-0.5 px-2.5">
              {project.badge}
            </Badge>
          </div>
        </div>

        {/* Browser Frame Showcase Container */}
        <Link
          href={`/work/${project.slug}`}
          className="w-full rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 group-hover:border-[#2563EB]/30 transition-all duration-300"
        >
          {/* Simulated Browser Bar Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E7EB] text-[11px] text-[#5F6368]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
            </div>
            <span className="font-mono text-[10px] text-[#5F6368] bg-white px-2.5 py-0.5 rounded-full border border-[#E5E7EB] truncate max-w-[180px] sm:max-w-[240px]">
              {project.liveUrl ? project.liveUrl.replace("https://", "").replace("http://", "").replace("/", "") : `work/${project.slug}`}
            </span>
            <span className="font-mono text-[10px] text-[#2563EB] font-bold hidden sm:inline-block">
              {project.clientRole}
            </span>
          </div>

          {/* Project Title & Subtitle */}
          <div className="my-2">
            <h4 className="text-lg sm:text-2xl font-bold text-[#111111] tracking-tight group-hover:text-[#2563EB] transition-colors leading-snug">
              {project.title}
            </h4>
            <p className="text-xs text-[#5F6368] mt-1 leading-relaxed line-clamp-2">
              {project.subtitle}
            </p>
          </div>

          {/* Key Metrics Chips */}
          <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-[#E5E7EB]/80">
            {project.metrics.map((m) => (
              <span
                key={m.label}
                className="text-[10px] sm:text-[11px] font-mono bg-white px-2.5 py-1 rounded-md text-[#5F6368] border border-[#E5E7EB] shadow-2xs"
              >
                {m.label}: <strong className="text-[#111111] font-bold">{m.value}</strong>
              </span>
            ))}
          </div>
        </Link>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] text-[#111111]"
            >
              {t}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F7F8FA] text-[#5F6368]">
              +{project.tags.length - 5} more
            </span>
          )}
        </div>

        {/* Card Bottom Actions Bar */}
        <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-3 mt-1">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] group-hover:text-[#2563EB] transition-colors"
          >
            <span>Explore Case Study</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB]/10 border border-[#2563EB]/20 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

