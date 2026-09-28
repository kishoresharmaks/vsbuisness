"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall, Mail, Sparkles } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  activeSection?: string;
}

export function MobileMenu({ isOpen, onClose, links, activeSection }: MobileMenuProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-40 md:hidden pointer-events-auto"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-blue-100 z-50 p-6 pt-22 md:hidden shadow-2xl rounded-b-3xl pointer-events-auto overflow-hidden"
          >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-indigo-500 to-[#2563EB]" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-5"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5">
                {links.map((link) => {
                  const isActive = activeSection === link.label;
                  return (
                    <motion.a
                      key={link.label}
                      variants={itemVariants}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                        isActive
                          ? "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]"
                          : "text-slate-800 hover:text-[#2563EB] hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && <span className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                        {link.label}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? "text-[#2563EB] translate-x-1" : "text-slate-400"
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </nav>

              {/* Direct Contact Cards */}
              <motion.div
                variants={itemVariants}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-2.5"
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Quick Connect
                </div>

                <a
                  href="tel:+917695946750"
                  className="flex items-center gap-3 text-xs font-semibold text-slate-700 hover:text-[#2563EB]"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB]">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <span>+91 7695946750</span>
                </a>

                <a
                  href="mailto:vsgroupstn@gmail.com"
                  className="flex items-center gap-3 text-xs font-semibold text-slate-700 hover:text-[#2563EB]"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>vsgroupstn@gmail.com</span>
                </a>
              </motion.div>

              {/* Start Project CTA Button */}
              <motion.div variants={itemVariants} className="pt-1">
                <a href="#contact" onClick={onClose} className="block w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center rounded-2xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold shadow-lg shadow-[#2563EB]/25 py-3.5"
                    iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-blue-200 animate-pulse" />
                    Start a Project
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
