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
  },
  {
    title: "Visualization & Reporting",
    skills: ["Tableau", "Power BI", "Recharts", "Matplotlib", "Seaborn", "Streamlit"],
  },
  {
    title: "Infrastructure & Tools",
    skills: ["FastAPI", "Docker", "Kafka", "PostgreSQL", "Redis", "FAISS", "Qdrant", "Next.js", "Git"],
  },
  {
    title: "Quant Finance",
    skills: ["Alpha Research", "WorldQuant BRAIN", "Signal Development", "NetworkX (Graph Analytics)", "Options Flow Analysis", "Financial Modelling", "Risk Scoring", "Backtesting"],
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
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-reveal system-section">
      <div ref={rootRef} className="mx-auto max-w-6xl">
        <SectionLabel index="03" eyebrow="The Toolkit" formula="∇ · capabilities" />
        <div className="flex items-baseline gap-3">
          <h2 className="text-4xl font-semibold md:text-5xl">Skills</h2>
          <span
            className="rounded-full border px-2.5 py-0.5 text-xs"
            style={{ borderColor: "rgba(0,220,130,0.3)", color: "var(--gold)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {totalSkillCount} total
          </span>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.title}
              className="skill-card gold-glow-hover system-shell p-6"
            >
              <h3
                className="text-sm font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                {category.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3 py-1.5 text-xs transition-all duration-200 hover:bg-[rgba(0,220,130,0.12)]"
                    style={{ borderColor: "rgba(0,220,130,0.4)", color: "var(--gold)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
