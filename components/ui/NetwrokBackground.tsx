"use client";

import { useRef, useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
};

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    /* ======== LOCKED BEHAVIOR SETTINGS ======== */
    const PARTICLE_COUNT = 140;

    const BASE_SPEED = 0.32;
    const MAX_SPEED = 2.4;

    const CONNECT_DISTANCE = 190;

    const REPULSE_RADIUS = 260;
    const REPULSE_FORCE = 5.2;

    const DOT_RADIUS = 3.2;
    const LINE_BASE_OPACITY = 0.22;

    const DAMPING_IDLE = 0.975;
    const DAMPING_ACTIVE = 0.94;

    const NOISE_STRENGTH = 0.04;
    /* ======================================== */

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map(
      () => {
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * BASE_SPEED,
          vy: Math.sin(angle) * BASE_SPEED,
          seed: Math.random() * 1000,
        };
      }
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      const isDark = document.documentElement.classList.contains("dark");

      // Theme-safe bridge color
      const lineRGB = isDark
        ? "203, 213, 225" // slate-300 (visible on dark)
        : "15, 23, 42";   // slate-900 (visible on light)

      let mouseActive = false;

      for (const p of particles) {
        // Autonomous motion
        const noiseAngle = Math.sin(time + p.seed) * Math.PI * 2;
        p.vx += Math.cos(noiseAngle) * NOISE_STRENGTH;
        p.vy += Math.sin(noiseAngle) * NOISE_STRENGTH;

        // Mouse interaction (wing-like)
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < REPULSE_RADIUS * REPULSE_RADIUS) {
          mouseActive = true;
          const dist = Math.sqrt(distSq) || 1;
          const impulse = (1 - dist / REPULSE_RADIUS) * REPULSE_FORCE;
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        // Apply movement
        p.x += p.vx;
        p.y += p.vy;

        // Boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dynamic damping
        const damping = mouseActive ? DAMPING_ACTIVE : DAMPING_IDLE;
        p.vx *= damping;
        p.vy *= damping;
      }

      // Draw bridges (FIXED FOR DARK MODE)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < CONNECT_DISTANCE) {
            ctx.strokeStyle = `rgba(${lineRGB}, ${
              LINE_BASE_OPACITY * (1 - d / CONNECT_DISTANCE)
            })`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = "#2563eb";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
