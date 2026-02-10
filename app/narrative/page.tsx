"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NarrativePrototype() {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !step1Ref.current ||
      !step2Ref.current ||
      !step3Ref.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
      },
    });

    // Step 1 → Step 2
    tl.to(step1Ref.current, {
      opacity: 0,
      y: -80,
      duration: 1,
      ease: "none",
    });

    tl.fromTo(
      step2Ref.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: "none" }
    );

    // Step 2 → Step 3
    tl.to(step2Ref.current, {
      opacity: 0,
      y: -80,
      duration: 1,
      ease: "none",
    });

    tl.fromTo(
      step3Ref.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: "none" }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <main ref={containerRef} className="h-screen overflow-hidden">
      {/* STEP 1 */}
      <section
        ref={step1Ref}
        className="absolute inset-0 flex items-center px-12"
      >
        <div className="max-w-4xl">
          <p className="text-sm text-muted uppercase tracking-wider">
            System Idle
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            ARC Robotics
          </h1>
          <p className="mt-6 text-lg text-muted max-w-md">
            A student-led engineering collective focused on building reliable
            robotic systems.
          </p>
        </div>
      </section>

      {/* STEP 2 */}
      <section
        ref={step2Ref}
        className="absolute inset-0 flex items-center px-12 opacity-0"
      >
        <div className="max-w-4xl">
          <p className="text-sm text-muted uppercase tracking-wider">
            System Activation
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Systems Come Online
          </h2>
          <p className="mt-6 text-lg text-muted max-w-md">
            Mechanical design, electronics, control, and software integrate
            into a single operating system.
          </p>
        </div>
      </section>

      {/* STEP 3 */}
      <section
        ref={step3Ref}
        className="absolute inset-0 flex items-center px-12 opacity-0"
      >
        <div className="max-w-4xl">
          <p className="text-sm text-muted uppercase tracking-wider">
            Continuous Learning
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Knowledge Feeds the System
          </h2>
          <p className="mt-6 text-lg text-muted max-w-md">
            Workshops, research, and mentorship ensure every system evolves
            over time.
          </p>
        </div>
      </section>
    </main>
  );
}
