"use client";

import Image from "next/image";

export default function Philosophy() {
  return (
    <section
    id="philosophy"
      className="
        relative px-8 py-40
        bg-[#E2E8F0]
        dark:bg-[#000926]
        text-[#0B1020]
        dark:text-white
      "
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-start">
        
        {/* LEFT */}
        <div className="space-y-8">
          <div className="w-12 h-[2px] bg-[#0F52BA]" />

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            We engineer <br />
            complete systems.
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
            ARC Robotics operates as an integrated engineering lab —
            not a collection of isolated experiments.
          </p>

          {/* LOGOS */}
          <div className="relative h-40 mt-10">

            {/* ARC BIG */}
            <div className="absolute left-0 top-0 group">
              <div className="relative w-32 h-32 float-slow transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logos/arc-logo.jpg"
                  alt="ARC Robotics"
                  fill
                  className="object-contain rounded-full shadow-lg"
                />
              </div>
            </div>

            {/* COLLEGE SMALL */}
            <div className="absolute left-24 top-16 group">
              <div className="relative w-20 h-20 float-fast transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logos/iiitkotalogo.webp"
                  alt="College"
                  fill
                  className="object-contain rounded-full shadow-md opacity-90"
                />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-16">

          <div className="space-y-4">
            <h3 className="text-sm tracking-widest uppercase text-[#0F52BA]">
              Systems Thinking
            </h3>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Every project is treated as an architecture problem.
              Control logic, hardware, power, software —
              designed as one unified system.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm tracking-widest uppercase text-[#0F52BA]">
              Engineering Discipline
            </h3>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Assumptions are tested. Designs are reviewed.
              Systems are validated under constraints.
              Reliability is non-negotiable.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm tracking-widest uppercase text-[#0F52BA]">
              Real-World Execution
            </h3>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              We build physical systems.
              We iterate through failure.
              We deploy what we design.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}