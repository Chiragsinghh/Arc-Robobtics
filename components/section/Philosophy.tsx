"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveGrid from "../ui/InteractiveGrid";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".ph-reveal", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      gsap.to(".ph-image-reveal", {
        opacity: 1,
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
      className="relative px-6 lg:px-16 py-40 bg-[#000508] overflow-hidden text-white"
    >
      {/* Heavy Industrial Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         <InteractiveGrid />
         {/* Sub-grid lines for higher detail */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:160px_160px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center relative z-10">
        
        {/* IMAGES: Robotic Core Visualization */}
        <div className="ph-image-reveal relative flex justify-center items-center h-[500px] lg:h-[700px] order-2 lg:order-1 opacity-0">
          {/* Orbital Data Rings */}
          <div className="absolute w-full aspect-square border-2 border-black/[0.05] rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[85%] aspect-square border border-black/[0.02] rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          
          {/* Main Core UI */}
          <div className="relative w-72 h-72 lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden border-8 border-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] z-20 group">
            <Image
              src="/images/logos/arc-logo.jpg"
              alt="ARC Robotics Core"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            {/* Subtle Scanning Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/10 to-transparent h-1/2 w-full animate-scan pointer-events-none" />
          </div>

          {/* Institutional Node */}
          <div className="absolute -top-6 -right-4 lg:-top-16 lg:-right-4 w-44 h-44 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-white shadow-2xl z-30 bg-white p-6 flex items-center justify-center">
            <Image
              src="/images/logos/iiitkotalogo.webp"
              alt="Affiliate Institution"
              width={180}
              height={180}
              className="object-contain opacity-80"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-16 order-1 lg:order-2">
          <div className="space-y-8">
            <div className="ph-reveal flex items-center gap-4 text-[11px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.8em] font-bold opacity-0">
              <span>MANIFESTO</span>
              <div className="h-px bg-[var(--accent-primary)]/20 flex-1" />
            </div>

            <h2 className="ph-reveal text-5xl lg:text-8xl font-mono font-bold tracking-tighter text-white leading-[0.85] uppercase opacity-0">
              ENGINEERING <br />
              <span className="text-[var(--accent-primary)] italic">PRECISION.</span> <br />
              <span className="text-white/20">DEFINING LOGIC.</span>
            </h2>

            <p className="ph-reveal text-base lg:text-xl text-white/40 font-mono leading-relaxed max-w-xl opacity-0">
              {"//"} INITIALIZING_CORE_FRAMEWORK...
              <br /><br />
              ARC Robotics is not a collective, it is an industrial-grade framework. We operate at the intersection of kinematic potential and deterministic code.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {[
              { id: "01", label: "Structural Synthesis", value: "Hardware/Software Co-Design", code: "const struct = sync(hw, sw);" },
              { id: "02", label: "Kinematic Validation", value: "Iterative Robotic Execution", code: "while(running) { validate(motion); }" },
              { id: "03", label: "Autonomous Command", value: "Real-time Spatial Awareness", code: "await sensor.capture().map();" }
            ].map((stat, i) => (
              <div key={i} className="ph-reveal group flex flex-col gap-3 border-l-2 border-white/5 hover:border-[var(--accent-primary)] pl-10 py-4 transition-all hover:bg-white/5 opacity-0">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-widest">{stat.id}__{stat.label}</span>
                   <span className="text-[8px] font-mono text-white/10 group-hover:text-white/30 transition-colors uppercase">{stat.code}</span>
                </div>
                <span className="text-2xl font-bold font-mono text-white tracking-tight leading-none uppercase italic group-hover:translate-x-2 transition-transform">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="ph-reveal pt-10 opacity-0">
             <button className="group flex items-center gap-6 px-12 py-6 border-2 border-black/5 bg-white hover:bg-black hover:text-white transition-all overflow-hidden relative shadow-lg shadow-black/[0.05]">
                <span className="relative z-10 text-[11px] font-mono uppercase tracking-[0.5em] font-bold">Access_Protocol_Alpha</span>
                <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-black transition-all duration-300" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}