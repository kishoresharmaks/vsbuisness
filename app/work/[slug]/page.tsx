import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/typography";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { projectsData } from "@/lib/projects";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Globe, Layers, ShieldCheck, Sparkles, Terminal } from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.findIndex((p) => p.slug === project.slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FFFFFF]">
        <Container size="narrow">
          {/* Back Navigation */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-[#5F6368] hover:text-[#111111] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to selected work</span>
          </Link>

          {/* Header Block */}
          <div className="flex flex-col gap-5 mb-10 border-b border-[#E5E7EB] pb-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-[#2563EB]/5 text-[#2563EB] border-[#2563EB]/20">
                  {project.category}
                </Badge>
                <span className="text-xs font-mono text-[#8A8F98]">
                  Role: {project.clientRole}
                </span>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Button variant="primary" size="sm" iconRight={<ExternalLink className="w-3.5 h-3.5" />}>
                    Visit Live Site
                  </Button>
                </a>
              )}
            </div>

            <div className="flex items-start gap-4">
              {project.faviconUrl && (
                <img
                  src={project.faviconUrl}
                  alt={`${project.title} favicon`}
                  className="w-10 h-10 rounded-xl object-contain border border-[#E5E7EB] bg-white p-1 shadow-xs mt-1 shrink-0"
                />
              )}
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold text-[#111111] tracking-tight">
                  {project.title}
                </h1>
                <p className="text-lg md:text-xl text-[#2563EB] font-medium mt-1">
                  {project.subtitle}
                </p>
              </div>
            </div>

            <p className="text-base md:text-lg text-[#5F6368] leading-relaxed max-w-2xl mt-2">
              {project.fullDescription}
            </p>

            {/* Metrics Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB]"
                >
                  <span className="text-xs font-mono text-[#5F6368] block">
                    {m.label}
                  </span>
                  <span className="text-sm font-bold text-[#111111] block mt-0.5">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Banner */}
          <div className="w-full rounded-2xl bg-[#111111] text-white p-6 md:p-8 mb-12 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                  Engineering Highlight
                </span>
                <p className="text-base font-medium text-white mt-1">
                  {project.highlight}
                </p>
              </div>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
              >
                <Button variant="secondary" size="sm">
                  Live URL ↗
                </Button>
              </a>
            )}
          </div>

          {/* Architecture & Key Features */}
          <div className="grid grid-cols-1 gap-12 mb-16">
            {/* Architecture Points */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-2xl font-semibold text-[#111111]">
                  System Architecture & Engineering
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {project.architecturePoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-start gap-3 text-sm md:text-base text-[#111111] leading-relaxed"
                  >
                    <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-2xl font-semibold text-[#111111]">
                  Core Product Features
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {project.keyFeatures.map((feature, idx) => (
                  <li
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-start gap-3 text-sm md:text-base text-[#111111] leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used */}
            <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl p-6 md:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111111] mb-4">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} className="bg-white border-[#E5E7EB] text-[#111111] px-3.5 py-1.5 text-xs font-mono">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Next Project Footer Link */}
          <div className="pt-12 border-t border-[#E5E7EB] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8A8F98] uppercase tracking-wider">
              Next Case Study
            </span>
            <Link href={`/work/${nextProject.slug}`}>
              <Button variant="secondary" iconRight={<ArrowRight className="w-4 h-4" />}>
                {nextProject.title}
              </Button>
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
