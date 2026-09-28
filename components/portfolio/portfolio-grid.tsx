"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { projectsData, Project } from "@/lib/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionVectors } from "@/components/ui/bg-vectors";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { label: "All", value: "All" },
    { label: "E-Commerce", value: "E-Commerce" },
    { label: "Enterprise", value: "Enterprise Systems" },
    { label: "Web Platforms", value: "AI & Web Platforms" },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = 360;
      const index = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), filteredProjects.length - 1));
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative py-14 sm:py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        
        {/* Header Section matching website brand theme */}
        <div className="flex flex-col gap-3 mb-8 sm:mb-10">
          {/* Eyebrow with Brand Blue Accent Line */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#2563EB] uppercase">
              OUR WORK
            </span>
            <span className="h-0.5 w-8 bg-[#2563EB] rounded-full inline-block" />
          </div>

          {/* Headline & Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                Projects that make <br className="hidden sm:inline" />
                businesses <span className="text-[#2563EB]">grow.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#5F6368] mt-3 leading-relaxed">
                Explore our featured projects, digital products and platforms built for real businesses.
              </p>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
                {filterOptions.map((f) => {
                  const isActive = activeFilter === f.value;
                  return (
                    <button
                      key={f.label}
                      type="button"
                      onClick={() => {
                        setActiveFilter(f.value);
                        setActiveIndex(0);
                        if (carouselRef.current) {
                          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
                        }
                      }}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#2563EB] text-white shadow-xs scale-102"
                          : "bg-white text-[#5F6368] hover:text-[#111111] border border-[#E5E7EB] hover:border-[#2563EB]"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* Top Desktop Next/Prev Controls */}
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <button
                  type="button"
                  onClick={scrollLeft}
                  className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#2563EB] hover:text-white text-slate-700 transition-all flex items-center justify-center shadow-2xs cursor-pointer"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#2563EB] hover:text-white text-slate-700 transition-all flex items-center justify-center shadow-2xs cursor-pointer"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Swipeable Cards Track */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1 -mx-1"
        >
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Bottom Pagination & Action Bar matching website blue theme */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4">
          {/* Pagination Indicators (Dots) */}
          <div className="flex items-center justify-center gap-2">
            {filteredProjects.map((p, idx) => (
              <span
                key={p.slug}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? "w-6 h-2 bg-[#2563EB]"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Bottom Prev / Next Arrow Controls for Mobile */}
          <div className="flex items-center gap-3">
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white text-slate-700 flex items-center justify-center shadow-2xs cursor-pointer active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white text-slate-700 flex items-center justify-center shadow-2xs cursor-pointer active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Projects Pill CTA Button */}
            <Link
              href="/start-project"
              className="px-6 py-3 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#111111] hover:text-white text-xs font-extrabold text-[#111111] transition-all duration-300 shadow-2xs inline-flex items-center gap-2"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

