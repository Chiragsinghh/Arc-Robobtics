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
        relative overflow-hidden
        border transition-all duration-300
        ${highlight ? "border-accent" : "border-neutral-200 dark:border-neutral-800"}
        h-[320px] hover:h-[400px]
      `}
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-40"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="font-medium">{name}</div>
        <div className="text-sm opacity-70">{role}</div>

        {/* Description */}
        <p
          className="
            text-sm opacity-0 translate-y-2
            transition-all duration-300
            group-hover:opacity-80 group-hover:translate-y-0
          "
        >
          {description}
        </p>
      </div>

      {/* Social links (optional) */}
      {socials && socials.length > 0 && (
  <div
    className="
      absolute bottom-4 left-4 right-4
      flex gap-4
      opacity-0 transition-opacity duration-300
      group-hover:opacity-100
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
          className="text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors"
        >
          <Icon />
        </a>
      );
    })}
  </div>
)}

    </div>
  );
}
