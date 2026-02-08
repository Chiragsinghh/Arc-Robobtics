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
      ]
      
  },
  {
    name: "Aayush Vijay",
    role: "Co - coordinator",
    description:
      "Handles microcontrollers, hardware interfacing, and control logic.",
    image: "/images/team/av.jpeg",
    socials: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/aayush-vijayvergiya-9a794b294/" },
        { label: "GitHub", url: "https://github.com/username" },
      ]
      
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
      ]
      
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
      ]
      
  },
];

export default function Team() {
  return (
    <section id="team" className="px-8 py-32">
      <div className="max-w-6xl mx-auto space-y-24">

        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Team
          </h2>
        </FadeIn>

        {/* Third Year */}
        <div className="space-y-8">
          <FadeIn>
            <h3 className="text-xl font-medium">
              Third Year Team
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {thirdYearTeam.map((member, idx) => (
              <FadeIn key={idx}>
                <div className="group">
                  <TeamCard {...member} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Second Year */}
        <div className="space-y-8">
          <FadeIn>
            <h3 className="text-xl font-medium">
              Second Year Team
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
