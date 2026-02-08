import FadeIn from "../ui/FadeIn";
import { getSystems } from "../../sanity/lib/queries";

export default async function Systems() {
  const systems = await getSystems();

  return (
    <section id="systems" className="px-8 py-32">
      <div className="max-w-5xl mx-auto space-y-16">

        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Systems
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {systems.map((system: any) => (
            <FadeIn key={system._id}>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">
                  {system.title}
                </h3>
                <p className="text-sm opacity-80">
                  {system.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
