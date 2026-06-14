"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/scenes/hero-scene").then((m) => m.HeroScene), { ssr: false });

const roles = ["Quant Researcher", "AI Engineer", "FinTech Builder", "Alpha Researcher"];

const tickerItems = [
  "WorldQuant GOLD",
  "IQC 2026 — Top 20% Globally",
  "80,000+ Participants Beaten",
  "142 Countries Competed",
  "SEBI Top 30 National",
  "IEEE Published",
  "Logitech Top 50 Global",
  "IIT Madras 1st Runner-Up",
  "Mumbai Hacks Top 100",
];

export function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 600);
      if (canvasRef.current) canvasRef.current.style.opacity = String(opacity);
      setScrollIndicatorVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && roleText.length < currentRole.length) {
      timeout = setTimeout(() => setRoleText(currentRole.slice(0, roleText.length + 1)), 80);
    } else if (!isDeleting && roleText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && roleText.length > 0) {
      timeout = setTimeout(() => setRoleText(roleText.slice(0, -1)), 40);
    } else if (isDeleting && roleText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, roleIndex]);

  const doubledTicker = [...tickerItems, ...tickerItems];

  return (
    <section id="home" className="section-reveal relative flex min-h-screen flex-col items-center justify-between px-6 pt-24 md:pt-28">
      <div ref={canvasRef} className="absolute inset-0 transition-opacity duration-200">
        <HeroScene />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10">
        <div className="max-w-3xl">
          <p
            className="mb-5 font-mono text-sm uppercase tracking-[0.3em]"
            style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            Quant Researcher · AI Engineer · FinTech Builder
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
            className="mt-3 text-lg"
            style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
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
            className="rounded-md border px-6 py-3 text-sm font-medium text-[#0a0a0a] shadow-[0_12px_24px_-16px_var(--shadow-gold)] transition-all duration-200 hover:shadow-[0_16px_32px_-12px_var(--shadow-gold)]"
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
            Alpha Dashboard
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

      {/* Ticker tape */}
      <div
        className="relative z-10 w-full overflow-hidden border-t py-3"
        style={{ borderColor: "var(--border-color)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
      >
        <div className="ticker-track">
          {doubledTicker.map((item, i) => (
            <span
              key={i}
              className="mr-10 text-xs uppercase"
              style={{
                color: "var(--gold)",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                letterSpacing: "0.18em",
              }}
            >
              {item}
              <span className="mx-5" style={{ color: "var(--amber)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500 cursor-pointer"
        style={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
        onClick={() => document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" })}
      >
        <p
          className="animate-pulse text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          Scroll
        </p>
        <div className="relative flex flex-col items-center">
          <div className="h-10 w-[2px] rounded-full" style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
          <div
            className="mt-1 h-2.5 w-2.5 animate-bounce rounded-full"
            style={{ background: "var(--gold)", boxShadow: "0 0 10px rgba(201,168,76,0.5)" }}
          />
        </div>
      </div>
    </section>
  );
}
