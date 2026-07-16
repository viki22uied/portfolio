"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { SectionLabel } from "@/components/section-label";

export function Publications() {
  return (
    <section id="publications" className="section-reveal system-section">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="07" eyebrow="The Research" formula="∮ peer-reviewed · IEEE" />
        <h2 className="text-4xl font-semibold md:text-5xl">Publications</h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10"
        >
          <article
            className="system-shell relative overflow-hidden p-6 md:p-8"
            style={{ borderColor: "rgba(0, 220, 130,0.3)" }}
          >
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              {/* IEEE badge */}
              <div className="flex-shrink-0">
                <span
                  className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{
                    borderColor: "var(--gold)",
                    color: "var(--gold)",
                    background: "rgba(0, 220, 130,0.1)",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  }}
                >
                  <FileText size={12} /> IEEE · ISAECT 2025
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                  AI-Enhanced PGRKAM Employment Analytics Platform
                </h3>

                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                >
                  Vignesh Kumar U · IEEE ISAECT 2025
                </p>

                <p className="prose-serif mt-4 text-[0.95rem]" style={{ color: "var(--text-secondary)" }}>
                  Applies machine learning and AI to employment data from the PGRKAM scheme to derive actionable workforce optimization insights and policy recommendations.
                  Demonstrates end-to-end analytics pipeline design for government employment data at scale.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a
                    href="https://doi.org/10.1109/ISAECT68904.2025.11318700"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:opacity-80"
                    style={{ color: "var(--gold)" }}
                  >
                    <ExternalLink size={14} />
                    DOI: 10.1109/ISAECT68904.2025.11318700
                  </a>

                  <span
                    className="rounded-full border px-2.5 py-0.5 text-xs"
                    style={{
                      borderColor: "rgba(0, 220, 130,0.4)",
                      color: "var(--green)",
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    }}
                  >
                    Published
                  </span>
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
