"use client";

import { useEffect, useState } from "react";
import FadeIn from "../ui/FadeIn";
import { getSystems } from "../../sanity/lib/queries";

export default function Systems() {
  const [systems, setSystems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSystems();
        setSystems(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // Runs once on mount

  if (loading) return null; // Or a robotic loading skeleton

  return (
    <section id="systems" className="px-8 py-32">
      <div className="max-w-5xl mx-auto space-y-16">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase">
            Systems_Arch
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {systems.map((system: any) => (
            <FadeIn key={system._id}>
              <div className="group space-y-4 border-l-2 border-[var(--line)] pl-6 hover:border-[var(--accent)] transition-colors duration-300">
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  {system.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {system.description}
                </p>
                {/* Optional: Add a small technical tag if they exist in your Sanity data */}
                <div className="flex gap-2">
                   {system.tags?.map((tag: string) => (
                     <span key={tag} className="text-[10px] font-mono py-1 px-2 bg-[var(--bg-soft)] rounded">
                       {tag}
                     </span>
                   ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}