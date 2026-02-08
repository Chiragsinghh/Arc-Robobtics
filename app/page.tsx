import Header from "../components/Layout/Header";
import Hero from "../components/hero/Hero";
import NodeSeparator from "../components/ui/NodeSeparator";
import Philosophy from "../components/section/Philosophy";
import Systems from "../components/section/Systems";
import Knowledge from "../components/section/Knowledge";
import Footer from "../components/Layout/Footer";
import Events from "../components/section/Events";
import Team from "../components/section/Team";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <NodeSeparator />
      <Philosophy />
      <NodeSeparator />
      <Systems />
      <NodeSeparator />
      <Knowledge />
      <Events />
      <NodeSeparator />
<Team />

      <Footer />
    </main>
  );
}
