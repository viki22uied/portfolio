"use client";

/**
 * Fixed, non-interactive atmosphere layer that sits behind all content.
 * Faint drifting grid + floating quant/finance/math formulae so the whole
 * scroll reads as one continuous "quant war room", not a stack of cards.
 */

type Formula = {
  text: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  opacity: number;
  delay: string;
  duration: string;
};

const formulae: Formula[] = [
  { text: "C = S·N(d₁) − K·e^(−rT)·N(d₂)", top: "12%", left: "6%", size: "0.95rem", opacity: 0.07, delay: "0s", duration: "24s" },
  { text: "Sₚ = (E[Rₚ] − R_f) / σₚ", top: "26%", right: "7%", size: "1.05rem", opacity: 0.08, delay: "-6s", duration: "27s" },
  { text: "dXₜ = μ·dt + σ·dWₜ", top: "44%", left: "10%", size: "0.9rem", opacity: 0.06, delay: "-3s", duration: "21s" },
  { text: "min  wᵀΣw   s.t. wᵀμ = R", top: "58%", right: "9%", size: "0.95rem", opacity: 0.07, delay: "-9s", duration: "25s" },
  { text: "α = Rₚ − [R_f + β(Rₘ − R_f)]", top: "72%", left: "7%", size: "1rem", opacity: 0.07, delay: "-12s", duration: "26s" },
  { text: "∂V/∂t + ½σ²S²·∂²V/∂S² + rS·∂V/∂S − rV = 0", top: "86%", right: "6%", size: "0.85rem", opacity: 0.05, delay: "-4s", duration: "29s" },
  { text: "Σ  ∫  ∂  ∇  λ  ρ  Γ  Θ  ν", top: "6%", right: "30%", size: "1.3rem", opacity: 0.06, delay: "-8s", duration: "23s" },
  { text: "IR = α / ω", top: "36%", left: "40%", size: "1.1rem", opacity: 0.05, delay: "-2s", duration: "20s" },
  { text: "VaR = μ − z·σ", top: "64%", left: "44%", size: "1rem", opacity: 0.05, delay: "-14s", duration: "28s" },
];

export function QuantBackdrop() {
  return (
    <div className="quant-backdrop" aria-hidden>
      <div className="quant-backdrop__grid" />
      {formulae.map((f, i) => (
        <span
          key={i}
          className="quant-formula"
          style={{
            top: f.top,
            left: f.left,
            right: f.right,
            fontSize: f.size,
            ["--f-op" as string]: f.opacity,
            opacity: f.opacity,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}
