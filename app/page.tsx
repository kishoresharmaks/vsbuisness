import React from "react";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { TrustBar } from "@/components/hero/trust-bar";
import { ServicesList } from "@/components/services/services-list";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { WhyUs } from "@/components/features/why-us";
import { PerformanceStats } from "@/components/performance/performance-stats";
import { ProcessTimeline } from "@/components/process/process-timeline";
import { TechEcosystem } from "@/components/technology/tech-ecosystem";
import { TestimonialQuote } from "@/components/testimonials/testimonial-quote";
import { ProjectBuilder } from "@/components/project-form/project-builder";
import { FinalCta } from "@/components/cta/final-cta";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ServicesList />
        <PortfolioGrid />
        <WhyUs />
        <PerformanceStats />
        <ProcessTimeline />
        <TechEcosystem />
        <TestimonialQuote />
        <ProjectBuilder />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
