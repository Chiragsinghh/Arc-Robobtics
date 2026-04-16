"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function InteractiveGrid({ intensity = "normal" }: { intensity?: "normal" | "violent" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || dimensions.width === 0) return;

    const spacing = 100; // Increased spacing to reduce count
    const cols = Math.ceil(dimensions.width / spacing) + 1;
    const rows = Math.ceil(dimensions.height / spacing) + 1;
    const isViolent = intensity === "violent";
    
    container.innerHTML = "";

    // 1. Primary Grid Lines
    const gridDiv = document.createElement("div");
    gridDiv.className = `absolute inset-0 transition-opacity duration-1000 ${isViolent ? 'opacity-[0.2]' : 'opacity-[0.05]'}`;
    gridDiv.style.backgroundImage = `
      linear-gradient(rgba(15, 82, 186, ${isViolent ? '0.6' : '0.4'}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(15, 82, 186, ${isViolent ? '0.6' : '0.4'}) 1px, transparent 1px)
    `;
    gridDiv.style.backgroundSize = `${spacing}px ${spacing}px`;
    container.appendChild(gridDiv);

    // 2. Secondary Scanline Glow
    const scanline = document.createElement("div");
    scanline.className = `absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/${isViolent ? '30' : '15'} to-transparent z-20 pointer-events-none`;
    container.appendChild(scanline);
    gsap.to(scanline, {
      top: "100%",
      duration: isViolent ? 8 : 15,
      ease: "none",
      repeat: -1
    });

    // 3. Intersection Dots
    const dotsWrapper = document.createElement("div");
    dotsWrapper.className = "absolute inset-0 z-10 pointer-events-none";
    container.appendChild(dotsWrapper);

    const dots: { el: HTMLDivElement, x: number, y: number }[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const dot = document.createElement("div");
        const x = j * spacing;
        const y = i * spacing;
        dot.className = "absolute w-[2px] h-[2px] bg-white rounded-full opacity-0 transition-opacity duration-500 will-change-transform";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.transform = "translate(-50%, -50%) scale(0.5)";
        dotsWrapper.appendChild(dot);
        dots.push({ el: dot, x, y });
      }
    }

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        dots.forEach((dot) => {
          const dx = dot.x - relX;
          const dy = dot.y - relY;
          const dist = dx * dx + dy * dy; // Use squared distance
          const radius = isViolent ? 250 : 150;
          const radiusSq = radius * radius;

          if (dist < radiusSq) {
            const d = Math.sqrt(dist);
            const ratio = 1 - d / radius;
            const scale = 1 + ratio * (isViolent ? 2.5 : 1.5);
            const opacity = ratio * (isViolent ? 0.8 : 0.4);
            
            dot.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
            dot.el.style.opacity = opacity.toString();
            dot.el.style.backgroundColor = "var(--accent-primary)";
            dot.el.style.boxShadow = `0 0 ${ratio * 8}px var(--accent-primary)`;
          } else {
            dot.el.style.transform = "translate(-50%, -50%) scale(0.5)";
            dot.el.style.opacity = "0";
            dot.el.style.backgroundColor = "#fff";
            dot.el.style.boxShadow = "none";
          }
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      container.innerHTML = "";
    };
  }, [dimensions, intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${intensity === 'violent' ? 'mix-blend-lighten' : ''}`}
    />
  );
}

