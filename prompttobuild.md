Build a premium, modern web development services website using **Next.js + TypeScript + Tailwind CSS**, with **React Bits as the primary visual/UI interaction library**.

The website should feel like a combination of:

* Google-quality UX
* Linear-level cleanliness
* Modern SaaS/product studio design
* React Bits interactive components
* Premium software development agency
* Extremely polished responsive UX

Do NOT make it look like a generic IT services company website.

Do NOT overuse gradients, glassmorphism, 3D objects, glowing effects, or animations.

The core design principle is:

**Minimal visual design + excellent typography + strong whitespace + subtle intelligent interactions.**

---

# 1. TECH STACK

Use:

* Next.js 16+
* TypeScript
* Tailwind CSS
* React Bits
* Motion / Framer Motion where required
* Lucide React icons
* Geist font
* shadcn/ui only when a functional component is required and React Bits does not provide an appropriate component

Do NOT introduce unnecessary UI libraries.

React Bits must be the main source of visual/interactive components.

---

# 2. DESIGN DIRECTION

Create a primarily LIGHT interface.

Base colors:

```text
Background:       #FFFFFF
Secondary:        #F7F8FA
Primary text:     #111111
Secondary text:   #5F6368
Muted text:       #8A8F98
Border:           #E5E7EB
Primary accent:   #2563EB
```

The design should support dark mode architecture, but light mode is the primary experience.

Use generous whitespace.

Use subtle borders instead of heavy shadows.

Avoid excessive rounded cards.

Recommended radius:

```text
Buttons:          9999px
Inputs:           16px
Cards:            24px
Large visual:     28–32px
```

Use a restrained shadow system.

---

# 3. TYPOGRAPHY

Use Geist.

Typography should be one of the strongest visual elements.

Hero:

```text
clamp(3.5rem, 7vw, 7rem)
```

Hero line height:

```text
0.92–1.0
```

Hero letter spacing:

```text
-0.05em to -0.07em
```

Section headings:

```text
48–64px desktop
36–44px mobile
```

Body:

```text
16–18px
line-height: 1.6
```

Avoid excessive font weights.

Use bold typography primarily for important hierarchy.

---

# 4. GLOBAL LAYOUT

Maximum content width:

```text
1280px
```

Large desktop can use:

```text
max-width: 1400px
```

Horizontal padding:

```text
Desktop: 32px
Tablet: 24px
Mobile: 20px
```

Section spacing:

```text
Desktop:
120–160px vertical

Mobile:
72–96px vertical
```

The site must feel spacious.

---

# 5. NAVBAR

Create a minimal sticky navbar.

Desktop:

```text
LOGO

Services
Work
Process
About

Contact

[ Start a project → ]
```

Use a subtle translucent background after scrolling.

Suggested behavior:

* transparent at top
* becomes slightly blurred on scroll
* subtle border appears
* smooth transition
* no giant navbar
* no excessive animation

Mobile:

```text
LOGO                         Menu
```

Create a polished mobile navigation drawer.

---

# 6. HERO

The hero is the most important section.

Use React Bits for subtle visual interaction.

Hero copy:

```text
DIGITAL PRODUCTS

We build websites and
software people love.

Modern, fast and scalable digital
experiences built for ambitious businesses.

[ Start a project → ]
[ Explore our work ]
```

Do not use generic marketing phrases like:

"Your digital transformation partner"

"Leading IT solutions"

"Best web development company"

Use concise, confident product-studio language.

Hero should have:

* animated text reveal
* subtle React Bits background effect
* subtle pointer interaction
* smooth entrance animation
* no distracting 3D object
* excellent mobile layout

The visual should feel almost empty and premium.

---

# 7. HERO INTERACTIVE PROJECT SELECTOR

Add an optional interactive element below or beside the hero:

```text
What are you building?

[ Website ]
[ E-commerce ]
[ Web Application ]
[ SaaS ]
[ Custom Software ]
```

When a category is selected, show a small contextual preview.

Example:

```text
E-commerce

High-converting online stores
with modern checkout experiences.

Next.js
Payments
CMS
Analytics

[ Build this → ]
```

This should feel like a product interface, not a traditional contact form.

Use React Bits interactions where appropriate.

---

# 8. TRUST SECTION

Immediately below the hero, add a restrained trust section.

Example:

```text
TRUSTED BY BUSINESSES BUILDING FOR THE WEB

[ Client ]
[ Client ]
[ Client ]
[ Client ]
[ Client ]
```

Keep logos monochrome/subtle.

Do not make this visually dominant.

---

# 9. SERVICES

Title:

```text
WHAT WE BUILD
```

Instead of six generic cards, create an interactive service list.

Structure:

```text
01    Websites                         →

      Fast, responsive websites
      designed for modern businesses.


02    Web Applications                 →

03    E-commerce                       →

04    SaaS & Platforms                 →

05    Custom Software                  →

06    API & Backend                    →
```

