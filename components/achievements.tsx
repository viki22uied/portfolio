"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { FileText, Medal, Award, Brain, Users } from "lucide-react";
import InteractiveSelector from "@/components/ui/interactive-selector";

interface Achievement {
  title: string;
  issuer: string;
  year: string;
  detail: string;
  image: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  { title: "IEEE Published Researcher", issuer: "IEEE ISAECT 2025", year: "2025", detail: "Published 'AI-Enhanced PGRKAM Employment Analytics Platform' at IEEE ISAECT 2025. Research focused on applying AI/ML techniques to employment data analytics for workforce optimization and policy insights.", image: "/achievements/ieee-publication.png", icon: <FileText size={22} className="text-white" /> },
  { title: "Top 100 — Mumbai Hacks", issuer: "Mumbai Hacks (3500+ participants)", year: "2025", detail: "Competed against 3,500+ participants and placed in the Top 100 at Mumbai Hacks, one of India's largest hackathons.", image: "/achievements/mumbai-hacks.png", icon: <Medal size={22} className="text-white" /> },
  { title: "1st Runner-Up — IIT Madras Design Blitz", issuer: "IIT Madras", year: "2025", detail: "Secured 1st Runner-Up position at IIT Madras Design Blitz, demonstrating strong design thinking and system architecture skills.", image: "/achievements/iit-madras.png", icon: <Award size={22} className="text-white" /> },
  { title: "Cluster Finalist — Tata Crucible Quiz", issuer: "Tata Group (Karnataka Cluster)", year: "2025", detail: "Reached the Cluster Finalist position at the Tata Crucible Campus Quiz — Karnataka Cluster, demonstrating analytical thinking and business acumen.", image: "/achievements/tata-crucible.png", icon: <Brain size={22} className="text-white" /> },
  { title: "Organizer — Namma Suraksha Hackathon", issuer: "Presidency University", year: "2024", detail: "Organized and led the Namma Suraksha Hackathon with 200+ participants.", image: "/achievements/namma-suraksha.png", icon: <Users size={22} className="text-white" /> },
];


function AchievementImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return <div className="flex h-full w-full items-center justify-center bg-[var(--bg-tertiary)]"><p className="text-sm text-[var(--gold)]">{alt}</p></div>;
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
        <div ref={headerRef} className="mx-auto max-w-6xl" style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <InteractiveSelector options={selectorOptions} heading="Achievements" subheading="Certifications, awards, and recognitions — click to explore." onActiveClick={(index) => setActiveDetail(achievements[index])} />
        </div>
      </section>
      {activeDetail && (
        <div className="project-modal-backdrop" onClick={() => setActiveDetail(null)}>
          <div className="project-modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveDetail(null)} className="project-modal-close" aria-label="Close">✕</button>
            <div className="p-8">

              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg border border-[var(--border-color)]">
                <AchievementImage src={activeDetail.image} alt={activeDetail.title} />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{activeDetail.issuer} · {activeDetail.year}</p>
              <h3 className="mt-2 text-2xl font-bold">{activeDetail.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{activeDetail.detail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
