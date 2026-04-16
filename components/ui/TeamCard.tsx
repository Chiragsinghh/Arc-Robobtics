"use client";

import Image from "next/image";
import {
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
} from "./SocialIcons";
import { urlFor } from "../../sanity/lib/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

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
        });
        gsap.to(infoRef.current, {
          width: 240,
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "expo.out",
        });
      } else {
        gsap.to(containerRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
        });
        gsap.to(infoRef.current, {
          width: 0,
          opacity: 0,
          x: -20,
          duration: 0.3,
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
      <div
        className={`relative flex items-stretch h-[380px] lg:h-[420px]
        bg-[#02081a] border transition-colors duration-500
        ${
          highlight
            ? "border-[var(--accent-primary)] shadow-[0_0_30px_rgba(15,82,186,0.15)]"
            : "border-white/10"
        }`}
      >
        {/* IMAGE */}
        <div className="relative w-full h-full overflow-hidden">
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

          <div className="absolute bottom-0 left-0 w-full p-8 space-y-1">
            <span className="text-[8px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.3em]">
              {role}
            </span>
            <h3 className="text-xl font-mono font-bold text-white uppercase">
              {name}
            </h3>
          </div>
        </div>

        {/* SOCIALS */}
        <div
          ref={infoRef}
          className="absolute left-[100%] top-0 h-full overflow-hidden opacity-0"
          style={{ width: "0px" }}
        >
          <div className="p-10">
            <div className="flex gap-6">
              {socials.map((social, i) => {
                const Icon = iconMap[social.label];

                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-[var(--accent-primary)] transition-all hover:scale-125"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}