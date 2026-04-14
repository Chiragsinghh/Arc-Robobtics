"use client";

import SpaceParticleBackground from "../ui/SpaceParticleBackground";
import DecryptText from "../ui/DecryptText";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance: Main Title Stagger
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 100,
        filter: "blur(20px)",
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      });

      // 2. Continuous Parallax: Title moves slower than scroll
      gsap.to(titleRef.current, {
        y: 200,
        scale: 0.9,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 3. Details Group Parallax (Inverse move)
      gsap.to(detailsRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "40% top",
          scrub: true,
        }
      });

      // 4. Subtle "Breathing" for the whole container
      gsap.to(heroRef.current, {
        backgroundPosition: "50% 100%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden px-6 lg:px-16 bg-[#010409] bg-[radial-gradient(circle_at_50%_50%,_rgba(15,82,186,0.05)_0%,_transparent_70%)]"
    >
      {/* 1. Subtle Space Interaction Background */}
      <SpaceParticleBackground />

      {/* 2. Minimal Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-10">
        <div className="max-w-4xl space-y-12">
          
          {/* Status Header */}
          <div className="hero-reveal flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--accent-primary)]">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-[var(--accent-primary)] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <span>Init_Sequencer: Success // Sector_Alpha</span>
          </div>

          {/* Main Title with GSAP scrubbing parallax */}
          <div ref={titleRef} className="hero-reveal relative group cursor-default will-change-transform">
            <h1 className="hero-title text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] text-white italic tracking-tighter mix-blend-difference">
              <DecryptText text="ARC" delay={500} duration={2500} />
              <br />
              <span className="text-[var(--accent-primary)] transition-all duration-700 group-hover:drop-shadow-[0_0_15px_var(--accent-primary)]">
                <DecryptText text="ROBOTICS" delay={1200} duration={3500} />
              </span>
            </h1>
          </div>

          {/* Detailed CTA Group */}
          <div ref={detailsRef} className="hero-reveal grid md:grid-cols-[1fr_auto] gap-12 items-end border-t border-white/5 pt-12 will-change-transform">
            <p className="text-xl max-w-2xl text-white/50 leading-relaxed font-light font-mono">
              {">"} Engineering precision in autonomous systems. 
              <br />
              {">"} Driven by discipline, built for innovation.
            </p>

            <div className="flex items-center gap-10">
              <a
                href="#systems"
                className="
                  group relative
                  inline-flex items-center gap-4
                  text-[11px] font-bold uppercase tracking-[0.4em] text-white
                  hover:text-[var(--accent-primary)] transition-colors
                "
              >
                <span className="relative z-10">System_Manifest</span>
                <div className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-[var(--accent-primary)] transition-all duration-500" />
              </a>

              <a 
                href="#team" 
                className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors"
              >
                Crew_Manifest
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Minimal Corner Data */}
      <div className="absolute bottom-12 right-12 text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] flex items-center gap-4">
        <span>Lng: 75.78</span>
        <div className="w-1 h-1 bg-[var(--accent-primary)] rounded-full animate-ping" />
        <span>Lat: 26.91</span>
      </div>
    </section>
  );
}