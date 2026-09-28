"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Search,
  Mail,
  Phone,
  MessageSquare,
  RefreshCw,
  Download,
  Calendar,
  Building,
  User,
  Trash2,
  Lock,
  Database,
  Edit3,
  LogOut,
  Gift,
  Tag,
  Clock,
  ArrowRight,
  Eye,
  Plus,
  Zap,
  CheckCircle2,
} from "lucide-react";

interface InquiryItem {
  ticketId: string;
  createdAt: string;
  status: "New" | "In Contact" | "Quoted" | "Converted" | "Archived";
  adminNotes?: string;
  couponCode?: string;
  client: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  project: {
    type: string;
    scope: string;
    budget: string;
    timeline: string;
    features: string[];
    customFeatureText?: string;
    description: string;
  };
}

interface OfferConfig {
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

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || process.env.ADMIN_PIN || "052005";

export default function RealAdminInquiriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Admin Section Tab: 'inquiries' | 'offers'
  const [adminTab, setAdminTab] = useState<"inquiries" | "offers">("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [storageMode, setStorageMode] = useState<string>("json_file");

  // Offer State
  const [offers, setOffers] = useState<OfferConfig[]>([]);
  const [loadingOffers, setLoadingOffers] = useState<boolean>(false);
  const [savingOffer, setSavingOffer] = useState<boolean>(false);
  const [offerSuccessMsg, setOfferSuccessMsg] = useState<string>("");

  // Form state for creating/editing an offer
  const [offerForm, setOfferForm] = useState<OfferConfig>({
    title: "Special Festival Season Offer",
    message: "Get 15% off on custom Next.js Web Development & E-Commerce platforms!",
    discountTag: "SAVE15",
    badgeText: "LIMITED PERIOD OFFER",
    ctaText: "Claim 15% Discount →",
    ctaLink: "/start-project",
    theme: "blue",
    position: "floating-toast",
    isActive: true,
    expiresAt: "2026-12-31T23:59",
  });

  // State for active note editing
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>("");

  // Check auth session on load
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("vs_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      fetchInquiries();
      fetchOffers();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("vs_admin_auth", "true");
      setPinError("");
      fetchInquiries();
      fetchOffers();
    } else {
      setPinError("Invalid Security PIN. Access denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("vs_admin_auth");
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch("/api/project-inquiry");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInquiries(json.data);
        if (json.storageMode) setStorageMode(json.storageMode);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const fetchOffers = async () => {
    setLoadingOffers(true);
    try {
      const res = await fetch("/api/offers");
      const json = await res.json();
      if (json.success && Array.isArray(json.allOffers)) {
        setOffers(json.allOffers);
        if (json.activeOffer) {
          setOfferForm({
            ...json.activeOffer,
            expiresAt: json.activeOffer.expiresAt
              ? new Date(json.activeOffer.expiresAt).toISOString().slice(0, 16)
              : "",
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch offers", err);
    } finally {
      setLoadingOffers(false);
    }
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingOffer(true);
    setOfferSuccessMsg("");

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerForm),
      });

      const json = await res.json();
      if (json.success) {
        setOfferSuccessMsg("Offer notification updated and published live!");
        fetchOffers();
        setTimeout(() => setOfferSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Error saving offer:", err);
    } finally {
      setSavingOffer(false);
    }
  };

  const handleToggleOfferActive = async (offerId: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/offers/${offerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentActive }),
      });
      const json = await res.json();
      if (json.success) {
        fetchOffers();
      }
    } catch (err) {
      console.error("Error toggling offer:", err);
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    if (!confirm("Are you sure you want to delete this offer configuration?")) return;
    try {
      const res = await fetch(`/api/offers/${offerId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchOffers();
      }
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/project-inquiry/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.ticketId === ticketId ? { ...item, status: newStatus as any } : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleSaveNote = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/project-inquiry/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: tempNoteText }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.ticketId === ticketId ? { ...item, adminNotes: tempNoteText } : item
          )
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error("Error saving admin note:", err);
    }
  };

  const handleDeleteInquiry = async (ticketId: string) => {
    if (!confirm(`Are you sure you want to delete inquiry ticket ${ticketId}?`)) return;
    try {
      const res = await fetch(`/api/project-inquiry/${ticketId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) => prev.filter((item) => item.ticketId !== ticketId));
      }
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vs_inquiries_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered list
  const filteredInquiries = inquiries.filter((item) => {
    const matchesTab = activeTab === "All" || item.status === activeTab;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.ticketId.toLowerCase().includes(term) ||
      item.client.name.toLowerCase().includes(term) ||
      item.client.email.toLowerCase().includes(term) ||
      item.project.type.toLowerCase().includes(term) ||
      (item.couponCode && item.couponCode.toLowerCase().includes(term)) ||
      (item.client.company && item.client.company.toLowerCase().includes(term));
    return matchesTab && matchesSearch;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New" || !i.status).length;
  const contactCount = inquiries.filter((i) => i.status === "In Contact").length;
  const convertedCount = inquiries.filter((i) => i.status === "Converted").length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 antialiased text-white">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#38BDF8] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Admin Portal Access</h1>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Enter your VS Business Solutions Admin PIN to manage inquiries and configure live offer notifications.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin PIN"
                className="w-full p-3.5 text-center text-sm font-mono tracking-widest rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-[#2563EB]"
              />
              {pinError && <span className="text-xs text-red-400 mt-2 block">{pinError}</span>}
            </div>

            <Button variant="primary" size="md" className="w-full">
              Unlock Admin Panel →
            </Button>
          </form>


        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#111111] antialiased pb-24">
      {/* Top Navigation Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        <Container size="default" className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              VS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[#111111]">VS BUSINESS SOLUTIONS</h1>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2 py-0.5 rounded-full">
                  REAL ADMIN PANEL
                </span>
              </div>
              <p className="text-xs text-[#5F6368]">Client Leads, MongoDB Database &amp; Offer Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Storage Mode Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-xs font-mono">
              <Database className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[#5F6368]">DB:</span>
              <strong className="text-[#111111] font-bold">
                {storageMode === "mongodb" ? "MongoDB Atlas Connected" : "Local Disk JSON"}
              </strong>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchInquiries();
                fetchOffers();
              }}
              iconRight={<RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? "animate-spin" : ""}`} />}
            >
              Sync DB
            </Button>

            <button
              onClick={handleLogout}
              className="p-2 text-[#5F6368] hover:text-red-600 transition-colors rounded-xl border border-[#E5E7EB] bg-white hover:bg-red-50"
              title="Lock Admin Panel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </Container>
      </header>

      {/* Main Admin Section Switcher Tabs */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <Container size="default" className="flex items-center gap-6 text-xs font-bold">
          <button
            onClick={() => setAdminTab("inquiries")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${adminTab === "inquiries"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#5F6368] hover:text-[#111111]"
              }`}
          >
            <FileText className="w-4 h-4" />
            <span>Client Inquiries ({totalCount})</span>
          </button>

          <button
            onClick={() => setAdminTab("offers")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${adminTab === "offers"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#5F6368] hover:text-[#111111]"
              }`}
          >
            <Gift className="w-4 h-4 text-[#2563EB]" />
            <span>Offer &amp; Announcement Manager</span>
            <span className="bg-[#2563EB]/10 text-[#2563EB] text-[10px] px-2 py-0.5 rounded-full font-mono">
              NEW
            </span>
          </button>
        </Container>
      </div>

      <Container size="default" className="pt-8">
        {/* ================= SECTION 1: CLIENT INQUIRIES TAB ================= */}
        {adminTab === "inquiries" && (
          <div>
            {/* Analytics Counter Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#5F6368] uppercase">TOTAL INQUIRIES</span>
                <div className="text-3xl font-extrabold text-[#111111] mt-2">{totalCount}</div>
                <p className="text-[11px] text-[#5F6368] mt-1">Recorded in database</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#2563EB] uppercase">NEW LEADS</span>
                <div className="text-3xl font-extrabold text-[#2563EB] mt-2">{newCount}</div>
                <p className="text-[11px] text-[#5F6368] mt-1">Awaiting first contact</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase">IN CONTACT</span>
                <div className="text-3xl font-extrabold text-[#F59E0B] mt-2">{contactCount}</div>
                <p className="text-[11px] text-[#5F6368] mt-1">Active discussions</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#10B981] uppercase">CONVERTED CLIENTS</span>
                <div className="text-3xl font-extrabold text-[#10B981] mt-2">{convertedCount}</div>
                <p className="text-[11px] text-[#5F6368] mt-1">Successfully onboarded</p>
              </div>
            </div>

            {/* Filter Tabs & Search Control */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {["All", "New", "In Contact", "Quoted", "Converted", "Archived"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === tab
                      ? "bg-[#111111] text-white shadow-2xs"
                      : "bg-[#F7F8FA] text-[#5F6368] border border-[#E5E7EB] hover:bg-white hover:text-[#111111]"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#5F6368] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ticket, name, email..."
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            {/* Inquiry Leads List */}
            {loadingInquiries ? (
              <div className="text-center py-20 bg-white border border-[#E5E7EB] rounded-3xl shadow-xs">
                <RefreshCw className="w-8 h-8 text-[#2563EB] animate-spin mx-auto mb-3" />
                <p className="text-xs text-[#5F6368] font-mono">Syncing database records...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E5E7EB] rounded-3xl shadow-xs">
                <FileText className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#111111]">No Inquiries Found</h3>
                <p className="text-xs text-[#5F6368] mt-1">
                  {searchTerm ? "No tickets match your search criteria." : "Project submissions from the website will automatically appear here."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((item) => {
                  const currentStatus = item.status || "New";

                  return (
                    <div
                      key={item.ticketId}
                      className="bg-white border border-[#E5E7EB] rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-sm transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E5E7EB] pb-4 mb-4 gap-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono font-bold px-3 py-1 rounded-full">
                            TICKET: {item.ticketId}
                          </span>

                          {item.couponCode && (
                            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1">
                              <Tag className="w-3 h-3 text-emerald-600" />
                              <span>COUPON: {item.couponCode}</span>
                            </span>
                          )}

                          <span className="text-xs text-[#5F6368] flex items-center gap-1.5 font-mono">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-[#5F6368] uppercase">STATUS:</span>
                          <select
                            value={currentStatus}
                            onChange={(e) => handleStatusChange(item.ticketId, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${currentStatus === "New"
                              ? "bg-blue-50 text-[#2563EB] border-blue-200"
                              : currentStatus === "In Contact"
                                ? "bg-amber-50 text-amber-600 border-amber-200"
                                : currentStatus === "Quoted"
                                  ? "bg-purple-50 text-purple-600 border-purple-200"
                                  : currentStatus === "Converted"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-gray-100 text-gray-600 border-gray-200"
                              }`}
                          >
                            <option value="New">🟢 New Lead</option>
                            <option value="In Contact">🟡 In Contact</option>
                            <option value="Quoted">🟣 Quoted</option>
                            <option value="Converted">✅ Converted Client</option>
                            <option value="Archived">📁 Archived</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(item.ticketId)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-1"
                            title="Delete Inquiry Ticket"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 space-y-3 bg-[#F7F8FA] p-4 rounded-2xl border border-[#E5E7EB] text-xs">
                          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                            <div className="flex items-center gap-2 text-[#111111] font-bold text-sm">
                              <User className="w-4 h-4 text-[#2563EB]" />
                              <span>{item.client.name}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-[#5F6368]">
                            <Mail className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
                            <a href={`mailto:${item.client.email}`} className="hover:text-[#2563EB] font-mono truncate">
                              {item.client.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-2 text-[#5F6368]">
                            <Phone className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
                            <span className="font-mono">{item.client.phone}</span>
                          </div>

                          {item.client.company && item.client.company !== "N/A" && (
                            <div className="flex items-center gap-2 text-[#5F6368]">
                              <Building className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
                              <span>{item.client.company}</span>
                            </div>
                          )}

                          <div className="pt-2 flex items-center gap-2">
                            <a
                              href={`mailto:${item.client.email}?subject=${encodeURIComponent(
                                `VS Business Solutions - Regarding Inquiry Ticket ${item.ticketId}`
                              )}`}
                              className="flex-1 py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Reply Email</span>
                            </a>

                            {item.client.phone && item.client.phone !== "N/A" && (
                              <a
                                href={`https://wa.me/${item.client.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Hi ${item.client.name}, this is VS Business Solutions regarding your inquiry ticket ${item.ticketId}.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 px-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-7 space-y-3">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-white p-3 rounded-xl border border-[#E5E7EB]">
                            <div>
                              <span className="text-[10px] text-[#5F6368] block">Category:</span>
                              <strong className="text-[#111111]">{item.project.type}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#5F6368] block">Scope:</span>
                              <strong className="text-[#111111]">{item.project.scope}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#5F6368] block">Budget:</span>
                              <strong className="text-[#2563EB]">{item.project.budget}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#5F6368] block">Timeline:</span>
                              <strong className="text-[#111111]">{item.project.timeline}</strong>
                            </div>
                          </div>

                          {item.project.features && item.project.features.length > 0 && (
                            <div>
                              <span className="text-[11px] font-mono font-bold text-[#5F6368] block mb-1">Requested Features:</span>
                              <div className="flex flex-wrap gap-1">
                                {item.project.features.map((feat) => (
                                  <span key={feat} className="bg-[#F7F8FA] border border-[#E5E7EB] text-[#111111] text-[10px] px-2 py-0.5 rounded font-sans font-medium">
                                    ✓ {feat}
                                  </span>
                                ))}
                                {item.project.customFeatureText && (
                                  <span className="bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[10px] px-2 py-0.5 rounded font-sans font-medium">
                                    Custom: {item.project.customFeatureText}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          <div>
                            <span className="text-[11px] font-mono font-bold text-[#5F6368] block mb-1">Client Description:</span>
                            <p className="text-xs text-[#111111] bg-[#F7F8FA] p-3 rounded-xl border border-[#E5E7EB] leading-relaxed whitespace-pre-wrap">
                              {item.project.description}
                            </p>
                          </div>

                          <div className="pt-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] font-mono font-bold text-[#2563EB] uppercase flex items-center gap-1">
                                <Edit3 className="w-3 h-3" />
                                Internal Admin Notes
                              </span>

                              {editingNotesId !== item.ticketId && (
                                <button
                                  onClick={() => {
                                    setEditingNotesId(item.ticketId);
                                    setTempNoteText(item.adminNotes || "");
                                  }}
                                  className="text-[11px] text-[#2563EB] font-bold hover:underline"
                                >
                                  {item.adminNotes ? "Edit Note" : "+ Add Note"}
                                </button>
                              )}
                            </div>

                            {editingNotesId === item.ticketId ? (
                              <div className="space-y-2">
                                <textarea
                                  rows={2}
                                  value={tempNoteText}
                                  onChange={(e) => setTempNoteText(e.target.value)}
                                  placeholder="Write private internal note about this client/lead..."
                                  className="w-full p-2.5 text-xs rounded-xl border border-[#2563EB]/40 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                />
                                <div className="flex items-center gap-2 justify-end">
                                  <button
                                    onClick={() => setEditingNotesId(null)}
                                    className="px-3 py-1 rounded-lg text-xs font-bold border border-[#E5E7EB] text-[#5F6368] hover:bg-gray-100"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveNote(item.ticketId)}
                                    className="px-3 py-1 rounded-lg text-xs font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-[#5F6368] bg-amber-50/50 border border-amber-200/60 p-2.5 rounded-xl">
                                {item.adminNotes ? (
                                  <p className="text-[#111111] italic">{item.adminNotes}</p>
                                ) : (
                                  <span className="text-gray-400 text-[11px]">No internal notes added yet.</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION 2: OFFER & ANNOUNCEMENT MANAGER TAB ================= */}
        {adminTab === "offers" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Configure Form */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#2563EB]" />
                    <h2 className="text-lg font-bold text-[#111111]">Configure Offer Notification</h2>
                  </div>
                  <p className="text-xs text-[#5F6368] mt-0.5">
                    Customize headlines, promo tags, countdown timers, and color themes for website visitors.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#5F6368]">Active State:</span>
                  <button
                    type="button"
                    onClick={() => setOfferForm({ ...offerForm, isActive: !offerForm.isActive })}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${offerForm.isActive
                      ? "bg-[#10B981] text-white"
                      : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {offerForm.isActive ? "🟢 Active Live" : "⚪ Inactive"}
                  </button>
                </div>
              </div>

              {offerSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-3.5 rounded-xl mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{offerSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveOffer} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#111111] block mb-1">
                    Offer Title / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={offerForm.title}
                    onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    placeholder="e.g., Special Festival Season Discount"
                    className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] block mb-1">
                    Offer Message &amp; Subtitle *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={offerForm.message}
                    onChange={(e) => setOfferForm({ ...offerForm, message: e.target.value })}
                    placeholder="e.g., Get 15% off on custom Next.js Web Development & E-Commerce platforms!"
                    className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">
                      Promo / Discount Code Tag (Optional)
                    </label>
                    <input
                      type="text"
                      value={offerForm.discountTag || ""}
                      onChange={(e) => setOfferForm({ ...offerForm, discountTag: e.target.value })}
                      placeholder="Enter custom promo code"
                      className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">
                      Badge Label Text
                    </label>
                    <input
                      type="text"
                      value={offerForm.badgeText || ""}
                      onChange={(e) => setOfferForm({ ...offerForm, badgeText: e.target.value })}
                      placeholder="e.g., LIMITED OFFER"
                      className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={offerForm.ctaText}
                      onChange={(e) => setOfferForm({ ...offerForm, ctaText: e.target.value })}
                      placeholder="e.g., Claim 15% Discount →"
                      className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">
                      CTA Destination Link
                    </label>
                    <input
                      type="text"
                      value={offerForm.ctaLink}
                      onChange={(e) => setOfferForm({ ...offerForm, ctaLink: e.target.value })}
                      placeholder="e.g., /start-project"
                      className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">
                      Notification Format / Position
                    </label>
                    <select
                      value={offerForm.position}
                      onChange={(e) => setOfferForm({ ...offerForm, position: e.target.value as any })}
                      className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option value="floating-toast">💬 Floating Toast Card (Bottom Right)</option>
                      <option value="top-bar">📢 Top Announcement Bar (Header)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">
                      Visual Color Theme
                    </label>
                    <select
                      value={offerForm.theme}
                      onChange={(e) => setOfferForm({ ...offerForm, theme: e.target.value as any })}
                      className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option value="blue">🔵 Deep Navy Blue (Corporate)</option>
                      <option value="emerald">🟢 Emerald Green (Discount / Sale)</option>
                      <option value="amber">🟠 Amber Gold (Luxury)</option>
                      <option value="purple">🟣 Royal Purple (Special Event)</option>
                      <option value="dark">⚫ Dark Glassmorphism</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] block mb-1">
                    Offer Expiration Date &amp; Time (Countdown Timer)
                  </label>
                  <input
                    type="datetime-local"
                    value={offerForm.expiresAt || ""}
                    onChange={(e) => setOfferForm({ ...offerForm, expiresAt: e.target.value })}
                    className="w-full p-3 text-xs rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <p className="text-[11px] text-[#5F6368] mt-1">
                    Displays a real-time live countdown timer (e.g. 02d 14h 32m) on the frontend notification banner.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB]">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={savingOffer}
                    iconRight={<Zap className="w-4 h-4" />}
                  >
                    {savingOffer ? "Publishing Live..." : "Publish Live Offer Notification →"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right 5 Cols: Live Interactive Preview & History */}
            <div className="lg:col-span-5 space-y-6">
              {/* Live Preview Box */}
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-xs">
                <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-3 mb-4">
                  <Eye className="w-4 h-4 text-[#2563EB]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                    LIVE FRONTEND PREVIEW
                  </h3>
                </div>

                <p className="text-xs text-[#5F6368] mb-4">
                  This preview renders exactly how your notification banner will look to live website visitors:
                </p>

                {/* Simulated Preview Rendering */}
                <div className="border border-dashed border-[#D1D5DB] rounded-2xl p-4 bg-[#F7F8FA]">
                  <div
                    className={`rounded-2xl p-4 text-white shadow-xl ${offerForm.theme === "blue"
                      ? "bg-[#0F172A] border border-[#2563EB]/40"
                      : offerForm.theme === "emerald"
                        ? "bg-[#064E3B] border border-[#10B981]/40"
                        : offerForm.theme === "amber"
                          ? "bg-[#78350F] border border-[#F59E0B]/40"
                          : offerForm.theme === "purple"
                            ? "bg-[#4C1D95] border border-purple-500/40"
                            : "bg-[#111111] border border-slate-700"
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-mono font-bold uppercase bg-white/20 px-2 py-0.5 rounded text-white">
                        {offerForm.badgeText || "LIMITED OFFER"}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">{offerForm.title}</h4>
                    <p className="text-xs opacity-90 mb-3 leading-relaxed">{offerForm.message}</p>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] font-mono">
                      {offerForm.discountTag && (
                        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                          <Tag className="w-3 h-3 text-[#38BDF8]" />
                          <span>{offerForm.discountTag}</span>
                        </div>
                      )}
                      {offerForm.expiresAt && (
                        <div className="flex items-center gap-1 opacity-80 ml-auto">
                          <Clock className="w-3 h-3" />
                          <span>Expires soon</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 py-2 px-3 rounded-xl bg-white text-black text-xs font-bold text-center inline-flex items-center justify-center gap-1 w-full">
                      <span>{offerForm.ctaText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Offer History */}
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-xs">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] mb-3">
                  SAVED OFFER CONFIGURATIONS ({offers.length})
                </h3>

                {offers.length === 0 ? (
                  <p className="text-xs text-[#5F6368]">No historical offers saved.</p>
                ) : (
                  <div className="space-y-2.5">
                    {offers.map((o) => (
                      <div
                        key={o._id || o.id}
                        className="p-3 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] flex items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#111111] font-bold">{o.title}</strong>
                            {o.isActive ? (
                              <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] font-bold px-2 py-0.5 rounded-full">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                INACTIVE
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#5F6368] block mt-0.5 truncate max-w-xs">
                            {o.message}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleOfferActive(o._id || o.id!, o.isActive)}
                            className="p-1.5 text-xs text-[#2563EB] hover:bg-white rounded-lg border border-[#E5E7EB]"
                            title="Toggle Active Status"
                          >
                            {o.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteOffer(o._id || o.id!)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                            title="Delete Offer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
