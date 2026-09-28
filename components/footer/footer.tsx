import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Mail, Phone, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E7EB] pt-16 pb-12">
      <Container size="default">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/Brand_Logo.png"
                alt="VS Business Solutions Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded-lg shadow-2xs transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-semibold text-lg text-[#111111] tracking-tight">
                VS BUSINESS<span className="text-[#2563EB]">.</span>
              </span>
            </Link>
            <p className="text-[#5F6368] text-sm max-w-sm leading-relaxed">
              VS Business Solutions — Building modern digital products, fast websites, and scalable software experiences for ambitious businesses.
            </p>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5F6368]">
              <li><a href="#services" className="hover:text-[#111111] transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-[#111111] transition-colors">Work</a></li>
              <li><a href="#process" className="hover:text-[#111111] transition-colors">Process</a></li>
              <li><a href="#about" className="hover:text-[#111111] transition-colors">About</a></li>
              <li><a href="/start-project" className="hover:text-[#111111] transition-colors">Launch Project Scope</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] mb-4">
              Services
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5F6368]">
              <li><span className="hover:text-[#111111] transition-colors cursor-pointer">Websites</span></li>
              <li><span className="hover:text-[#111111] transition-colors cursor-pointer">Web Applications</span></li>
              <li><span className="hover:text-[#111111] transition-colors cursor-pointer">E-commerce Stores</span></li>
              <li><span className="hover:text-[#111111] transition-colors cursor-pointer">SaaS Platforms</span></li>
              <li><span className="hover:text-[#111111] transition-colors cursor-pointer">API &amp; Backend</span></li>
            </ul>
          </div>

          {/* Contact & Communication */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] mb-4">
              Contact Us
            </p>
            <ul className="flex flex-col gap-3 text-sm text-[#5F6368]">
              <li>
                <a href="mailto:vsgroupstn@gmail.com" className="hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>vsgroupstn@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+917695946750" className="hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>+91 7695946750</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917695946750"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#10B981] transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8F98]">
          <p>© 2026 VS Business Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#5F6368] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#5F6368] cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
