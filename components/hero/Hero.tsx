import GridOverlay from "../ui/GridOverlay";
import FadeIn from "../ui/FadeIn";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[80vh] px-8 overflow-hidden">

      <GridOverlay />

      <div className="relative max-w-3xl text-center space-y-6">
        <FadeIn>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            ARC Robotics
          </h1>
        </FadeIn>

        <FadeIn>
          <p className="text-lg opacity-80">
            Building systems. Building people.
          </p>
        </FadeIn>
      </div>

    </section>
  );
}
