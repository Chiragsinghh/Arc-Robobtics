import FadeIn from "../ui/FadeIn";
import { getKnowledgeTracks } from "../../sanity/lib/queries";
import InteractiveGrid from "../ui/InteractiveGrid";

export default async function Knowledge() {
  const tracks = await getKnowledgeTracks();

  return (
    <section id="knowledge" className="relative px-6 lg:px-16 py-40 bg-[#010409] text-white overflow-hidden">
      {/* Background Ambience */}
      <InteractiveGrid />

      <div className="max-w-7xl mx-auto relative z-10 space-y-32">
        
        {/* SECTION HEADER */}
        <div className="space-y-6">
           <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.5em]">
              <div className="w-10 h-px bg-[var(--accent-primary)]" />
              <span>Training_Repository_v4</span>
           </div>
           
           <h2 className="text-6xl lg:text-9xl font-mono font-bold italic text-white uppercase tracking-tighter leading-[0.8]">
              INTEL <br /> <span className="text-[var(--accent-primary)]">VAULT.</span>
           </h2>
        </div>

        <div className="space-y-40">
          {tracks.map((track: any, trackIdx: number) => (
            <div key={track._id} className="space-y-16">
              
              {/* TRACK HEADER */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-10">
                 <div className="space-y-4">
                    <span className="text-[9px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.4em]">Track_0{trackIdx + 1}</span>
                    <h3 className="text-4xl lg:text-5xl font-mono font-bold italic uppercase tracking-tighter">{track.title}</h3>
                 </div>
                 <p className="text-sm font-mono text-white/40 max-w-md leading-relaxed uppercase">
                    {track.intro}
                 </p>
              </div>

              {/* MODULE GRID - Dossier Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1px bg-white/5 border border-white/5">
                {track.modules.map((module: any, modIdx: number) => (
                  <div 
                    key={module._id}
                    className="group relative p-10 lg:p-12 bg-[#010612] hover:bg-[#020b1f] transition-all duration-500 overflow-hidden"
                  >
                    {/* Background Indexing */}
                    <div className="absolute top-10 right-10 text-[40px] font-mono font-black text-white/[0.02] group-hover:text-[var(--accent-primary)]/[0.05] transition-colors leading-none pointer-events-none">
                       0{modIdx + 1}
                    </div>

                    <div className="relative z-10 space-y-8 h-full flex flex-col justify-between">
                       <div className="space-y-4">
                          <div className="w-8 h-1 bg-[var(--accent-primary)]/20 group-hover:w-16 group-hover:bg-[var(--accent-primary)] transition-all duration-500" />
                          <h4 className="text-xl lg:text-2xl font-mono font-bold uppercase tracking-tight italic text-white/80 group-hover:text-white transition-colors">
                            {module.title}
                          </h4>
                          {module.summary && (
                            <p className="text-[11px] font-mono text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                               {"> "} {module.summary}
                            </p>
                          )}
                       </div>

                       {module.pdfUrl && (
                         <div className="pt-6">
                            <a
                              href={module.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent-primary)] hover:gap-6 transition-all"
                            >
                              <span>ACCESS_DATA_RESOURCES</span>
                              <div className="w-6 h-px bg-[var(--accent-primary)]" />
                            </a>
                         </div>
                       )}
                    </div>

                    {/* Scanline Effect on Hover */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}