"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SelectorOption {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  featured?: boolean;
}

interface InteractiveSelectorProps {
  options: SelectorOption[];
  heading?: string;
  subheading?: string;
  onActiveClick?: (index: number) => void;
}

/* The smooth easing curve used everywhere */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const InteractiveSelector: React.FC<InteractiveSelectorProps> = ({
  options,
  heading,
  subheading,
  onActiveClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const handleOptionClick = useCallback(
    (index: number) => {
      if (index === activeIndex) {
        onActiveClick?.(index);
      } else {
        setActiveIndex(index);
      }
    },
    [activeIndex, onActiveClick]
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % options.length);
  }, [options.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
  }, [options.length]);

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  /* Staggered entrance */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      timers.push(setTimeout(() => setAnimatedOptions((prev) => [...prev, i]), 150 * i));
    });
    return () => timers.forEach(clearTimeout);
  }, [options.length]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Header */}
      {(heading || subheading) && (
        <div style={{ width: "100%", maxWidth: "38rem", padding: "0 1.5rem", marginBottom: "2.5rem", textAlign: "center" }}>
          {heading && (
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              {heading}
            </h2>
          )}
          {subheading && (
            <p style={{ marginTop: "0.75rem", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {subheading}
            </p>
          )}
        </div>
      )}

      {/* Selector strip + arrows */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%", maxWidth: 960 }}>
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="is-arrow"
          style={{ position: "absolute", left: -56, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        {/* Panels */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 420,
            overflow: "hidden",
            borderRadius: 14,
          }}
        >
          {options.map((option, index) => {
            const isActive = activeIndex === index;
            const isReady = animatedOptions.includes(index);

            return (
              <div
                key={index}
                onClick={() => handleOptionClick(index)}
                style={{
                  position: "relative",
                  flex: isActive ? "7 1 0%" : "1 1 0%",
                  minWidth: 60,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: `2px solid ${isActive ? "var(--gold, #00DC82)" : "var(--border-color, #292929)"}`,
                  opacity: isReady ? 1 : 0,
                  transform: isReady ? "translateX(0) scale(1)" : "translateX(-40px) scale(0.97)",
                  transition: `flex 0.8s ${EASE}, opacity 0.6s ${EASE}, transform 0.6s ${EASE}, border-color 0.5s ease`,
                  willChange: "flex",
                  zIndex: isActive ? 5 : 1,
                }}
              >

                {option.featured && (
                  <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10, background: "var(--gold)", color: "#03140b", padding: "4px 10px", borderRadius: 6, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>FEATURED</div>
                )}
                {/* BG image — separate div for GPU-composited scale */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${option.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    transform: isActive ? "scale(1)" : "scale(1.15)",
                    transition: `transform 0.9s ${EASE}`,
                    willChange: "transform",
                  }}
                />

                {/* Bottom gradient */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: isActive ? 0 : -40,
                    height: 150,
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                    opacity: isActive ? 1 : 0,
                    transition: `bottom 0.7s ${EASE}, opacity 0.7s ${EASE}`,
                    pointerEvents: "none",
                  }}
                />

                {/* Label row */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "0 16px",
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 44,
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "rgba(20,20,25,0.8)",
                      backdropFilter: "blur(10px)",
                      border: `2px solid ${isActive ? "rgba(56, 189, 248,0.5)" : "rgba(255,255,255,0.15)"}`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                      transition: `border-color 0.4s ease, background 0.4s ease`,
                    }}
                  >
                    {option.icon}
                  </div>

                  {/* Text */}
                  <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#fff",
                        textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(20px)",
                        transition: `opacity 0.65s ${EASE}, transform 0.65s ${EASE}`,
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.7)",
                        marginTop: 2,
                        textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(20px)",
                        transition: `opacity 0.7s ${EASE} 0.05s, transform 0.7s ${EASE} 0.05s`,
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next arrow */}
        <button
          onClick={goNext}
          aria-label="Next"
          className="is-arrow"
          style={{ position: "absolute", right: -56, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default InteractiveSelector;
export type { SelectorOption };
