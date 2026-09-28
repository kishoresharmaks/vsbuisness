export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "E-Commerce" | "Enterprise Systems" | "AI & Web Platforms";
  clientRole: string;
  badge: string;
  liveUrl?: string;
  faviconUrl?: string;
  shortDescription: string;
  fullDescription: string;
  architecturePoints: string[];
  keyFeatures: string[];
  tags: string[];
  metrics: ProjectMetric[];
  highlight: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    slug: "1handindia",
    title: "1HandIndia Marketplace",
    subtitle: "Large Online Multi-Vendor Shopping Portal",
    category: "E-Commerce",
    clientRole: "Lead Web Developer",
    badge: "Completed Client Platform",
    liveUrl: "https://1handindia.com",
    faviconUrl: "https://www.google.com/s2/favicons?domain=1handindia.com&sz=64",
    shortDescription: "A large-scale online marketplace connecting buyers, sellers, and wholesale distributors with instant product browsing, seller store management, and secure online payment options.",
    fullDescription: "1HandIndia is a multi-vendor online shopping platform where sellers can list products, manage orders, and connect directly with customer buyers and wholesale businesses. Designed for smooth navigation on mobile phones and desktop computers with high security and instant order checkout.",
    architecturePoints: [
      "Complete multi-user system supporting Customers, Store Sellers, Business Wholesale Buyers, and Platform Admins.",
      "Secure online payments with Razorpay credit/debit card checkout and cash-on-delivery options.",
      "Fast product search and filtering across thousands of product categories.",
      "Hosted on secure cloud servers with instant automated data backups and smooth uptime.",
    ],
    keyFeatures: [
      "Online Shopping Storefront: Easy product discovery, category filters, and product wishlist.",
      "Seller Portal Dashboard: Verified store management, stock updates, and live sales tracking.",
      "Wholesale B2B Section: Bulk ordering and custom quote requests for business buyers.",
      "Instant Payment Verification: Safe payment confirmation protecting both buyers and sellers.",
    ],
    tags: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Razorpay Payments", "Tailwind CSS"],
    metrics: [
      { label: "Platform Type", value: "Multi-Vendor" },
      { label: "Target Surfaces", value: "Web & Mobile" },
      { label: "Security Level", value: "Bank-grade" },
    ],
    highlight: "Designed and built the full online shopping marketplace from customer storefront to seller admin dashboards.",
    featured: true,
  },
  {
    slug: "cowork30",
    title: "Cowork30 Platform",
    subtitle: "Smart Coworking Space & Instant Meeting Room Booking System",
    category: "Enterprise Systems",
    clientRole: "Full Stack Engineer",
    badge: "Real-Time Booking Portal",
    liveUrl: "https://cowork30.com/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
    shortDescription: "An interactive website that lets professionals view a live visual map of available desks, reserve meeting rooms by the hour, buy food & coffee add-ons, and get digital entry passes.",
    fullDescription: "Cowork30 is a smart booking application built for shared office spaces. Members can see an interactive floor plan map showing which desks are free or occupied in real time, book private meeting rooms, add extra services like coffee or projectors, and automatically receive email receipts with digital QR code passes for building access.",
    architecturePoints: [
      "Interactive Visual Floor Plan: Live visual layout of office desks showing green for available and red for occupied.",
      "Real-time Desk Status Updates: Uses instant live web connection so desk availability updates immediately without page refresh.",
      "Collision-Free Room Scheduler: Ensures meeting rooms cannot be double-booked for the same time slot.",
      "Automated Digital Billing: Generates itemized tax receipts and sends QR code entry passes directly to user email.",
    ],
    keyFeatures: [
      "Interactive 2D Desk Picker: Click any available desk on the visual layout map to reserve it instantly.",
      "Hourly Meeting Room Scheduler: Pick date and time slots with clear pricing and amenity selections.",
      "Add-on Refreshment Store: Order coffee, tea, lunch boxes, or whiteboards along with room bookings.",
      "Prepaid Member Wallet: Top-up credit wallet for 1-click easy checkout during room bookings.",
    ],
    tags: ["Next.js", "TypeScript", "MySQL", "Socket.io (Real-Time)", "Razorpay", "Tailwind CSS"],
    metrics: [
      { label: "Live Updates", value: "Real-Time Map" },
      { label: "Desk Status", value: "Instant Indicator" },
      { label: "Pass System", value: "QR Code Entry" },
    ],
    highlight: "Created the live interactive floor map and instant meeting room booking scheduler.",
    featured: false,
  },
  {
    slug: "indian-agri",
    title: "Indian Agriculture B2B",
    subtitle: "B2B Agriculture Supplies Store & Order Tracking System",
    category: "Enterprise Systems",
    clientRole: "Full Stack Developer",
    badge: "Client B2B Portal",
    liveUrl: "http://indianagriculture.online/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=indianagriculture.online&sz=64",
    shortDescription: "A specialized agricultural e-commerce portal connecting farmers and suppliers with quality seeds, farming tools, instant order tracking, and POS customer ledger accounts.",
    fullDescription: "Indian Agriculture is a digital platform designed for buying farm supplies, seeds, organic products, and agricultural machinery. It includes customer ledger management, live order shipment tracking, high-security server protection, and quick UPI QR code payment options.",
    architecturePoints: [
      "Simplified Shopping Cart: Quick product selection, quantity adjustments, and saved customer checkout information.",
      "Live Order Tracker: Real-time order status tracking protecting customer details from unauthorized access.",
      "Secure Platform Protection: Rate-limited API security preventing spam or malicious database requests.",
      "B2B Customer Ledgers: Enables store managers to record party payments and billing transactions effortlessly.",
    ],
    keyFeatures: [
      "Agri Product Catalog: Categorized display of seeds, fertilizers, and farming equipment.",
      "Instant UPI QR Payments: Scan-to-pay convenience with instant order creation.",
      "Order History & Tracking: Easy order status lookup with customer mobile verification.",
      "Store Billing Ledger: Built-in POS system for managing offline customer accounts.",
    ],
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "Express", "Tailwind CSS"],
    metrics: [
      { label: "Order Tracking", value: "Live Status" },
      { label: "Payment Options", value: "UPI & COD" },
      { label: "Protection", value: "Fully Secured" },
    ],
    highlight: "Built simple, accessible e-commerce features with instant order tracking and high-level platform security.",
    featured: false,
  },
  {
    slug: "beeshub",
    title: "BeesHub E-Commerce Store",
    subtitle: "Modern Online Store with Interactive Color Variant Picker",
    category: "E-Commerce",
    clientRole: "Frontend Developer",
    badge: "High-Conversion Web App",
    liveUrl: "https://beeshubfarmland.com/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=beeshubfarmland.com&sz=64",
    shortDescription: "A modern, high-conversion online shopping interface featuring live color swatch selectors, zoom-in product photo galleries, price drop badges, and instant shopping cart slide-out.",
    fullDescription: "BeesHub is a visually appealing e-commerce website designed to make buying products fun and effortless. Customers can click on interactive circular color swatches to instantly preview different product colors, check size options, view stock levels, and slide out their shopping cart with a single tap.",
    architecturePoints: [
      "Interactive Product Color Swatches: Dynamic circular buttons allowing customers to select colors and see instantly updated images.",
      "Responsive Mobile & Desktop Layout: Looks stunning on small mobile screens as well as wide desktop displays.",
      "Slide-Out Cart Drawer: Quick cart preview showing subtotal, discounts, and one-tap checkout button.",
      "High Performance & Fast Loading: Optimized for sub-second page loads to keep shoppers engaged.",
    ],
    keyFeatures: [
      "Interactive Color Picker: Select colors with live checkmark feedback and instant image preview.",
      "Responsive Product Grid: Beautiful 4-column product display with price highlights and wishlist hearts.",
      "Zoom-Lens Product Gallery: Hover over product images for crisp high-resolution detail views.",
      "Instant Cart Updates: Add or remove items without waiting for page reloads.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "PostHog Analytics"],
    metrics: [
      { label: "Page Speed", value: "Lightning Fast" },
      { label: "Color Selector", value: "Live Swatches" },
      { label: "User Experience", value: "Mobile First" },
    ],
    highlight: "Designed the interactive color swatch picker and mobile-first shopping cart interface.",
    featured: false,
  },
  {
    slug: "nl2mongo",
    title: "NL2Mongo Query Tool",
    subtitle: "AI Tool Converting Plain English into Database Charts & Graphs",
    category: "AI & Web Platforms",
    clientRole: "Creator & Developer",
    badge: "AI Application",
    shortDescription: "An intelligent web app that lets users type plain English questions (like 'Show top sales this month') and automatically turns them into database queries and colorful visual charts.",
    fullDescription: "NL2Mongo makes data analytics easy for everyone. Instead of writing complex database code, team members simply type a natural question in plain English. The AI understands the question, fetches the correct data safely, and automatically generates interactive bar charts, line graphs, and pie charts.",
    architecturePoints: [
      "Natural Language Assistant: Translates human language requests directly into database search queries.",
      "2-Step Plan & Confirm: Shows users the planned data search first before executing, ensuring database safety.",
      "Smart Chart Generator: Automatically picks the best chart format (bar, pie, or line) based on the resulting data.",
      "Conversational Memory: Remembers recent questions so users can ask follow-up questions easily.",
    ],
    keyFeatures: [
      "English to Query Conversion: Type questions in simple words without knowing technical database code.",
      "Dynamic Visual Charts: View auto-generated bar charts, pie charts, and line graphs instantly.",
      "Question History & Context: Track past searches and refine results conversationally.",
      "Safe Data Access: Restricts unauthorized changes while displaying accurate analytical insights.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "AI NLP", "Recharts", "Tailwind CSS"],
    metrics: [
      { label: "Search Mode", value: "Plain English" },
      { label: "Visualizations", value: "Bar, Line, Pie" },
      { label: "Data Safety", value: "2-Step Confirm" },
    ],
    highlight: "Developed an AI tool that allows anyone to view visual chart reports just by asking questions in simple English.",
    featured: false,
  },
  {
    slug: "studyflow",
    title: "StudyFlow AI Assistant",
    subtitle: "Offline-First Study Planner, AI Tutor & Practice App",
    category: "AI & Web Platforms",
    clientRole: "Creator & Developer",
    badge: "AI Mobile Web App",
    shortDescription: "A complete study management web app with smart flashcards, coding practice sandbox, offline capabilities, and a built-in AI tutor to explain tough concepts.",
    fullDescription: "StudyFlow is a personal learning companion designed to help students study smarter. It features an intelligent flashcard system that remembers which topics need review, a coding sandbox for practice, and a helpful AI assistant that answers questions 24/7—even working seamlessly when internet connection is lost.",
    architecturePoints: [
      "Offline-First App: Stores notes and study cards locally so the app works smoothly without internet connection.",
      "Smart Flashcard Repetition: Automatically schedules reviews for flashcards based on how easy or difficult they were.",
      "Personal AI Tutor Chat: Ask questions anytime and get clear step-by-step explanations.",
      "Coding Practice Sandbox: Practice coding syntax with instant feedback.",
    ],
    keyFeatures: [
      "24/7 AI Concept Explainer: Instant AI assistance whenever students get stuck on difficult homework topics.",
      "Adaptive Study Cards: Smart flashcard system focusing more on weak topics for efficient learning.",
      "Offline Synchronization: Access study materials offline and sync progress automatically when back online.",
      "Interactive Coding Box: Practice coding syntax with instant feedback.",
    ],
    tags: ["React", "TypeScript", "PWA (Offline App)", "IndexedDB", "Supabase", "Tailwind CSS"],
    metrics: [
      { label: "Offline Support", value: "100% Functional" },
      { label: "Learning Mode", value: "Adaptive Cards" },
      { label: "AI Tutor", value: "24/7 Instant" },
    ],
    highlight: "Engineered an offline-first learning web app with adaptive smart flashcards and instant AI tutoring.",
    featured: false,
  },
];
