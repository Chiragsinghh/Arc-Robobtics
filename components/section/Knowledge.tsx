import FadeIn from "../ui/FadeIn";
import { getKnowledgeTracks } from "../../sanity/lib/queries";

export default async function Knowledge() {
  const tracks = await getKnowledgeTracks();

  return (
    <section className="px-8 pb-32">
      <div className="max-w-6xl mx-auto space-y-24">

        {tracks.map((track: any) => (
          <FadeIn key={track._id}>
            
            {/* TRACK CARD */}
            <div
              className="
                border border-[var(--line)]
                rounded-2xl
                p-10
                bg-[var(--bg-soft)]
                space-y-10
                transition
                hover:border-[var(--accent-primary)]
              "
            >
              
              {/* HEADER */}
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {track.title}
                </h2>

                <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
                  {track.intro}
                </p>
              </div>

              {/* MODULE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {track.modules.map((module: any) => (
                  <div
                    key={module._id}
                    className="
                      group
                      border border-[var(--line)]
                      rounded-xl
                      p-6
                      bg-[var(--bg)]
                      transition-all duration-300
                      hover:border-[var(--accent-primary)]
                      hover:shadow-lg
                    "
                  >
                    
                    {/* MODULE TITLE */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium">
                        {module.title}
                      </h3>

                      <div className="
                        w-2 h-2 rounded-full
                        bg-[var(--accent-primary)]
                        opacity-60
                        group-hover:opacity-100
                        transition
                      " />
                    </div>

                    {/* SUMMARY */}
                    {module.summary && (
                      <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                        {module.summary}
                      </p>
                    )}

                    {/* ACTION */}
                    {module.pdfUrl && (
                      <a
                        href={module.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          mt-4 inline-block
                          text-xs
                          text-[var(--accent-primary)]
                          hover:underline
                        "
                      >
                        Open Resource →
                      </a>
                    )}

                  </div>
                ))}

              </div>

            </div>

          </FadeIn>
        ))}

      </div>
    </section>
  );
}