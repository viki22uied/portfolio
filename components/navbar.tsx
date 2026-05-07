"use client";

import { useState, useEffect, useCallback } from "react";
import { useThemeMode } from "@/hooks/use-theme-mode";

const links = [
  { label: "Home", href: "#home" },
  { label: "Achievements", href: "#achievements" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },

  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useThemeMode();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  /* Track which section is in view */
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    /* Small delay to let the page settle after loader */
    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id);
          },
          { threshold: 0.25, rootMargin: "-80px 0px -30% 0px" }
        );
        observer.observe(el);
        observers.push(observer);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  /* Scroll-based background opacity */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      setOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  if (!mounted) return null;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg transition-all duration-300"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--bg-primary) 95%, black 5%)"
          : "color-mix(in srgb, var(--bg-primary) 70%, transparent 30%)",
        borderBottom: scrolled
          ? "1px solid var(--border-color)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 1px 8px rgba(212,175,55,0.06)"
          : "none",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="text-xl font-semibold tracking-[0.24em] text-[var(--gold)]"
        >
          VIGNESH
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="relative text-sm transition-colors duration-200"
                style={{
                  color: isActive ? "var(--gold)" : "var(--text-secondary)",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300"
                  style={{
                    background: "var(--gold)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </a>
            );
          })}
          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="rounded-md bg-[var(--gold)] px-4 py-2 text-xs font-semibold tracking-wider text-[#0a0a0f] shadow-[0_4px_12px_-4px_var(--shadow-gold)] transition-all duration-200 hover:shadow-[0_8px_20px_-6px_var(--shadow-gold)] hover:brightness-110"
          >
            HIRE ME
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-md border border-[var(--border-color)] px-3 py-2 text-xs tracking-wider text-[var(--text-primary)] hover:border-[var(--gold)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 flex-col items-center justify-center rounded-md border border-[var(--border-color)] text-[var(--text-primary)] md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className="block h-[2px] w-5 bg-current transition-all duration-300"
              style={{
                transform: open ? "rotate(45deg) translate(2px, 2px)" : "none",
                marginBottom: open ? "0px" : "5px",
              }}
            />
            <span
              className="block h-[2px] w-5 bg-current transition-all duration-300"
              style={{
                opacity: open ? 0 : 1,
                marginBottom: open ? "0px" : "5px",
              }}
            />
            <span
              className="block h-[2px] w-5 bg-current transition-all duration-300"
              style={{
                transform: open ? "rotate(-45deg) translate(2px, -2px)" : "none",
              }}
            />
          </button>
        </div>
      </div>
      {open && (
        <div className="space-y-1 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-4 md:hidden">
          {/* Hire Me first on mobile */}
          <button
            onClick={() => handleNavClick("#contact")}
            className="mb-3 w-full rounded-md bg-[var(--gold)] py-2.5 text-sm font-semibold text-[#0a0a0f]"
          >
            HIRE ME
          </button>
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full py-2 text-left text-sm transition-colors"
                style={{
                  color: isActive ? "var(--gold)" : "var(--text-secondary)",
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
