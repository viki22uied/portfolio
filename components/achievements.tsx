"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { FileText, Medal, Award, Brain, Users, Globe, Cpu, TrendingUp } from "lucide-react";
import InteractiveSelector from "@/components/ui/interactive-selector";
import { SectionLabel } from "@/components/section-label";

interface Achievement {
  title: string;
  issuer: string;
  year: string;
  detail: string;
  image: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    title: "WorldQuant BRAIN — Gold Level",
    issuer: "WorldQuant · Research Consultant Program",
    year: "2024–2025",
    detail: "Achieved Gold Level on WorldQuant BRAIN platform with 53+ alpha submissions. Selected for the Research Consultant Program. IQC 2026 — Top 20% globally across 80,000+ participants from 142 countries.",
    image: "/achievements/ieee-publication.png",
    icon: <TrendingUp size={22} className="text-white" />,
  },
  {
    title: "IQC 2026 — Top 20% Globally",
    issuer: "WorldQuant International Quant Championship",
    year: "2026",
    detail: "Ranked in the Top 20% globally at the International Quant Championship 2026 — 80,000+ participants across 142 countries. Competed in quantitative signal research, alpha development, and portfolio construction.",
    image: "/achievements/tata-crucible.png",
    icon: <Globe size={22} className="text-white" />,
  },
  {
    title: "Top 30 National — SEBI Global FinTech Festival",
    issuer: "Securities and Exchange Board of India",
    year: "2025",
    detail: "Placed in the Top 30 nationally at the SEBI Global FinTech Festival 2025 with Hercules Finance AI — a financial planning platform for gig workers. Competed against hundreds of teams from across India.",
    image: "/achievements/sebi-fintech.png",
    icon: <Award size={22} className="text-white" />,
  },
  {
    title: "Top 50 Global — Logitech DevStudio Hackathon",
    issuer: "Logitech DevStudio 2026",
    year: "2026",
    detail: "Ranked in the Top 50 globally at the Logitech DevStudio Hackathon 2026 with Deep Work AI Console — an AI-powered productivity plugin for the Logitech MX Creative Console.",
    image: "/projects/deep-work-ai.png",
    icon: <Cpu size={22} className="text-white" />,
  },
  {
    title: "IEEE Published Researcher",
    issuer: "IEEE ISAECT 2025",
    year: "2025",
    detail: "Published 'AI-Enhanced PGRKAM Employment Analytics Platform' at IEEE ISAECT 2025. DOI: 10.1109/ISAECT68904.2025.11318700. Research applied ML/AI techniques to employment analytics for workforce optimization.",
    image: "/achievements/ieee-publication.png",
    icon: <FileText size={22} className="text-white" />,
  },
  {
    title: "1st Runner-Up — IIT Madras Design Blitz",
    issuer: "IIT Madras",
    year: "2024",
    detail: "Secured 1st Runner-Up at IIT Madras Design Blitz 2024, demonstrating strong design thinking, system architecture, and rapid prototyping skills under competition conditions.",
    image: "/achievements/iit-madras.png",
    icon: <Award size={22} className="text-white" />,
  },
  {
    title: "Karnataka Cluster Finalist — Tata Crucible",
    issuer: "Tata Group",
    year: "2025",
    detail: "Reached the Karnataka Cluster Finalist position at the Tata Crucible Campus Quiz 2025 — one of India's most prestigious business and general knowledge competitions.",
    image: "/achievements/tata-crucible.png",
    icon: <Brain size={22} className="text-white" />,
  },
  {
    title: "Top 100 — Mumbai Hacks",
    issuer: "Mumbai Hacks (3,500+ teams)",
    year: "2025",
    detail: "Placed in the Top 100 out of 3,500+ teams at Mumbai Hacks 2025 — one of India's largest hackathons. Built Hercules Finance AI, a financial planning platform for gig economy workers.",
    image: "/achievements/mumbai-hacks.png",
    icon: <Medal size={22} className="text-white" />,
  },
];

function AchievementImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{ background: "var(--bg-tertiary)" }}
      >
        <p className="text-sm" style={{ color: "var(--gold)" }}>{alt}</p>
      </div>
    );
  }
  return <Image src={src} alt={alt} fill className="object-cover" loading="lazy" onError={() => setError(true)} />;
}

export function Achievements() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeDetail, setActiveDetail] = useState<Achievement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const selectorOptions = useMemo(() => achievements.map((a) => ({
    title: a.title,
    description: `${a.issuer} · ${a.year}`,
    image: a.image,
    icon: a.icon,
  })), []);

  return (
    <>
      <section id="achievements" className="system-section">
        <div
          ref={headerRef}
          className="mx-auto max-w-6xl"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
        >
          <SectionLabel index="05" eyebrow="The Track Record" formula="Σ wins → percentile → top 1%" />
          <InteractiveSelector
            options={selectorOptions}
            heading="Achievements"
            subheading="Certifications, awards, and recognitions — click to explore."
            onActiveClick={(index) => setActiveDetail(achievements[index])}
          />
        </div>
      </section>
      {activeDetail && (
        <div className="project-modal-backdrop" onClick={() => setActiveDetail(null)}>
          <div className="project-modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveDetail(null)} className="project-modal-close" aria-label="Close">✕</button>
            <div className="p-8">
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg border" style={{ borderColor: "var(--border-color)" }}>
                <AchievementImage src={activeDetail.image} alt={activeDetail.title} />
              </div>
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                {activeDetail.issuer} · {activeDetail.year}
              </p>
              <h3 className="mt-2 text-2xl font-bold">{activeDetail.title}</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{activeDetail.detail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
