"use client";

import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[var(--bg)]/40 backdrop-blur-xl px-8 py-5 flex justify-between items-center transition-all duration-300">
      
      {/* LOGO */}
      <div className="flex items-center gap-2">
      <a href="/" className="robotic-hover text-[var(--text)] font-bold uppercase tracking-tighter">
  ARC Robotics
</a>
      </div>

      {/* NAVIGATION */}
      <nav className="flex items-center gap-8">
        
        {/* LINKS */}
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
          
          <a
            href="#systems"
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            Systems
          </a>

          <a
            href="#philosophy"
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            Philosophy
          </a>

          <a
            href="#Events"
            className="hover:text-[var(--accent-primary)] transition-colors"

          >
            Events
          </a>

          <a
            href="#team"
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            Team
          </a>

          <a
            href="/knowledge"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            Knowledge
          </a>

        </div>

        {/* THEME TOGGLE */}
        <div className="pl-4 border-l border-[var(--line)]/30">
          <ThemeToggle isHeaderVariant={true} />
        </div>

      </nav>
    </header>
  );
}