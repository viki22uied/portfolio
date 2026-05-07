"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  onComplete: () => void;
};

export function CinematicLoader({ onComplete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope || !squareRef.current || !textRef.current || !shimmerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          /* Ensure we scroll to top before revealing the site */
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          onComplete();
        },
      });

      tl.set([textRef.current, shimmerRef.current], { opacity: 0 })
        .set(textRef.current, { y: 20 })
        .to(squareRef.current, {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          duration: 0.8,
          ease: "power3.inOut",
          onStart: () => setExpanded(true),
        })
        .to(
          shimmerRef.current,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "<0.2"
        )
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "<0.1"
        )
        .to(
          rootRef.current,
          {
            opacity: 0,
            duration: 0.7,
            ease: "power2.in",
          },
          "+=0.6"
        );
    }, scope);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[120] grid place-items-center bg-[#050508]">
      <div
        ref={squareRef}
        className="relative h-8 w-8 overflow-hidden rounded-lg border border-[#d4af37]/35 bg-[#0a0e1a] shadow-[0_0_22px_rgba(212,175,55,0.22)]"
      >
        {/* Lightweight CSS animated background instead of WebGL shader */}
        <div
          ref={shimmerRef}
          className="loader-shimmer absolute inset-0"
          style={{ opacity: 0 }}
        />
        <p
          ref={textRef}
          className="absolute inset-0 grid place-items-center text-xl font-medium tracking-wide text-[#f9fafb]"
          style={{
            opacity: 0,
            textShadow: "0 0 24px rgba(212,175,55,0.16)",
            visibility: expanded ? "visible" : "hidden",
          }}
        >
          Welcome to my journey
        </p>
      </div>

      <style jsx>{`
        .loader-shimmer {
          background:
            radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(100,140,200,0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0e1a 0%, #111827 40%, #0f1629 70%, #0a0e1a 100%);
          animation: shimmer-drift 3s ease-in-out infinite;
        }
        @keyframes shimmer-drift {
          0%, 100% { background-position: 0% 0%, 100% 100%, 0% 0%; }
          50% { background-position: 100% 100%, 0% 0%, 100% 100%; }
        }
      `}</style>
    </div>
  );
}
