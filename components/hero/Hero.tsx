"use client";

import NetworkBackground from "../ui/NetwrokBackground";
import Reveal from "../ui/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();

  // Scroll animations
  const scale = useTransform(scrollY, [0, 400], [1, 0.98]);
  const y = useTransform(scrollY, [0, 400], [0, -30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="
        relative min-h-screen flex items-center overflow-hidden px-8
        bg-[var(--bg-page)] transition-colors duration-500
      "
    >
      {/* 1. Blueprint Grid - Directly linked to theme variables */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none z-0" />

      {/* 2. Living Network Background */}
      <NetworkBackground />

      {/* 3. Content */}
      <motion.div
        style={{ scale, y, opacity }}
        className="relative z-10 max-w-6xl mx-auto w-full pt-24"
      >
        {/* Micro Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-[10px] font-mono uppercase tracking-[0.4em]
            text-[var(--accent-primary)]
            mb-6
          "
        >
          Advanced Robotics Laboratory // System_Active
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="
            hero-title
            text-[clamp(3.5rem,12vw,9rem)]
            font-bold
            tracking-[-0.04em]
            leading-[0.8]
            text-[var(--text)]
            uppercase italic
          "
        >
          ARC
          <br />
          <span className="text-[var(--accent-primary)]">ROBOTICS</span>
        </motion.h1>

        {/* Subtitle */}
        <Reveal delay={200}>
          <p className="mt-8 max-w-xl text-lg text-[var(--text-muted)] leading-relaxed font-light">
            A student-led robotics collective focused on building
            <span className="text-[var(--text)] font-medium"> reliable systems </span> 
            through engineering discipline.
          </p>
        </Reveal>

        {/* CTA */}
        <Reveal delay={350}>
          <div className="mt-12 flex items-center gap-8">
            <a
              href="#systems"
              className="
                group relative
                inline-flex items-center gap-3
                px-8 py-4
                bg-[var(--accent-primary)]
                text-white text-xs font-bold uppercase tracking-widest
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(15,82,186,0.3)]
                overflow-hidden
              "
            >
              <span className="relative z-10">Explore Systems →</span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>

            <a 
              href="#team" 
              className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
            >
              Log_Crew
            </a>
          </div>
        </Reveal>
      </motion.div>

      {/* Decorative HUD Scroll Indicator */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-30">
        <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--text)]">Vertical_Scroll</span>
        <div className="w-24 h-[1px] bg-gradient-to-l from-[var(--accent-primary)] to-transparent" />
      </div>
    </section>
  );
}