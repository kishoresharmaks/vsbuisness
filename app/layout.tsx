import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OfferNotification } from "@/components/ui/offer-notification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VS Business Solutions | Custom Web Development & Digital Product Studio",
  description:
    "VS Business Solutions engineers ultra-fast websites, custom web apps, SaaS platforms, and e-commerce software for ambitious businesses.",
  keywords: [
    "VS Business Solutions",
    "Custom Web Development",
    "Digital Product Studio",
    "High Performance Websites",
    "Custom Web Applications",
    "Next.js Development Agency",
    "E-commerce Store Development",
    "SaaS Platform Development",
    "SEO Optimized Websites",
  ],
  authors: [{ name: "VS Business Solutions" }],
  creator: "VS Business Solutions",
  metadataBase: new URL("https://buisness.beeshubfarmland.com"),
  icons: {
    icon: [
      { url: "/Brand_Logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/Brand_Logo.png",
    apple: "/Brand_Logo.png",
  },
  openGraph: {
    title: "VS Business Solutions | Custom Web Development & Digital Product Studio",
    description:
      "VS Business Solutions engineers ultra-fast websites, custom web apps, SaaS platforms, and e-commerce software for ambitious businesses.",
    url: "https://buisness.beeshubfarmland.com",
    siteName: "VS Business Solutions",
    images: ["/Brand_Logo.png"],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VS Business Solutions | Custom Web Development & Digital Product Studio",
    description:
      "VS Business Solutions engineers ultra-fast websites, custom web apps, SaaS platforms, and e-commerce software for ambitious businesses.",
    images: ["/Brand_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "VS Business Solutions",
  "url": "https://buisness.beeshubfarmland.com",
  "logo": "https://buisness.beeshubfarmland.com/Brand_Logo.png",
  "description": "Premium web development agency building high-performance websites, custom web applications, and scalable digital products.",
  "serviceType": [
    "Web Development Services",
    "Custom Web Application Development",
    "E-Commerce Development",
    "SaaS Platform Development",
    "UI/UX Web Design"
  ],
  "telephone": "+91 7695946750",
  "email": "vsgroupstn@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/Brand_Logo.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/Brand_Logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Brand_Logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#111111] selection:bg-[#2563EB] selection:text-white relative">
        {children}
        <OfferNotification />
      </body>
    </html>
  );
}