On hover:

* active row expands slightly
* arrow moves
* optional project preview appears
* background subtly changes
* typography becomes slightly stronger

Use React Bits for the interaction.

Avoid excessive animation.

---

# 10. SELECTED WORK

Create a premium portfolio section.

Title:

```text
SELECTED WORK
```

Add category filtering:

```text
All
Websites
E-commerce
SaaS
Web Apps
```

Create large project previews.

Primary project:

```text
┌──────────────────────────────────────────┐
│                                          │
│            WEBSITE PREVIEW               │
│                                          │
└──────────────────────────────────────────┘

Project Name

E-commerce · Next.js · PostgreSQL

View case study →
```

Secondary projects can use a two-column layout.

Hover behavior:

* image scale around 1.02–1.04
* arrow moves
* subtle overlay
* project metadata becomes more visible
* no excessive parallax

Use React Bits / Motion.

---

# 11. CASE STUDY EXPERIENCE

When a portfolio project is opened, create a premium case study page.

Structure:

```text
Project title

Short description

Hero project image

Overview

Challenge

Solution

Technology

Results

Additional screenshots

[ Next project → ]
```

Use large typography and generous whitespace.

Do not make case studies feel like blog posts.

They should feel like product presentations.

---

# 12. WHY WORK WITH US

Create a minimal 3 or 4-column feature section.

Example:

```text
01
PERFORMANCE

Fast websites designed
for real-world performance.


02
DESIGN

Interfaces focused on
clarity and usability.


03
SCALABILITY

Architecture designed
to grow with your business.


04
QUALITY

Clean, maintainable
production-ready code.
```

Use subtle scroll reveal animations.

---

# 13. PERFORMANCE SECTION

Create a visual performance section.

Example:

```text
ENGINEERED FOR THE MODERN WEB

        98+
     Performance

        <1s
     Fast loading

       99.9%
       Uptime
```

Do not fabricate real performance numbers for actual client projects.

If these are placeholders, clearly structure them so they can later be replaced with verified metrics.

Animate counters only when they enter the viewport.

---

# 14. PROCESS

Create a scroll-driven process section.

```text
01
DISCOVER

Understand the business,
users and requirements.


02
DESIGN

Turn ideas into
clear experiences.


03
BUILD

Develop with modern
web technologies.


04
LAUNCH

Deploy, monitor and
continuously improve.
```

Desktop:

* sticky left/right visual
* active step changes as user scrolls

Mobile:

* vertical timeline

Use Motion/React Bits for smooth transitions.

---

# 15. TECHNOLOGY

Do NOT create a huge logo wall.

Create a clean technology ecosystem.

Example:

```text
BUILT WITH MODERN TECHNOLOGY

              Next.js

      React              TypeScript

   Node.js             PostgreSQL

       Prisma          Cloudflare

              REST APIs
```

Use subtle hover interactions.

Technology list should be easy to scan.

---

# 16. PROJECT START FLOW

Instead of a boring contact page, create an interactive project-start experience.

Step 1:

```text
WHAT ARE YOU BUILDING?

Website
E-commerce
Web App
SaaS
Custom Software
```

Step 2:

```text
WHAT DO YOU NEED?

Design
Development
Full Product
Maintenance
```

Step 3:

```text
BUDGET RANGE

₹50K+
₹1L+
₹2L+
₹5L+
Let's discuss
```

Step 4:

```text
TELL US ABOUT YOUR PROJECT

[ textarea ]

Name
Email
Company

[ Send project request → ]
```

Add a progress indicator:

```text
1 ─── 2 ─── 3 ─── 4
```

Make this experience extremely smooth.

---

# 17. TESTIMONIALS

Keep testimonials minimal.

Use one large testimonial at a time.

Example:

```text
WHAT CLIENTS SAY

"Working with the team completely
changed how we approached our
digital product."

Client Name
CEO · Company
```

Use subtle text transitions.

Avoid large testimonial carousels.

---

# 18. FINAL CTA

Create a visually strong but minimal CTA.

```text
HAVE A PROJECT IN MIND?

Let's build something
remarkable.

[ Start a project → ]
```

Use a React Bits text animation.

Background can have a very subtle interactive effect.

Do not use a huge gradient.

---

# 19. FOOTER

Minimal footer.

```text
LOGO

Building digital products
for the modern web.

Services
Work
Process
About
Contact

GitHub
LinkedIn
Email

© 2026 Company Name
```

Keep it clean.

---

# 20. ANIMATION RULES

This is extremely important.

Do NOT animate everything.

Animation should communicate hierarchy or interaction.

Use:

```text
Hero:
Text reveal
Subtle background interaction

Navbar:
Scroll transition

Services:
Hover expansion

Portfolio:
Image scale + arrow movement

Process:
Scroll-driven active state

Technology:
Subtle hover

CTA:
Text reveal
```

Avoid:

