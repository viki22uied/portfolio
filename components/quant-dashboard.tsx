"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const metrics = [
  { label: "Sharpe Ratio", value: "2.47", positive: true },
  { label: "Fitness", value: "2.37", positive: true },
  { label: "Returns", value: "11.55%", positive: true },
  { label: "Turnover", value: "10.94%", positive: null },
  { label: "Alphas", value: "53+", positive: true },
  { label: "Countries", value: "142", positive: null },
];

const alphaTickers = [
  "ALPHA_0042", "MOM_CROSS_7D", "REV_EARNINGS", "VOL_SKEW_ADJ",
  "FLOW_NET_BUY", "GRAPH_CENT_V2", "SECTOR_ROT_3W", "EARN_SURP_NLP",
  "OPT_SKEW_14D", "FUND_QUAL_SCR", "PRICE_MOM_ADJ", "NET_EFFECT_V3",
];

function PnLChart() {
  const data = [
    { x: 0, y: 100 }, { x: 1, y: 103 }, { x: 2, y: 101 }, { x: 3, y: 107 },
    { x: 4, y: 105 }, { x: 5, y: 110 }, { x: 6, y: 108 }, { x: 7, y: 115 },
    { x: 8, y: 113 }, { x: 9, y: 119 }, { x: 10, y: 117 }, { x: 11, y: 122 },
    { x: 12, y: 120 }, { x: 13, y: 126 }, { x: 14, y: 124 }, { x: 15, y: 131 },
    { x: 16, y: 129 }, { x: 17, y: 134 }, { x: 18, y: 132 }, { x: 19, y: 139 },
    { x: 20, y: 137 }, { x: 21, y: 143 }, { x: 22, y: 141 }, { x: 23, y: 148 },
  ];

  const W = 600;
  const H = 160;
  const pad = { t: 10, r: 10, b: 20, l: 40 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const minY = Math.min(...data.map((d) => d.y));
  const maxY = Math.max(...data.map((d) => d.y));
  const maxX = data[data.length - 1].x;

  const toX = (x: number) => pad.l + (x / maxX) * innerW;
  const toY = (y: number) => pad.t + innerH - ((y - minY) / (maxY - minY)) * innerH;

  const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.x)} ${toY(d.y)}`).join(" ");
  const areaD = `${pathD} L ${toX(maxX)} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`;

  const yLabels = [minY, Math.round((minY + maxY) / 2), maxY];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: "160px" }}>
      {/* Grid lines */}
      {yLabels.map((v) => (
        <g key={v}>
          <line
            x1={pad.l} y1={toY(v)} x2={W - pad.r} y2={toY(v)}
            stroke="rgba(201,168,76,0.12)" strokeWidth="1" strokeDasharray="4 4"
          />
          <text
            x={pad.l - 6} y={toY(v) + 4}
            fill="#888888" fontSize="9"
            fontFamily="'JetBrains Mono', monospace" textAnchor="end"
          >
            {v}
          </text>
        </g>
      ))}
      {/* Area fill */}
      <path d={areaD} fill="url(#goldGrad)" opacity="0.15" />
      {/* Line */}
      <path d={pathD} fill="none" stroke="var(--gold)" strokeWidth="2" className="pnl-line" />
      {/* Last dot */}
      <circle
        cx={toX(maxX)} cy={toY(data[data.length - 1].y)}
        r="4" fill="var(--gold)"
        style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.8))" }}
      />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function QuantDashboard() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMetricsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const doubledTickers = [...alphaTickers, ...alphaTickers];

  return (
    <section id="quant" className="section-reveal system-section" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-2 text-sm uppercase tracking-[0.25em]"
          style={{ color: "var(--gold)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          Quant Research
        </p>
        <h2 className="text-4xl font-semibold md:text-5xl">Alpha Dashboard</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Researching quantitative signals at the intersection of fundamental data, options flow, and network effects.
        </p>

        <div
          className="mt-10 system-shell quant-scanline overflow-hidden"
          style={{ borderColor: "rgba(201,168,76,0.25)" }}
        >
          {/* Terminal header bar */}
          <div
            className="flex items-center justify-between border-b px-5 py-3"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--red)" }} />
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--amber)" }} />
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--green)" }} />
              <span
                className="ml-3 text-xs"
                style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                WORLDQUANT — BRAIN ALPHA TERMINAL
              </span>
            </div>
            <span
              className="text-xs"
              style={{ color: "var(--green)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              ● LIVE
            </span>
          </div>

          {/* Metrics grid */}
          <div
            className="grid grid-cols-3 border-b md:grid-cols-6"
            style={{ borderColor: "var(--border-color)" }}
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={metricsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="border-r px-4 py-4 last:border-r-0"
                style={{ borderColor: "var(--border-color)" }}
              >
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                >
                  {m.label}
                </p>
                <p
                  className="mt-1 text-lg font-bold"
                  style={{
                    color: m.positive === true ? "var(--green)" : m.positive === false ? "var(--red)" : "var(--gold)",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  }}
                >
                  {m.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* PnL Chart */}
          <div className="border-b px-5 py-4" style={{ borderColor: "var(--border-color)" }}>
            <p
              className="mb-3 text-xs uppercase tracking-wider"
              style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              Cumulative PnL (Simulated Alpha Performance)
            </p>
            <PnLChart />
          </div>

          {/* Scrolling alpha ticker */}
          <div className="overflow-hidden px-5 py-3">
            <p
              className="mb-2 text-xs uppercase tracking-wider"
              style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              Active Alphas
            </p>
            <div className="ticker-track" ref={tickerRef}>
              {doubledTickers.map((a, i) => (
                <span
                  key={i}
                  className="mr-8 text-xs"
                  style={{
                    color: i % 3 === 0 ? "var(--gold)" : i % 3 === 1 ? "var(--amber)" : "var(--text-secondary)",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  }}
                >
                  {a}
                  <span className="mx-3" style={{ color: "var(--border-color)" }}>|</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
