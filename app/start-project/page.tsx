import Metadata from "next";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { ProjectBuilder } from "@/components/project-form/project-builder";
import { Container } from "@/components/ui/container";
import { ShieldCheck, Clock, Award, Sparkles } from "lucide-react";

export const metadata = {
  title: "Start a Project | VS Business Solutions",
  description:
    "Configure your web development scope, select key features, and receive an estimated timeline & quote from VS Business Solutions.",
  openGraph: {
    title: "Start a Project | VS Business Solutions",
    description:
      "Configure your web development scope, select key features, and receive an estimated timeline & quote from VS Business Solutions.",
    url: "https://buisness.beeshubfarmland.com/start-project",
  },
};

export default function StartProjectPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111] antialiased pt-24 sm:pt-28">
      <Navbar />

      {/* Header Banner */}
      <section className="py-8 sm:py-12 bg-[#F7F8FA] border-b border-[#E5E7EB]">
        <Container size="default" className="px-3.5 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              INTERACTIVE PROJECT SCOPE BUILDER
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight mt-4">
              Start Your Project With VS Business<span className="text-[#2563EB]">.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#5F6368] mt-3 leading-relaxed max-w-2xl mx-auto">
              Tell us about your digital goals. Choose your project type, select desired features, and receive an estimated timeline and proposal within 24 hours.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 text-left">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#111111]">100% Confidential</h3>
                  <p className="text-[11px] text-[#5F6368]">Strict non-disclosure agreement</p>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#111111]">24-Hour Response</h3>
                  <p className="text-[11px] text-[#5F6368]">Fast proposal turnaround</p>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#111111]">Transparent Scope</h3>
                  <p className="text-[11px] text-[#5F6368]">Zero hidden engineering costs</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Builder */}
      <ProjectBuilder />

      <Footer />
    </main>
  );
}
