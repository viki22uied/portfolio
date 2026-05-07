"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as ThemeMode | null;
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = saved ?? (preferredDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  return { theme, toggleTheme, mounted };
}
