"use client";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    /* Removed border-b and added a subtle glass blur */
    <header className="fixed top-0 left-0 w-full z-[100] bg-[var(--bg)]/40 backdrop-blur-xl px-8 py-5 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-2">
        <h1 className="robotic-hover text-[var(--text)] font-bold uppercase tracking-tighter cursor-default">
          ARC Robotics
        </h1>
      </div>

      <nav className="flex items-center gap-8">
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
          <a href="#systems" className="hover:text-[var(--accent-primary)] transition-colors">Systems</a>
          <a href="#philosophy" className="hover:text-[var(--accent-primary)] transition-colors">Philosophy</a>
          <a href="#team" className="hover:text-[var(--accent-primary)] transition-colors">Team</a>
          <a href="/knowledge" className="opacity-80 hover:opacity-100 transition-opacity">
  Knowledge
</a>

        </div>
        
        {/* Theme Toggle integrated directly into the header */}
        <div className="pl-4 border-l border-[var(--line)]/30">
          <ThemeToggle isHeaderVariant={true} />
        </div>
      </nav>
    </header>
  );
}