"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: Title & Points slide up
      gsap.from(".ph-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // 2. Parallax effect for images
      gsap.to(".ph-circle", {
        y: -40,
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 3. Robotic divider line animation
      gsap.from(".ph-divider", {
        width: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative px-6 lg:px-16 py-32 bg-[#f1f5f9] overflow-hidden"
    >
      {/* Blueprint Grid Overlay (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none blueprint-grid" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* IMAGES: Full Circle & Responsive */}
        <div ref={imageContainerRef} className="relative flex justify-center items-center h-[400px] lg:h-[600px] order-2 lg:order-1">
          {/* Main ARC Image Circle */}
          <div className="ph-circle relative w-64 h-64 lg:w-96 lg:h-96 rounded-full overflow-hidden border-[8px] border-white shadow-2xl z-20">
            <Image
              src="/images/logos/arc-logo.jpg"
              alt="ARC Robotics Core"
              fill
              className="object-cover"
            />
          </div>

          {/* College Logo Circle (Satellite) */}
          <div className="ph-circle absolute top-0 right-10 lg:right-20 w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden border-[6px] border-white shadow-xl z-20 bg-white">
            <Image
              src="/images/logos/iiitkotalogo.webp"
              alt="Affiliate Institution"
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Geometric Accents */}
          <div className="absolute w-[110%] h-[110%] border border-black/[0.03] rounded-full scale-90" />
          <div className="absolute w-[80%] h-[80%] border-2 border-dashed border-[var(--accent-primary)]/10 rounded-full animate-[spin_60s_linear_infinite]" />
        </div>

        {/* CONTENT: Robotic Vibe */}
        <div ref={contentRef} className="space-y-12 order-1 lg:order-2">
          <div className="space-y-6">
            <div className="ph-reveal flex items-center gap-4 text-[11px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.5em] font-bold">
              <span>01 // MISSION_STAT</span>
              <div className="ph-divider h-px bg-[var(--accent-primary)] flex-1 max-w-[100px]" />
            </div>

            <h2 className="ph-reveal text-4xl lg:text-5xl font-mono font-bold tracking-tighter text-[#0f172a] leading-[0.9] uppercase italic">
              ENGINEERING <br />
              <span className="text-[var(--accent-primary)]">AUTONOMOUS</span> <br />
              INTEGRITY.
            </h2>

            <p className="ph-reveal text-lg text-slate-500 font-mono leading-relaxed max-w-lg">
              {">"} Initializing core philosophy...
              <br />
              {">"} ARC Robotics isn&apos;t a hobby; it&apos;s a high-precision framework. We leverage industrial-grade systems thinking to solve physical complexity.
            </p>
          </div>

          {/* Robotic List */}
          <div className="space-y-4">
            {[
              { label: "Architecture", value: "Hardware & Software Co-Design" },
              { label: "Validation", value: "Iterative Rapid Prototyping" },
              { label: "Reliability", value: "Mission-Critical Precision" }
            ].map((stat, i) => (
              <div key={i} className="ph-reveal group flex items-end justify-between border-b border-black/[0.05] pb-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <span className="text-sm font-bold font-mono text-[#0f172a] tracking-tight group-hover:text-[var(--accent-primary)] transition-colors">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="ph-reveal pt-6">
             <div className="inline-flex items-center gap-4 px-6 py-3 border border-black/10 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 hover:bg-black hover:text-white transition-all cursor-crosshair">
                Exec_Protocol_Alpha
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}