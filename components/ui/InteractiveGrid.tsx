"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InteractiveGrid({ intensity = "normal" }: { intensity?: "normal" | "violent" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rows = 12;
    const cols = 18;
    const isViolent = intensity === "violent";
    
    container.innerHTML = "";

    // 1. Primary Grid Lines
    const gridDiv = document.createElement("div");
    gridDiv.className = `absolute inset-0 transition-opacity duration-1000 ${isViolent ? 'opacity-[0.3]' : 'opacity-[0.15]'}`;
    gridDiv.style.backgroundImage = `
      linear-gradient(rgba(15, 82, 186, ${isViolent ? '0.6' : '0.4'}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(15, 82, 186, ${isViolent ? '0.6' : '0.4'}) 1px, transparent 1px)
    `;
    gridDiv.style.backgroundSize = "50px 50px";
    container.appendChild(gridDiv);

    // 2. Secondary Scanline Glow (Faster if violent)
    const scanline = document.createElement("div");
    scanline.className = `absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/${isViolent ? '40' : '20'} to-transparent z-20 pointer-events-none`;
    container.appendChild(scanline);
    gsap.to(scanline, {
      top: "100%",
      duration: isViolent ? 6 : 10,
      ease: "none",
      repeat: -1
    });

    // 3. Intersection Dots
    const dotsWrapper = document.createElement("div");
    dotsWrapper.className = "absolute inset-0 z-10 pointer-events-none";
    container.appendChild(dotsWrapper);

    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const dot = document.createElement("div");
        dot.className = "absolute w-[4px] h-[4px] bg-white/30 rounded-full";
        dot.style.left = `${(j * 100) / (cols - 1)}%`;
        dot.style.top = `${(i * 100) / (rows - 1)}%`;
        dotsWrapper.appendChild(dot);
        dots.push(dot);

        // Subtle Ambient Pulse
        gsap.to(dot, {
          opacity: 0.1,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      dots.forEach((dot) => {
        const dx = parseFloat(dot.style.left) * rect.width / 100 - relX;
        const dy = parseFloat(dot.style.top) * rect.height / 100 - relY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = isViolent ? 300 : 200;

        if (dist < radius) {
          const ratio = 1 - dist / radius;
          gsap.to(dot, {
            scale: 1 + ratio * (isViolent ? 5 : 3),
            backgroundColor: "var(--accent-primary)",
            boxShadow: `0 0 ${ratio * (isViolent ? 25 : 15)}px var(--accent-primary)`,
            opacity: isViolent ? 1 : 0.8,
            overwrite: "auto",
            duration: 0.2,
          });

          if (isViolent && ratio > 0.8) {
            // Flickering Alarm Pulse
             gsap.to(dot, {
                opacity: 0.2,
                duration: 0.05,
                repeat: 3,
                yoyo: true,
                ease: "none"
             });
          }
        } else {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "rgba(255,255,255,0.3)",
            boxShadow: "none",
            opacity: 0.2,
            overwrite: "auto",
            duration: 0.6,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${intensity === 'violent' ? 'mix-blend-lighten' : ''}`}
    />
  );
}
