import { getEventBySlug } from "../../../sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return (
      <div className="px-8 py-32">
        Event not found.
      </div>
    );
  }

  return (
    <main className="px-8 py-32">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {event.title}
          </h1>

          <div className="text-sm opacity-60">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {event.description && (
          <p className="opacity-80">
            {event.description}
          </p>
        )}

        {event.content && (
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={event.content} />
          </div>
        )}
      </div>
    </main>
  );
}
