"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
      className="fixed bottom-5 left-5 z-[80] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--bg-secondary)] text-[var(--gold)] shadow-[0_0_12px_rgba(212,175,55,0.2)] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(10px)",
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}
