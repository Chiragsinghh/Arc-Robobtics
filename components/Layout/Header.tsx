"use client";

import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 bg-[#010409]/60 backdrop-blur-md px-6 lg:px-16 py-4 flex justify-between items-center transition-all duration-500">
      
      {/* 1. Terminal Logo */}
      <div className="flex items-center gap-6 font-mono">
        <a href="/" className="group flex items-center gap-3">
          <div className="w-6 h-6 border border-[var(--accent-primary)] flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <div className="w-2 h-2 bg-[var(--accent-primary)]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            ARC <span className="text-[var(--accent-primary)]">ROBOTICS</span>
          </span>
        </a>
      </div>

      {/* 2. Minimal Navigation */}
      <nav className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.4em]">
          {[
            { label: "Systems", href: "#systems" },
            { label: "Philosophy", href: "#philosophy" },
            { label: "Events", href: "#Events" },
            { label: "Team", href: "#team" }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/40 hover:text-[var(--accent-primary)] transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* 3. Terminal Controls */}
        <div className="flex items-center gap-6 pl-10 border-l border-white/5">
          <ThemeToggle isHeaderVariant={true} />
        </div>
      </nav>
    </header>
  );
}