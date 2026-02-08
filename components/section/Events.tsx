import FadeIn from "../ui/FadeIn";
import { getEvents } from "../../sanity/lib/queries";
import Link from "next/link";

export default async function Events() {
  const events = await getEvents();

  return (
    <section id="events" className="px-8 py-32">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Heading */}
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Events & Activities
          </h2>
        </FadeIn>

        {/* Empty state */}
        {(!events || events.length === 0) && (
          <p className="text-sm opacity-60">
            Events will appear here as activities are documented.
          </p>
        )}

        {/* Timeline */}
        {events && events.length > 0 && (
          <div className="relative">

            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Scroll container */}
            <div
              className="
                relative flex gap-12
                overflow-x-auto
                pb-10 pt-10
                scroll-smooth
              "
            >
              {events.map((event: any) =>
                event.slug ? (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug}`}
                    className="
                      group relative min-w-[220px]
                      flex flex-col items-start
                      hover:cursor-pointer
                    "
                  >
                    {/* Timeline node */}
                    <div className="w-3 h-3 rounded-full bg-background border border-accent z-10" />

                    {/* Event card */}
                    <div
                      className="
                        mt-6 space-y-2
                        transition-all duration-300
                        group-hover:-translate-y-1
                      "
                    >
                      {/* Date */}
                      <div className="text-xs opacity-60">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>

                      {/* Title */}
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
                          overflow-hidden
                        "
                      >
                        {event.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                  /* Fallback if slug is missing */
                  <div
                    key={event._id}
                    className="
                      group relative min-w-[220px]
                      flex flex-col items-start
                      opacity-50 cursor-not-allowed
                    "
                  >
                    <div className="w-3 h-3 rounded-full bg-background border border-neutral-400 z-10" />

                    <div className="mt-6 space-y-2">
                      <div className="text-xs opacity-60">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>

                      <div className="font-medium text-sm">
                        {event.title}
                      </div>

                      <p className="text-xs opacity-60">
                        Details coming soon
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}