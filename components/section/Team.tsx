import FadeIn from "../ui/FadeIn";
import TeamCard from "../ui/TeamCard";
import { getTeamMembers } from "../../sanity/lib/queries";

export default async function Team() {
  const members = await getTeamMembers();
  console.log(members);

  const thirdYearTeam = members.filter((m) => m.year === "third");
  const secondYearTeam = members.filter((m) => m.year === "second");

  return (
    <section
      id="team"
      className="relative px-8 py-32 bg-[#000926] text-white overflow-hidden"
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0F52BA 1px, transparent 1px), linear-gradient(90deg, #0F52BA 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* GLOWS */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0F52BA] opacity-[0.05] blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F52BA] opacity-[0.02] blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-28">
        {/* HEADER */}
        <FadeIn>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#0F52BA]" />
              <span className="text-[#0F52BA] font-mono text-[10px] tracking-[0.4em] uppercase">
                Human Capital
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase italic">
              The <span className="text-[#0F52BA]">Engineers.</span>
            </h2>

            <p className="max-w-xl text-slate-400 text-lg leading-relaxed">
              A multidisciplinary collective dedicated to building the next
              generation of autonomous robotic systems.
            </p>
          </div>
        </FadeIn>

        {/* ================= THIRD YEAR ================= */}
        {thirdYearTeam.length > 0 && (
          <div className="space-y-12">
            <FadeIn>
              <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <h3 className="text-2xl font-semibold tracking-tight uppercase italic">
                  Strategic <span className="text-[#0F52BA]">Lead</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Class of 2027
                </span>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {thirdYearTeam.map((member, idx) => (
                <FadeIn key={member.name + idx} delay={idx * 0.1}>
                  <div className="group relative">
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <TeamCard
                      name={member.name}
                      role={member.role}
                      description={member.description}
                      image={member.image || null} // ✅ FIXED
                      highlight={member.highlight}
                      socials={
                        member.socials?.map((s) => ({
                          label:
                            s.platform.charAt(0).toUpperCase() +
                            s.platform.slice(1),
                          url: s.url,
                        })) || []
                      }
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECOND YEAR ================= */}
        {secondYearTeam.length > 0 && (
          <div className="space-y-12">
            <FadeIn>
              <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <h3 className="text-2xl font-semibold tracking-tight uppercase italic">
                  Core <span className="text-[#0F52BA]">Operations</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Class of 2028
                </span>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {secondYearTeam.map((member, idx) => (
                <FadeIn key={member.name + idx} delay={idx * 0.1}>
                  <div className="group transition-transform duration-500 hover:-translate-y-2">
                    <TeamCard
                      name={member.name}
                      role={member.role}
                      description={member.description}
                      image={member.image || null} // ✅ FIXED
                      highlight={member.highlight}
                      socials={
                        member.socials?.map((s) => ({
                          label:
                            s.platform.charAt(0).toUpperCase() +
                            s.platform.slice(1),
                          url: s.url,
                        })) || []
                      }
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}