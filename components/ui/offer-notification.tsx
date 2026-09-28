"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Clock, ArrowRight, X, Gift } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface OfferData {
  _id?: string;
  id?: string;
  title: string;
  message: string;
  discountTag?: string;
  badgeText?: string;
  ctaText: string;
  ctaLink: string;
  theme: "blue" | "emerald" | "amber" | "dark" | "purple";
  position: "top-bar" | "floating-toast" | "modal";
  isActive: boolean;
  expiresAt?: string | null;
}

export function OfferNotification() {
  const pathname = usePathname();
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // Check if dismissed in session
    const isDismissed = sessionStorage.getItem("vs_offer_dismissed");
    if (isDismissed === "true") {
      setDismissed(true);
    }

    const fetchActiveOffer = async () => {
      try {
        const res = await fetch("/api/offers");
        const json = await res.json();
        if (json.success && json.activeOffer && json.activeOffer.isActive) {
          setOffer(json.activeOffer);
        }
      } catch (err) {
        console.error("Failed to load offer notification:", err);
      }
    };

    fetchActiveOffer();
  }, []);

  // Class toggle on body for header layout offset when top-bar is active
  useEffect(() => {
    const isTopBarActive = offer && offer.isActive && !dismissed && offer.position === "top-bar" && !pathname?.startsWith("/admin");
    if (isTopBarActive) {
      document.body.classList.add("has-top-bar");
    } else {
      document.body.classList.remove("has-top-bar");
    }

    return () => {
      document.body.classList.remove("has-top-bar");
    };
  }, [offer, dismissed, pathname]);

  // Countdown timer logic
  useEffect(() => {
    if (!offer?.expiresAt) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(offer.expiresAt!) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [offer]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("vs_offer_dismissed", "true");
  };

  // Do not render notification on admin pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  if (!offer || dismissed || !offer.isActive) return null;

  const themeClasses = {
    blue: "bg-[#0F172A] text-white border-[#2563EB]/40 shadow-blue-900/20",
    emerald: "bg-[#064E3B] text-white border-[#10B981]/40 shadow-emerald-900/20",
    amber: "bg-[#78350F] text-white border-[#F59E0B]/40 shadow-amber-900/20",
    purple: "bg-[#4C1D95] text-white border-purple-500/40 shadow-purple-900/20",
    dark: "bg-[#111111] text-white border-slate-700 shadow-slate-900/40",
  };

  const accentColors = {
    blue: "bg-[#2563EB] text-white",
    emerald: "bg-[#10B981] text-white",
    amber: "bg-[#F59E0B] text-black",
    purple: "bg-purple-500 text-white",
    dark: "bg-white text-black",
  };

  const getCtaLink = () => {
    const base = offer.ctaLink || "/start-project";
    if (!offer.discountTag) return base;
    if (base.includes("coupon=")) return base;
    return base.includes("?") ? `${base}&coupon=${offer.discountTag}` : `${base}?coupon=${offer.discountTag}`;
  };

  // TOP ANNOUNCEMENT BAR VIEW
  if (offer.position === "top-bar") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className={`fixed top-0 left-0 right-0 z-[60] py-2 px-3 sm:px-4 ${themeClasses[offer.theme || "blue"]} border-b shadow-md flex items-center justify-between text-xs min-h-[42px] sm:min-h-[40px]`}
        >
          <div className="max-w-6xl mx-auto w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-left">
            <div className="flex items-center gap-2 truncate">
              <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase shrink-0 ${accentColors[offer.theme || "blue"]}`}>
                {offer.badgeText || "OFFER"}
              </span>
              <strong className="font-bold text-xs truncate">{offer.title}:</strong>
              <span className="opacity-90 text-xs truncate hidden md:inline">{offer.message}</span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 ml-auto sm:ml-0">
              {timeLeft && (
                <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] opacity-80">
                  <Clock className="w-3 h-3" />
                  <span>
                    {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
                    {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
                  </span>
                </div>
              )}

              <Link
                href={getCtaLink()}
                className={`px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-transform hover:scale-105 inline-flex items-center gap-1 ${accentColors[offer.theme || "blue"]}`}
              >
                <span>{offer.ctaText || "Claim Now"}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 opacity-70 hover:opacity-100 transition-opacity ml-2 focus:outline-none shrink-0"
            title="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  // FLOATING BOTTOM TOAST CARD VIEW (DEFAULT)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] rounded-3xl p-5 border shadow-2xl ${themeClasses[offer.theme || "blue"]}`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${accentColors[offer.theme || "blue"]}`}>
              <Gift className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-90">
              {offer.badgeText || "SPECIAL OFFER"}
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 opacity-70 hover:opacity-100 transition-opacity rounded-full hover:bg-white/10"
            title="Dismiss Offer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm font-bold text-white tracking-tight mb-1">
          {offer.title}
        </p>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          {offer.message}
        </p>

        {/* Promo Tag & Countdown Row */}
        <div className="flex items-center justify-between gap-2 mb-4 pt-2 border-t border-white/10 text-xs">
          {offer.discountTag && (
            <div className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg font-mono font-bold text-[11px]">
              <Tag className="w-3 h-3 text-[#38BDF8]" />
              <span>{offer.discountTag}</span>
            </div>
          )}

          {timeLeft && (
            <div className="flex items-center gap-1 text-[11px] font-mono opacity-80 ml-auto">
              <Clock className="w-3 h-3" />
              <span>
                {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
                {String(timeLeft.hours).padStart(2, "0")}h:{String(timeLeft.minutes).padStart(2, "0")}m:{String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={getCtaLink()}
          onClick={handleDismiss}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${accentColors[offer.theme || "blue"]}`}
        >
          <span>{offer.ctaText || "Claim Offer Now"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
