import FadeIn from "../ui/FadeIn";
import TeamCard from "../ui/TeamCard";

const thirdYearTeam = [
  {
    name: "Jaideep Singh Rajpurohit",
    role: "Club Coordinator",
    description:
      "Leads system planning, coordination across domains, and long-term technical direction.",
    image: "/images/team/coordinator.jpg",
    highlight: true,
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/username" },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
  {
    name: "Aayush Vijay",
    role: "Co - coordinator",
    description:
      "Handles microcontrollers, hardware interfacing, and control logic.",
    image: "/images/team/av.jpeg",
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/aayush-vijayvergiya-9a794b294/",
      },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
];

const secondYearTeam = [
  {
    name: "Core Member",
    role: "Second Year Member",
    description:
      "Works on builds, testing, and system documentation.",
    image: "/images/team/member1.jpg",
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/username" },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
  {
    name: "Core Member",
    role: "Second Year Member",
    description:
      "Contributes to experiments and learning across domains.",
    image: "/images/team/member2.jpg",
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/username" },
      { label: "GitHub", url: "https://github.com/username" },
    ],
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="
        relative px-8 py-32
        section-light
      "
    >
      <div className="max-w-6xl mx-auto space-y-28">

        {/* Section Header */}
        <FadeIn>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Team
            </h2>
            <p className="max-w-xl text-muted">
              The people who design, build, test, and evolve ARC Robotics.
            </p>
          </div>
        </FadeIn>

        {/* Third Year Team */}
        <div className="space-y-10">
          <FadeIn>
            <h3 className="text-xl font-medium tracking-tight">
              Third Year Team
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {thirdYearTeam.map((member, idx) => (
              <FadeIn key={idx}>
                <div className="group">
                  <TeamCard {...member} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Second Year Team */}
        <div className="space-y-10">
          <FadeIn>
            <h3 className="text-xl font-medium tracking-tight">
              Second Year Team
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {secondYearTeam.map((member, idx) => (
              <FadeIn key={idx}>
                <div className="group">
                  <TeamCard {...member} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
