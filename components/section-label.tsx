"use client";

/**
 * Terminal-style section header: "NN / EYEBROW ———————— formula".
 * Gives every section a numbered, data-terminal frame so the scroll reads as
 * a sequenced story rather than a stack of generic blocks.
 */
export function SectionLabel({
  index,
  eyebrow,
  formula,
}: {
  index: string;
  eyebrow: string;
  formula?: string;
}) {
  return (
    <div
      className="mb-5 flex items-center gap-3"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      <span className="text-sm font-semibold" style={{ color: "var(--gold)" }}>
        {index}
      </span>
      <span className="h-px w-10" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
      <span
        className="text-[11px] uppercase tracking-[0.32em]"
        style={{ color: "var(--text-secondary)" }}
      >
        {eyebrow}
      </span>
      {formula && (
        <span
          className="ml-auto hidden truncate text-[11px] md:block"
          style={{ color: "rgba(0, 220, 130,0.45)" }}
        >
          {formula}
        </span>
      )}
    </div>
  );
}
