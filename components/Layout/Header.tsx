"use client";

import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 bg-[#010409]/40 backdrop-blur-xl px-6 lg:px-16 py-5 flex justify-between items-center transition-all duration-500">
      
      {/* 1. HUD Logo */}
      <div className="flex items-center gap-10 font-mono relative">
        <a href="/" className="group flex items-center gap-4 relative">
          <div className="relative w-8 h-8 border border-[var(--accent-primary)]/40 flex items-center justify-center transition-transform duration-700 group-hover:rotate-45">
             {/* Corner Brackets */}
             <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[var(--accent-primary)]" />
             <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[var(--accent-primary)]" />
             <div className="w-2.5 h-2.5 bg-[var(--accent-primary)] animate-pulse" />
          </div>
          
          <div className="flex flex-col">
             <span className="text-xs font-bold uppercase tracking-[0.3em] text-white leading-none">
               ARC <span className="text-[var(--accent-primary)]">ROBOTICS</span>
             </span>
             <span className="text-[7px] text-white/30 uppercase tracking-[0.2em] mt-1 hidden lg:block">SYS_VERSION: 4.0.0_ALPHA</span>
          </div>
        </a>

        {/* STATUS INDICATOR */}
        <div className="hidden xl:flex items-center gap-3 pl-10 border-l border-white/10">
           <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-ping" />
           <span className="text-[8px] uppercase tracking-[0.4em] text-[var(--accent-primary)] font-bold">Status: Online</span>
        </div>
      </div>

      {/* 2. Tactical Navigation */}
      <nav className="flex items-center gap-12">
        <div className="hidden md:flex items-center gap-10 font-mono text-[9px] uppercase tracking-[0.5em]">
          {[
            { label: "Systems", href: "/#systems" },
            { label: "Philosophy", href: "/#philosophy" },
            { label: "Knowledge", href: "/knowledge" },
            { label: "Events", href: "/#Events" },
            { label: "Team", href: "/#team" }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-white/40 hover:text-white transition-all duration-300 group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-primary)] group-hover:w-full transition-all duration-500 shadow-[0_0_8px_var(--accent-primary)]" />
            </a>
          ))}
        </div>

        {/* 3. Terminal Controls */}
        <div className="flex items-center gap-8 pl-12 border-l border-white/5">
           <div className="hidden lg:flex items-center gap-4 text-[8px] font-mono text-white/20 uppercase">
              <span>Data_Feed</span>
              <div className="w-8 h-px bg-white/10" />
           </div>
        </div>
      </nav>
    </header>
  );
}