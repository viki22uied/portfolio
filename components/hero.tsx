"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/scenes/hero-scene").then((m) => m.HeroScene), { ssr: false });

const roles = ["Data Analyst", "Finance Analyst", "ML Engineer", "FinTech Builder"];

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

  return (
    <section id="home" className="section-reveal relative flex min-h-screen items-center px-6 pt-24 md:pt-28">
      <div ref={canvasRef} className="absolute inset-0 transition-opacity duration-200">
        <HeroScene />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[var(--gold)]">Data Analyst · Finance · AI</p>
          <h1 className="text-5xl font-semibold leading-tight text-[var(--text-primary)] md:text-7xl">I turn data into decisions</h1>
          <p className="mt-6 text-lg text-[var(--text-secondary)] md:text-xl">Vignesh Kumar U — Data Analyst | Finance | AI</p>

          <p className="mt-3 text-lg text-[var(--gold)]">
            {roleText}<span className="inline-block w-[2px] animate-pulse bg-[var(--gold)]" style={{ height: "1.1em", verticalAlign: "text-bottom" }} />
          </p>
        </div>
        <div className="flex flex-wrap gap-4">

          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="rounded-md border border-[var(--gold)] bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[#0a0a0f] shadow-[0_12px_24px_-16px_var(--shadow-gold)] transition-all duration-200 hover:shadow-[0_16px_32px_-12px_var(--shadow-gold)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="rounded-md border border-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--gold)] transition-all duration-200 hover:bg-[rgba(212,175,55,0.08)]"
          >
            Contact
          </a>
          <a
            href="/resume.pdf"
            download
            className="rounded-md border border-[var(--border-color)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500 cursor-pointer"
        style={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
        onClick={() => document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" })}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] animate-pulse">Scroll Down</p>
        <div className="relative flex flex-col items-center">
          <div className="h-10 w-[2px] rounded-full bg-gradient-to-b from-[var(--gold)]/60 to-transparent" />
          <div className="mt-1 h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--gold)] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        </div>
      </div>
    </section>
  );
}
