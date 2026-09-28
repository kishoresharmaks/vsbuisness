"use client";

// Types for GA4 and Meta Pixel window objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-MRL94TLLZ7";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

// Track Pageviews
export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    // GA4 Pageview
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }

    // Meta Pixel Pageview
    if (window.fbq && META_PIXEL_ID) {
      window.fbq("track", "PageView");
    }
  }
};

// Track Custom Events in GA4
export const trackEvent = (action: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params || {});
  }
};

// Track Meta Pixel Conversion Events
export const trackMetaEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params || {});
  }
};

// Unified Conversion Tracking for Form Leads (Submitting Inquiry)
export const trackLeadConversion = (leadData: {
  projectType: string;
  servicesNeeded: string;
  budgetRange?: string;
  ticketId?: string;
}) => {
  // GA4 Conversion Event
  trackEvent("generate_lead", {
    currency: "USD",
    value: leadData.budgetRange || "Custom",
    lead_type: leadData.projectType,
    service_scope: leadData.servicesNeeded,
    ticket_id: leadData.ticketId || "",
  });

  // Meta Pixel Conversion Event
  trackMetaEvent("Lead", {
    content_name: leadData.projectType,
    content_category: leadData.servicesNeeded,
    value: leadData.budgetRange || "Custom",
    currency: "USD",
  });
};
