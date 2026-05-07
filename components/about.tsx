"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import gsap from "gsap";

const lines = [
  "> Booting analyst profile...",
  "> Focus: data engineering, fraud detection, financial analytics",
  "> Mission: translate complexity into decisions",
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
    }, 22);
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
            const obj = { val: 0 };
            gsap.to(obj, { val: targetVal, duration: 1.2, ease: "power2.out", onUpdate: () => { numEl.textContent = Math.round(obj.val).toString(); } });
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
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="system-shell terminal-panel p-6 md:p-8">
          <p className="mb-5 text-sm uppercase tracking-[0.22em] text-[var(--gold)]">System Scan / About</p>
          <pre className="min-h-32 whitespace-pre-wrap text-sm text-[var(--text-secondary)]">{typed}<span className="inline-block w-2 animate-pulse text-[var(--gold)]">|</span></pre>
          <p className="mt-6 leading-relaxed text-[var(--text-secondary)]">
            Final-year Data Science and Engineering student (graduating May 2026) with hands-on experience building analytics pipelines, fraud detection systems, and AI-driven applications using Python, SQL, Tableau, FastAPI, and Docker. IEEE published researcher, Mumbai Hacks Top 100 (out of 3,500+ teams), and Tata Crucible Quiz Karnataka Cluster Finalist. Focused on applying data engineering and analytics skills to real-world financial and analytical problems.
          </p>
          <a href="/resume.pdf" download className="mt-6 inline-flex items-center gap-2 rounded-md border border-[var(--gold)] bg-[rgba(212,175,55,0.08)] px-5 py-2.5 text-sm font-medium text-[var(--gold)] transition-all duration-200 hover:bg-[rgba(212,175,55,0.16)] hover:shadow-[0_4px_16px_-4px_var(--shadow-gold)]">
            <Download size={16} /> Download Resume
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4">
          {[
            ["Education", "B.Tech — ISE (AI & Data Science), Presidency University, Bengaluru · CGPA 7.64 / 10.0 · Aug 2022 – May 2026"],
            ["Skills", "Python, SQL, Tableau, Power BI, FastAPI, Docker, NLP, Graph Analytics"],
            ["Focus Areas", "Fraud detection, financial forecasting, analytics pipelines, semantic search"],
          ].map(([k, v]) => (
            <article key={k} className="system-shell p-5">
              <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--gold)]">{k}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{v}</p>
            </article>
          ))}
        </motion.div>
      </div>
      <div ref={statsRef} className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4" style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
        {[{ l: "Projects", v: 3 }, { l: "Awards", v: 5 }, { l: "Transactions", t: "1M+" }, { l: "Years Building", v: 2 }].map((s) => (
          <div key={s.l} className="system-shell p-4 text-center">
            <p className="text-2xl font-bold text-[var(--gold)]">{s.t ? s.t : <span className="stat-number" data-target={s.v}>0</span>}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-[var(--text-secondary)]">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
