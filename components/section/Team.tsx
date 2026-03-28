import FadeIn from "../ui/FadeIn";
import TeamCard from "../ui/TeamCard";
import { getTeamMembers } from "../../sanity/lib/queries";

/* ===============================
   TYPES
================================= */
type Social = {
  platform: string;
  url: string;
};

type Member = {
  _id?: string;
  name: string;
  role?: string;
  description?: string;
  image?: any;
  highlight?: boolean;
  year: "first" | "second" | "third" | "fourth";
  socials?: Social[];
};

export default async function Team() {
  const members: Member[] = await getTeamMembers();

  const thirdYearTeam = members.filter((m) => m.year === "third");
  const secondYearTeam = members.filter((m) => m.year === "second");

  return (
    <section
      id="team"
      className="relative px-8 py-32 bg-[#000926] text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-28">

        {/* HEADER */}
        <FadeIn>
          <div>
            <h2 className="text-5xl font-bold italic uppercase">
              The <span className="text-[#0F52BA]">Engineers.</span>
            </h2>
          </div>
        </FadeIn>

        {/* THIRD YEAR */}
        {thirdYearTeam.length > 0 && (
          <div>
            <div className="grid md:grid-cols-3 gap-8">
              {thirdYearTeam.map((member, idx) => (
                <FadeIn key={member.name + idx} delay={idx * 0.1}>
                  <TeamCard
                    name={member.name}
                    role={member.role || ""}
                    description={member.description || ""}
                    image={member.image || null}
                    highlight={member.highlight ?? false}
                    socials={
                      member.socials?.map((s) => ({
                        label:
                          s.platform.charAt(0).toUpperCase() +
                          s.platform.slice(1),
                        url: s.url,
                      })) || []
                    }
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* SECOND YEAR */}
        {secondYearTeam.length > 0 && (
          <div>
            <div className="grid md:grid-cols-4 gap-6">
              {secondYearTeam.map((member, idx) => (
                <FadeIn key={member.name + idx} delay={idx * 0.1}>
                  <TeamCard
                    name={member.name}
                    role={member.role || ""}
                    description={member.description || ""}
                    image={member.image || null}
                    highlight={member.highlight ?? false}
                    socials={
                      member.socials?.map((s) => ({
                        label:
                          s.platform.charAt(0).toUpperCase() +
                          s.platform.slice(1),
                        url: s.url,
                      })) || []
                    }
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}