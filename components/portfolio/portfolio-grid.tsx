"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { projectsData, Project } from "@/lib/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionVectors } from "@/components/ui/bg-vectors";

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = ["All", "E-Commerce", "Enterprise Systems", "AI & Web Platforms"];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="relative py-14 sm:py-20 md:py-28 bg-[#F7F8FA]/60 border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="SELECTED WORK & CASE STUDIES"
            title="Proven digital products built for ambitious businesses."
            subtitle="Explore live online marketplaces, smart booking systems, and AI platforms built by VS Business Solutions."
            className="mb-0"
          />

          {/* Filter Pills - Horizontal Touch Scroll on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none shrink-0 snap-x">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer snap-start ${
                    isActive
                      ? "bg-[#111111] text-white shadow-xs scale-102"
                      : "bg-white text-[#5F6368] hover:text-[#111111] hover:bg-gray-50 border border-[#E5E7EB]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project: Project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={project.featured && activeFilter === "All"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
