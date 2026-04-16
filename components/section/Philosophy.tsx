"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ph-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      gsap.to(".blueprint-dot", {
        opacity: 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: { amount: 3, from: "random" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative px-6 lg:px-16 py-40 bg-[#f8fafc] overflow-hidden text-[#010409]"
    >
      {/* Blueprint Grid Markers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-10 left-10 text-[8px] font-mono uppercase tracking-[0.5em] text-black/20">COORD: 25.4358 // 81.8463</div>
         <div className="absolute bottom-10 right-10 text-[8px] font-mono uppercase tracking-[0.5em] text-black/20">CORE_LOGIC: v4.0.0_S</div>
         <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="blueprint-dot absolute w-1 h-1 bg-black/[0.08] rounded-full"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
              />
            ))}
         </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center relative z-10">
        
        {/* IMAGES: Full Circle Satellite Layout */}
        <div className="relative flex justify-center items-center h-[500px] lg:h-[700px] order-2 lg:order-1">
          {/* Outer Orbit */}
          <div className="absolute w-[85%] aspect-square border border-black/[0.05] rounded-full animate-[spin_50s_linear_infinite]" />
          
          {/* Main Core */}
          <div className="relative w-72 h-72 lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden border-[1px] border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.08)] z-20 group">
            <Image
              src="/images/logos/arc-logo.jpg"
              alt="ARC Robotics Core"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Sub Core (Satellite) */}
          <div className="absolute -top-6 -right-4 lg:-top-16 lg:-right-4 w-44 h-44 lg:w-60 lg:h-60 rounded-full overflow-hidden border-[1px] border-black/5 shadow-2xl z-30 bg-white p-6">
            <Image
              src="/images/logos/iiitkotalogo.webp"
              alt="Affiliate Institution"
              fill
              className="object-contain p-8 lg:p-12 opacity-80"
            />
          </div>

          {/* Technical Data Thread */}
          <div className="absolute bottom-10 -left-10 lg:-left-20 flex items-center gap-4 rotate-[-90deg]">
             <div className="w-16 h-px bg-black/20" />
             <span className="text-[9px] font-mono text-black/40 uppercase tracking-[0.6em]">System_Integrity_v4</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-16 order-1 lg:order-2">
          <div className="space-y-8">
            <div className="ph-reveal flex items-center gap-4 text-[11px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.8em] font-bold">
              <span>MANIFESTO</span>
              <div className="h-px bg-[var(--accent-primary)] w-24" />
            </div>

            <h2 className="ph-reveal text-5xl lg:text-8xl font-mono font-bold tracking-tighter text-[#0f172a] leading-[0.8] uppercase italic">
              ENGINEERING <br />
              <span className="text-[var(--accent-primary)] text-6xl lg:text-9xl">PRECISION.</span> <br />
              DEFINING LOGIC.
            </h2>

            <p className="ph-reveal text-base lg:text-xl text-slate-500 font-mono leading-relaxed max-w-xl">
              {"//"} INITIALIZING CORE FRAMEWORK...
              <br /><br />
              ARC Robotics is not a collective, it is an industrial-grade framework. We operate at the intersection of kinematic potential and deterministic code.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {[
              { id: "01", label: "Structural Synthesis", value: "Hardware/Software Co-Design" },
              { id: "02", label: "Kinematic Validation", value: "Iterative Robotic Execution" },
              { id: "03", label: "Autonomous Command", value: "Real-time Spatial Awareness" }
            ].map((stat, i) => (
              <div key={i} className="ph-reveal group flex flex-col gap-3 border-l-2 border-black/[0.05] hover:border-[var(--accent-primary)] pl-10 py-2 transition-all">
                <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-widest">{stat.id}__{stat.label}</span>
                <span className="text-2xl font-bold font-mono text-slate-900 tracking-tight leading-none uppercase italic">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="ph-reveal pt-10">
             <button className="group flex items-center gap-6 px-12 py-6 border border-black/10 bg-white hover:bg-black hover:text-white transition-all overflow-hidden relative">
                <span className="relative z-10 text-[11px] font-mono uppercase tracking-[0.5em] font-bold">Access_Protocol_Alpha</span>
                <div className="absolute inset-0 w-0 group-hover:w-full bg-black transition-all duration-300" />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}