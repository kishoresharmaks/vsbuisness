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
  Zap,
  CheckCircle2,
  BarChart3,
  Globe,
  MapPin,
  TrendingUp,
  Users,
  Smartphone,
  Laptop,
  MousePointer,
  Share2,
  Send,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Link2,
  Layers,
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

const getCountryFlag = (code: string) => {
  if (!code || code === "UN" || code === "XX") return "🌐";
  try {
    const codePoints = code
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🌐";
  }
};

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || process.env.ADMIN_PIN || "052005";

export default function RealAdminInquiriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Admin Section Tab: 'inquiries' | 'offers' | 'analytics'
  const [adminTab, setAdminTab] = useState<"inquiries" | "offers" | "analytics">("inquiries");

  // Analytics State & Date/Day Filter
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<"all" | "today" | "yesterday" | "7days" | "30days" | "custom">("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [logsPage, setLogsPage] = useState<number>(1);

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
      fetchAnalytics("all", "", "");
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
      fetchAnalytics(analyticsTimeframe, startDate, endDate);
    } else {
      setPinError("Invalid Security PIN. Access denied.");
    }
  };

  const fetchAnalytics = async (
    tf: string = analyticsTimeframe,
    sDate: string = startDate,
    eDate: string = endDate
  ) => {
    setLoadingAnalytics(true);
    try {
      const params = new URLSearchParams();
      if (tf) params.set("timeframe", tf);
      if (tf === "custom") {
        if (sDate) params.set("startDate", sDate);
        if (eDate) params.set("endDate", eDate);
      }
      const res = await fetch(`/api/admin/analytics?${params.toString()}`);
      const json = await res.json();
      if (json.success && json.data) {
        setAnalyticsData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoadingAnalytics(false);
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
                fetchAnalytics();
              }}
              iconRight={<RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries || loadingAnalytics ? "animate-spin" : ""}`} />}
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
        <Container size="default" className="flex items-center gap-6 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setAdminTab("inquiries")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${adminTab === "inquiries"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#5F6368] hover:text-[#111111]"
              }`}
          >
            <FileText className="w-4 h-4" />
            <span>Client Inquiries ({totalCount})</span>
          </button>

          <button
            onClick={() => {
              setAdminTab("analytics");
              fetchAnalytics();
            }}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${adminTab === "analytics"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#5F6368] hover:text-[#111111]"
              }`}
          >
            <BarChart3 className="w-4 h-4 text-[#2563EB]" />
            <span>Visitor &amp; Location Analytics</span>
            <span className="bg-emerald-500/10 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-mono">
              LIVE
            </span>
          </button>

          <button
            onClick={() => setAdminTab("offers")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${adminTab === "offers"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#5F6368] hover:text-[#111111]"
              }`}
          >
            <Gift className="w-4 h-4 text-[#2563EB]" />
            <span>Offer &amp; Announcement Manager</span>
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

        {/* ================= SECTION 2: VISITOR & LOCATION ANALYTICS TAB ================= */}
        {adminTab === "analytics" && (
          <div className="space-y-8">
            {/* Date / Day Filter Bar */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111111]">Date &amp; Timeframe Analytics Filter</h3>
                    <p className="text-xs text-[#5F6368]">Filter audience traffic &amp; telemetry logs by date ranges</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#5F6368] bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1 rounded-full">
                    {analyticsTimeframe === "all" && "🗓️ All Time Logs"}
                    {analyticsTimeframe === "today" && `📅 Today (${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })})`}
                    {analyticsTimeframe === "yesterday" && "⏪ Yesterday"}
                    {analyticsTimeframe === "7days" && "📊 Last 7 Days"}
                    {analyticsTimeframe === "30days" && "📈 Last 30 Days"}
                    {analyticsTimeframe === "custom" && "🗓️ Custom Date Range"}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchAnalytics(analyticsTimeframe, startDate, endDate)}
                    iconRight={<RefreshCw className={`w-3.5 h-3.5 ${loadingAnalytics ? "animate-spin" : ""}`} />}
                  >
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Timeframe Preset Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "🌐 All Time" },
                  { id: "today", label: "📅 Today" },
                  { id: "yesterday", label: "⏪ Yesterday" },
                  { id: "7days", label: "📊 Last 7 Days" },
                  { id: "30days", label: "📈 Last 30 Days" },
                  { id: "custom", label: "🗓️ Custom Range" },
                ].map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => {
                      const newTf = tf.id as any;
                      setAnalyticsTimeframe(newTf);
                      if (newTf !== "custom") {
                        fetchAnalytics(newTf, startDate, endDate);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      analyticsTimeframe === tf.id
                        ? "bg-[#2563EB] text-white shadow-2xs"
                        : "bg-[#F7F8FA] text-[#5F6368] border border-[#E5E7EB] hover:bg-white hover:text-[#111111]"
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Range Controls */}
              {analyticsTimeframe === "custom" && (
                <div className="pt-3 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-end gap-3 bg-[#F7F8FA] p-4 rounded-2xl border">
                  <div className="w-full sm:w-auto flex-1">
                    <label className="text-[11px] font-mono font-bold text-[#5F6368] block mb-1 uppercase">
                      FROM DATE
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div className="w-full sm:w-auto flex-1">
                    <label className="text-[11px] font-mono font-bold text-[#5F6368] block mb-1 uppercase">
                      TO DATE
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => fetchAnalytics("custom", startDate, endDate)}
                    className="w-full sm:w-auto"
                  >
                    Apply Custom Filter →
                  </Button>
                </div>
              )}
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between text-[#5F6368] text-xs font-mono font-bold uppercase mb-2">
                  <span>TOTAL VISITORS</span>
                  <Users className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="text-3xl font-extrabold text-[#111111]">
                  {loadingAnalytics ? "..." : analyticsData?.totalVisitors || 0}
                </div>
                <p className="text-[11px] text-[#5F6368] mt-1">Total page hits tracked</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between text-[#5F6368] text-xs font-mono font-bold uppercase mb-2">
                  <span>UNIQUE VISITORS</span>
                  <Globe className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="text-3xl font-extrabold text-[#111111]">
                  {loadingAnalytics ? "..." : analyticsData?.uniqueVisitors || 0}
                </div>
                <p className="text-[11px] text-[#5F6368] mt-1">Distinct IP sessions</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between text-[#5F6368] text-xs font-mono font-bold uppercase mb-2">
                  <span>INQUIRY CONVERSION RATE</span>
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                </div>
                <div className="text-3xl font-extrabold text-[#10B981]">
                  {loadingAnalytics ? "..." : analyticsData?.conversionRate || "0.0%"}
                </div>
                <p className="text-[11px] text-[#5F6368] mt-1">Visitors → Lead Inquiries</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between text-[#5F6368] text-xs font-mono font-bold uppercase mb-2">
                  <span>TOTAL PAGEVIEWS</span>
                  <MousePointer className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="text-3xl font-extrabold text-[#111111]">
                  {loadingAnalytics ? "..." : analyticsData?.totalPageviews || 0}
                </div>
                <p className="text-[11px] text-[#5F6368] mt-1">Total route interactions</p>
              </div>
            </div>

            {/* Middle Grid: Geographic Locations & Traffic Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 7 Cols: Countries & Region/State Breakdown */}
              <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-7 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#2563EB]" />
                      Geographic Visitor Distribution (Countries &amp; Regions)
                    </h3>
                    <p className="text-xs text-[#5F6368] mt-0.5">
                      Real-time breakdown of where your traffic and ad audience originates.
                    </p>
                  </div>
                </div>

                {!analyticsData || analyticsData.countryStats?.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#5F6368] bg-[#F7F8FA] rounded-2xl border border-[#E5E7EB]">
                    No location telemetry recorded yet. Live ad traffic will appear here automatically.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold uppercase text-[#5F6368] mb-2">
                      TOP VISITING COUNTRIES
                    </div>
                    {analyticsData.countryStats.map((item: any) => (
                      <div key={item.country} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#111111] flex items-center gap-2">
                            <span className="text-base">{getCountryFlag(item.countryCode)}</span>
                            <span>{item.country}</span>
                            <span className="text-[10px] font-mono text-gray-400">({item.countryCode})</span>
                          </span>
                          <span className="font-mono text-xs font-bold text-[#2563EB]">
                            {item.count} visitors ({item.percentage}%)
                          </span>
                        </div>
                        {/* Visual Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-[#F7F8FA] overflow-hidden border border-[#E5E7EB]">
                          <div
                            className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(parseFloat(item.percentage), 4)}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Regional / State Breakdown */}
                    {analyticsData.regionStats?.length > 0 && (
                      <div className="pt-6 border-t border-[#E5E7EB] mt-6">
                        <div className="text-xs font-mono font-bold uppercase text-[#5F6368] mb-3 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>TOP STATES &amp; CITIES</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {analyticsData.regionStats.map((reg: any) => (
                            <div
                              key={reg.region}
                              className="p-2.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-between text-xs"
                            >
                              <span className="font-medium text-[#111111] truncate">{reg.region}</span>
                              <span className="font-mono font-bold text-[#2563EB] shrink-0 ml-2">
                                {reg.count} hits
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right 5 Cols: Ad Traffic Channels & Device Breakdown */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Traffic Channels */}
                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-2xs">
                  <h3 className="text-base font-bold text-[#111111] mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#2563EB]" />
                    Ad Channels &amp; Traffic Sources
                  </h3>
                  {!analyticsData || analyticsData.referrerStats?.length === 0 ? (
                    <p className="text-xs text-[#5F6368]">No traffic source logs recorded.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {analyticsData.referrerStats.map((ref: any) => (
                        <div
                          key={ref.referrer}
                          className="p-3 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-[#111111]">{ref.referrer}</span>
                          <span className="font-mono font-bold bg-[#2563EB]/10 text-[#2563EB] px-2.5 py-0.5 rounded-full">
                            {ref.count} sessions
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Top Visited Pages & Routes */}
                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-2xs">
                  <h3 className="text-base font-bold text-[#111111] mb-4 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-[#2563EB]" />
                    Top Visited Pages &amp; Routes
                  </h3>
                  {!analyticsData || !analyticsData.topPagesStats || analyticsData.topPagesStats.length === 0 ? (
                    <p className="text-xs text-[#5F6368]">No route telemetry logged yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {analyticsData.topPagesStats.map((item: any) => (
                        <div key={item.path} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-[#2563EB] truncate max-w-[220px]">
                              {item.path}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-[#111111]">
                              {item.count} views ({item.percentage}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#F7F8FA] overflow-hidden border border-[#E5E7EB]">
                            <div
                              className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(parseFloat(item.percentage), 5)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Device Breakdown */}
                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-2xs">
                  <h3 className="text-base font-bold text-[#111111] mb-4 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#2563EB]" />
                    Device Types &amp; Browsers
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {analyticsData?.deviceStats?.map((dev: any) => (
                      <div key={dev.device} className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                        {dev.device === "Mobile" ? (
                          <Smartphone className="w-4 h-4 mx-auto text-[#2563EB] mb-1" />
                        ) : (
                          <Laptop className="w-4 h-4 mx-auto text-[#2563EB] mb-1" />
                        )}
                        <span className="text-xs font-bold text-[#111111] block">{dev.device}</span>
                        <span className="text-[10px] font-mono text-[#5F6368]">{dev.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Conversion Action Center */}
                <div className="bg-[#0F172A] text-white rounded-3xl p-6 shadow-md border border-[#1E293B]">
                  <div className="flex items-center gap-2 text-[#38BDF8] text-xs font-mono font-bold uppercase mb-2">
                    <Zap className="w-4 h-4" />
                    <span>CLIENT CONVERSION POWER TOOLS</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    Convert Visitors to Paying Clients
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Send instant WhatsApp scope proposals and email quotes to qualified lead inquiries.
                  </p>

                  <div className="space-y-2">
                    {inquiries.slice(0, 3).map((lead) => (
                      <div
                        key={lead.ticketId}
                        className="bg-[#1E293B] border border-slate-700/70 p-3 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="truncate">
                          <strong className="text-white block truncate">{lead.client.name}</strong>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {lead.project.type} ({lead.project.budget})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {lead.client.phone && lead.client.phone !== "N/A" && (
                            <a
                              href={`https://wa.me/${lead.client.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hi ${lead.client.name}, thank you for inquiring with VS Business Solutions about your ${lead.project.type} project. We reviewed your scope and would love to share a proposal!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#10B981] text-white hover:bg-[#059669] transition-colors"
                              title="Send WhatsApp Proposal"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.client.email}?subject=${encodeURIComponent(
                              `VS Business Solutions - Proposal for ${lead.project.type}`
                            )}&body=${encodeURIComponent(
                              `Hi ${lead.client.name},\n\nThank you for reaching out regarding your project: ${lead.project.type}.\n\n`
                            )}`}
                            className="p-1.5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors"
                            title="Send Email Scope Proposal"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Section: Live Telemetry Session Logs Table */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h3 className="text-base font-bold text-[#111111]">
                    Live Visitor Telemetry &amp; Session Logs
                  </h3>
                  <p className="text-xs text-[#5F6368]">
                    Real-time feed of incoming visitors, IP locations, device types, traffic sources, and page routes.
                  </p>
                </div>
                
                {analyticsData?.recentLogs && analyticsData.recentLogs.length > 0 && (
                  <span className="text-xs font-mono font-bold bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1 rounded-full text-[#5F6368]">
                    Showing {(logsPage - 1) * 10 + 1} - {Math.min(logsPage * 10, analyticsData.recentLogs.length)} of {analyticsData.recentLogs.length} Logs
                  </span>
                )}
              </div>

              {!analyticsData || !analyticsData.recentLogs || analyticsData.recentLogs.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#5F6368] bg-[#F7F8FA] rounded-2xl">
                  No live visitor telemetry logged yet. As users visit your site or ads click through, live sessions will appear here.
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#F7F8FA] text-[#5F6368] font-mono text-[11px]">
                          <th className="p-3">TIME</th>
                          <th className="p-3">LOCATION</th>
                          <th className="p-3">IP ADDRESS</th>
                          <th className="p-3">PAGE ROUTE</th>
                          <th className="p-3">TRAFFIC SOURCE</th>
                          <th className="p-3">DEVICE / BROWSER</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB]">
                        {analyticsData.recentLogs
                          .slice((logsPage - 1) * 10, logsPage * 10)
                          .map((log: any, idx: number) => (
                            <tr key={idx} className="hover:bg-[#F7F8FA]/70 transition-colors">
                              <td className="p-3 font-mono text-[#5F6368] whitespace-nowrap">
                                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="p-3 font-bold text-[#111111] whitespace-nowrap">
                                <span className="mr-1.5">{getCountryFlag(log.countryCode)}</span>
                                <span>{log.city && log.city !== "Unknown" ? `${log.city}, ` : ""}{log.country}</span>
                              </td>
                              <td className="p-3 font-mono text-gray-500 whitespace-nowrap">
                                {log.ip}
                              </td>
                              <td className="p-3 font-mono font-bold text-[#2563EB] whitespace-nowrap">
                                {log.path}
                              </td>
                              <td className="p-3 font-medium text-slate-700 whitespace-nowrap">
                                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                                  log.referrer === "Internal Navigation"
                                    ? "bg-blue-50 text-[#2563EB] border-blue-200"
                                    : log.referrer === "Direct Traffic"
                                    ? "bg-slate-100 text-slate-700 border-slate-200"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}>
                                  {log.referrer}
                                </span>
                              </td>
                              <td className="p-3 text-[#5F6368] whitespace-nowrap">
                                {log.device} · {log.browser}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {Math.ceil(analyticsData.recentLogs.length / 10) > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E5E7EB]">
                      <div className="text-xs font-mono text-[#5F6368]">
                        Page <strong>{logsPage}</strong> of <strong>{Math.ceil(analyticsData.recentLogs.length / 10)}</strong>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setLogsPage((p) => Math.max(p - 1, 1))}
                          disabled={logsPage === 1}
                          className="p-2 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] hover:bg-white text-xs font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Previous Page"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: Math.ceil(analyticsData.recentLogs.length / 10) }, (_, i) => i + 1).map((pg) => (
                          <button
                            key={pg}
                            onClick={() => setLogsPage(pg)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              logsPage === pg
                                ? "bg-[#2563EB] text-white shadow-2xs"
                                : "bg-[#F7F8FA] text-[#5F6368] border border-[#E5E7EB] hover:bg-white"
                            }`}
                          >
                            {pg}
                          </button>
                        ))}

                        <button
                          onClick={() => setLogsPage((p) => Math.min(p + 1, Math.ceil(analyticsData.recentLogs.length / 10)))}
                          disabled={logsPage >= Math.ceil(analyticsData.recentLogs.length / 10)}
                          className="p-2 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] hover:bg-white text-xs font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Next Page"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= SECTION 3: OFFER & ANNOUNCEMENT MANAGER TAB ================= */}
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
