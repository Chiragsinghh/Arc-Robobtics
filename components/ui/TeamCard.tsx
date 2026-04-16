"use client";

import Image from "next/image";
import { LinkedInIcon, GitHubIcon, InstagramIcon } from "./SocialIcons";
import { urlFor } from "../../sanity/lib/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

type Social = {
  label: string;
  url: string;
};

type Props = {
  name: string;
  role: string;
  description?: string;
  image?: any;
  socials?: Social[];
  highlight?: boolean;
};

export default function TeamCard({
  name,
  role,
  description,
  image,
  socials = [],
  highlight = false,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isHovered) {
        gsap.to(containerRef.current, {
          y: -10,
          scale: 1.02,
          duration: 0.4,
          ease: "back.out(1.7)",
          overwrite: "auto"
        });
        gsap.to(infoRef.current, {
           width: 240,
           opacity: 1,
           x: 0,
           duration: 0.5,
           ease: "expo.out",
           overwrite: "auto"
        });
      } else {
        gsap.to(containerRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut",
          overwrite: "auto"
        });
        gsap.to(infoRef.current, {
           width: 0,
           opacity: 0,
           x: -20,
           duration: 0.3,
           ease: "power2.in",
           overwrite: "auto"
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 hover:z-50 cursor-crosshair"
      style={{ width: "260px" }}
    >
      <div className={`
        relative flex items-stretch h-[380px] lg:h-[420px]
        bg-[#02081a] border transition-colors duration-500
        ${highlight ? "border-[var(--accent-primary)] shadow-[0_0_30px_rgba(15,82,186,0.15)]" : "border-white/10"}
      `}>
        {/* 1. PRIMARY PORTRAIT */}
        <div className="relative w-full h-full overflow-hidden">
          {image ? (
            <div className={`w-full h-full transition-all duration-1000 ${isHovered ? 'grayscale-0' : 'grayscale'}`}>
              <Image
                src={urlFor(image).width(800).url()}
                alt={name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/40 text-[8px] font-mono text-white/5 uppercase">
              No_Visual
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#010614] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 space-y-1">
            <span className="text-[8px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.3em] block">
              {role}
            </span>
            <h3 className="text-xl lg:text-2xl font-mono font-bold text-white uppercase italic tracking-tighter leading-none">
              {name}
            </h3>
          </div>
        </div>

        {/* 2. ABSOLUTE OVERLAY DOSSIER */}
        <div 
          ref={infoRef}
          className="absolute left-[100%] top-0 h-full overflow-hidden opacity-0 pointer-events-none z-20"
          style={{ width: "0px" }}
        >
           <div className="w-[240px] h-full bg-[#020b1f] border-y border-r border-white/10 p-10 flex flex-col justify-between shadow-[20px_0_50px_rgba(0,0,0,0.8)]">
              <div className="space-y-8">
                 <div className="flex items-center gap-4 text-[8px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.4em]">
                    <div className="w-10 h-px bg-[var(--accent-primary)]/40" />
                    <span>Dossier_Link</span>
                 </div>
                 
                 <p className="text-[11px] font-mono leading-relaxed text-white/50">
                    {description || "Authorized tactical summary for operative."}
                 </p>
              </div>

              <div className="space-y-6">
                 <div className="h-px w-full bg-white/10" />
                 <div className="flex items-center gap-6 pointer-events-auto">
                    {socials.map((social, i) => {
                      const Icon = social.label === "LinkedIn" ? LinkedInIcon : social.label === "GitHub" ? GitHubIcon : InstagramIcon;
                      return (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-[var(--accent-primary)] transition-all transform hover:scale-125 hover:drop-shadow-[0_0_8px_var(--accent-primary)]"
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                 </div>
              </div>
           </div>
           
           {/* High-Glow Accents */}
           <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--accent-primary)]/40 shadow-[0_0_15px_var(--accent-primary)] z-10" />
        </div>
      </div>
    </div>
  );
}