"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

type Props = {
  onComplete: () => void;
};

type Tone = "green" | "gold" | "amber";

const BOOT_LINES: { label: string; tag: string; tone: Tone }[] = [
  { label: "VKU-OS v4.8 — initializing kernel", tag: "OK", tone: "green" },
  { label: "Establishing secure session", tag: "ENCRYPTED", tone: "green" },
  { label: "Connecting market data feed", tag: "LIVE", tone: "amber" },
  { label: "Mounting alpha research modules", tag: "OK", tone: "green" },
  { label: "Authenticating WorldQuant BRAIN", tag: "GOLD", tone: "gold" },
  { label: "Calibrating volatility surface", tag: "OK", tone: "green" },
  { label: "Streaming price tape & candlesticks", tag: "OK", tone: "green" },
  { label: "Indexing 8 awards · 4 projects · 1 paper", tag: "READY", tone: "green" },
];

const toneVar: Record<Tone, string> = {
  green: "var(--green)",
  gold: "var(--gold)",
  amber: "var(--amber)",
};

export function CinematicLoader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  const [shown, setShown] = useState(0);
  const [welcome, setWelcome] = useState(false);
  const [progress, setProgress] = useState(0);

  const total = BOOT_LINES.length;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (rootRef.current) {
      gsap.to(rootRef.current, {
        opacity: 0,
        scale: 1.015,
        duration: 0.55,
        ease: "power2.in",
        onComplete: () => {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          onComplete();
        },
      });
    } else {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }

    if (reduce) {
      setShown(total);
      setWelcome(true);
      setProgress(100);
      const t = window.setTimeout(finish, 600);
      return () => window.clearTimeout(t);
    }

    const step = 150;
    const timers: number[] = [];
    for (let i = 1; i <= total; i++) {
      timers.push(window.setTimeout(() => setShown(i), step * i));
    }

    const dur = step * total + 500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / dur) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    timers.push(window.setTimeout(() => setWelcome(true), step * total + 300));
    timers.push(window.setTimeout(finish, step * total + 1300));

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
    };
  }, [finish, total]);

  return (
    <div
      ref={rootRef}
      onClick={finish}
      className="fixed inset-0 z-[120] grid cursor-pointer place-items-center bg-[#050505] px-4"
      style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* faint scanline + grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 220, 130,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 220, 130,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-xl overflow-hidden rounded-lg border bg-[#030712] shadow-[0_0_60px_-15px_rgba(0, 220, 130,0.4)]"
        style={{ borderColor: "rgba(0, 220, 130,0.35)" }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between border-b px-4 py-2.5"
          style={{ borderColor: "#222222", background: "#111111" }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--red)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--amber)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--green)" }} />
            <span className="ml-2 text-[11px] tracking-[0.18em]" style={{ color: "var(--text-secondary)" }}>
              VIGNESH KUMAR U // TERMINAL
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] tracking-[0.15em]" style={{ color: "var(--green)" }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--green)" }} />
            SECURE
          </span>
        </div>

        {/* Boot log */}
        <div className="px-5 py-5 text-[13px] leading-relaxed">
          {BOOT_LINES.map((line, i) => (
            <div
              key={line.label}
              className="flex items-center transition-all duration-300"
              style={{
                opacity: i < shown ? 1 : 0,
                transform: i < shown ? "translateY(0)" : "translateY(6px)",
              }}
            >
              <span style={{ color: "var(--gold)" }}>&gt;</span>
              <span className="ml-2 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                {line.label}
              </span>
              <span
                className="mx-2 flex-1 translate-y-[-3px] border-b border-dashed"
                style={{ borderColor: "rgba(136,136,136,0.35)" }}
              />
              <span className="whitespace-nowrap text-[11px] font-semibold tracking-wider" style={{ color: toneVar[line.tone] }}>
                [ {line.tag} ]
              </span>
            </div>
          ))}

          {/* Welcome line */}
          <div
            className="mt-4 flex items-center text-base transition-all duration-500"
            style={{ opacity: welcome ? 1 : 0, transform: welcome ? "translateY(0)" : "translateY(8px)" }}
          >
            <span style={{ color: "var(--gold)" }}>&gt;</span>
            <span
              className="ml-2 font-medium tracking-wide"
              style={{ color: "var(--text-primary)", textShadow: "0 0 22px rgba(0, 220, 130,0.25)" }}
            >
              Welcome to my journey
            </span>
            <span
              className="ml-1 inline-block h-[1.05em] w-[9px] animate-pulse"
              style={{ background: "var(--gold)", verticalAlign: "text-bottom" }}
            />
          </div>
        </div>

        {/* Progress / status bar */}
        <div className="border-t px-5 py-3" style={{ borderColor: "#222222", background: "#111111" }}>
          <div className="mb-1.5 flex items-center justify-between text-[10px] tracking-[0.15em]" style={{ color: "var(--text-secondary)" }}>
            <span>BOOTING SESSION</span>
            <span style={{ color: "var(--gold)" }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: "#222222" }}>
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--gold), var(--amber))" }}
            />
          </div>
          <p className="mt-2 text-center text-[10px] tracking-[0.2em]" style={{ color: "rgba(136,136,136,0.6)" }}>
            CLICK ANYWHERE TO SKIP
          </p>
        </div>
      </div>
    </div>
  );
}
