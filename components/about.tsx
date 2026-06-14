"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import gsap from "gsap";
import { SectionLabel } from "@/components/section-label";

const lines = [
  "> Initializing profile...",
  "> Role: Quant Researcher | AI Engineer | FinTech Builder",
  "> WorldQuant BRAIN: Gold Level · Research Consultant Program",
  "> Mission: build alpha at the intersection of finance and AI",
];

const stats = [
  { label: "CGPA", display: "7.76", suffix: " / 10.0", numeric: false },
  { label: "Alphas Submitted", display: "53", suffix: "+", target: 53 },
  { label: "Countries Competed", display: "142", suffix: "", target: 142 },
  { label: "Participants Beaten", display: "80000", suffix: "+", target: 80000, compact: true },
];

export function About() {
  const [typed, setTyped] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("about");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !typingStarted) {
          setTypingStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [typingStarted]);

  useEffect(() => {
    if (!typingStarted) return;
    const full = lines.join("\n");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [typingStarted]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          el.querySelectorAll<HTMLElement>(".stat-number").forEach((numEl) => {
            const targetVal = parseInt(numEl.dataset.target || "0", 10);
            if (isNaN(targetVal)) return;
            const compact = numEl.dataset.compact === "true";
            const obj = { val: 0 };
            gsap.to(obj, {
              val: targetVal,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                const v = Math.round(obj.val);
                numEl.textContent = compact && v >= 1000 ? `${Math.round(v / 1000)}K` : v.toString();
              },
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-reveal system-section section-grid-overlay section-scanline">
      <div className="mx-auto mb-8 max-w-6xl">
        <SectionLabel index="01" eyebrow="The Analyst" formula="α = R_p − [R_f + β(R_m − R_f)]" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="system-shell terminal-panel p-6 md:p-8">
          <p
            className="mb-5 text-sm uppercase tracking-[0.22em]"
            style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            System Scan / About
          </p>
          <pre
            className="min-h-32 whitespace-pre-wrap text-sm"
            style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            {typed}
            <span className="inline-block w-2 animate-pulse" style={{ color: "var(--gold)" }}>|</span>
          </pre>
          <p className="mt-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Final-year B.Tech student (ISE — AI &amp; Data Science) at Presidency University, Bengaluru, graduating May 2026.
            IEEE published researcher. WorldQuant BRAIN Gold Level with 53+ alphas submitted across 142 countries — IQC 2026 Top 20% globally (80,000+ participants).
            SEBI Global FinTech Festival 2025 Top 30 National. Building at the intersection of quantitative finance, AI engineering, and data infrastructure.
          </p>
          <a
            href="/resume.pdf"
            download
            className="mt-6 inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-all duration-200"
            style={{
              borderColor: "var(--gold)",
              background: "rgba(201,168,76,0.08)",
              color: "var(--gold)",
            }}
          >
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4">
          {[
            ["Education", "B.Tech — ISE (AI & Data Science), Presidency University, Bengaluru · CGPA 7.76 / 10.0 · Aug 2022 – May 2026"],
            ["Quant Research", "WorldQuant BRAIN — Gold Level · 53+ Alphas Submitted · Research Consultant Program Selected"],
            ["Focus Areas", "Alpha research, fraud detection, financial AI systems, semantic search, graph analytics"],
          ].map(([k, v]) => (
            <article key={k} className="system-shell p-5">
              <h3
                className="text-sm uppercase tracking-[0.2em]"
                style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                {k}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v}</p>
            </article>
          ))}
        </motion.div>
      </div>

      {/* Stats terminal */}
      <div
        ref={statsRef}
        className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
        style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="system-shell quant-scanline p-5 text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {s.target ? (
                <>
                  <span className="stat-number" data-target={s.target} data-compact={s.compact ? "true" : "false"}>0</span>
                  <span>{s.suffix}</span>
                </>
              ) : (
                <span>{s.display}{s.suffix}</span>
              )}
            </p>
            <p
              className="mt-1 text-xs uppercase tracking-wider"
              style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
