"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { X, Github, ExternalLink, Play, ChevronLeft, ChevronRight, Zap, ShieldCheck, Wallet, BookOpen } from "lucide-react";
import InteractiveSelector from "@/components/ui/interactive-selector";

interface Project {
  id: string;
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
    title: "AI-Powered Learning Aid",
    subtitle: "Semantic search across 1000+ educational resources",
    longDescription: "Intelligent learning platform using FAISS + Qdrant vector search to surface semantically relevant educational resources across 1000+ curated materials. FastAPI backend with async endpoints. Docker-compose deployment. Supports multi-modal search, citation clustering, and adaptive study path generation using embedding-based similarity.",
    tags: ["AI", "ML", "Data"],
    techStack: ["FastAPI", "FAISS", "Qdrant", "Docker", "Python", "Embeddings"],
    thumbnail: "/projects/ai-learning-aid.png",
    images: ["/projects/ai-learning-aid.png"],
    github: "https://github.com/viki22uied",
    videoUrl: "",
    year: "2025",
    status: "Live",
    icon: <BookOpen size={22} className="text-white" />,
  },
];


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
  if (s === "Live") return "bg-[var(--gold)]";
  if (s === "In Development") return "bg-[var(--amber)]";
  return "bg-[var(--text-secondary)]";
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
                <iframe src={project.videoUrl} title={`${project.title} demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video w-full rounded-lg border border-[var(--border-color)]" />
              </div>
            )}
          </div>
          <div className="project-modal-info">
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${statusColor(project.status)}`} />
                <span className="text-xs font-medium text-[var(--text-secondary)]">{project.status} · {project.year}</span>
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
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const selectorOptions = useMemo(() => projects.map((p) => ({
    title: p.title,
    description: p.subtitle,
    image: p.thumbnail,
    icon: p.icon,
    featured: p.featured,
  })), []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => prev !== null ? (prev + 1) % projects.length : null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => prev !== null ? (prev - 1 + projects.length) % projects.length : null);
  }, []);

  return (
    <>
      <section id="projects" className="system-section">
        <div ref={headerRef} className="mx-auto max-w-6xl" style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <InteractiveSelector options={selectorOptions} heading="Projects" subheading="Click any panel to preview — click the expanded panel for full details." onActiveClick={(index) => setActiveIndex(index)} />
        </div>
      </section>
      {activeIndex !== null && <ProjectModal project={projects[activeIndex]} onClose={() => setActiveIndex(null)} onNext={handleNext} onPrev={handlePrev} />}
    </>
  );
}
