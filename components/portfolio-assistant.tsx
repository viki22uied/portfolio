"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X as XIcon } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const chips = ["Show Projects", "View Skills", "Download Resume", "Achievements", "Deep Work AI", "Fraud Detection", "Hercules Finance", "About", "Contact"];

/* Project knowledge base for the chatbot */
const projectKnowledge: Record<string, string> = {
  "deep work": "Deep Work AI Plugin is a productivity plugin built for the Logitech MX Creative Console. It helps knowledge workers maintain deep focus by automating workflow management. Features include Meeting Mode (auto-silences notifications during calls), Context Anchoring (saves and restores your workspace layout), Queue Interruption management (batches non-urgent notifications), and workspace restoration. Built with Python service layer, TypeScript timeline UI, and Logitech SDK integration. It was created because context-switching kills productivity — this plugin keeps you in flow state using hardware-mapped controls on the MX Creative Console dial.",
  "fraud": "Financial Crime Detection Pipeline processes 1M+ transactions to identify suspicious patterns using ML and graph analytics. Built for financial institutions and compliance teams who need to detect fraud in large-scale transaction networks. Uses NetworkX for graph analysis (Strongly Connected Components, Betweenness Centrality) to uncover hidden relationships between entities. Risk scoring flags high-risk actors. Built because traditional rule-based fraud detection misses complex, multi-hop transaction laundering patterns — graph analytics catches what rules can't.",
  "hercules": "Hercules Finance AI (Hercules-tasvi) is a financial planning platform designed specifically for gig workers who deal with irregular income streams. It helps them manage unpredictable earnings, forecast future income, and simulate financial risks. Features income forecasting tailored for non-linear income, crisis planning, and financial risk simulation. Built with a multilingual interface for real-world usability. Created because gig workers lack traditional financial tools — banks and planners assume stable salaries. We placed in the top 100 teams out of 3,500+ participants at Mumbai Hacks hackathon.",
};

const responses: Record<string, { text: string; scrollTo?: string; action?: string }> = {
  projects: { text: "I've built 3 key projects: Deep Work AI Plugin (productivity tool for Logitech MX Creative Console), Financial Crime Detection Pipeline (graph analytics on 1M+ transactions), and Hercules Finance AI (financial planning for gig workers — Mumbai Hacks Top 100). Ask me about any of them!", scrollTo: "projects" },
  skills: { text: "My expertise includes Python, SQL, data pipelines, financial modeling, Tableau, Power BI, and ML engineering.", scrollTo: "skills" },
  resume: { text: "Downloading your resume now...", action: "download_resume" },
  achievements: { text: "IEEE published researcher (ISAECT 2025), Mumbai Hacks Top 100 out of 3500+ teams, IIT Madras Design Blitz 1st Runner-Up, and Tata Crucible Quiz Karnataka Cluster Finalist.", scrollTo: "achievements" },
  about: { text: "Final-year Data Science student at Presidency University (graduating May 2026). IEEE published researcher, Mumbai Hacks Top 100 finalist, and builder of AI-driven financial tools.", scrollTo: "about" },
  contact: { text: "Reach me at vigneshkumaru24@gmail.com or +91 9880570570. Based in Bengaluru.", scrollTo: "contact" },

  ieee: { text: "Published 'AI-Enhanced PGRKAM Employment Analytics Platform' at IEEE ISAECT 2025. Research focused on AI/ML techniques for employment data analytics.", scrollTo: "achievements" },
  research: { text: "Published 'AI-Enhanced PGRKAM Employment Analytics Platform' at IEEE ISAECT 2025.", scrollTo: "achievements" },
};

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: "Portfolio Assistant ready. Enter a command." }]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to latest message */
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);


  const typeText = useCallback((text: string, messageIndex: number) => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setMessages((prev) => {
        const next = [...prev];
        next[messageIndex] = { role: "bot", text: text.slice(0, i) };
        return next;
      });
      if (i >= text.length) window.clearInterval(id);
    }, 14);
  }, []);

  const respond = useCallback((raw: string) => {
    const text = raw.toLowerCase();

    /* Check project knowledge base first */
    const projectKey = Object.keys(projectKnowledge).find((k) => text.includes(k));
    if (projectKey) {
      const answer = projectKnowledge[projectKey];
      setMessages((prev) => {
        const newMsgs = [...prev, { role: "user" as const, text: raw }, { role: "bot" as const, text: "" }];
        const idx = newMsgs.length - 1;
        setTimeout(() => typeText(answer, idx), 80);
        return newMsgs;
      });
      setInput("");
      return;
    }

    /* Check standard responses */
    const key = Object.keys(responses).find((k) => text.includes(k));
    const fallback = "Try asking about: Deep Work AI, Fraud Detection, Hercules Finance, Achievements, Skills, About, or Contact.";
    const picked = key ? responses[key] : { text: fallback };

    setMessages((prev) => {
      const newMsgs = [...prev, { role: "user" as const, text: raw }, { role: "bot" as const, text: "" }];
      const idx = newMsgs.length - 1;
      setTimeout(() => typeText(picked.text, idx), 80);
      return newMsgs;
    });
    setInput("");

    /* Handle resume download action */
    if ("action" in picked && picked.action === "download_resume") {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Vignesh_Kumar_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 300);
    }

    if ("scrollTo" in picked && picked.scrollTo) {
      setTimeout(() => {
        document.getElementById(picked.scrollTo!)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [typeText]);

  const handleClear = useCallback(() => {
    setMessages([{ role: "bot", text: "Portfolio Assistant ready. Enter a command." }]);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--bg-secondary)] text-[var(--gold)] shadow-[0_0_18px_rgba(212,175,55,0.24)] transition-transform duration-200 hover:scale-110"
        aria-label="Toggle Portfolio Assistant"
      >
        <MessageSquare size={18} />
      </button>
      {open && (
        <aside className="mt-3 w-[min(360px,calc(100vw-24px))] rounded-xl border border-[var(--border-color)] bg-[color-mix(in_srgb,var(--bg-secondary)_90%,black_10%)] p-4 shadow-xl backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Portfolio Assistant</p>
            <button onClick={handleClear} className="text-[var(--text-secondary)] hover:text-[var(--gold)]" aria-label="Clear conversation"><XIcon size={14} /></button>
          </div>
          <div ref={chatRef} className="mb-3 max-h-48 space-y-2 overflow-auto rounded border border-[var(--border-color)] bg-[rgba(10,10,15,0.55)] p-3 text-xs">
            {messages.map((msg, idx) => (
              <p key={`${msg.role}-${idx}`} className={msg.role === "bot" ? "text-[var(--text-secondary)]" : "text-[var(--gold)]"}>
                {msg.role === "bot" ? "SYS> " : "YOU> "}
                {msg.text}
              </p>
            ))}
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <button key={chip} onClick={() => respond(chip)} className="rounded-full border border-[var(--border-color)] px-2.5 py-1 text-[10px] text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)]">
                {chip}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") respond(input || "help"); }}
              className="w-full rounded border border-[var(--border-color)] bg-transparent px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none"
              placeholder="Type command..."
            />
            <button onClick={() => respond(input || "help")} className="rounded border border-[var(--gold)] px-2 text-xs text-[var(--gold)]">Run</button>
          </div>
        </aside>
      )}
    </div>
  );
}
