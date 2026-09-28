"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { projectsData } from "@/lib/projects";
import { Globe, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function TrustBar() {
  const [failedFavicons, setFailedFavicons] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);

  const handleFaviconError = (slug: string) => {
    setFailedFavicons((prev) => ({ ...prev, [slug]: true }));
  };

  // Duplicate items 4 times to ensure seamless infinite horizontal loop across large screens
  const duplicatedProjects = [...projectsData, ...projectsData, ...projectsData, ...projectsData];

  return (
    <section 
      aria-label="Delivered Platforms and Client Websites Showcase"
      className="py-10 sm:py-14 border-y border-[#E5E7EB] bg-[#FFFFFF] overflow-hidden"
    >
      <Container size="default">
        <div className="flex flex-col gap-6 sm:gap-8 items-center text-center">
          {/* Eyebrow Label with Verified Status Badge */}
          <div className="flex items-center justify-center gap-3 max-w-full px-4">
            <span className="h-px w-8 sm:w-16 bg-[#E5E7EB] shrink-0" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-bold tracking-[0.18em] text-[#475569] uppercase font-mono">
                DELIVERED PLATFORMS &amp; CLIENT WEBSITES
              </span>
            </div>
            <span className="h-px w-8 sm:w-16 bg-[#E5E7EB] shrink-0" />
          </div>

          {/* Premium Horizontal Auto-Scrolling Marquee Container */}
          <div 
            className="relative w-full overflow-hidden py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left & Right Smooth Gradient Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Continuous Motion Marquee Track */}
            <motion.div
              animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-4 sm:gap-6 w-max"
            >
              {duplicatedProjects.map((project, index) => {
                const hasFailed = failedFavicons[project.slug];
                const brandName = project.title
                  .replace(" Marketplace", "")
                  .replace(" Platform", "")
                  .replace(" Store", "")
                  .replace(" AI", "")
                  .replace(" Tool", "")
                  .toUpperCase();

                return (
                  <a
                    key={`${project.slug}-${index}`}
                    href={project.liveUrl || `/work/${project.slug}`}
                    target={project.liveUrl ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    title={`${project.title} — ${project.subtitle} (Client Platform)`}
                    aria-label={`View ${project.title} platform details`}
                    className="group relative flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 shadow-2xs hover:shadow-md transition-all duration-300 shrink-0 transform hover:-translate-y-0.5"
                  >
                    {/* Favicon / Brand Logo */}
                    <div className="w-6 h-6 rounded-lg bg-white p-1 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#2563EB]/30 transition-colors">
                      {project.faviconUrl && !hasFailed ? (
                        <img
                          src={project.faviconUrl}
                          alt={`${project.title} official logo favicon`}
                          onError={() => handleFaviconError(project.slug)}
                          className="w-4 h-4 object-contain rounded-xs"
                          loading="lazy"
                        />
                      ) : (
                        <Globe className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      )}
                    </div>

                    {/* Brand Information */}
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 group-hover:text-[#2563EB] transition-colors font-mono">
                          {brandName}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium truncate max-w-[140px] sm:max-w-[170px]">
                        {project.category}
                      </span>
                    </div>

                    {/* Category / Verified Pill Tag */}
                    <span className="hidden sm:inline-block ml-1 px-2 py-0.5 text-[9px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-md group-hover:bg-[#EFF6FF] group-hover:text-[#2563EB] group-hover:border-[#BFDBFE] transition-colors font-mono uppercase">
                      Verified
                    </span>
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

