"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: "2026", title: "Logitech Top 50 Global", desc: "DevStudio Hackathon — Deep Work AI Console", recent: true },
  { year: "2026", title: "IQC Top 20% Globally", desc: "80,000+ participants · 142 countries · WorldQuant Championship", recent: true },
  { year: "May 2026", title: "Graduating", desc: "B.Tech ISE (AI & Data Science), Presidency University · CGPA 7.76", recent: true },
  { year: "2025", title: "SEBI Top 30 National", desc: "Global FinTech Festival 2025 — Hercules Finance AI", recent: true },
  { year: "2025", title: "IEEE Published Researcher", desc: "ISAECT 2025 · DOI: 10.1109/ISAECT68904.2025.11318700", recent: true },
  { year: "2025", title: "Mumbai Hacks Top 100", desc: "3,500+ teams — Hercules Finance AI", recent: false },
  { year: "2025", title: "Tata Crucible Finalist", desc: "Karnataka Cluster — Tata Group Campus Quiz", recent: false },
  { year: "2024", title: "1st Runner-Up — IIT Madras", desc: "Design Blitz 2024 — system architecture challenge", recent: false },
  { year: "2024", title: "WorldQuant BRAIN Gold", desc: "53+ alphas submitted · Research Consultant Program selected", recent: false },
];

export function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: scope, start: "top 75%" },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="section-reveal system-section">
      <div ref={rootRef} className="mx-auto max-w-4xl">
        <p
          className="mb-2 flex items-center justify-center gap-3 text-center text-xs uppercase tracking-[0.32em]"
          style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          <span style={{ color: "var(--gold)" }}>06</span>
          <span className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
          The Ascent
          <span className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
        </p>
        <h2 className="text-center text-4xl font-semibold md:text-5xl">Timeline</h2>
        <div className="relative mt-12">
          {/* Vertical gold line */}
          <div
            className="absolute left-4 top-0 h-full w-[2px] md:left-1/2 md:-translate-x-1/2"
            style={{ background: "rgba(201,168,76,0.25)" }}
          />
          {events.map((event, i) => (
            <div
              key={i}
              className={`tl-item relative mb-8 flex items-start gap-6 pl-12 md:pl-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:items-center`}
            >
              {/* Node dot */}
              <div className="absolute left-[10px] top-2 z-10 md:left-1/2 md:-translate-x-1/2">
                <div
                  className="h-4 w-4 rounded-full border-2"
                  style={{
                    borderColor: "var(--gold)",
                    background: event.recent ? "var(--gold)" : "var(--bg-primary)",
                    boxShadow: event.recent ? "0 0 8px rgba(201,168,76,0.5)" : "none",
                  }}
                />
              </div>
              {/* Content */}
              <div className={`system-shell w-full p-5 md:w-[45%] ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                >
                  {event.year}
                </p>
                <h3 className="mt-1 text-base font-semibold" style={{ color: "var(--text-primary)" }}>{event.title}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{event.desc}</p>
              </div>
              <div className="hidden w-[45%] md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
