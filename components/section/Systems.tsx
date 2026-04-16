"use client";

import { useEffect, useState, useRef } from "react";
import { getSystems } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type System = {
  _id: string;
  title: string;
  description: string;
  image?: any;
  tags?: string[];
};

export default function Systems() {
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  /* FETCH DATA */
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSystems();
        setSystems(data);
      } catch (err) {
        console.error("Sanity Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* GSAP HORIZONTAL SCROLL */
  useEffect(() => {
    if (loading || systems.length === 0) return;

    const ctx = gsap.context(() => {
      const pinWidth = pinRef.current!.offsetWidth;
      const scrollWidth = pinWidth - window.innerWidth;

      // 1. Horizontal Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          start: "top top",
          end: `+=${pinWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(pinRef.current, {
        x: -scrollWidth,
        ease: "none",
      });

      // 2. Card Reveal Animations: More immediate visibility
      gsap.from(".sys-card", {
        x: 100,
        opacity: 0.2, // Start with some visibility
        scale: 0.95,
        stagger: 0.2,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%", // Trigger earlier
          toggleActions: "play none none none",
        }
      });

      // 3. Header Parallax
      gsap.to(".sys-header", {
        x: -200,
        opacity: 0.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "500px top",
          scrub: true,
        }
      });

    }, triggerRef);

    return () => ctx.revert();
  }, [loading, systems]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#010409]">
        <div className="w-12 h-12 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section ref={triggerRef} id="systems" className="relative overflow-hidden bg-[#010409]">
      <div ref={pinRef} className="relative h-screen flex items-center w-fit px-20 lg:px-40">
        
        {/* HEADER */}
        <div className="sys-header shrink-0 mr-40">
           <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.5em] mb-4">
              <div className="w-10 h-px bg-[var(--accent-primary)]" />
              <span>Project_Database</span>
           </div>
           <h2 className="text-6xl lg:text-8xl font-mono font-bold italic uppercase tracking-tighter text-white">
              CORE <span className="text-[var(--accent-primary)]">SYSTEMS.</span>
           </h2>
           <p className="mt-8 text-white/30 font-mono text-sm max-w-sm border-l border-white/10 pl-6 leading-relaxed">
             {">"} Scanning infrastructure...
             <br />
             {">"} {systems.length} mission-active units identified. 
             <br />
             {">"} End-to-end autonomous integration at scale.
           </p>
        </div>

        {/* CARDS */}
        <div className="flex gap-20">
          {systems.map((system, index) => (
            <div
              key={system._id}
              className="sys-card relative w-[75vw] max-w-[550px] aspect-[4/5] lg:aspect-[3/4] group shrink-0"
            >
              {/* Card Container */}
              <div className="relative w-full h-full glass-effect border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-[var(--accent-primary)]/50">
                
                {/* Image Overlay */}
                {system.image && (
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={urlFor(system.image).width(1000).url()}
                      alt={system.title}
                      className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <span className="text-[9px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.4em] mb-3">
                      Sect_Unit_0{index + 1}
                   </span>
                   <h3 className="text-3xl lg:text-4xl font-mono font-bold text-white uppercase italic tracking-tighter mb-4 group-hover:text-[var(--accent-primary)] transition-colors">
                      {system.title}
                   </h3>
                   <p className="text-xs lg:text-sm text-white/40 font-mono leading-relaxed line-clamp-3 mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {system.description}
                   </p>

                   {/* Tags */}
                   <div className="flex flex-wrap gap-3">
                      {system.tags?.map(tag => (
                        <span key={tag} className="text-[8px] font-mono px-3 py-1 border border-white/10 rounded-full text-white/60 tracking-widest uppercase">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>

                {/* Scanning Light Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                   <div className="w-full h-1 bg-[var(--accent-primary)]/20 absolute -translate-y-full group-hover:translate-y-[1000px] transition-all duration-[3000ms] ease-linear" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Element */}
        <div className="shrink-0 ml-40 pr-20">
           <div className="text-white/10 font-mono text-[10rem] font-bold tracking-tighter leading-none italic rotate-90 select-none">
              ARC_TECH
           </div>
        </div>
      </div>

      {/* Persistent Progress Indicator */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4">
         <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-ping" />
         <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.5em]">System_Read_Stream: Active</span>
      </div>
    </section>
  );
}