"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("Services");

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Tech Stack", href: "#tech" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy calculation
      const scrollPosition = window.scrollY + 180;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const targetId = navLinks[i].href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navLinks[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto max-w-6xl mx-auto rounded-full transition-all duration-500 px-4 py-2 sm:px-6 sm:py-2.5 flex items-center justify-between relative overflow-hidden backdrop-blur-xl ${
          isScrolled
            ? "bg-white/92 border border-[#2563EB]/25 shadow-[0_12px_40px_-10px_rgba(37,99,235,0.18)] scale-[0.99]"
            : "bg-white/85 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#2563EB]/30"
        }`}
      >
        {/* Subtle Glowing Top Ambient Shimmer Line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-80" />

        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-[#2563EB]/20 blur-md group-hover:bg-[#2563EB]/40 transition-all duration-300" />
            <div className="relative p-1 bg-white rounded-xl border border-slate-100 shadow-xs">
              <Image
                src="/Brand_Logo.png"
                alt="VS Business Solutions Logo"
                width={34}
                height={34}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-black text-sm sm:text-base text-slate-900 tracking-tight group-hover:text-[#2563EB] transition-colors">
              VS BUSINESS
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[9px] font-mono font-extrabold uppercase tracking-widest rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              SOLUTIONS
            </span>
          </div>
        </Link>

        {/* Desktop Animated Navigation Pills Track */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/70 shadow-inner z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.label;
            const isHovered = hoveredLink === link.label;

            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-3.5 py-1.5 text-xs font-mono font-bold tracking-wide uppercase transition-colors duration-200 rounded-full flex items-center gap-1.5 ${
                  isActive ? "text-[#2563EB]" : isHovered ? "text-[#1d4ed8]" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {/* Active link pill indicator */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-white border border-[#2563EB]/30 rounded-full shadow-xs -z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover pill background indicator */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-white/70 rounded-full -z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"
                    />
                  )}
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Action CTA Button */}
        <div className="hidden md:flex items-center gap-3 z-10">
          <a href="#contact">
            <Button
              variant="primary"
              size="sm"
              className="relative overflow-hidden group text-xs px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold shadow-md shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-[#2563EB]/35 transition-all duration-300 cursor-pointer border border-blue-400/30"
              iconRight={<ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />}
            >
              {/* Shimmer Sweep Overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span>Start Project</span>
            </Button>
          </a>
        </div>

        {/* Mobile Animated Hamburger Button */}
        <div className="md:hidden flex items-center gap-2 z-10">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 text-slate-800 focus:outline-none rounded-full bg-slate-100/90 border border-slate-200/80 active:scale-95 transition-transform"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center relative">
              <span
                className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-1.5 bg-[#2563EB]" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-200 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-2 bg-[#2563EB]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        activeSection={activeSection}
      />
    </header>
  );
}
