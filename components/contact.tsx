"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/vignesh-kumar-u-65442b256", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/viki22uied", icon: Github },
  { label: "Email", href: "mailto:vigneshkumaru24@gmail.com", icon: Mail },
  { label: "Phone", href: "tel:+919880570570", icon: Phone },
];

export function Contact() {
  return (
    <section id="contact" className="section-reveal system-section pb-36">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[var(--gold)]">Contact</p>
        <h2 className="text-4xl font-semibold md:text-5xl">Let&apos;s Build Better Decisions</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
          Open to data analytics, finance, and AI opportunities. Based in Bengaluru, India.
        </p>
        <p className="mx-auto mt-2 text-sm text-[var(--text-secondary)]">
          vigneshkumaru24@gmail.com · +91 9880570570
        </p>
        <div className="mt-10 flex justify-center gap-5">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="gold-glow-hover rounded-full border border-[var(--border-color)] p-4 text-[var(--text-secondary)] hover:text-[var(--gold)]"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
