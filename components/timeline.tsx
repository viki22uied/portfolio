"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: "May 2026", title: "Graduating", desc: "B.Tech ISE (AI & Data Science), Presidency University", recent: true },
  { year: "2025", title: "IEEE Published Researcher", desc: "ISAECT 2025 — AI-Enhanced PGRKAM Employment Analytics", recent: true },
  { year: "2025", title: "Top 100 — Mumbai Hacks", desc: "3500+ participants, data-driven solution", recent: true },
  { year: "2025", title: "1st Runner-Up — IIT Madras Design Blitz", desc: "Design thinking and system architecture", recent: false },
  { year: "2025", title: "Cluster Finalist — Tata Crucible Quiz", desc: "Karnataka Cluster — analytical thinking and business acumen", recent: false },
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
        <p className="mb-2 text-center text-sm uppercase tracking-[0.25em] text-[var(--gold)]">Journey</p>
        <h2 className="text-center text-4xl font-semibold md:text-5xl">Timeline</h2>
        <div className="relative mt-12">
          {/* Vertical gold line */}
          <div className="absolute left-4 top-0 h-full w-[2px] bg-[var(--gold)]/30 md:left-1/2 md:-translate-x-1/2" />
          {events.map((event, i) => (
            <div key={i} className={`tl-item relative mb-8 flex items-start gap-6 pl-12 md:pl-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:items-center`}>
              {/* Node dot */}
              <div className="absolute left-[10px] top-2 z-10 md:left-1/2 md:-translate-x-1/2">
                <div
                  className="h-4 w-4 rounded-full border-2 border-[var(--gold)]"
                  style={{ background: event.recent ? "var(--gold)" : "var(--bg-primary)" }}
                />
              </div>
              {/* Content */}
              <div className={`system-shell w-full p-5 md:w-[45%] ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--gold)]">{event.year}</p>
                <h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">{event.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{event.desc}</p>
              </div>
              {/* Spacer for alternate layout */}
              <div className="hidden w-[45%] md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
