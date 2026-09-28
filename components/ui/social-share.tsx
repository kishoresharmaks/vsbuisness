"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, MessageSquare, Globe, Send } from "lucide-react";

interface SocialShareProps {
  title?: string;
  url?: string;
  className?: string;
}

export function SocialShare({
  title = "VS Business Solutions | Custom Web Development Agency",
  url = "https://buisness.beeshubfarmland.com",
  className = "",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    },
    {
      name: "X (Twitter)",
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-black hover:text-white hover:border-black",
    },
    {
      name: "WhatsApp",
      icon: <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
  ];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${className}`}>
      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mr-1">
        <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />
        <span>Share:</span>
      </span>

      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${item.name}`}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E5E7EB] text-slate-700 flex items-center justify-center transition-all duration-200 shadow-2xs ${item.color}`}
          title={`Share on ${item.name}`}
        >
          {item.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copy page link"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] text-xs font-mono font-bold transition-all duration-200 shadow-2xs cursor-pointer active:scale-95"
        title="Copy URL link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
