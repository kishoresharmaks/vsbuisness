"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AmbientBg } from "@/components/hero/ambient-bg";
import { HeroVectors } from "@/components/ui/bg-vectors";
import { ProjectSelector } from "@/components/project-selector/project-selector";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-20 pb-10 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#FFFFFF]">
      {/* Background particle canvas & vector assets */}
      <AmbientBg />
      <HeroVectors />

      <Container size="default" className="relative z-10 px-3.5 sm:px-6 md:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-4 sm:gap-7">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] text-[10px] sm:text-xs font-semibold tracking-wider text-[#5F6368] uppercase shadow-xs max-w-full overflow-hidden"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <Sparkles className="w-3 h-3 text-[#2563EB] shrink-0" />
            <span className="truncate">VS BUSINESS SOLUTIONS &middot; CUSTOM WEB DEVELOPMENT AGENCY</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <h1 className="text-2xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.12] max-w-4xl mx-auto">
              Engineering high-performance{" "}
              <span className="bg-gradient-to-r from-[#111111] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                websites &amp; web apps
              </span>{" "}
              that scale<span className="text-[#2563EB]">.</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl px-1"
          >
            <p className="text-xs sm:text-base md:text-xl text-[#5F6368] leading-relaxed font-normal">
              We design and build custom web applications, modern corporate websites, and scalable e-commerce platforms engineered with Next.js 16+, TypeScript, and sub-second speed.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full sm:w-auto pt-1"
          >
            <a href="#contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center text-xs sm:text-sm py-2.5 sm:py-3.5 min-h-[44px]"
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Start a project
              </Button>
            </a>

            <a href="#work" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center bg-white/90 backdrop-blur-xs text-xs sm:text-sm py-2.5 sm:py-3.5 min-h-[44px]"
              >
                Explore client work
              </Button>
            </a>
          </motion.div>

          {/* Live Trust Metrics Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs font-mono text-[#5F6368] pt-1"
          >
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F7F8FA] border border-[#E5E7EB]">
              <CheckCircle2 className="w-3 h-3 text-[#2563EB] shrink-0" />
              100% Core Web Vitals
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F7F8FA] border border-[#E5E7EB]">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              Sub-Second Page Loads
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F7F8FA] border border-[#E5E7EB]">
              <Sparkles className="w-3 h-3 text-[#2563EB] shrink-0" />
              6+ Live Client Platforms
            </span>
          </motion.div>

          {/* Interactive Project Scope Builder */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full mt-1"
          >
            <ProjectSelector />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
