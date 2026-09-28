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
    "VS Business Solutions is a premier web development agency engineering ultra-fast websites, custom web applications, SaaS platforms, and e-commerce software for ambitious businesses.",
  keywords: [
    "Web Development Services",
    "Custom Web Applications",
    "Next.js Development Agency",
    "High Performance Websites",
    "E-commerce Store Development",
    "SaaS Product Engineering",
    "VS Business Solutions",
    "TypeScript Web Development",
    "SEO Optimized Websites",
  ],
  authors: [{ name: "VS Business Solutions" }],
  creator: "VS Business Solutions",
  metadataBase: new URL("https://buisness.beeshubfarmland.com"),
  icons: {
    icon: "/Brand_Logo.png",
    apple: "/Brand_Logo.png",
  },
  openGraph: {
    title: "VS Business Solutions | Custom Web Development & Digital Product Studio",
    description:
      "Engineering ultra-fast websites, custom web applications, and scalable digital products designed for business growth.",
    url: "https://buisness.beeshubfarmland.com",
    siteName: "VS Business Solutions",
    images: ["/Brand_Logo.png"],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VS Business Solutions | Premium Web Development Services",
    description:
      "Ultra-fast Next.js websites, custom web apps, and digital product studio.",
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
