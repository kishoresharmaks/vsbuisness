"use client";

import React from "react";

export function HeroVectors() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Gradient Orb */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Top Right Gradient Orb */}
      <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Decorative Floating Vector 1 - Geometric Ring Top Right */}
      <svg
        className="absolute top-24 right-[10%] w-48 h-48 text-[#2563EB]/15 hidden md:block animate-pulse"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.3" />
      </svg>

      {/* Decorative Floating Vector 2 - Code Symbol Left */}
      <svg
        className="absolute top-44 left-[5%] w-36 h-36 text-[#111111]/10 hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M30 35L15 50L30 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M70 35L85 50L70 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M55 30L45 70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Grid Crosshair Markers (+) */}
      <div className="absolute top-1/4 left-12 text-[#2563EB]/25 font-mono text-xs hidden sm:block">+</div>
      <div className="absolute top-1/3 right-16 text-[#2563EB]/25 font-mono text-xs hidden sm:block">+</div>
      <div className="absolute bottom-1/4 left-24 text-[#2563EB]/25 font-mono text-xs hidden sm:block">+</div>
      <div className="absolute bottom-1/3 right-28 text-[#2563EB]/25 font-mono text-xs hidden sm:block">+</div>

      {/* Subtle Dot Array Bottom Left */}
      <svg
        className="absolute bottom-10 left-8 w-24 h-24 text-[#8A8F98]/20 hidden md:block"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={20 + col * 15} cy={20 + row * 15} r="2" />
          ))
        )}
      </svg>
    </div>
  );
}

export function SectionVectors() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 blur-3xl rounded-full" />

      {/* Grid Plus Markers */}
      <div className="absolute top-8 left-8 text-gray-300 font-mono text-xs">+</div>
      <div className="absolute top-8 right-8 text-gray-300 font-mono text-xs">+</div>
      <div className="absolute bottom-8 left-8 text-gray-300 font-mono text-xs">+</div>
      <div className="absolute bottom-8 right-8 text-gray-300 font-mono text-xs">+</div>
    </div>
  );
}
