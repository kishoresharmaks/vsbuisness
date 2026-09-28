"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AmbientBg } from "@/components/hero/ambient-bg";
import { HeroVectors } from "@/components/ui/bg-vectors";
import { ProjectSelector } from "@/components/project-selector/project-selector";
import { SocialShare } from "@/components/ui/social-share";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap, Award } from "lucide-react";

export function Hero() {
  const rotatingWords = [
    "custom web apps",
    "fast websites",
    "e-commerce stores",
    "SaaS platforms",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 overflow-hidden bg-[#FFFFFF]">
      {/* Background particle canvas & vector assets */}
      <AmbientBg />
      <HeroVectors />

      <Container size="default" className="relative z-10 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-4 sm:gap-6">

          {/* Animated Eyebrow Badge Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#2563EB] shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span className="uppercase">VS BUSINESS SOLUTIONS · DIGITAL PRODUCT STUDIO</span>
          </motion.div>

          {/* Main Hero Headline with Reduced Font Size & Controlled Width */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-3xl mx-auto"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] leading-[1.25] sm:leading-[1.2]">
              Custom Web Development &amp;{" "}
              <span className="relative inline-block text-[#2563EB] font-black min-h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[index]}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="inline-block bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent whitespace-nowrap"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              Engineered to Scale<span className="text-[#2563EB]">.</span>
            </h1>
          </motion.div>

          {/* Subheading with Reduced Text Size */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto px-2"
          >
            <p className="text-xs sm:text-sm md:text-base text-[#5F6368] leading-relaxed font-normal">
              VS Business Solutions is a custom web development and digital product studio. We build ultra-fast websites, custom web applications, SaaS platforms, and e-commerce software engineered with Next.js 16 and sub-second speed.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-1"
          >
            <a href="#contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center text-xs sm:text-sm py-3 px-6 rounded-full shadow-md shadow-[#2563EB]/20 hover:shadow-lg hover:shadow-[#2563EB]/30 transition-all duration-300 group cursor-pointer"
                iconRight={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              >
                Launch Your Web Project
              </Button>
            </a>

            <a href="#work" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center bg-white/90 backdrop-blur-md border-[#E5E7EB] hover:border-[#2563EB] text-xs sm:text-sm py-3 px-6 rounded-full shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                View Client Case Studies
              </Button>
            </a>
          </motion.div>

          {/* Social Share Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="pt-0.5"
          >
            <SocialShare />
          </motion.div>

          {/* Sleek Trust Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
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
              Sub-Second Page Speed
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] shadow-2xs">
              <Award className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
              6+ Live Client Platforms
            </span>
          </motion.div>

          {/* Interactive Project Scope Builder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full mt-2"
          >
            <ProjectSelector />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
