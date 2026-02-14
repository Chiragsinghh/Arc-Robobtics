"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { getSystems } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Next.js Safety: useLayoutEffect throws warnings on the server.
 * This ensures it only runs on the client.
 */
const useIsomorphicLayoutEffect = 
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ===============================
   CARD COMPONENT
================================= */
function SystemCard({ system, index, scrollY, sectionTop, sectionHeight, totalCards }: any) {
  // Parallax scaling based on card position in the scroll track
  const scale = useTransform(scrollY, (value) => {
    if (!sectionTop || !sectionHeight) return 0.9;
    const progress = (value - sectionTop) / sectionHeight;
    const cardProgress = progress * totalCards;
    const distance = Math.abs(cardProgress - index);
    return Math.max(0.85, 1 - distance * 0.15);
  });

  // Dynamic rotation for a more organic "float" feel
  const rotate = useTransform(scrollY, (value) => {
    if (!sectionTop || !sectionHeight) return 0;
    const progress = (value - sectionTop) / sectionHeight;
    const cardProgress = progress * totalCards;
    return (cardProgress - index) * 2; 
  });

  return (
    <motion.div
      style={{ scale, rotateZ: rotate, perspective: 1200 }}
      className="w-[70vw] max-w-[800px] group shrink-0"
    >
      <div className="relative w-full h-[480px] transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* FRONT */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/5 shadow-2xl [backface-visibility:hidden]">
          {system.image && (
            <img
              src={urlFor(system.image).width(1200).url()}
              alt={system.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000926] via-[#000926]/20 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <p className="text-[#0F52BA] font-mono text-[10px] mb-2 tracking-[0.3em] uppercase opacity-70">Model Type S-0{index + 1}</p>
              <h3 className="text-3xl font-bold tracking-tighter italic uppercase text-white">{system.title}</h3>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-white/5">
              <span className="text-[10px] font-mono">FIX</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl bg-[#0B1228] border border-[#0F52BA]/30 shadow-[0_0_50px_rgba(15,82,186,0.1)] p-10 flex flex-col [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-[#0F52BA] uppercase">{system.title}</h3>
              <span className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded">v2.0.26</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              {system.description}
            </p>
          </div>

          <div className="space-y-4">
             <div className="h-[1px] w-full bg-gradient-to-r from-[#0F52BA]/40 to-transparent" />
             {system.tags && (
              <div className="flex flex-wrap gap-2">
                {system.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-mono px-3 py-1 bg-transparent border border-white/10 text-slate-300 hover:border-[#0F52BA] hover:text-white transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN SECTION
================================= */
export default function Systems() {
  const [systems, setSystems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const { scrollY } = useScroll();

  /** * RULE OF HOOKS: All useTransform hooks must be declared here, 
   * at the top level, regardless of the loading state.
   */
  const x = useTransform(
    scrollY, 
    [sectionTop, sectionTop + sectionHeight], 
    [0, -maxTranslate]
  );

  const progressBarScaleX = useTransform(
    scrollY, 
    [sectionTop, sectionTop + sectionHeight], 
    [0, 1]
  );

  // Data Fetching
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSystems();
        setSystems(data);
      } catch (err) {
        console.error("Sanity Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Measurement Calculation
  useIsomorphicLayoutEffect(() => {
    if (!trackRef.current || !sectionRef.current || loading) return;

    const calculateLayout = () => {
      const totalWidth = trackRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      setMaxTranslate(totalWidth - viewportWidth + 160); // 160 accounts for px-20 padding

      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setSectionTop(window.scrollY + rect.top);
        setSectionHeight(sectionRef.current?.offsetHeight || 0);
      }
    };

    calculateLayout();
    window.addEventListener("resize", calculateLayout);
    return () => window.removeEventListener("resize", calculateLayout);
  }, [systems, loading]);

  if (loading) return (
    <div className="h-screen w-full bg-[#000926] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#000926] text-white"
      style={{ height: `${systems.length * 85}vh` }}
    >
      {/* BLUEPRINT GRID */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#0F52BA 1px, transparent 1px), linear-gradient(90deg, #0F52BA 1px, transparent 1px)`, 
          backgroundSize: '50px 50px' 
        }} 
      />

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* AMBIENT GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0F52BA] opacity-[0.04] blur-[160px] pointer-events-none" />

        {/* HEADER */}
        <div className="px-10 md:px-20 mb-12 relative z-10">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-[2px] bg-[#0F52BA]" />
             <span className="text-[#0F52BA] font-mono text-[10px] tracking-[0.4em] uppercase">Core Architectures</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic">
            Systems <span className="text-[#0F52BA] underline underline-offset-8 decoration-1 opacity-80">Design.</span>
          </h2>
        </div>

        {/* HORIZONTAL TRACK */}
        <div className="flex-1 flex items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-16 px-10 md:px-20"
          >
            {systems.map((system: any, index: number) => (
              <SystemCard
                key={system._id}
                system={system}
                index={index}
                scrollY={scrollY}
                sectionTop={sectionTop}
                sectionHeight={sectionHeight}
                totalCards={systems.length}
              />
            ))}
          </motion.div>
        </div>

        {/* SCROLL PROGRESS BAR */}
        <div className="absolute bottom-12 left-10 md:left-20 right-10 md:right-20 h-[1px] bg-white/5 overflow-hidden">
           <motion.div 
             className="h-full bg-[#0F52BA] shadow-[0_0_10px_#0F52BA]"
             style={{ scaleX: progressBarScaleX, transformOrigin: "0%" }}
           />
        </div>

      </div>
    </section>
  );
}