# Project Requirements & Features

## 1. Visual & UX Standards
- **Aesthetic**: Linear-level cleanliness + Google-quality UX + modern product studio design.
- **Color Scheme**: Light mode primary with HSL/Tailwind design tokens. Light background (`#FFFFFF`), subtle secondary `#F7F8FA`, dark primary text `#111111`, blue accent `#2563EB`.
- **Typography**: Geist font with hero clamp (`3.5rem` to `7rem`), letter-spacing `-0.05em` to `-0.07em`, tight line-height `0.92-1.0`.
- **Grid Layout**: Max width 1280px (1400px wide screens), 32px desktop padding, 20px mobile padding.

## 2. Key Interactive Components
- **Navbar**: Sticky, translucent on scroll with backdrop blur and dynamic border. Mobile responsive drawer.
- **Hero & Interactive Selector**: Minimal headline, animated text reveal, React Bits ambient background effect, plus multi-category preview widget (Website, E-commerce, Web App, SaaS, Custom Software).
- **Trust Section**: Clean monochrome client logo display.
- **Services List**: Interactive expandable row list (01 Websites to 06 API & Backend) with hover previews and arrow indicators.
- **Selected Work Portfolio**: Category tabs, large featured project preview, 2-column secondary grid, hover scaling (1.02-1.04).
- **Case Study Subpages**: Dynamic route (`/work/[slug]`) for detailed case study presentations.
- **Why Work With Us**: 4-column minimal feature cards (Performance, Design, Scalability, Quality).
- **Engineered for Web Performance**: Animated viewport metric counters (98+ performance, <1s load, 99.9% uptime).
- **Scroll-Driven Process Timeline**: 01 Discover, 02 Design, 03 Build, 04 Launch with active state sync.
- **Technology Ecosystem**: Clean interactive tech grid (Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Cloudflare).
- **Multi-Step Project Start Flow**: 4-step wizard (Category -> Needs -> Budget -> Contact & Details) with step progress indicator.
- **Testimonial**: Minimal 1-at-a-time quote carousel/transition.
- **CTA & Footer**: High-impact minimalist CTA + clean multi-column footer.

## 3. Engineering & Performance Requirements
- Mobile-first responsiveness tested from 360px to 1920px.
- `prefers-reduced-motion` compliance.
- Next.js Server Components as default, client components used strictly for interactive widgets.
- Complete SEO suite (Metadata, OG tags, canonical URLs, JSON-LD structured data, sitemap, robots.txt).
