"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { title: "Languages & Analytics", skills: ["Python (Pandas, NumPy)", "SQL", "Statistical Analysis", "EDA", "Forecasting", "Data Cleaning"] },
  { title: "Visualization & Reporting", skills: ["Tableau", "Power BI", "Streamlit", "Matplotlib", "Seaborn"] },
  { title: "Tools & Infrastructure", skills: ["FastAPI", "Docker", "Kafka", "PostgreSQL", "Redis", "Git", "Jupyter", "Google Colab"] },
  { title: "Concepts", skills: ["Graph Analytics (NetworkX)", "NLP", "Semantic Search", "Schema Normalization", "Pipeline Automation"] },
];

const topSkills: Record<string, number> = { "Python (Pandas, NumPy)": 92, SQL: 88, Tableau: 85, FastAPI: 80, Docker: 78 };

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
          duration: 1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: scope, start: "top 70%" },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-reveal system-section">
      <div ref={rootRef} className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-3">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[var(--gold)]">Capabilities</p>
          <span className="rounded-full border border-[var(--gold)]/30 px-2.5 py-0.5 text-xs text-[var(--gold)]">{totalSkillCount} skills</span>
        </div>
        <h2 className="text-4xl font-semibold md:text-5xl">Skills</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <article key={category.title} className="skill-card gold-glow-hover system-shell p-6">
              <h3 className="text-lg font-medium text-[var(--text-primary)]">{category.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[rgba(212,175,55,0.45)] px-3 py-1.5 text-sm text-[var(--gold)] transition-all duration-200 hover:border-[var(--gold)] hover:bg-[rgba(212,175,55,0.12)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {category.skills.some((s) => topSkills[s]) && (
                <div className="mt-4 space-y-2">
                  {category.skills.filter((s) => topSkills[s]).map((skill) => (
                    <div key={skill}>
                      <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                        <span>{skill}</span>
                        <span>{topSkills[skill]}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-color)]">
                        <div
                          className="skill-bar-fill h-full rounded-full"
                          data-target={`${topSkills[skill]}%`}
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
