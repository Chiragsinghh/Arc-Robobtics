import Reveal from "../ui/Reveal";

export default function Philosophy() {
  return (
    <section
      id="about"
      className="
        px-8 py-32
        bg-[var(--warm-bg)]
        transition-colors
      "
    >
      <div className="max-w-4xl mx-auto space-y-14">

        {/* Section header */}
        <Reveal>
          <div
            className="
              pl-6
              border-l-4
              border-[var(--accent-amber)]
            "
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text)]">
              How we work
            </h2>
          </div>
        </Reveal>

        {/* Paragraphs */}
        <Reveal delay={120}>
          <p className="text-lg leading-relaxed text-[var(--text-muted)]">
            ARC Robotics is built around systems thinking.
            We break problems down, design control logic,
            test assumptions, and iterate until the system behaves
            the way we intend it to.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg leading-relaxed text-[var(--text-muted)]">
            Our work spans hardware, software, and integration.
            From mechanical design to embedded control and perception,
            every project is treated as a complete system — not a collection
            of isolated parts.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <p className="text-lg leading-relaxed text-[var(--text-muted)]">
            We care about reliability, clarity, and reproducibility.
            Ideas are documented. Designs are reviewed.
            Systems are tested under real constraints.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
