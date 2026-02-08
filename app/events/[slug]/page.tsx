import { getEventBySlug } from "../../../sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In Next.js 15, params is a Promise that must be awaited
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 🔒 Guard: slug must exist
  if (!slug) {
    notFound();
  }

  const event = await getEventBySlug(slug);
  
  // This will now log the actual event data to your terminal instead of undefined
  console.log(event);

  if (!event) {
    notFound();
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