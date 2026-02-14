"use client";

import Image from "next/image";
import { LinkedInIcon, GitHubIcon, InstagramIcon } from "./SocialIcons";

type Social = {
  label: string;
  url: string;
};

export default function TeamCard({
  name,
  role,
  description,
  image,
  socials,
  highlight,
}: {
  name: string;
  role: string;
  description: string;
  image: string;
  socials?: Social[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        group relative overflow-hidden
        bg-[#0B1228]/50 backdrop-blur-sm
        border transition-all duration-500 ease-in-out
        ${highlight ? "border-[#0F52BA]" : "border-white/10"}
        h-[360px] hover:h-[440px]
        rounded-xl
      `}
    >
      {/* HUD CORNER ACCENTS (Visible on hover) */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#0F52BA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#0F52BA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* IMAGE SECTION */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover 
            grayscale group-hover:grayscale-0 
            scale-105 group-hover:scale-100 
            transition-all duration-700 ease-out
            opacity-80 group-hover:opacity-100
          "
        />
        {/* VIGNETTE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1228] via-transparent to-transparent opacity-90" />
        
        {/* STATUS INDICATOR */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full ${highlight ? 'bg-[#0F52BA] animate-pulse' : 'bg-slate-500'}`} />
           <span className="text-[9px] font-mono uppercase tracking-widest text-white/50">Active_Node</span>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 space-y-3 relative">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#0F52BA] uppercase tracking-[0.2em]">
            {role}
          </div>
          <div className="text-xl font-bold tracking-tight text-white group-hover:text-[#0F52BA] transition-colors duration-300">
            {name}
          </div>
        </div>

        {/* DESCRIPTION - Appears smoothly on hover */}
        <p
          className="
            text-xs leading-relaxed text-slate-400
            opacity-0 -translate-y-2
            transition-all duration-500
            group-hover:opacity-100 group-hover:translate-y-0
          "
        >
          {description}
        </p>
      </div>

      {/* SOCIAL LINKS */}
      {socials && socials.length > 0 && (
        <div
          className="
            absolute bottom-6 left-5 right-5
            flex gap-5
            opacity-0 translate-y-4
            transition-all duration-500 delay-100
            group-hover:opacity-100 group-hover:translate-y-0
            z-30
          "
        >
          {socials.map((social) => {
            const Icon =
              social.label === "LinkedIn"
                ? LinkedInIcon
                : social.label === "GitHub"
                ? GitHubIcon
                : InstagramIcon;

            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#0F52BA] transition-colors duration-300"
              >
                <div className="scale-90 hover:scale-110 transition-transform">
                  <Icon />
                </div>
              </a>
            );
          })}
          
          {/* TECHNICAL DECORATION LINE */}
          <div className="flex-1 h-[1px] bg-white/10 self-center ml-2" />
        </div>
      )}
    </div>
  );
}