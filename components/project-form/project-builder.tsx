"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/project-form/step-indicator";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Send,
  Globe,
  ShoppingBag,
  Layers,
  Cpu,
  LayoutDashboard,
  Palette,
  Code2,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  FileText,
  Copy,
  Check,
  Zap,
  Smartphone,
  Search,
  Database,
  CreditCard,
  MessageSquare,
  Lock,
  LucideIcon,
  RefreshCw,
  PlusCircle,
  Building2,
  Laptop,
  Mail,
  Phone,
  IndianRupee,
  Tag,
  Gift,
} from "lucide-react";

interface OptionItem {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
}

interface FeatureItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

interface PresetOption {
  id: string;
  name: string;
  icon: LucideIcon;
  projectType: string;
  servicesNeeded: string;
  timeline: string;
  features: string[];
}

export function ProjectBuilder() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");
  const [copiedTicket, setCopiedTicket] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [couponInput, setCouponInput] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponMessage, setCouponMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // Read ?coupon= parameter from URL on load
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCoupon = params.get("coupon") || params.get("code") || params.get("discount");
      if (urlCoupon) {
        const clean = urlCoupon.trim().toUpperCase();
        setCouponInput(clean);
        validateAndApplyCoupon(clean);
      }
    }
  }, []);

  const validateAndApplyCoupon = async (codeToValidate?: string) => {
    const targetCode = (codeToValidate !== undefined ? codeToValidate : couponInput).trim().toUpperCase();
    if (!targetCode) {
      setAppliedCoupon("");
      setCouponMessage({ type: "error", text: "Please enter a coupon code." });
      return;
    }

    // List of standard valid corporate promo codes
    const standardCodes = ["SAVE15", "WELCOME10", "STARTUP20", "FESTIVE15", "VS1000", "LAUNCH15", "VS2026", "SPECIAL15"];
    let isValid = standardCodes.includes(targetCode);

    try {
      const res = await fetch("/api/offers");
      const json = await res.json();
      if (json.success) {
        if (json.activeOffer?.discountTag && json.activeOffer.discountTag.trim().toUpperCase() === targetCode) {
          isValid = true;
        }
        if (json.allOffers && Array.isArray(json.allOffers)) {
          json.allOffers.forEach((o: any) => {
            if (o.discountTag && o.discountTag.trim().toUpperCase() === targetCode) {
              isValid = true;
            }
          });
        }
      }
    } catch {
      // ignore
    }

    if (isValid) {
      setAppliedCoupon(targetCode);
      setCouponMessage({
        type: "success",
        text: `✓ Coupon "${targetCode}" Applied! Special offer discount noted on your project request.`,
      });
    } else {
      setAppliedCoupon("");
      setCouponMessage({
        type: "error",
        text: "Invalid or expired promo code. Please check your code and try again.",
      });
    }
  };

  const [formData, setFormData] = useState({
    projectType: "Website",
    servicesNeeded: "Full Product",
    budgetRange: "₹2,00,000",
    timeline: "Standard (2-4 Weeks)",
    customFeatureText: "",
    description: "",
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "responsive",
    "seo",
    "speed",
  ]);

  const presets: PresetOption[] = [
    {
      id: "corporate",
      name: "Corporate Site",
      icon: Building2,
      projectType: "Website",
      servicesNeeded: "Full Product",
      timeline: "Standard (2-4 Weeks)",
      features: ["responsive", "seo", "speed", "whatsapp"],
    },
    {
      id: "ecommerce",
      name: "Online Store",
      icon: ShoppingBag,
      projectType: "E-commerce",
      servicesNeeded: "Full Product",
      timeline: "Standard (2-4 Weeks)",
      features: ["responsive", "seo", "payments", "cms", "speed"],
    },
    {
      id: "saas",
      name: "Web App / SaaS",
      icon: Laptop,
      projectType: "Web App",
      servicesNeeded: "Coding & Engineering",
      timeline: "Flexible (1-2 Months)",
      features: ["responsive", "cms", "database", "security", "speed"],
    },
    {
      id: "design",
      name: "UI/UX Design",
      icon: Palette,
      projectType: "Website",
      servicesNeeded: "Design Only",
      timeline: "ASAP (1-2 Weeks)",
      features: ["responsive"],
    },
  ];

  const projectTypes: OptionItem[] = [
    { id: "Website", label: "Corporate Website", sub: "Fast marketing & landing sites", icon: Globe },
    { id: "E-commerce", label: "Online Store", sub: "E-commerce & instant checkout flows", icon: ShoppingBag },
    { id: "Web App", label: "Web Application", sub: "Interactive web portals & tools", icon: LayoutDashboard },
    { id: "SaaS", label: "SaaS Platform", sub: "Multi-tenant software & subscription billing", icon: Layers },
    { id: "Custom Software", label: "Enterprise Software", sub: "Tailored business software & ledgers", icon: Cpu },
  ];

  const serviceNeeds: OptionItem[] = [
    { id: "Design Only", label: "UI/UX Design Only", sub: "Figma wireframes & design systems", icon: Palette },
    { id: "Coding & Engineering", label: "Coding & Engineering", sub: "Next.js 16+, TypeScript & API setup", icon: Code2 },
    { id: "Full Product", label: "Full Product (Design + Code)", sub: "End-to-end design & engineering", icon: Sparkles },
    { id: "Speed & Optimization", label: "Speed & SEO Optimization", sub: "Core Web Vitals & feature updates", icon: ShieldCheck },
  ];

  const availableFeatures: FeatureItem[] = [
    { id: "responsive", label: "Mobile Responsive UI", description: "Seamless experience across smartphones, tablets & desktop", icon: Smartphone },
    { id: "seo", label: "Search Engine Optimization (SEO)", description: "Meta tags, sitemaps, JSON-LD schema & Google search indexing", icon: Search },
    { id: "speed", label: "Core Web Vitals & Ultra Speed", description: "Sub-second load speeds with Next.js 16 image & code optimization", icon: Zap },
    { id: "cms", label: "Admin CMS Dashboard", description: "Easy content updates without touching a line of code", icon: Database },
    { id: "payments", label: "Payment Gateway / UPI", description: "Stripe, Razorpay, UPI & instant digital checkout", icon: CreditCard },
    { id: "whatsapp", label: "WhatsApp & Live Leads Bot", description: "Direct customer inquiries routed to your phone & CRM", icon: MessageSquare },
    { id: "security", label: "Enterprise Security & SSL", description: "HTTPS encryption, CORS protection & automated backups", icon: Lock },
    { id: "other", label: "Other / Custom Requirement", description: "Specify custom feature, third-party API, or integration", icon: PlusCircle },
  ];

  const timelineOptions = ["ASAP (1-2 Weeks)", "Standard (2-4 Weeks)", "Flexible (1-2 Months)"];
  const budgetSuggestions = ["₹50,000", "₹1,00,000", "₹2,00,000", "₹5,00,000", "Flexible / Open to discuss"];

  // Smart Budget Auto-Formatting Function
  const handleBudgetChange = (inputValue: string) => {
    if (!inputValue) {
      setFormData((prev) => ({ ...prev, budgetRange: "" }));
      return;
    }

    // Check if input is raw digits
    const cleanNumbers = inputValue.replace(/[^0-9]/g, "");
    if (cleanNumbers.length > 0 && !inputValue.toLowerCase().includes("flexible") && !inputValue.toLowerCase().includes("open")) {
      const parsedNum = parseInt(cleanNumbers, 10);
      if (!isNaN(parsedNum)) {
        const formattedCurrency = `₹${parsedNum.toLocaleString("en-IN")}`;
        setFormData((prev) => ({ ...prev, budgetRange: formattedCurrency }));
        return;
      }
    }

    // If user types text like "Flexible" or includes currency symbol already
    const formattedText = inputValue.startsWith("₹") ? inputValue : `₹${inputValue}`;
    setFormData((prev) => ({ ...prev, budgetRange: formattedText }));
  };

  const applyPreset = (preset: PresetOption) => {
    setFormData((prev) => ({
      ...prev,
      projectType: preset.projectType,
      servicesNeeded: preset.servicesNeeded,
      timeline: preset.timeline,
    }));
    setSelectedFeatures(preset.features);
  };

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: { [key: string]: string } = {};

    if (currentStep === 3) {
      if (!formData.budgetRange.trim()) {
        errs.budget = "Please enter your estimated budget level.";
      }
    }

    if (currentStep === 4) {
      if (!formData.name.trim()) errs.name = "Please enter your full name.";
      if (!formData.email.trim() || !formData.email.includes("@"))
        errs.email = "Please enter a valid email address.";
      if (!formData.description.trim() || formData.description.length < 10)
        errs.description = "Please enter at least 10 characters describing your project goals.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedFeatures,
          couponCode: appliedCoupon || couponInput || "",
        }),
      });

      const resData = await response.json();

      if (resData.success && resData.ticketId) {
        setTicketId(resData.ticketId);
      } else {
        setTicketId(`VS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch {
      setTicketId(`VS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleCopyTicket = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2500);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB]">
      <Container size="default" className="px-3.5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            START A PROJECT WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mt-3">
            Let&apos;s build something remarkable<span className="text-[#2563EB]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5F6368] mt-3 leading-relaxed">
            Answer 4 quick questions to customize your project scope, choose key features, and specify your budget &amp; timeline.
          </p>
        </div>

        {submitted ? (
          /* Submission Success Ticket View */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-[#F7F8FA] border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 text-center flex flex-col items-center gap-6 shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#2563EB]">
                <span>INQUIRY TICKET: {ticketId}</span>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="hover:text-[#1D4ED8] transition-colors focus:outline-none cursor-pointer"
                  title="Copy Ticket ID"
                >
                  {copiedTicket ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mt-3">
                Project Scope Submitted Successfully
              </h3>
            </div>

            <p className="text-sm text-[#5F6368] max-w-md leading-relaxed">
              Thank you <strong className="text-[#111111]">{formData.name}</strong>. We have received your project details for a{" "}
              <strong className="text-[#111111]">{formData.projectType}</strong> ({formData.servicesNeeded}). Our senior engineering team will analyze your requirements and reach out within 24 hours.
            </p>

            {/* Scope Ticket Summary Card */}
            <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-5 text-left text-xs font-mono space-y-3 shadow-2xs">
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2 text-[#5F6368]">
                <span>Category:</span>
                <strong className="text-[#111111] font-bold">{formData.projectType}</strong>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2 text-[#5F6368]">
                <span>Scope:</span>
                <strong className="text-[#111111] font-bold">{formData.servicesNeeded}</strong>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2 text-[#5F6368]">
                <span>Budget Investment Level:</span>
                <strong className="text-[#2563EB] font-bold">{formData.budgetRange}</strong>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2 text-[#5F6368]">
                <span>Timeline:</span>
                <strong className="text-[#111111] font-bold">{formData.timeline}</strong>
              </div>
              {(appliedCoupon || couponInput) && (
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2 text-[#5F6368]">
                  <span>Applied Promo / Coupon:</span>
                  <strong className="text-[#10B981] font-bold flex items-center gap-1 font-mono">
                    <Tag className="w-3 h-3 text-[#10B981]" />
                    <span>{appliedCoupon || couponInput}</span>
                  </strong>
                </div>
              )}
              <div className="pt-1">
                <span className="text-[#5F6368] block mb-1.5 text-[11px]">Selected Features ({selectedFeatures.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFeatures.map((fId) => {
                    const feat = availableFeatures.find((f) => f.id === fId);
                    return feat ? (
                      <span key={fId} className="bg-[#F7F8FA] border border-[#E5E7EB] px-2 py-0.5 rounded text-[10px] text-[#111111] font-sans font-medium">
                        ✓ {feat.label}
                      </span>
                    ) : null;
                  })}
                  {formData.customFeatureText && (
                    <span className="bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded text-[10px] text-[#2563EB] font-sans font-medium">
                      Custom: {formData.customFeatureText}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-2">
              <a
                href={`https://wa.me/917695946750?text=${encodeURIComponent(
                  `Hi VS Business Solutions team, I submitted a project inquiry for a ${formData.projectType}. Ticket ID: ${ticketId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp +91 7695946750</span>
              </a>

              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    projectType: "Website",
                    servicesNeeded: "Full Product",
                    budgetRange: "₹2,00,000",
                    timeline: "Standard (2-4 Weeks)",
                    customFeatureText: "",
                    description: "",
                    name: "",
                    email: "",
                    company: "",
                    phone: "",
                  });
                }}
                iconRight={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Submit Another Request
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Wizard + Sidebar Layout */
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Wizard Main Form (8-cols desktop) */}
            <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm">
              <StepIndicator currentStep={step} totalSteps={4} />

              <form onSubmit={handleSubmit} className="mt-6">
                <AnimatePresence mode="wait">
                  {/* STEP 1: Project Category & Preset Shortcuts */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                          1. WHAT DO YOU WANT TO BUILD?
                        </h3>
                        <p className="text-xs text-[#5F6368] mt-1">
                          Select a project category or click a preset to configure defaults instantly.
                        </p>
                      </div>

                      {/* Presets Bar */}
                      <div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5F6368] block mb-2">
                          QUICK-START PRESETS
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {presets.map((p) => {
                            const Icon = p.icon;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => applyPreset(p)}
                                className="p-3 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] hover:bg-white hover:border-[#2563EB]/40 text-left transition-all cursor-pointer group"
                              >
                                <div className="flex items-center gap-1.5 mb-1">
                                  <Icon className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                                  <span className="text-xs font-bold text-[#111111] block group-hover:text-[#2563EB] transition-colors">
                                    {p.name}
                                  </span>
                                </div>
                                <span className="text-[10px] text-[#5F6368] block">
                                  {p.timeline}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Main Category Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {projectTypes.map((item) => {
                          const isSelected = formData.projectType === item.id;
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setFormData({ ...formData, projectType: item.id })}
                              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                                isSelected
                                  ? "bg-[#111111] text-white border-[#111111] shadow-md scale-101"
                                  : "bg-[#F7F8FA] text-[#111111] border-[#E5E7EB] hover:bg-white hover:border-[#2563EB]/40"
                              }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "bg-[#2563EB] text-white"
                                    : "bg-white border border-[#E5E7EB] text-[#2563EB]"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-sm font-bold block tracking-tight">
                                  {item.label}
                                </span>
                                <span
                                  className={`text-xs block mt-0.5 leading-relaxed ${
                                    isSelected ? "text-gray-300" : "text-[#5F6368]"
                                  }`}
                                >
                                  {item.sub}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Service Scope */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                          2. WHAT HELP DO YOU NEED?
                        </h3>
                        <p className="text-xs text-[#5F6368] mt-1">
                          Select the level of engineering and design expertise required for this project
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceNeeds.map((item) => {
                          const isSelected = formData.servicesNeeded === item.id;
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setFormData({ ...formData, servicesNeeded: item.id })}
                              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                                isSelected
                                  ? "bg-[#111111] text-white border-[#111111] shadow-md scale-101"
                                  : "bg-[#F7F8FA] text-[#111111] border-[#E5E7EB] hover:bg-white hover:border-[#2563EB]/40"
                              }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "bg-[#2563EB] text-white"
                                    : "bg-white border border-[#E5E7EB] text-[#2563EB]"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-sm font-bold block tracking-tight">
                                  {item.label}
                                </span>
                                <span
                                  className={`text-xs block mt-0.5 leading-relaxed ${
                                    isSelected ? "text-gray-300" : "text-[#5F6368]"
                                  }`}
                                >
                                  {item.sub}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Key Features, Budget Input & Timeline */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                          3. FEATURES, INVESTMENT &amp; TIMELINE
                        </h3>
                        <p className="text-xs text-[#5F6368] mt-1">
                          Select key features, specify your budget investment level, and choose launch timeline
                        </p>
                      </div>

                      {/* Feature Checkboxes */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-2.5">
                          Select Desired Features &amp; Add-ons
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {availableFeatures.map((feat) => {
                            const isChecked = selectedFeatures.includes(feat.id);
                            const Icon = feat.icon;
                            return (
                              <div
                                key={feat.id}
                                onClick={() => toggleFeature(feat.id)}
                                className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 ${
                                  isChecked
                                    ? "bg-[#2563EB]/5 border-[#2563EB] text-[#111111]"
                                    : "bg-[#F7F8FA] border-[#E5E7EB] hover:bg-white text-[#5F6368]"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                                    isChecked
                                      ? "bg-[#2563EB] border-[#2563EB] text-white"
                                      : "border-[#D1D5DB] bg-white"
                                  }`}
                                >
                                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <Icon className={`w-3.5 h-3.5 ${isChecked ? "text-[#2563EB]" : "text-[#5F6368]"}`} />
                                    <span className="text-xs font-bold text-[#111111]">
                                      {feat.label}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#5F6368] leading-tight mt-0.5">
                                    {feat.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Interactive "Other" Write-in Field */}
                        {selectedFeatures.includes("other") && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-3 bg-[#F7F8FA] border border-[#2563EB]/30 rounded-xl"
                          >
                            <label className="text-xs font-bold text-[#111111] block mb-1">
                              Specify Your Custom Requirement / Feature *
                            </label>
                            <input
                              type="text"
                              value={formData.customFeatureText}
                              onChange={(e) => setFormData({ ...formData, customFeatureText: e.target.value })}
                              placeholder="e.g., Custom ERP API connection, Multi-currency checkout, CRM sync..."
                              className="w-full p-2.5 text-xs rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Interactive Budget Input with Auto-Formatting */}
                      <div className="pt-4 border-t border-[#E5E7EB]">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                            <IndianRupee className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>BUDGET INVESTMENT LEVEL</span>
                          </label>
                          <span className="text-[10px] text-[#5F6368]">Enter amount or select shortcut</span>
                        </div>

                        {/* Text Input with Auto-Format */}
                        <div className="relative mb-2.5">
                          <input
                            type="text"
                            value={formData.budgetRange}
                            onChange={(e) => handleBudgetChange(e.target.value)}
                            placeholder="Enter estimated budget (e.g. ₹1,50,000 or Flexible)"
                            className="w-full p-3 text-sm font-semibold rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#111111]"
                          />
                        </div>

                        {errors.budget && (
                          <span className="text-xs text-red-500 block mb-2 font-medium">{errors.budget}</span>
                        )}

                        {/* Dynamic Quick Suggestion Chips */}
                        <div className="flex flex-wrap gap-1.5 items-center">
                          <span className="text-[11px] text-[#5F6368] mr-1">Quick Shortcuts:</span>
                          {budgetSuggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => handleBudgetChange(suggestion)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 cursor-pointer ${
                                formData.budgetRange === suggestion
                                  ? "bg-[#2563EB] text-white shadow-2xs"
                                  : "bg-[#F7F8FA] text-[#111111] border border-[#E5E7EB] hover:bg-white hover:border-[#2563EB]/40"
                              }`}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Timeline Selection */}
                      <div className="pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-2">
                          Preferred Launch Timeline
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {timelineOptions.map((t) => {
                            const isSelected = formData.timeline === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setFormData({ ...formData, timeline: t })}
                                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? "bg-[#111111] text-white shadow-xs"
                                    : "bg-[#F7F8FA] text-[#5F6368] border border-[#E5E7EB] hover:bg-white"
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Promo / Coupon Code Section */}
                      <div className="pt-4 border-t border-[#E5E7EB]">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>PROMO / COUPON CODE (OPTIONAL)</span>
                          </label>
                          <span className="text-[10px] text-[#5F6368]">Enter promo tag for special discounts</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => {
                                const val = e.target.value.toUpperCase();
                                setCouponInput(val);
                                if (appliedCoupon && val !== appliedCoupon) {
                                  setAppliedCoupon("");
                                  setCouponMessage(null);
                                }
                              }}
                              placeholder="Enter promo or coupon code"
                              className="w-full p-2.5 text-xs font-mono font-bold uppercase rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#111111]"
                            />
                            {appliedCoupon && (
                              <span className="absolute right-3 top-2.5 text-[11px] font-mono font-bold text-[#10B981]">
                                ✓ APPLIED
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => validateAndApplyCoupon(couponInput)}
                            className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#2563EB] text-white text-xs font-bold transition-colors shrink-0 cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>

                        {couponMessage && (
                          <p className={`text-xs mt-2 font-medium flex items-center gap-1 ${couponMessage.type === "success" ? "text-[#10B981]" : "text-red-500"}`}>
                            <span>{couponMessage.text}</span>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Project Summary & Contact Information */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                          4. TELL US ABOUT YOUR PROJECT
                        </h3>
                        <p className="text-xs text-[#5F6368] mt-1">
                          Provide your contact details so our team can send you a detailed scope proposal
                        </p>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#111111] block mb-1">
                          Project Summary &amp; Goals *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Describe what you want to achieve, your target audience, or specific features you need..."
                          className="w-full p-3 text-sm rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                        {errors.description && (
                          <span className="text-xs text-red-500 mt-1 block font-medium">{errors.description}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-[#111111] block mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full p-3 text-sm rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                          />
                          {errors.name && (
                            <span className="text-xs text-red-500 mt-1 block font-medium">{errors.name}</span>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#111111] block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@company.com"
                            className="w-full p-3 text-sm rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                          />
                          {errors.email && (
                            <span className="text-xs text-red-500 mt-1 block font-medium">{errors.email}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-[#111111] block mb-1">
                            Company / Organization (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Inc."
                            className="w-full p-3 text-sm rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#111111] block mb-1">
                            Phone / WhatsApp (Optional)
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 7695946750"
                            className="w-full p-3 text-sm rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Step Navigation Bar */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E5E7EB]">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleBack}
                      iconRight={<ArrowLeft className="w-4 h-4 order-first mr-1" />}
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleNext}
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      iconRight={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? "Submitting Scope..." : "Send Project Request →"}
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Live Scope Summary & Contact Sidebar (4-cols desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Scope Summary Sidebar */}
              <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-3xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#2563EB]" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                      LIVE SCOPE SUMMARY
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold bg-[#2563EB]/10 text-[#2563EB] px-2 py-0.5 rounded-full">
                    STEP {step}/4
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#5F6368] block text-[11px]">Product Category:</span>
                    <strong className="text-[#111111] font-bold">{formData.projectType}</strong>
                  </div>

                  <div>
                    <span className="text-[#5F6368] block text-[11px]">Services Scope:</span>
                    <strong className="text-[#111111] font-bold">{formData.servicesNeeded}</strong>
                  </div>

                  <div>
                    <span className="text-[#5F6368] block text-[11px]">Budget Investment Level:</span>
                    <strong className="text-[#2563EB] font-bold">{formData.budgetRange || "Not specified yet"}</strong>
                  </div>

                  <div>
                    <span className="text-[#5F6368] block text-[11px]">Target Timeline:</span>
                    <strong className="text-[#111111] font-bold">{formData.timeline}</strong>
                  </div>

                  {appliedCoupon && (
                    <div>
                      <span className="text-[#5F6368] block text-[11px]">Promo / Coupon Applied:</span>
                      <strong className="text-[#10B981] font-bold inline-flex items-center gap-1 font-mono text-xs">
                        <Tag className="w-3 h-3 text-[#10B981]" />
                        <span>{appliedCoupon}</span>
                      </strong>
                    </div>
                  )}

                  {(selectedFeatures.length > 0 || formData.customFeatureText) && (
                    <div className="pt-2 border-t border-[#E5E7EB]/80">
                      <span className="text-[#5F6368] block text-[11px] mb-1.5">Selected Add-ons ({selectedFeatures.length}):</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedFeatures.map((fId) => {
                          const f = availableFeatures.find((item) => item.id === fId);
                          return f ? (
                            <span key={fId} className="bg-white border border-[#E5E7EB] px-2 py-0.5 rounded text-[10px] font-medium text-[#111111]">
                              ✓ {f.label.split(" ")[0]} {f.label.split(" ")[1] || ""}
                            </span>
                          ) : null;
                        })}
                        {formData.customFeatureText && (
                          <span className="bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded text-[10px] text-[#2563EB] font-medium">
                            ✓ {formData.customFeatureText}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5E7EB] text-[11px] text-[#5F6368] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>100% Confidential &amp; NDA Protected</span>
                </div>
              </div>

              {/* Direct Engineering Lead Consultation Card */}
              <div className="bg-[#0F172A] text-white rounded-3xl p-5 sm:p-6 shadow-md border border-[#1E293B]">
                <div className="flex items-center gap-2 text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>PREFER DIRECT CONSULTATION?</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1 leading-snug">
                  Speak directly with our technical lead
                </h4>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  Need custom enterprise architecture or urgent execution? Reach out directly via call, WhatsApp, or email.
                </p>

                <div className="flex flex-col gap-2.5">
                  {/* Phone Call / WhatsApp Button */}
                  <a
                    href="tel:+917695946750"
                    className="inline-flex items-center justify-between text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-3 rounded-xl transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>Call +91 7695946750</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Email Link Button */}
                  <a
                    href="mailto:vsgroupstn@gmail.com"
                    className="inline-flex items-center justify-between text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-4 py-2.5 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span className="truncate">vsgroupstn@gmail.com</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
