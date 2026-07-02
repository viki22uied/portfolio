"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/section-label";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Languages & Analytics",
    skills: ["Python (Pandas, NumPy)", "SQL", "TypeScript", "Statistical Analysis", "EDA", "Forecasting", "Data Cleaning", "scikit-learn"],
    bars: { "Python (Pandas, NumPy)": 92, SQL: 88, TypeScript: 78 },
  },
  {
    title: "Visualization & Reporting",
    skills: ["Tableau", "Power BI", "Recharts", "Matplotlib", "Seaborn", "Streamlit"],
    bars: { Tableau: 87, "Power BI": 82 },
  },
  {
    title: "Infrastructure & Tools",
    skills: ["FastAPI", "Docker", "Kafka", "PostgreSQL", "Redis", "FAISS", "Qdrant", "Next.js", "Git"],
    bars: { FastAPI: 80, Docker: 76 },
  },
  {
    title: "Quant Finance",
    skills: ["Alpha Research", "WorldQuant BRAIN", "Signal Development", "NetworkX (Graph Analytics)", "Options Flow Analysis", "Financial Modelling", "Risk Scoring", "Backtesting"],
    bars: { "Alpha Research": 84, "Signal Development": 78, "Financial Modelling": 72 },
  },
];

const totalSkillCount = categories.reduce((sum, c) => sum + c.skills.length, 0);

export function Skills() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".skill-bar-fill",
        { width: "0%" },
        {
          width: (i: number, el: HTMLElement) => el.dataset.target || "0%",
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: { trigger: scope, start: "top 70%" },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-reveal system-section">
      <div ref={rootRef} className="mx-auto max-w-6xl">
        <SectionLabel index="03" eyebrow="The Toolkit" formula="∇ · capabilities" />
        <div className="flex items-baseline gap-3">
          <h2 className="text-4xl font-semibold md:text-5xl">Asset Allocation</h2>
          <span
            className="rounded-full border px-2.5 py-0.5 text-xs"
            style={{ borderColor: "rgba(0,220,130,0.3)", color: "var(--gold)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {totalSkillCount} instruments
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          The capital stack — four books of instruments, weighted by conviction.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {categories.map((category, ci) => (
            <article
              key={category.title}
              className="skill-card gold-glow-hover system-shell p-6"
            >
              <h3
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                <span style={{ color: "var(--amber)" }}>BOOK 0{ci + 1}</span>
                <span className="h-px w-4" style={{ background: "var(--border-color)" }} />
                {category.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3 py-1.5 text-xs transition-all duration-200 hover:bg-[rgba(0,220,130,0.12)]"
                    style={{ borderColor: "rgba(0, 220, 130,0.4)", color: "var(--gold)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {Object.keys(category.bars).length > 0 && (
                <div className="mt-5 space-y-2.5">
                  {Object.entries(category.bars).map(([skill, pct]) => (
                    <div key={skill}>
                      <div
                        className="flex justify-between text-xs"
                        style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                      >
                        <span>{skill}</span>
                        <span style={{ color: "var(--gold)" }}>{pct}%</span>
                      </div>
                      <div
                        className="mt-1 h-1.5 w-full overflow-hidden rounded-full"
                        style={{ background: "var(--border-color)" }}
                      >
                        <div
                          className="skill-bar-fill h-full rounded-full"
                          data-target={`${pct}%`}
                          style={{ background: "linear-gradient(90deg, var(--gold), var(--amber))", width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
