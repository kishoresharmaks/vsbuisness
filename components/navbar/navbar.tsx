"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-2 sm:pt-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-3.5 py-2 sm:px-5 sm:py-3 flex items-center justify-between ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border border-[#E5E7EB] shadow-md"
            : "bg-white/80 backdrop-blur-md border border-[#E5E7EB]/80 shadow-xs"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
          <Image
            src="/Brand_Logo.png"
            alt="VS Business Solutions Logo"
            width={32}
            height={32}
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg shadow-2xs transition-transform duration-300 group-hover:scale-105"
            priority
          />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-xs sm:text-base text-[#111111] tracking-tight">
              VS BUSINESS
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
              SOLUTIONS
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-wide uppercase text-[#5F6368] hover:text-[#111111] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#contact">
            <Button
              variant="primary"
              size="sm"
              className="text-xs px-4 py-2"
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start a project
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-[#111111] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className={`h-0.5 w-full bg-[#111111] transition-transform duration-200 ${
                  mobileOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#111111] transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#111111] transition-transform duration-200 ${
                  mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
