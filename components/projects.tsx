"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { X, Github, ExternalLink, Play, ChevronLeft, ChevronRight, Zap, ShieldCheck, Wallet, BookOpen } from "lucide-react";
import { SectionLabel } from "@/components/section-label";

interface Project {
  id: string;
  ticker: string;
  rating: string;
  title: string;
  subtitle: string;
  longDescription: string;
  tags: string[];
  techStack: string[];
  thumbnail: string;
  images: string[];
  github: string;
  liveUrl?: string;
  videoUrl?: string;
  year: string;
  status: "Live" | "In Development" | "Archived";
  icon: React.ReactNode;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "deep-work-ai",
    ticker: "DWAI",
    rating: "STRONG BUY",
    title: "Deep Work AI Console",
    subtitle: "Top 50 Globally — Logitech DevStudio 2026",
    longDescription: "AI-powered deep work plugin for the Logitech MX Creative Console. Integrates with Logitech Options+ via the SDK to provide Meeting Mode, Context Anchoring, Queue Interruption management, and workspace restoration. Built with a Python service layer, PyQt6 timeline UI overlay, scikit-learn focus scoring, and Node.js IPC bridge for hardware-mapped controls.",
    tags: ["AI", "Plugin", "Productivity"],
    techStack: ["Python", "Node.js", "scikit-learn", "PyQt6", "Logitech SDK"],
    thumbnail: "/projects/deep-work-ai.png",
    images: ["/projects/deep-work-ai.png"],
    github: "https://github.com/viki22uied/Deepworkai",
    liveUrl: "https://www.youtube.com/watch?v=XWE-0LSkKNs&t=2s",
    videoUrl: "https://www.youtube.com/embed/Dk-PucXtzNE",
    year: "2026",
    status: "Live",
    icon: <Zap size={22} className="text-white" />,
    featured: true,
  },
  {
    id: "fraud-detection",
    ticker: "FRDX",
    rating: "OVERWEIGHT",
    title: "Financial Crime Detection Pipeline",
    subtitle: "Graph analytics on 1M+ transactions",
    longDescription: "End-to-end fraud detection pipeline processing 1M+ financial transactions. Used NetworkX graph analytics — Strongly Connected Components and Betweenness Centrality — to surface hidden money-laundering rings. Built risk scoring with scikit-learn ensemble models, visualized via Tableau dashboards, containerised with Docker for production deployment.",
    tags: ["Finance", "ML", "Data"],
    techStack: ["Python", "NetworkX", "Tableau", "Docker", "Pandas", "SQL"],
    thumbnail: "/projects/fraud-detection.png",
    images: ["/projects/fraud-detection.png"],
    github: "https://github.com/viki22uied/Tableau",
    videoUrl: "",
    year: "2024",
    status: "Live",
    icon: <ShieldCheck size={22} className="text-white" />,
  },
  {
    id: "hercules-finance",
    ticker: "HERC",
    rating: "STRONG BUY",
    title: "Hercules Finance AI",
    subtitle: "Top 30 National — SEBI Global FinTech Festival 2025",
    longDescription: "Financial planning platform for gig workers — Top 30 National at SEBI Global FinTech Festival 2025. Built income forecasting tailored to non-linear income streams, crisis simulation, and financial risk modelling. Gemini AI powers personalized recommendations. Multilingual interface. Also placed Top 100 out of 3,500+ teams at Mumbai Hacks 2025.",
    tags: ["Finance", "AI", "FinTech"],
    techStack: ["Next.js", "Gemini AI", "TypeScript", "FastAPI", "PostgreSQL"],
    thumbnail: "/projects/hercules-finance.png",
    images: ["/projects/hercules-finance.png"],
    github: "https://github.com/viki22uied/Hercules-tasvi",
    videoUrl: "",
    year: "2025",
    status: "Live",
    icon: <Wallet size={22} className="text-white" />,
  },
  {
    id: "ai-learning-aid",
    ticker: "LRNA",
    rating: "BUY",
    title: "AI-Powered Learning Aid",
    subtitle: "Semantic search across 1000+ educational resources",
    longDescription: "Intelligent learning platform using FAISS + Qdrant vector search to surface semantically relevant educational resources across 1000+ curated materials. FastAPI backend with async endpoints. Docker-compose deployment. Supports multi-modal search, citation clustering, and adaptive study path generation using embedding-based similarity.",
    tags: ["AI", "ML", "Data"],
    techStack: ["FastAPI", "FAISS", "Qdrant", "Docker", "Python", "Embeddings"],
    thumbnail: "/projects/learning-aid.png",
    images: ["/projects/learning-aid.png"],
    github: "https://github.com/viki22uied",
    videoUrl: "",
    year: "2025",
    status: "Live",
    icon: <BookOpen size={22} className="text-white" />,
  },
];