```text
No constant floating objects
No excessive particles
No huge cursor effects
No constant background movement
No unnecessary 3D
No excessive parallax
No animation on every paragraph
```

Animation duration:

```text
Micro interaction:
150–250ms

Normal:
300–450ms

Large transition:
500–700ms
```

Use appropriate easing.

Prefer smooth, natural motion.

---

# 21. RESPONSIVE DESIGN

The website must be mobile-first.

Desktop:

```text
12-column grid
```

Tablet:

```text
8-column grid
```

Mobile:

```text
4-column grid
```

Hero:

Desktop:

```text
50% content
50% visual
```

Mobile:

```text
100% content
↓
visual
```

Services:

Desktop:

```text
interactive list
```

Mobile:

```text
stacked accordion/list
```

Portfolio:

Desktop:

```text
large + small project layout
```

Mobile:

```text
single column
```

Never allow horizontal overflow.

Test at:

```text
360px
390px
430px
768px
1024px
1280px
1440px
1920px
```

---

# 22. ACCESSIBILITY

Follow good accessibility practices.

Implement:

* semantic HTML
* keyboard navigation
* visible focus states
* proper ARIA labels
* accessible buttons
* accessible forms
* sufficient color contrast
* reduced-motion support

Respect:

```css
prefers-reduced-motion
```

If reduced motion is enabled, disable decorative animations.

---

# 23. PERFORMANCE

This is a web development agency website, so the website itself must demonstrate performance.

Optimize:

* images
* fonts
* JavaScript
* animations
* component loading
* layout shifts

Use:

```text
next/image
next/font
dynamic imports where useful
lazy loading
```

Avoid unnecessarily large client components.

Prefer Server Components where possible.

Only use `"use client"` when interaction actually requires it.

Do not turn the entire homepage into a Client Component.

---

# 24. SEO

Implement:

* metadata
* Open Graph
* Twitter/X metadata
* canonical URL architecture
* semantic headings
* structured data where appropriate
* sitemap
* robots.txt
* descriptive image alt text

Use a proper SEO title and description that can later be customized.

---

# 25. CODE ARCHITECTURE

Use reusable components.

Suggested structure:

```text
app/
├── page.tsx
├── work/
├── services/
├── process/
├── about/
└── contact/

components/
├── navbar/
├── hero/
├── project-selector/
├── services/
├── portfolio/
├── case-study/
├── features/
├── performance/
├── process/
├── technology/
├── testimonials/
├── project-form/
├── cta/
└── footer/

components/ui/
├── button.tsx
├── container.tsx
├── section-heading.tsx
└── typography.tsx

lib/
├── projects.ts
├── services.ts
└── utils.ts
```

Create reusable data-driven components instead of hardcoding repeated UI.

---

# 26. DESIGN TOKENS

Create centralized CSS variables for:

* colors
* spacing
* radius
* shadows
* typography
* animation duration

Do not scatter arbitrary values throughout the project.

---

# 27. IMPORTANT REACT BITS RULE

Before implementing an animation/component, inspect the available React Bits components and choose the component that best fits the UX.

Do NOT blindly add React Bits components just because they look impressive.

The website should feel like one coherent design system.

React Bits should enhance the website, not dominate it.

---

# 28. VISUAL QUALITY BAR

The finished website should NOT resemble:

* template marketplace websites
* generic software companies
* old IT outsourcing websites
* over-designed developer portfolios
* crypto landing pages
* AI startup clones

It SHOULD resemble:

* a premium digital product studio
* modern Google-quality UX
* sophisticated SaaS design
* high-end development agency
* excellent product design

---

# 29. DEVELOPMENT WORKFLOW

Before coding:

1. Inspect the existing repository.
2. Identify the current Next.js version.
3. Inspect package.json.
4. Check whether Tailwind is already configured.
5. Check whether React Bits/Motion is already installed.
6. Preserve useful existing infrastructure.
7. Do not unnecessarily replace working dependencies.

Then:

1. Establish design tokens.
2. Build global typography.
3. Build navbar.
4. Build hero.
5. Build services.
6. Build portfolio.
7. Build process.
8. Build technology.
9. Build testimonials.
10. Build project-start flow.
11. Build CTA.
12. Build footer.
13. Add responsive behavior.
14. Add accessibility.
15. Optimize performance.
16. Run lint/typecheck/build.
17. Fix all errors.
18. Review the final page visually.

---

# 30. FINAL REQUIREMENT

Do not stop at a basic implementation.

Iterate on the UI until it feels genuinely premium.

Pay particular attention to:

* spacing
* typography
* alignment
* responsive behavior
* interaction consistency
* animation timing
* button hierarchy
* visual rhythm
* empty space
* accessibility
* mobile UX

The final result should make a potential client immediately understand:

**What we do → What we have built → Why trust us → How to start a project.**

The website itself should be the strongest demonstration of our web development quality.
