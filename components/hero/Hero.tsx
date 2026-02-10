"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";
import DotGrid from "../DotGrid";

export default function Hero() {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if the dark class is present on the html element
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-[var(--bg)] overflow-hidden bg-blueprint px-8">
      <motion.div style={{ opacity }} className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4.5}
          gap={22}
          baseColor={isDark ? "#1e293b" : "#cbd5e1"} // Now isDark is defined!
          activeColor="#2563eb"
          proximity={130}
          shockRadius={220}
          shockStrength={7}
          returnDuration={0.8}
        />
      </motion.div>

      <motion.div style={{ y: yText }} className="relative z-10 max-w-6xl mx-auto w-full">
        <Reveal>
        <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-bold tracking-tighter leading-[0.8] text-[var(--text)] uppercase">
  ARC <br /> 
  <span className="robotic-hover inline-block cursor-default relative">
    ROBOTICS
  </span>
</h1>
        </Reveal>
      </motion.div>
    </section>
  );
}