const mono = { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" } as const;

const tagColors: Record<string, string> = {
  Finance: "border-[var(--gold)]/50 text-[var(--gold)]",
  ML: "border-[var(--amber)]/50 text-[var(--amber)]",
  Data: "border-[var(--gold)]/40 text-[var(--text-secondary)]",
  AI: "border-[var(--amber)]/60 text-[var(--amber)]",
  Plugin: "border-[var(--gold)]/45 text-[var(--gold)]",
  Productivity: "border-[var(--amber)]/45 text-[var(--amber)]",
  FinTech: "border-[var(--amber)]/55 text-[var(--amber)]",
};

function statusColor(s: Project["status"]) {
  if (s === "Live") return "bg-[var(--green)]";
  if (s === "In Development") return "bg-[var(--amber)]";
  return "bg-[var(--text-secondary)]";
}

/* Deterministic per-ticker uptrending sparkline so SSR/CSR match */
function sparkPoints(seed: string): string {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
  const pts: string[] = [];
  let y = 30;
  for (let i = 0; i <= 24; i++) {
    y = Math.max(4, Math.min(36, y - 0.9 + (rand() - 0.45) * 7));
    pts.push(`${(i / 24) * 120},${y}`);
  }
  return pts.join(" ");
}

function Sparkline({ seed }: { seed: string }) {
  const pts = useMemo(() => sparkPoints(seed), [seed]);
  return (
    <svg viewBox="0 0 120 40" className="h-8 w-28" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="var(--green)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 3px rgba(0,220,130,0.6))" }}
      />
    </svg>
  );
}

function ProjectImage({ src, alt, icon, title }: { src: string; alt: string; icon?: React.ReactNode; title?: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[var(--bg-tertiary)]">
        <div className="text-[var(--gold)]">{icon}</div>
        <p className="text-sm font-medium text-[var(--gold)]">{title}</p>
      </div>
    );
  }
  return <Image src={src} alt={alt} fill className="object-cover" loading="lazy" onError={() => setError(true)} />;
}

