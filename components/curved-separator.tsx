
export function CurvedSeparator() {
  return (
    <div aria-hidden className="relative -mt-2 h-20 w-full overflow-hidden">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M0,96 C240,160 420,12 720,80 C1020,148 1200,20 1440,88 L1440,160 L0,160 Z"
          fill="var(--bg-secondary)"
          opacity="0.7"
        />
        <path
          d="M0,110 C360,140 600,50 900,100 C1100,130 1300,60 1440,95 L1440,160 L0,160 Z"
          fill="var(--bg-secondary)"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
