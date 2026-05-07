"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Achievements } from "@/components/achievements";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";

import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { CurvedSeparator } from "@/components/curved-separator";
import { CinematicLoader } from "@/components/cinematic-loader";
import { PortfolioAssistant } from "@/components/portfolio-assistant";
import { Timeline } from "@/components/timeline";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { useGsapSectionReveal } from "@/hooks/use-gsap-section-reveal";

export function PortfolioShell() {
  const [ready, setReady] = useState(false);

  useGsapSectionReveal(ready);

  return (
    <div className="theme-transition">
      {!ready && <CinematicLoader onComplete={() => { window.scrollTo({ top: 0 }); setReady(true); }} />}
      <main className="relative">
        <Navbar />
        <Hero />
        <CurvedSeparator />
        <Achievements />
        <CurvedSeparator />
        <About />
        <CurvedSeparator />
        <Timeline />
        <CurvedSeparator />
        <Skills />
        <CurvedSeparator />
        <Projects />
        <CurvedSeparator />
        <Contact />
        <Footer />
        <PortfolioAssistant />
        <BackToTop />
      </main>
    </div>
  );
}
