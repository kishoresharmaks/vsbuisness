"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionVectors } from "@/components/ui/bg-vectors";
import {
  Zap,
  ShieldCheck,
  Activity,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  badge: string;
  category: "Frontend & Speed" | "Backend & AI" | "Database & Cloud" | "Security & Payments";
  metric: string;
  highlighted?: boolean;
  logo: React.ReactNode;
}

export function TechEcosystem() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  const categories = [
    { label: "All Ecosystem (24)", value: "All" },
    { label: "Frontend & Speed", value: "Frontend & Speed" },
    { label: "Backend & AI", value: "Backend & AI" },
    { label: "Database & Cloud", value: "Database & Cloud" },
    { label: "Security & Payments", value: "Security & Payments" },
  ];

  const technologies: TechItem[] = [
    // --- Frontend & Speed ---
    {
      id: "nextjs",
      name: "Next.js 16+",
      badge: "App Router & SSR",
      category: "Frontend & Speed",
      metric: "100/100 SEO & Vitals",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask_next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
              <circle cx="90" cy="90" r="90" fill="black" />
            </mask>
            <g mask="url(#mask_next)">
              <circle cx="90" cy="90" r="90" fill="black" />
              <path d="M149.508 157.52L69.143 54H54V125.97H66.8136V69.215L138.864 162.616C142.619 161.087 146.184 159.38 149.508 157.52Z" fill="white" />
              <path d="M115 54H127.814V126H115V54Z" fill="white" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      id: "react",
      name: "React 19",
      badge: "Concurrent Engine",
      category: "Frontend & Speed",
      metric: "Zero-Lag UI Render",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#082F49] flex items-center justify-center border border-[#0284C7]/30 text-[#38BDF8] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4.5" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4.5" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38BDF8" strokeWidth="4.5" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="7.5" fill="#38BDF8" />
          </svg>
        </div>
      ),
    },
    {
      id: "typescript",
      name: "TypeScript 5",
      badge: "Type Safety",
      category: "Frontend & Speed",
      metric: "Bank-Grade Reliability",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#3178C6] flex items-center justify-center text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="16" fill="#3178C6" />
            <path d="M22 35h32v8H42v32h-8V43H22v-8zm34 26c0-6 5-10 12-10 6 0 11 3 11 8 0 4-3 7-8 8l-4 1c-3 1-4 2-4 4 0 2 2 3 5 3 4 0 7-2 8-5l6 4c-3 5-8 7-14 7-8 0-13-4-13-10 0-4 3-7 8-9l4-1c3-1 4-2 4-4 0-2-2-3-4-3-3 0-5 1-6 4l-6-4z" fill="white" />
          </svg>
        </div>
      ),
    },
    {
      id: "tailwind",
      name: "Tailwind CSS v4",
      badge: "Utility Styling",
      category: "Frontend & Speed",
      metric: "100% Mobile Responsive",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-[#06B6D4]/30 text-[#06B6D4] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 38c5-10 13-14 24-12 7 1 12 6 15 11 4 7 8 10 17 9 7-1 12-6 15-16-5 10-13 14-24 12-7-1-12-6-15-11-4-7-8-10-17-9-7 1-12 6-15 16zm-12 26c5-10 13-14 24-12 7 1 12 6 15 11 4 7 8 10 17 9 7-1 12-6 15-16-5 10-13 14-24 12-7-1-12-6-15-11-4-7-8-10-17-9-7 1-12 6-15 16z" />
          </svg>
        </div>
      ),
    },
    {
      id: "figma",
      name: "Figma",
      badge: "Design Systems",
      category: "Frontend & Speed",
      metric: "Pixel-Perfect UX",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E1B4B] flex items-center justify-center border border-purple-500/30 shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
          </svg>
        </div>
      ),
    },

    // --- Backend & AI ---
    {
      id: "nodejs",
      name: "Node.js 22",
      badge: "Async Runtime",
      category: "Backend & AI",
      metric: "<10ms Server Response",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#022C22] flex items-center justify-center border border-emerald-500/30 text-[#5FA04E] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 256 289" fill="#5FA04E" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 0L0 73.9v147.8L128 289.5l128-73.9V73.9L128 0zm0 33.2l96.7 55.8v111.7L128 256.4l-96.7-55.8V89L128 33.2z" />
            <path d="M128 73.9L49.1 119.4v91.1L128 256l78.9-45.5v-91.1L128 73.9zm-49.1 63.8l49.1-28.3 49.1 28.3v56.7L128 222.8l-49.1-28.3v-56.8z" />
          </svg>
        </div>
      ),
    },
    {
      id: "python",
      name: "Python 3.12",
      badge: "AI & Data Science",
      category: "Backend & AI",
      metric: "Machine Learning API",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-blue-500/30 shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54.2 2C27.4 2 28.3 13.6 28.3 13.6l.1 14.1h26.4v3.7H17.4s-15.4-1.7-15.4 25.1c0 26.8 13.4 25.9 13.4 25.9h8v-11.5s-.4-13.6 13.7-13.6h26.1s13 0 13-12.7V14.7S98.2 2 54.2 2zm-14.7 8.3a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z" fill="#3776AB" />
            <path d="M55.8 108c26.8 0 25.9-11.6 25.9-11.6l-.1-14.1H55.2v-3.7h37.4s15.4 1.7 15.4-25.1c0-26.8-13.4-25.9-13.4-25.9h-8v11.5s.4 13.6-13.7 13.6H50.8s-13 0-13 12.7v30S24.2 108 55.8 108zm14.7-8.3a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z" fill="#FFD43B" />
          </svg>
        </div>
      ),
    },
    {
      id: "openai",
      name: "OpenAI & Claude AI",
      badge: "LLM Orchestration",
      category: "Backend & AI",
      metric: "Smart Bots",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black flex items-center justify-center border border-emerald-500/30 text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 45a22.5 22.5 0 0 0-9.8-18.7L80.2 6.5A23 23 0 0 0 54 1.8L35.7 12.4a22.5 22.5 0 0 0-19.4 3.7A23 23 0 0 0 6.5 35.7L1.8 54a22.5 22.5 0 0 0 3.7 19.4A23 23 0 0 0 26.2 93.5l19.7 11.4A23 23 0 0 0 72 100.2l18.3-10.6a22.5 22.5 0 0 0 19.4-3.7A23 23 0 0 0 109.5 64.3L90 45zm-38 48.5L25 78.4V50.6l15-8.7 27 15.6v27.2l-15 8.8zm-29-50.2l15-8.7 27 15.6v17.4l-15 8.7-27-15.6V43.3zm58 20.3L66 72.3V44.5l-15-8.7 27-15.6v27.2l15 8.8z" />
          </svg>
        </div>
      ),
    },
    {
      id: "graphql",
      name: "GraphQL & REST",
      badge: "API Gateways",
      category: "Backend & AI",
      metric: "Modular Endpoint Sync",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1F0824] flex items-center justify-center border border-[#E535AB]/30 text-[#E535AB] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="none" stroke="#E535AB" strokeWidth="6" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
            <circle cx="50" cy="10" r="7" fill="#E535AB" />
            <circle cx="85" cy="30" r="7" fill="#E535AB" />
            <circle cx="85" cy="70" r="7" fill="#E535AB" />
            <circle cx="50" cy="90" r="7" fill="#E535AB" />
            <circle cx="15" cy="70" r="7" fill="#E535AB" />
            <circle cx="15" cy="30" r="7" fill="#E535AB" />
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="15" y1="30" x2="85" y2="70" />
            <line x1="15" y1="70" x2="85" y2="30" />
          </svg>
        </div>
      ),
    },
    {
      id: "websockets",
      name: "WebSockets",
      badge: "Realtime Push",
      category: "Backend & AI",
      metric: "Sub-Second Sync",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#111827] flex items-center justify-center border border-purple-500/30 text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="none" stroke="#A855F7" strokeWidth="6" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="38" stroke="#A855F7" strokeWidth="6" strokeDasharray="12 6" />
            <polygon points="55,15 35,52 52,52 45,85 65,48 48,48" fill="#A855F7" stroke="none" />
          </svg>
        </div>
      ),
    },

    // --- Database & Cloud ---
    {
      id: "postgresql",
      name: "PostgreSQL 16",
      badge: "ACID Database",
      category: "Database & Cloud",
      metric: "99.999% Data Safety",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-[#336791]/40 text-[#336791] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#336791" xmlns="http://www.w3.org/2000/svg">
            <path d="M48.5 8C27 8 13.5 24 13.5 45.5c0 28 20 44.5 35 44.5 13 0 20.5-8.5 24-15 3.5 6.5 11 15 24 15 2 0 4-.2 5.5-.5V72c-1.5.5-3.5.5-5 .5-7.5 0-13.5-6.5-16.5-13.5C79 50.5 83 38 83 27.5 83 14 69 8 48.5 8zm-2 14c12.5 0 21.5 5 21.5 14.5 0 9-4.5 18-12 25-5-6-9.5-14.5-9.5-24.5 0-4.5.5-9.5 0-15zm-15 4c3 0 5 2.5 5 5.5s-2 5.5-5 5.5-5.5-2.5-5.5-5.5 2.5-5.5 5.5-5.5z" />
          </svg>
        </div>
      ),
    },
    {
      id: "mongodb",
      name: "MongoDB Atlas",
      badge: "NoSQL Documents",
      category: "Database & Cloud",
      metric: "High Scalability",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#022C22] flex items-center justify-center border border-emerald-500/30 text-[#47A248] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#47A248" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5C48 18 20 38 20 62c0 16 13 29 30 29s30-13 30-29C80 38 52 18 50 5zm0 79c-12 0-22-9-22-22 0-16 19-32 22-44 3 12 22 28 22 44 0 13-10 22-22 22z" />
            <path d="M48 25v60h4V25h-4z" />
          </svg>
        </div>
      ),
    },
    {
      id: "prisma",
      name: "Prisma ORM",
      badge: "Type-Safe Queries",
      category: "Database & Cloud",
      metric: "Auto Migrations",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-teal-500/30 text-teal-400 shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="none" stroke="#2DD4BF" strokeWidth="6" xmlns="http://www.w3.org/2000/svg">
            <polygon points="15,85 50,15 85,85" strokeLinejoin="round" />
            <polygon points="50,15 50,85 85,85" fill="#2DD4BF" opacity="0.3" stroke="none" />
            <line x1="50" y1="15" x2="50" y2="85" />
          </svg>
        </div>
      ),
    },
    {
      id: "redis",
      name: "Redis Cache",
      badge: "In-Memory Store",
      category: "Database & Cloud",
      metric: "Sub-Millisecond",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#450A0A] flex items-center justify-center border border-red-500/30 text-[#DC382D] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#DC382D" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L10 32v36l40 22 40-22V32L50 10zm0 12l25 14-25 14-25-14 25-14zm-28 24l22 12v23L22 69V46zm56 23l-22 12V58l22-12v23z" />
          </svg>
        </div>
      ),
    },
    {
      id: "cloudflare",
      name: "Cloudflare Edge",
      badge: "Global CDN",
      category: "Database & Cloud",
      metric: "250+ Edge Cities",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#451A03] flex items-center justify-center border border-amber-500/30 text-[#F38020] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#F38020" xmlns="http://www.w3.org/2000/svg">
            <path d="M72 45c-2-12-13-21-25-21-10 0-19 6-23 15-9 1-16 8-16 18 0 10 8 18 18 18h46c9 0 16-7 16-16 0-8-6-14-14-14zm-48 23c-6 0-11-5-11-11 0-6 5-11 11-11 2 0 4 .5 6 1.5L32 50l2-4.5c3-6 9-10 16-10 9 0 16 7 16 16v3h3c5 0 9 4 9 9s-4 9-9 9H24z" />
          </svg>
        </div>
      ),
    },
    {
      id: "aws",
      name: "AWS Cloud",
      badge: "S3, EC2 & Lambda",
      category: "Database & Cloud",
      metric: "Enterprise Infra",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E293B] flex items-center justify-center border border-amber-500/30 text-[#FF9900] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#FF9900" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 35h12l10 32 10-32h12l-16 45H38L22 35zm48 10c0-6 4-9 11-9 6 0 10 2 13 6l-6 5c-2-2-4-3-7-3-3 0-5 1-5 3s2 3 5 4l5 2c6 2 9 6 9 11 0 7-6 11-13 11-7 0-12-3-15-7l6-5c2 3 5 4 9 4 3 0 5-1 5-3s-2-3-5-4l-5-2c-6-2-9-6-9-11z" />
            <path d="M15 82c25 12 55 12 70 0l-5-5c-12 10-38 10-60 0l-5 5z" />
          </svg>
        </div>
      ),
    },
    {
      id: "vercel",
      name: "Vercel",
      badge: "Serverless Edge",
      category: "Database & Cloud",
      metric: "Instant Deploy",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black flex items-center justify-center border border-slate-800 text-white shadow-xs shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 75 65" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5 0L75 65H0L37.5 0Z" />
          </svg>
        </div>
      ),
    },
    {
      id: "docker",
      name: "Docker & K8s",
      badge: "Containerization",
      category: "Database & Cloud",
      metric: "Zero Downtime",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 48c-2 0-4 1-5 2-3-2-7-3-12-3-1 0-3 0-4 .5V35H55v12H41V35H27v12H13v12H0c1 16 14 28 32 28 22 0 42-12 50-25 3 0 6-2 8-5 1-2 1-5 0-7zM24 41h6v6h-6v-6zm14 0h6v6h-6v-6zm14 0h6v6h-6v-6zm-28 12h6v6h-6v-6zm14 0h6v6h-6v-6zm14 0h6v6h-6v-6zm14 0h6v6h-6v-6z" />
          </svg>
        </div>
      ),
    },
    {
      id: "supabase",
      name: "Supabase",
      badge: "Realtime Postgres",
      category: "Database & Cloud",
      metric: "Row Level Security",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#022C22] flex items-center justify-center border border-emerald-400/30 text-[#3ECF8E] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56 8L15 58h30l-7 34 41-50H49l7-34z" fill="#3ECF8E" />
          </svg>
        </div>
      ),
    },

    // --- Security & Payments ---
    {
      id: "stripe",
      name: "Stripe & UPI",
      badge: "Payment Checkout",
      category: "Security & Payments",
      metric: "PCI-DSS Level 1",
      highlighted: true,
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#312E81] flex items-center justify-center border border-indigo-500/30 text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M85 30H15c-4 0-7 3-7 7v36c0 4 3 7 7 7h70c4 0 7-3 7-7V37c0-4-3-7-7-7zm-63 8h16v8H22v-8zm56 34H22v-8h56v8zm0-14H42v-8h36v8z" />
          </svg>
        </div>
      ),
    },
    {
      id: "razorpay",
      name: "Razorpay",
      badge: "Indian Payments",
      category: "Security & Payments",
      metric: "UPI & Netbanking",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 85L50 15h25L45 85H25zm20-30l15-40h15L60 55H45z" />
          </svg>
        </div>
      ),
    },
    {
      id: "auth0",
      name: "Auth0 & OAuth 2.0",
      badge: "Identity Auth",
      category: "Security & Payments",
      metric: "2FA & SSO",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#451A03] flex items-center justify-center border border-orange-500/30 text-[#EB5424] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#EB5424" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L15 25v30c0 22 15 40 35 45 20-5 35-23 35-45V25L50 10zm0 15l20 9v21c0 13-9 24-20 28-11-4-20-15-20-28V34l20-9z" />
          </svg>
        </div>
      ),
    },
    {
      id: "git",
      name: "Git & Actions",
      badge: "CI/CD Pipeline",
      category: "Security & Payments",
      metric: "Auto Test Build",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-amber-500/30 text-[#F05032] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#F05032" xmlns="http://www.w3.org/2000/svg">
            <path d="M92 42L58 8a12 12 0 0 0-17 0L8 42a12 12 0 0 0 0 17l33 33a12 12 0 0 0 17 0l34-34a12 12 0 0 0 0-16zM67 60a7 7 0 1 1-7-7c1 0 3 0 4 1v-9l-9-9v24a7 7 0 1 1-7-7V29a7 7 0 1 1 7 7v16l10 10v-9a7 7 0 1 1 2 7z" />
          </svg>
        </div>
      ),
    },
    {
      id: "nginx",
      name: "Linux & Nginx",
      badge: "Reverse Proxy",
      category: "Security & Payments",
      metric: "DDoS Mitigation",
      logo: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#022C22] flex items-center justify-center border border-emerald-500/30 text-[#009639] shadow-xs shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 100 100" fill="#009639" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 15h15l30 45V15h15v70H65L35 40v45H20V15z" />
          </svg>
        </div>
      ),
    },
  ];

  const filteredTechnologies =
    activeFilter === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeFilter);

  const displayedTechnologies =
    activeFilter === "All" && !showAllMobile
      ? filteredTechnologies.slice(0, 8)
      : filteredTechnologies;

  return (
    <section id="technology" className="relative py-14 sm:py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] overflow-hidden">
      <SectionVectors />
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        
        {/* Header Section matching website blue theme */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="h-0.5 w-6 bg-[#2563EB] rounded-full inline-block" />
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#2563EB] uppercase">
              TECHNOLOGY ECOSYSTEM
            </span>
            <span className="h-0.5 w-6 bg-[#2563EB] rounded-full inline-block" />
          </div>

          <h2 className="text-2.5xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            Built with world-class <br className="hidden sm:inline" />
            engineering <span className="text-[#2563EB]">standards.</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5F6368] mt-2.5 sm:mt-3.5 leading-relaxed max-w-2xl">
            We architect high-performance digital platforms using enterprise-grade technologies for sub-second speeds, bank-grade security, and 24/7 reliability.
          </p>

          {/* Interactive Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {categories.map((c) => {
              const isActive = activeFilter === c.value;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => {
                    setActiveFilter(c.value);
                    setShowAllMobile(false);
                  }}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20 scale-102"
                      : "bg-[#F8FAFC] text-[#5F6368] hover:text-[#111111] border border-[#E5E7EB] hover:border-[#2563EB]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sleek 2-Column Mobile & 4-Column Desktop Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-7xl mx-auto">
          {displayedTechnologies.map((tech) => (
            <div
              key={tech.id}
              className={`group relative rounded-2xl p-3 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 border ${
                tech.highlighted
                  ? "bg-gradient-to-br sm:bg-gradient-to-r from-[#EFF6FF]/90 via-white to-[#DBEAFE]/40 border-[#2563EB]/40 shadow-2xs hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/10 hover:-translate-y-1"
                  : "bg-white border-[#E5E7EB] shadow-2xs hover:border-[#2563EB]/60 hover:shadow-lg hover:shadow-[#2563EB]/5 hover:-translate-y-1"
              }`}
            >
              {/* Logo Badge Icon */}
              {tech.logo}

              {/* Tech Title & Badges */}
              <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 grow w-full">
                <h3 className="text-xs sm:text-base font-extrabold text-[#111111] tracking-tight group-hover:text-[#2563EB] transition-colors truncate">
                  {tech.name}
                </h3>

                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-1.5 sm:px-2 py-0.5 rounded-md self-start truncate max-w-full">
                  {tech.badge}
                </span>

                {/* Metric Status Pill */}
                <div className="flex items-center gap-1 mt-0.5 text-[9px] sm:text-[10px] font-mono font-semibold text-slate-500 truncate max-w-full">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2563EB] shrink-0" />
                  <span className="truncate">{tech.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Show More Button on Mobile */}
        {activeFilter === "All" && filteredTechnologies.length > 8 && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="px-6 py-2.5 rounded-full border border-[#2563EB]/30 bg-[#EFF6FF] text-[#2563EB] hover:bg-[#2563EB] hover:text-white text-xs font-extrabold transition-all duration-200 shadow-2xs flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>
                {showAllMobile
                  ? "Collapse Stack ↑"
                  : `Show All 24 Technologies (${filteredTechnologies.length - 8} More) ↓`}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllMobile ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        {/* Bottom Technology Standards Banner */}
        <div className="mt-10 sm:mt-16 max-w-5xl mx-auto rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4 sm:p-6 flex flex-wrap items-center justify-around gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
            <span>100% Type-Safe TypeScript</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
            <span>Sub-100ms Global CDN Speed</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
            <span>24/7 Enterprise Security</span>
          </div>
        </div>

      </Container>
    </section>
  );
}
