"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/section-label";

interface Achievement {
  ticker: string;
  title: string;
  issuer: string;
  year: string;
  side: "LONG" | "ALPHA";
  size: string;
  detail: string;
  image: string;
}

const achievements: Achievement[] = [
  {
    ticker: "WQ.GOLD",
    title: "WorldQuant BRAIN — Gold Level",
    issuer: "WorldQuant · Research Consultant Program",
    year: "2024–25",
    side: "ALPHA",
    size: "53+ alphas",
    detail: "Achieved Gold Level on WorldQuant BRAIN platform with 53+ alpha submissions. Selected for the Research Consultant Program. IQC 2026 — Top 20% globally across 80,000+ participants from 142 countries.",
    image: "/achievements/ieee-publication.png",
  },
  {
    ticker: "IQC.26",
    title: "IQC 2026 — Top 20% Globally",
    issuer: "WorldQuant International Quant Championship",
    year: "2026",
    side: "ALPHA",
    size: "80,000+ field",
    detail: "Ranked in the Top 20% globally at the International Quant Championship 2026 — 80,000+ participants across 142 countries. Competed in quantitative signal research, alpha development, and portfolio construction.",
    image: "/achievements/tata-crucible.png",
  },
  {
    ticker: "SEBI.30",
    title: "Top 30 National — SEBI Global FinTech Festival",
    issuer: "Securities and Exchange Board of India",
    year: "2025",
    side: "LONG",
    size: "Top 30 / IN",
    detail: "Placed in the Top 30 nationally at the SEBI Global FinTech Festival 2025 with Hercules Finance AI — a financial planning platform for gig workers. Competed against hundreds of teams from across India.",
    image: "/achievements/sebi-fintech.png",
  },
  {
    ticker: "LOGI.50",
    title: "Top 50 Global — Logitech DevStudio Hackathon",
    issuer: "Logitech DevStudio 2026",
    year: "2026",
    side: "LONG",
    size: "Top 50 / GL",
    detail: "Ranked in the Top 50 globally at the Logitech DevStudio Hackathon 2026 with Deep Work AI Console — an AI-powered productivity plugin for the Logitech MX Creative Console.",
    image: "/projects/deep-work-ai.png",
  },
  {
    ticker: "IEEE.PUB",
    title: "IEEE Published Researcher",
    issuer: "IEEE ISAECT 2025",
    year: "2025",
    side: "ALPHA",
    size: "1 paper",
    detail: "Published 'AI-Enhanced PGRKAM Employment Analytics Platform' at IEEE ISAECT 2025. DOI: 10.1109/ISAECT68904.2025.11318700. Research applied ML/AI techniques to employment analytics for workforce optimization.",
    image: "/achievements/ieee-publication.png",
  },
  {
    ticker: "IITM.02",
    title: "1st Runner-Up — IIT Madras Design Blitz",
    issuer: "IIT Madras",
    year: "2024",
    side: "LONG",
    size: "Rank 2",
    detail: "Secured 1st Runner-Up at IIT Madras Design Blitz 2024, demonstrating strong design thinking, system architecture, and rapid prototyping skills under competition conditions.",
    image: "/achievements/iit-madras.png",
  },
  {
    ticker: "TATA.KA",
    title: "Karnataka Cluster Finalist — Tata Crucible",
    issuer: "Tata Group",
    year: "2025",
    side: "LONG",
    size: "Finalist",
    detail: "Reached the Karnataka Cluster Finalist position at the Tata Crucible Campus Quiz 2025 — one of India's most prestigious business and general knowledge competitions.",
    image: "/achievements/tata-crucible.png",
  },
  {
    ticker: "MUM.100",
    title: "Top 100 — Mumbai Hacks",
    issuer: "Mumbai Hacks (3,500+ teams)",
    year: "2025",
    side: "LONG",
    size: "Top 100",
    detail: "Placed in the Top 100 out of 3,500+ teams at Mumbai Hacks 2025 — one of India's largest hackathons. Built Hercules Finance AI, a financial planning platform for gig economy workers.",
    image: "/achievements/mumbai-hacks.png",
  },
];

const mono = { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" } as const;

function AchievementImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "var(--bg-tertiary)" }}>
        <p className="text-sm" style={{ color: "var(--gold)" }}>{alt}</p>
      </div>
    );
  }
  return <Image src={src} alt={alt} fill className="object-cover" loading="lazy" onError={() => setError(true)} />;
}

export function Achievements() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" className="system-section">
      <div ref={rootRef} className="mx-auto max-w-6xl">
        <SectionLabel index="05" eyebrow="The Track Record" formula="Σ wins → percentile → top 1%" />
        <h2 className="text-4xl font-semibold md:text-5xl">Trade Blotter</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Every position filled. Awards, ranks, and recognitions booked to the ledger — expand a row for the full fill report.
        </p>

        <div
          className="terminal-corners mt-10 overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--border-color)", background: "color-mix(in srgb, var(--bg-secondary) 94%, black 6%)" }}
        >
          {/* Blotter header */}
          <div
            className="hidden grid-cols-[110px_1fr_90px_110px_90px_40px] gap-3 border-b px-5 py-3 text-[10px] uppercase tracking-[0.2em] md:grid"
            style={{ ...mono, borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <span>Ticker</span>
            <span>Event / Desk</span>
            <span>Year</span>
            <span>Size</span>
            <span>Status</span>
            <span />
          </div>

          {achievements.map((a, i) => {
            const isOpen = expanded === i;
            return (
              <div
                key={a.ticker}
                className="border-b last:border-b-0"
                style={{
                  borderColor: "var(--border-color)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(18px)",
                  transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="grid w-full grid-cols-[1fr_40px] items-center gap-3 px-5 py-4 text-left transition-colors duration-200 hover:bg-[rgba(0,220,130,0.05)] md:grid-cols-[110px_1fr_90px_110px_90px_40px]"
                  aria-expanded={isOpen}
                >
                  <span className="hidden text-sm font-bold md:block" style={{ ...mono, color: a.side === "ALPHA" ? "var(--amber)" : "var(--gold)" }}>
                    {a.ticker}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{a.title}</span>
                    <span className="block truncate text-xs" style={{ color: "var(--text-secondary)" }}>{a.issuer}</span>
                  </span>
                  <span className="hidden text-xs md:block" style={{ ...mono, color: "var(--text-secondary)" }}>{a.year}</span>
                  <span className="hidden text-xs md:block" style={{ ...mono, color: "var(--text-primary)" }}>{a.size}</span>
                  <span className="hidden md:block">
                    <span
                      className="rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest"
                      style={{ ...mono, borderColor: "rgba(0,220,130,0.4)", color: "var(--green)", background: "rgba(0,220,130,0.08)" }}
                    >
                      FILLED
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    className="justify-self-end transition-transform duration-300"
                    style={{ color: "var(--gold)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-5 px-5 pb-6 pt-1 md:flex-row md:items-start">
                      <div
                        className="relative aspect-video w-full flex-shrink-0 overflow-hidden rounded-lg border md:w-72"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        <AchievementImage src={a.image} alt={a.title} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em]" style={{ ...mono, color: "var(--amber)" }}>
                          Fill report · {a.ticker} · {a.year}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{a.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Blotter footer */}
          <div
            className="flex items-center justify-between border-t px-5 py-2.5 text-[10px] uppercase tracking-[0.2em]"
            style={{ ...mono, borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <span>{achievements.length} positions · 0 rejected</span>
            <span style={{ color: "var(--green)" }}>● all fills confirmed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
