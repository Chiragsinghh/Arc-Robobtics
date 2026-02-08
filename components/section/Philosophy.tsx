import FadeIn from "../ui/FadeIn";

export default function Philosophy() {
  return (
    <section id="about" className="px-8 py-32">

      <div className="max-w-4xl mx-auto space-y-12">
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            How we work
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="text-lg leading-relaxed opacity-85">
            ARC Robotics is built around systems thinking.
            We break problems down, design control logic,
            test assumptions, and iterate until the system behaves
            the way we intend it to.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-lg leading-relaxed opacity-85">
            Our work spans hardware, software, and integration.
            From mechanical design to embedded control and perception,
            every project is treated as a complete system — not a collection
            of isolated parts.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-lg leading-relaxed opacity-85">
            We care about reliability, clarity, and reproducibility.
            Ideas are documented. Designs are reviewed.
            Systems are tested under real constraints.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
