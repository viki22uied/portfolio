"use client";

import { useEffect, useState } from "react";

const roles = ["Quantitative Researcher", "AI Engineer", "FinTech Builder", "MFE Candidate"];

const facts = [
  "WorldQuant BRAIN — Gold Level",
  "IQC 2026 — Top 20% Globally (142 Countries)",
  "IEEE Published Researcher",
  "SEBI Global FinTech Festival — Top 30 National",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && roleText.length < currentRole.length) {
      timeout = setTimeout(() => setRoleText(currentRole.slice(0, roleText.length + 1)), 55);
    } else if (!isDeleting && roleText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && roleText.length > 0) {
      timeout = setTimeout(() => setRoleText(roleText.slice(0, -1)), 30);
    } else if (isDeleting && roleText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="section-reveal relative flex min-h-screen flex-col items-center justify-between px-6 pt-24 md:pt-28"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10">
        <div className="max-w-3xl">
          <p
            className="mb-5 font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--amber)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            Quantitative Researcher · WorldQuant BRAIN Gold · MFE Candidate
          </p>
          <h1
            className="text-5xl font-semibold leading-tight md:text-7xl"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            VIGNESH KUMAR U
          </h1>
          <p
            className="mt-6 font-mono text-lg md:text-xl"
            style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            Bengaluru, India · Presidency University · May 2026
          </p>

          <p
            className="mt-3 min-h-[1.75rem] text-lg"
            style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            aria-live="polite"
          >
            {roleText}
            <span
              className="inline-block w-[2px] animate-pulse"
              style={{ height: "1.1em", verticalAlign: "text-bottom", background: "var(--gold)" }}
            />
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="rounded-md border px-6 py-3 text-sm font-medium text-[#030712] transition-all duration-200"
            style={{ borderColor: "var(--gold)", background: "var(--gold)" }}
          >
            View Projects
          </a>
          <a
            href="#quant"
            onClick={(e) => { e.preventDefault(); document.getElementById("quant")?.scrollIntoView({ behavior: "smooth" }); }}
            className="rounded-md border px-6 py-3 text-sm font-medium transition-all duration-200"
            style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            Research Record
          </a>
          <a
            href="/resume.pdf"
            download
            className="rounded-md border px-6 py-3 text-sm font-medium transition-all duration-200 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Fact strip — flat, no fabricated "movement" framing */}
      <div
        className="relative z-10 w-full overflow-x-auto border-t py-4"
        style={{ borderColor: "var(--border-color)", background: "rgba(0,0,0,0.25)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-2">
          {facts.map((f, i) => (
            <span
              key={f}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.12em]"
              style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {i > 0 && <span style={{ color: "var(--border-color)" }}>│</span>}
              <span style={{ color: "var(--text-primary)" }}>{f}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
