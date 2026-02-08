import FadeIn from "../ui/FadeIn";
import { getKnowledgeTracks } from "../../sanity/lib/queries";

export default async function Knowledge() {
  const tracks = await getKnowledgeTracks();

  return (
    <section id="knowledge" className="px-8 py-32">
      <div className="max-w-5xl mx-auto space-y-20">

        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Knowledge Base
          </h2>
        </FadeIn>

        <div className="space-y-16">
          {tracks.map((track: any) => (
            <FadeIn key={track._id}>
              <div className="space-y-6">

                {/* Track header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-medium">
                    {track.title}
                  </h3>
                  <p className="text-sm opacity-80 max-w-2xl">
                    {track.intro}
                  </p>
                </div>

                {/* Modules */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                  {track.modules.map((module: any) => (
                    <li
                      key={module._id}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />

                      <div className="space-y-1">
                        <div className="font-medium">
                          {module.title}
                        </div>

                        {module.summary && (
                          <p className="opacity-70 text-xs">
                            {module.summary}
                          </p>
                        )}

                        {module.pdfUrl && (
                          <a
                            href={module.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline inline-block mt-1"
                          >
                            View PDF
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
