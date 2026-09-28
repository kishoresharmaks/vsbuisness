"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AmbientBg } from "@/components/hero/ambient-bg";
import { HeroVectors } from "@/components/ui/bg-vectors";
import { ProjectSelector } from "@/components/project-selector/project-selector";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap, Award } from "lucide-react";

export function Hero() {
  const rotatingWords = [
    "websites & web apps",
    "multi-vendor stores",
    "AI & SaaS platforms",
    "enterprise software",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-20 pb-10 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#FFFFFF]">
      {/* Background particle canvas & vector assets */}
      <AmbientBg />
      <HeroVectors />

      <Container size="default" className="relative z-10 px-3.5 sm:px-6 md:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-4 sm:gap-7">

          {/* Animated Eyebrow Badge Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#2563EB] shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span className="uppercase">VS BUSINESS SOLUTIONS · ENTERPRISE WEB ENGINEERING</span>
          </motion.div>

          {/* Main Hero Headline with Rotating Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <h1 className="text-2.5xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.12] max-w-4xl mx-auto">
              Engineering high-performance{" "}
              <span className="inline-block relative min-w-[200px] sm:min-w-[420px] text-left align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[index]}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent inline-block"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
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
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-1"
          >
            <a href="#contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center text-xs sm:text-sm py-3.5 px-7 min-h-[46px] rounded-full shadow-lg shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-[#2563EB]/35 transition-all duration-300 group cursor-pointer"
                iconRight={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              >
                Start a project
              </Button>
            </a>

            <a href="#work" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center bg-white/90 backdrop-blur-md border-[#E5E7EB] hover:border-[#2563EB] text-xs sm:text-sm py-3.5 px-7 min-h-[46px] rounded-full shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
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
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-[#5F6368] pt-1"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
              100% Core Web Vitals
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Sub-Second Page Loads
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] shadow-2xs">
              <Award className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
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
