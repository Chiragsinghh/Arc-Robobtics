"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle({ isHeaderVariant = false }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <button 
      onClick={toggleTheme}
      className={`${
        isHeaderVariant 
          ? "px-3 py-1 rounded border border-[var(--line)] bg-[var(--bg-soft)]/50" 
          : "fixed bottom-8 right-8 z-50 p-3 rounded-full border border-[var(--line)] bg-[var(--bg-soft)] shadow-lg"
      } text-[var(--text)] hover:border-[var(--accent-primary)] transition-all font-mono text-[9px] uppercase tracking-widest`}
    >
      {isDark ? "MODE_LIGHT" : "MODE_DARK"}
    </button>
  );
}