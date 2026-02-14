"use client";

import FadeIn from "../ui/FadeIn";
import TeamCard from "../ui/TeamCard";
import { motion } from "framer-motion";

const thirdYearTeam = [
  {
    name: "Jaideep Singh Rajpurohit",
    role: "Club Coordinator",
    description: "Leads system planning, coordination across domains, and long-term technical direction.",
    image: "/images/team/coordinator.jpg",
    highlight: true,
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/username" },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
  {
    name: "Aayush Vijay",
    role: "Co - coordinator",
    description: "Handles microcontrollers, hardware interfacing, and control logic.",
    image: "/images/team/av.jpeg",
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/aayush-vijayvergiya-9a794b294/" },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
];

const secondYearTeam = [
  {
    name: "Core Member",
    role: "Second Year Member",
    description: "Works on builds, testing, and system documentation.",
    image: "/images/team/member1.jpg",
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/username" },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
  {
    name: "Core Member",
    role: "Second Year Member",
    description: "Contributes to experiments and learning across domains.",
    image: "/images/team/member2.jpg",
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/username" },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
];

export default function Team() {
  return (
    <section id="team" className="relative px-8 py-32 bg-[#000926] text-white overflow-hidden">
      
      {/* 1. BLUEPRINT GRID BACKGROUND (Matches Systems Page) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#0F52BA 1px, transparent 1px), linear-gradient(90deg, #0F52BA 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* 2. AMBIENT GLOWS */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0F52BA] opacity-[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F52BA] opacity-[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-28">

        {/* SECTION HEADER */}
        <FadeIn>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-[2px] bg-[#0F52BA]" />
               <span className="text-[#0F52BA] font-mono text-[10px] tracking-[0.4em] uppercase">Human Capital</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase italic">
              The <span className="text-[#0F52BA]">Engineers.</span>
            </h2>
            <p className="max-w-xl text-slate-400 text-lg leading-relaxed">
              A multidisciplinary collective dedicated to building the next generation 
              of autonomous robotic systems.
            </p>
          </div>
        </FadeIn>

        {/* THIRD YEAR TEAM */}
        <div className="space-y-12">
          <FadeIn>
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <h3 className="text-2xl font-semibold tracking-tight uppercase italic">
                Strategic <span className="text-[#0F52BA]">Lead</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Class of 2026</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {thirdYearTeam.map((member, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group relative">
                  {/* Optional: Add a technical border frame around cards */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <TeamCard {...member} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* SECOND YEAR TEAM */}
        <div className="space-y-12">
          <FadeIn>
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <h3 className="text-2xl font-semibold tracking-tight uppercase italic">
                Core <span className="text-[#0F52BA]">Operations</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Class of 2027</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {secondYearTeam.map((member, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group transition-transform duration-500 hover:-translate-y-2">
                  <TeamCard {...member} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}