"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: "2026", title: "Logitech Top 50 Global", desc: "DevStudio Hackathon — Deep Work AI Console" },
  { year: "2026", title: "IQC Top 20% Globally", desc: "80,000+ participants · 142 countries · WorldQuant Championship" },
  { year: "May 2026", title: "Graduating", desc: "B.Tech ISE (AI & Data Science), Presidency University · CGPA 7.76" },
  { year: "2025", title: "SEBI Top 30 National", desc: "Global FinTech Festival 2025 — Hercules Finance AI" },
  { year: "2025", title: "IEEE Published Researcher", desc: "ISAECT 2025 · DOI: 10.1109/ISAECT68904.2025.11318700" },
  { year: "2025", title: "Mumbai Hacks Top 100", desc: "3,500+ teams — Hercules Finance AI" },
  { year: "2025", title: "Tata Crucible Finalist", desc: "Karnataka Cluster — Tata Group Campus Quiz" },
  { year: "2024", title: "1st Runner-Up — IIT Madras", desc: "Design Blitz 2024 — system architecture challenge" },
  { year: "2024", title: "WorldQuant BRAIN Gold", desc: "53+ alphas submitted · Research Consultant Program selected" },
];

const mono = { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" } as const;

export function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      // Line draws itself as you scroll through the section
      gsap.fromTo(
        ".tl-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top 70%", end: "bottom 65%", scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        gsap.fromTo(
          item,
          { x: -28, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="section-reveal system-section">
      <div ref={rootRef} className="mx-auto max-w-4xl">
        <p
          className="mb-2 flex items-center justify-center gap-3 text-center text-xs uppercase tracking-[0.32em]"
          style={{ ...mono, color: "var(--text-secondary)" }}
        >
          <span style={{ color: "var(--gold)" }}>06</span>
          <span className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
          Timeline
          <span className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
        </p>
        <h2 className="text-center text-4xl font-semibold md:text-5xl">Chronology</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm" style={{ color: "var(--text-secondary)" }}>
          Career record, newest first.
        </p>

        <div className="relative mt-14 pl-14 md:pl-20">
          {/* Track + scroll-drawn fill */}
          <div className="absolute left-5 top-0 h-full w-[2px] md:left-8" style={{ background: "rgba(0,220,130,0.12)" }}>
            <div
              className="tl-line-fill h-full w-full origin-top"
              style={{
                background: "linear-gradient(to bottom, var(--gold), var(--amber))",
                boxShadow: "0 0 12px rgba(0,220,130,0.5)",
              }}
            />
          </div>

          {events.map((event, i) => (
            <div key={i} className="tl-item relative mb-7">
              {/* Node */}
              <div className="absolute -left-[41px] top-3 flex flex-col items-center md:-left-[53px]">
                <div className="h-2 w-[2px]" style={{ background: "var(--gold)" }} />
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ background: "var(--green)", boxShadow: "0 0 8px rgba(0,220,130,0.55)" }}
                />
                <div className="h-2 w-[2px]" style={{ background: "var(--gold)" }} />
              </div>

              <div
                className="rounded-xl border p-5 transition-colors duration-300 hover:border-[rgba(0,220,130,0.45)]"
                style={{ borderColor: "var(--border-color)", background: "color-mix(in srgb, var(--bg-secondary) 94%, black 6%)" }}
              >
                <span className="text-xs font-medium uppercase tracking-wider" style={{ ...mono, color: "var(--amber)" }}>
                  {event.year}
                </span>
                <h3 className="mt-1.5 text-base font-semibold" style={{ color: "var(--text-primary)" }}>{event.title}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
