import FadeIn from "../ui/FadeIn";
import { getEvents } from "../../sanity/lib/queries";
import Link from "next/link";


export default async function Events() {
  const events = await getEvents();

  return (
    
    <section id="events" className="px-8 py-32">
      <div className="max-w-6xl mx-auto space-y-12">

        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Events & Activities
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-200 dark:bg-neutral-800" />

          <div
            className="
              relative flex gap-12
              overflow-x-auto
              pb-8 pt-8
              scroll-smooth
            "
          >
            {events.map((event: any) => (
              <div
                key={event._id}
                className="
                  group relative min-w-[220px]
                  flex flex-col items-start
                "
              >
                {/* Node */}
                <div className="w-3 h-3 rounded-full bg-background border border-accent z-10" />

                {/* Card */}
                <div
                  className="
                    mt-6 space-y-2
                    transition-all duration-300
                    group-hover:translate-y-[-4px]
                  "
                >
                  <div className="text-xs opacity-60">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  <div className="font-medium text-sm">
                    {event.title}
                  </div>

                  {/* Hover preview */}
                  <p
                    className="
                      text-xs opacity-0 max-h-0
                      group-hover:opacity-70
                      group-hover:max-h-24
                      transition-all duration-300
                    "
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
