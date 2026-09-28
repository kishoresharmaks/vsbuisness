"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
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
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 bg-white border-b border-[#E5E7EB] z-50 p-6 pt-20 md:hidden shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-[#5F6368] hover:text-[#111111]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col gap-6 mb-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="text-2xl font-semibold text-[#111111] hover:text-[#2563EB] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#E5E7EB]">
              <a href="#contact" onClick={onClose} className="block w-full">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  Start a project
                </Button>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
