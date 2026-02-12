"use client";

import NetworkBackground from "../ui/NetwrokBackground";
import Reveal from "../ui/Reveal";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-8">
      
      {/* Living Network Background */}
      <NetworkBackground />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-24">
        
        <h1
          className="
            hero-title
            text-[clamp(3.5rem,12vw,9rem)]
            font-bold
            tracking-tighter
            leading-[0.8]
            text-[var(--text)]
            uppercase
          "
        >
          ARC
          <br />
          ROBOTICS
        </h1>

        <Reveal delay={200}>
          <p className="mt-8 max-w-xl text-lg text-muted">
            A student-led robotics collective focused on building
            reliable systems through engineering discipline.
          </p>
        </Reveal>

        <Reveal delay={350}>
          <div className="mt-12">
            <a
              href="#systems"
              className="
                inline-flex items-center gap-3
                px-6 py-3
                border border-[var(--line)]
                text-sm uppercase tracking-wide
                hover:border-[var(--text)]
                transition
              "
            >
              Explore Systems →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
