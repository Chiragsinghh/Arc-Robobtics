"use client";

import { useEffect, useState } from "react";
import Reveal from "../ui/Reveal";
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
  }, []);

  if (loading) return null;

  return (
    <section
      id="systems"
      className="px-8 py-32 bg-[var(--bg)]"
    >
      <div className="max-w-5xl mx-auto space-y-20">

        {/* Section Header */}
        <Reveal>
          <div
            className="
              pl-6
              border-l-4
              border-[var(--accent-sage)]
            "
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[var(--text)]">
              Systems_Arch
            </h2>
          </div>
        </Reveal>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {systems.map((system: any, index: number) => (
            <Reveal key={system._id} delay={index * 80}>
              <div
                className="
                  space-y-4
                  pl-6
                  border-l-2
                  border-[var(--line)]
                "
              >
                {/* System Title */}
                <h3 className="text-xl font-semibold uppercase tracking-tight text-[var(--text)]">
                  {system.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {system.description}
                </p>

                {/* Tags (Technical Metadata) */}
                {system.tags && system.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {system.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="
                          text-[11px]
                          font-mono
                          px-2 py-1
                          rounded
                          bg-[var(--accent-sage-soft)]
                          text-[var(--accent-sage)]
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