function ProjectModal({ project, onClose, onNext, onPrev }: { project: Project; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "demo">("overview");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="project-modal-close" aria-label="Close modal"><X size={20} /></button>
        <div className="project-modal-grid">
          <div className="project-modal-media">
            <div className="project-modal-tabs">
              <button onClick={() => setActiveTab("overview")} className={`project-modal-tab ${activeTab === "overview" ? "active" : ""}`}>Screenshots</button>
              {project.videoUrl && (
                <button onClick={() => setActiveTab("demo")} className={`project-modal-tab ${activeTab === "demo" ? "active" : ""}`}><Play size={12} className="fill-current" /> Demo Video</button>
              )}
            </div>
            {activeTab === "overview" ? (
              <div className="project-modal-gallery">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--border-color)]">
                  <ProjectImage src={project.images[currentImage]} alt={`${project.title} screenshot`} icon={project.icon} title={project.title} />
                  {project.images.length > 1 && (
                    <>
                      <button onClick={() => setCurrentImage((p) => p === 0 ? project.images.length - 1 : p - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm hover:bg-black/70" aria-label="Previous image"><ChevronLeft size={18} /></button>
                      <button onClick={() => setCurrentImage((p) => p === project.images.length - 1 ? 0 : p + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm hover:bg-black/70" aria-label="Next image"><ChevronRight size={18} /></button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="project-modal-video">
                <iframe src={project.videoUrl} title={`${project.title} demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" sandbox="allow-scripts allow-same-origin allow-presentation allow-popups" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="aspect-video w-full rounded-lg border border-[var(--border-color)]" />
              </div>
            )}
          </div>
          <div className="project-modal-info">
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${statusColor(project.status)}`} />
                <span className="text-xs font-medium text-[var(--text-secondary)]" style={mono}>${project.ticker} · {project.status} · {project.year}</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">{project.title}</h2>
              <p className="mt-1 text-sm text-[var(--gold)]">{project.subtitle}</p>
              <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">{project.longDescription}</p>
              <div className="mt-6">
                <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-medium">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-medium ${tagColors[tag] || "border-[var(--border-color)] text-[var(--text-secondary)]"}`}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-primary"><Github size={16} /> View on GitHub</a>
              {project.liveUrl && (<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-secondary"><ExternalLink size={16} /> Live Demo</a>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => prev !== null ? (prev + 1) % projects.length : null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => prev !== null ? (prev - 1 + projects.length) % projects.length : null);
  }, []);

  return (
    <>
      <section id="projects" className="system-section">
        <div ref={rootRef} className="mx-auto max-w-6xl">
          <SectionLabel index="04" eyebrow="The Builds" formula="∫ ship · iterate dt" />
          <h2 className="text-4xl font-semibold md:text-5xl">Open Positions</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Four holdings in the book — every one shipped. Click a position for the full research note, screenshots, and demo.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {projects.map((p, i) => (
              <article
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className="group cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "var(--border-color)",
                  background: "color-mix(in srgb, var(--bg-secondary) 94%, black 6%)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,220,130,0.5)";
                  e.currentTarget.style.boxShadow = "0 20px 40px -24px var(--shadow-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image side */}
                  <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden md:aspect-auto md:w-[38%]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <ProjectImage src={p.thumbnail} alt={p.title} icon={p.icon} title={p.title} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(3,7,18,0.65)] md:bg-gradient-to-r" />
                    {p.featured && (
                      <span
                        className="absolute left-3 top-3 rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest"
                        style={{ ...mono, borderColor: "var(--gold)", color: "#03140b", background: "var(--gold)" }}
                      >
                        FLAGSHIP
                      </span>
                    )}
                  </div>

                  {/* Data side */}
                  <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-lg font-bold" style={{ ...mono, color: "var(--gold)" }}>${p.ticker}</span>
                        <span
                          className="rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest"
                          style={{ ...mono, borderColor: "rgba(0,220,130,0.45)", color: "var(--green)", background: "rgba(0,220,130,0.08)" }}
                        >
                          {p.rating}
                        </span>
                        <span className="text-xs" style={{ ...mono, color: "var(--text-secondary)" }}>{p.year}</span>
                        <span className="ml-auto hidden md:block"><Sparkline seed={p.ticker} /></span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold md:text-2xl" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                      <p className="mt-1 text-sm" style={{ color: "var(--amber)" }}>{p.subtitle}</p>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.longDescription}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {p.techStack.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="rounded border px-2 py-0.5 text-[11px]"
                          style={{ ...mono, borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                        >
                          {t}
                        </span>
                      ))}
                      <span
                        className="ml-auto text-xs font-semibold tracking-wider transition-transform duration-300 group-hover:translate-x-1"
                        style={{ ...mono, color: "var(--gold)" }}
                      >
                        OPEN POSITION →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {activeIndex !== null && <ProjectModal project={projects[activeIndex]} onClose={() => setActiveIndex(null)} onNext={handleNext} onPrev={handlePrev} />}
    </>
  );
}
