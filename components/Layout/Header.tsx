"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-8 py-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo / Identity */}
        <Link
          href="/"
          className="text-lg font-medium tracking-tight"
        >
          ARC Robotics
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm">
  <a href="#systems" className="opacity-80 hover:opacity-100 transition-opacity">
    Systems
  </a>

  <a href="#knowledge" className="opacity-80 hover:opacity-100 transition-opacity">
    Knowledge
  </a>

  <a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">
    About
  </a>

  <a href="#events" className="opacity-50 cursor-not-allowed">
    Events
  </a>

  <a href="#team" className="opacity-50 cursor-not-allowed">
    Team
  </a>
</nav>


      </div>
    </header>
  );
}
