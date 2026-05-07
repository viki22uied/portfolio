"use client";

import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          © 2025 <span className="text-[var(--gold)]">Vignesh Kumar U</span> · Data Analyst, Finance & AI
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/viki22uied" target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/vignesh-kumar-u-65442b256" target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
