"use client";

import { useRef, useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseColor: string;
};

export default function SpaceParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 2500;
    const CONNECT_DISTANCE = 110; 
    const MOUSE_ZONE_RADIUS = 250; 
    const REPULSE_STRENGTH = 1.5;
    
    // Get theme colors
    const style = getComputedStyle(document.documentElement);
    const accent1 = style.getPropertyValue('--accent-primary').trim() || "#3b82f6";
    const accent2 = style.getPropertyValue('--accent-secondary').trim() || "#60a5fa";

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * canvas.width * 3,
      y: (Math.random() - 0.5) * canvas.height * 3,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      vz: (Math.random() * 1.5 + 1.5) * -1.5, // High speed warp speed
      baseColor: accent1
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fov = 800;

      // Draw distant stars
      ctx.fillStyle = "#ffffff";
      for(let i=0; i<150; i++) {
        const s = Math.sin(time * 0.001 + i) * 0.5 + 0.5;
        ctx.globalAlpha = s * 0.1;
        ctx.beginPath();
        ctx.arc((i * 197) % canvas.width, (i * 341) % canvas.height, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      const projected: { x: number; y: number; size: number; p: Particle; opacity: number; isNearMouse: boolean }[] = [];

      // PHYSICS & PROJECTION
      for (const p of particles) {
        const scale = fov / p.z;
        const x2d = centerX + p.x * scale;
        const y2d = centerY + p.y * scale;

        let isNearMouse = false;

        // Interaction
        if (mouse.current.active) {
          const dx = x2d - mouse.current.x;
          const dy = y2d - mouse.current.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MOUSE_ZONE_RADIUS * MOUSE_ZONE_RADIUS) {
            isNearMouse = true;
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / MOUSE_ZONE_RADIUS) * REPULSE_STRENGTH;
            p.vx += (dx / dist) * force * (scale / 4);
            p.vy += (dy / dist) * force * (scale / 4);
          }
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.z += p.vz;
        p.x += p.vx;
        p.y += p.vy;

        if (p.z < 1) {
            p.z = 1000;
            p.x = (Math.random() - 0.5) * canvas.width * 3;
            p.y = (Math.random() - 0.5) * canvas.height * 3;
        }
        
        // Frustum Culling
        if (x2d > -200 && x2d < canvas.width + 200 && y2d > -200 && y2d < canvas.height + 200) {
          projected.push({ 
            x: x2d, 
            y: y2d, 
            size: scale * 1.2, 
            p, 
            opacity: Math.min(1, (1000 - p.z) / 500),
            isNearMouse
          });
        }
      }

      // SELECTIVE CONNECTIVITY (Hover only neighbors)
      const mouseLayer = projected.filter(item => item.isNearMouse && item.p.z < 700);
      
      ctx.lineWidth = 0.8; // Increased from 0.5
      for (let i = 0; i < mouseLayer.length; i++) {
        const a = mouseLayer[i];
        for (let j = i + 1; j < mouseLayer.length; j++) {
          const b = mouseLayer[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECT_DISTANCE * CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = accent2;
            ctx.globalAlpha = (1 - Math.sqrt(distSq) / CONNECT_DISTANCE) * a.opacity * 0.7; // Increased from 0.4
            ctx.stroke();
          }
        }
      }

      // RENDERING
      for (const pr of projected) {
        ctx.globalAlpha = pr.opacity;
        ctx.fillStyle = pr.isNearMouse ? accent2 : accent1;
        
        const r = pr.size;
        if (pr.p.z > 850) {
            ctx.fillRect(pr.x, pr.y, 1, 1); // Extreme distance optimization
        } else {
            ctx.beginPath();
            ctx.arc(pr.x, pr.y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        if (pr.isNearMouse) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = accent2;
            ctx.beginPath();
            ctx.arc(pr.x, pr.y, r * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }

      animationId = requestAnimationFrame((t) => draw(t));
    };

    animationId = requestAnimationFrame((t) => draw(t));

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010409] via-[#020617] to-[#010409]" />
        
        {/* Dynamic Space Grid */}
        <div className="absolute inset-0 space-grid opacity-20" style={{ transform: 'perspective(1000px) rotateX(45deg) scale(2)' }} />
        
        <canvas
            ref={canvasRef}
            className="absolute inset-0"
        />

        {/* Nebula Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[var(--accent-primary)] opacity-[0.07] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[var(--accent-secondary)] opacity-[0.05] blur-[150px] rounded-full" />
    </div>
  );
}
