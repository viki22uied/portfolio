"use client";

import { Github, Linkedin, Mail, Globe } from "lucide-react";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/vignesh-kumar-u-65442b256", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/viki22uied", icon: Github },
  { label: "Email", href: "mailto:vigneshkumaru24@gmail.com", icon: Mail },
  { label: "Portfolio", href: "https://vignesh-kumar-u.netlify.app", icon: Globe },
];

export function Contact() {
  return (
    <section id="contact" className="section-reveal system-section pb-36">
      <div className="mx-auto max-w-4xl text-center">
        <p
          className="mb-2 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.32em]"
          style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          <span style={{ color: "var(--gold)" }}>08</span>
          <span className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
          The Desk
          <span className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
        </p>
        <h2 className="text-4xl font-semibold md:text-5xl">Let&apos;s Build Alpha Together</h2>
        <p
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Open to quant research, AI engineering, and FinTech opportunities. Based in Bengaluru, India.
        </p>
        <p
          className="mx-auto mt-2 text-sm"
          style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          vigneshkumaru24@gmail.com
        </p>
        <div className="mt-10 flex justify-center gap-5">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-glow-hover rounded-full border p-4 transition-all duration-200 hover:text-[var(--gold)]"
              style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p
          className="mt-16 text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          Built with precision. Designed for alpha.
        </p>
      </div>
    </section>
  );
}
