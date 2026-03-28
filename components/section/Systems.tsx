"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { getSystems } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * Avoid SSR warning for useLayoutEffect
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ===============================
   TYPES
================================= */
type System = {
  _id: string;
  title: string;
  description: string;
  image?: any;
  tags?: string[];
};

/* ===============================
   CARD COMPONENT
================================= */
type CardProps = {
  system: System;
  index: number;
  scrollY: MotionValue<number>;
  sectionTop: number;
  sectionHeight: number;
  totalCards: number;
};

function SystemCard({
  system,
  index,
  scrollY,
  sectionTop,
  sectionHeight,
  totalCards,
}: CardProps) {
  // ✅ FIXED: explicitly typed value
  const scale = useTransform(scrollY, (value: number) => {
    if (!sectionTop || !sectionHeight) return 0.9;

    const progress = (value - sectionTop) / sectionHeight;
    const cardProgress = progress * totalCards;
    const distance = Math.abs(cardProgress - index);

    return Math.max(0.85, 1 - distance * 0.15);
  });

  const rotate = useTransform(scrollY, (value: number) => {
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
              <p className="text-[#0F52BA] font-mono text-[10px] mb-2 tracking-[0.3em] uppercase opacity-70">
                Model Type S-0{index + 1}
              </p>
              <h3 className="text-3xl font-bold tracking-tighter italic uppercase text-white">
                {system.title}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl bg-[#0B1228] border border-[#0F52BA]/30 shadow-[0_0_50px_rgba(15,82,186,0.1)] p-10 flex flex-col [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#0F52BA] uppercase mb-4">
              {system.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              {system.description}
            </p>
          </div>

          {system.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {system.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-3 py-1 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN SECTION
================================= */
export default function Systems() {
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const { scrollY } = useScroll();

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

  /* LAYOUT CALC */
  useIsomorphicLayoutEffect(() => {
    if (!trackRef.current || !sectionRef.current || loading) return;

    const calculateLayout = () => {
      const totalWidth = trackRef.current!.scrollWidth;
      const viewportWidth = window.innerWidth;

      setMaxTranslate(totalWidth - viewportWidth + 160);

      const rect = sectionRef.current!.getBoundingClientRect();

      setSectionTop(window.scrollY + rect.top);
      setSectionHeight(sectionRef.current!.offsetHeight);
    };

    calculateLayout();
    window.addEventListener("resize", calculateLayout);

    return () => window.removeEventListener("resize", calculateLayout);
  }, [systems, loading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#000926]">
        <div className="w-12 h-12 border-2 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="relative bg-[#000926] text-white"
      style={{ height: `${systems.length * 85}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* HEADER */}
        <div className="px-10 md:px-20 mb-12">
          <h2 className="text-5xl md:text-7xl font-bold italic uppercase">
            Systems <span className="text-[#0F52BA]">Design.</span>
          </h2>
        </div>

        {/* TRACK */}
        <div className="flex-1 flex items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-16 px-10 md:px-20"
          >
            {systems.map((system, index) => (
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

        {/* PROGRESS BAR */}
        <div className="absolute bottom-12 left-10 right-10 h-[1px] bg-white/10">
          <motion.div
            className="h-full bg-[#0F52BA]"
            style={{ scaleX: progressBarScaleX, transformOrigin: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}