"use client";

import Image from "next/image";
import { LinkedInIcon, GitHubIcon, InstagramIcon } from "./SocialIcons";

/* ===============================
   TYPES
================================= */
type Social = {
  label: string;
  url: string;
};

type Props = {
  name: string;
  role: string;
  description?: string;
  image?: string | null;
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
      {/* HUD CORNERS */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#0F52BA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#0F52BA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* IMAGE SECTION */}
      <div className="relative h-56 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0B1228] text-slate-500 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3 relative">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#0F52BA] uppercase tracking-[0.2em]">
            {role}
          </div>

          <div className="text-xl font-bold tracking-tight text-white group-hover:text-[#0F52BA] transition-colors duration-300">
            {name}
          </div>
        </div>

        {description && (
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
        )}
      </div>

      {/* SOCIALS */}
      {socials.length > 0 && (
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
          {socials.map((social, i) => {
            const Icon =
              social.label === "LinkedIn"
                ? LinkedInIcon
                : social.label === "GitHub"
                ? GitHubIcon
                : InstagramIcon;

            return (
              <a
                key={social.label + i}
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

          <div className="flex-1 h-[1px] bg-white/10 self-center ml-2" />
        </div>
      )}
    </div>
  );
}