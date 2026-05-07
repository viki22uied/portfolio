"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { PortfolioAssistant } from "@/components/portfolio-assistant";

type Props = {
  children: ReactNode;
};

export function SiteFrame({ children }: Props) {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-24">{children}</div>
      <PortfolioAssistant />
    </main>
  );
}
