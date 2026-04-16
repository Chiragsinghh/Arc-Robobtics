"use client";

import Image from "next/image";
import {
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
} from "./SocialIcons";
import { urlFor } from "../../sanity/lib/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Social = {
  label: "LinkedIn" | "GitHub" | "Instagram";
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

const iconMap = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Instagram: InstagramIcon,
};

export default function TeamCard({
  name,
  role,
  description,
  image,
  socials = [],
  highlight = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Sidebar Slide Animation
      const tl = gsap.timeline({ paused: true });
      tl.to(infoRef.current, {
        width: 320,
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
      });

      containerRef.current?.addEventListener("mouseenter", () => tl.play());
      containerRef.current?.addEventListener("mouseleave", () => tl.reverse());

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 hover:z-50 cursor-crosshair group group/card"
      style={{ width: "260px" }}
    >
      <div
        className={`relative flex items-stretch h-[380px] lg:h-[420px]
        bg-[#02081a] border transition-all duration-500
        ${
          highlight
            ? "border-[var(--accent-primary)] shadow-[0_0_30px_rgba(15,82,186,0.15)]"
            : "border-white/10"
        } group-hover:shadow-[0_0_50px_rgba(15,82,186,0.1)]`}
      >
        {/* IMAGE */}
        <div ref={imageRef} className="relative w-full h-full overflow-hidden grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-110 group-hover:saturate-[1.1] group-hover:scale-[1.02]">
          {image ? (
            <Image
              src={urlFor(image).width(800).url()}
              alt={name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/40 text-[8px] font-mono text-white/5 uppercase">
              No_Visual
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full p-8 space-y-1 z-20">
            <span className="text-[8px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.3em] drop-shadow-[0_0_8px_var(--accent-primary)] font-bold">
              {role}
            </span>
            <h3 className="text-xl font-mono font-bold text-white uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
              {name}
            </h3>
          </div>
        </div>

        {/* SOCIALS & INFO (Sidebar) */}
        <div
          ref={infoRef}
          className="absolute left-full top-0 h-full overflow-hidden opacity-0 pointer-events-none group-hover:pointer-events-auto bg-[#040c1d] border-y border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex items-stretch"
          style={{ width: "0px" }}
        >
          <div className="p-10 space-y-8 min-w-[320px]">
            {description && (
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-widest block drop-shadow-[0_0_8px_var(--accent-primary)]">Profile_Bio</span>
                <p className="text-xs text-white/80 font-mono leading-relaxed italic border-l-2 border-[var(--accent-primary)]/30 pl-4">
                  "{description}"
                </p>
              </div>
            )}
            
            <div className="space-y-4">
               <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block">Neural_Links</span>
               <div className="flex gap-6">
                {socials.map((social, i) => {
                  const Icon = iconMap[social.label as keyof typeof iconMap];
                  if (!Icon) return null;

                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[var(--accent-primary)] transition-all hover:scale-125 hover:drop-shadow-[0_0_8px_var(--accent-primary)]"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Technical Metadata Decoration */}
            <div className="pt-10 opacity-10 font-mono text-[8px] text-white space-y-1">
               <p>AUTH_STATUS: VERIFIED</p>
               <p>CLEARANCE: LEVEL_4</p>
               <p>SECTOR: ARCHIVE_DELTA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}