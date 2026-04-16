"use client";

import FadeIn from "../ui/FadeIn";
import TeamCard from "../ui/TeamCard";
import { getTeamMembers } from "../../sanity/lib/queries";
import InteractiveGrid from "../ui/InteractiveGrid";
import { useEffect, useState } from "react";

type Social = {
  platform: string;
  url: string;
};

type Member = {
  _id?: string;
  name: string;
  role?: string;
  description?: string;
  image?: any;
  highlight?: boolean;
  year: "first" | "second" | "third" | "fourth";
  socials?: Social[];
};

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getTeamMembers();
      setMembers(data);
    }
    fetchData();
  }, []);

  const thirdYearTeam = members.filter((m) => m.year === "third");
  const secondYearTeam = members.filter((m) => m.year === "second");

  return (
    <section
      id="team"
      className="relative px-6 lg:px-16 py-40 bg-[#000508] text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
         <InteractiveGrid intensity="violent" />
      </div>

      {/* Global Backdrop on Hover */}
      <div 
        className={`fixed inset-0 bg-black/60 transition-opacity duration-700 pointer-events-none z-40 ${hoveredId ? "opacity-100" : "opacity-0"}`} 
      />

      <div className="max-w-7xl mx-auto relative space-y-32">
        {/* HEADER */}
        <div className="space-y-6">
           <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.5em]">
              <div className="w-10 h-px bg-[var(--accent-primary)]" />
              <span>Unit_Directory</span>
           </div>
           <h2 className="text-6xl lg:text-9xl font-mono font-bold italic uppercase tracking-tighter text-white leading-[0.8]">
              OPERATIONAL <br /> <span className="text-[var(--accent-primary)]">CREW.</span>
           </h2>
        </div>

        {/* THIRD YEAR (CORE ARCHITECTS) */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Level_03 // Tier_1</span>
             <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {thirdYearTeam.map((member, idx) => {
              const id = `3rd-${idx}`;
              const isHovered = hoveredId === id;
              
              return (
                <div 
                  key={id} 
                  onMouseEnter={() => setHoveredId(id)} 
                  onMouseLeave={() => setHoveredId(null)}
                  className={`transition-all duration-500 ${isHovered ? 'relative z-50 scale-105' : 'relative z-10'}`}
                >
                  <TeamCard
                    name={member.name}
                    role={member.role || ""}
                    description={member.description || ""}
                    image={member.image || null}
                    highlight={member.highlight ?? false}
                    socials={
                      member.socials?.map((s) => {
                        let label: "LinkedIn" | "GitHub" | "Instagram" = "LinkedIn";
                        const p = s.platform.toLowerCase();
                        if (p === "github") label = "GitHub";
                        else if (p === "instagram") label = "Instagram";
                        else label = "LinkedIn";
                        
                        return { label, url: s.url };
                      }) || []
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* SECOND YEAR (MODULAR ENGINEERS) */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Level_02 // Tier_2</span>
             <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {secondYearTeam.map((member, idx) => {
              const id = `2nd-${idx}`;
              const isHovered = hoveredId === id;

              return (
                <div 
                  key={id} 
                  onMouseEnter={() => setHoveredId(id)} 
                  onMouseLeave={() => setHoveredId(null)}
                  className={`transition-all duration-500 ${isHovered ? 'relative z-50 scale-105' : 'relative z-10'}`}
                >
                  <TeamCard
                    name={member.name}
                    role={member.role || ""}
                    description={member.description || ""}
                    image={member.image || null}
                    highlight={member.highlight ?? false}
                    socials={
                      member.socials?.map((s) => {
                        let label: "LinkedIn" | "GitHub" | "Instagram" = "LinkedIn";
                        const p = s.platform.toLowerCase();
                        if (p === "github") label = "GitHub";
                        else if (p === "instagram") label = "Instagram";
                        else label = "LinkedIn";
                        
                        return { label, url: s.url };
                      }) || []
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}