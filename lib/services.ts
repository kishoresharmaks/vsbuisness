export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  businessValue: string;
  tags: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "websites",
    number: "01",
    title: "High-Performance Websites",
    summary: "Fast, beautiful websites that build trust and convert visitors into paying clients.",
    description:
      "We design custom business websites and landing pages that load in under 1 second. Built to make your company look premium, rank higher on Google Search, and turn website traffic into phone calls and quote requests.",
    businessValue: "Gets your business found on Google and turns website visitors into real customer leads.",
    tags: ["Fast Page Load", "Google SEO", "Mobile Friendly", "Lead Generation"],
  },
  {
    id: "web-applications",
    number: "02",
    title: "Custom Web Applications",
    summary: "Easy-to-use web software and portals built for your exact business workflows.",
    description:
      "Interactive web apps, customer portals, and booking systems built to run smoothly on phones, tablets, and desktop computers. Replaces slow manual tasks with fast automated tools.",
    businessValue: "Automates daily business tasks and gives your clients a smooth online experience.",
    tags: ["Customer Portals", "Booking Systems", "Role Security", "All Devices"],
  },
  {
    id: "ecommerce",
    number: "03",
    title: "E-Commerce Stores",
    summary: "Online shops with smooth payment checkout that make buying easy for your customers.",
    description:
      "Custom online store fronts designed to sell products effortlessly. Features simple checkout flows, instant payment processing (Razorpay & Stripe), automated order tracking, and mobile shopping.",
    businessValue: "Increases sales by making it fast and easy for customers to pay online.",
    tags: ["Online Payments", "Mobile Shopping", "Product Catalog", "Order Tracking"],
  },
  {
    id: "saas",
    number: "04",
    title: "SaaS & Subscription Software",
    summary: "Complete web software platforms with user accounts and monthly billing.",
    description:
      "All-in-one software platform development including user signups, secure logins, automated monthly subscription billing, and customer management dashboards.",
    businessValue: "Enables you to launch and run a recurring monthly subscription software business.",
    tags: ["User Accounts", "Monthly Billing", "Secure Logins", "Auto Invoices"],
  },
  {
    id: "custom-software",
    number: "05",
    title: "Custom Enterprise Software",
    summary: "Tailored internal tools and operational dashboards built around your business rules.",
    description:
      "Bespoke software solutions crafted specifically for your company's operational needs. Consolidates scattered spreadsheets into one clear, secure master management system.",
    businessValue: "Eliminates spreadsheet errors and saves your team hours of manual work every week.",
    tags: ["Internal Tools", "Data Dashboards", "Team Access", "Process Automation"],
  },
  {
    id: "api-backend",
    number: "06",
    title: "Database & Cloud Servers",
    summary: "Secure cloud database systems that keep your company data safe and fast.",
    description:
      "High-speed cloud server architecture and database setup that protects customer data, handles thousands of simultaneous visitors, and keeps your system running 24/7 with zero downtime.",
    businessValue: "Keeps your business website and customer data secure, fast, and online 24/7.",
    tags: ["Data Security", "24/7 Cloud Uptime", "Fast Database", "Automatic Backups"],
  },
];


