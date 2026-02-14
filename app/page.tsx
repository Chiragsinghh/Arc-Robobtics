import Header from "../components/Layout/Header";
import Hero from "../components/hero/Hero";
import NodeSeparator from "../components/ui/NodeSeparator";
import Philosophy from "../components/section/Philosophy";
import Systems from "../components/section/Systems";
import Events from "../components/section/Events";
import Team from "../components/section/Team";
import Footer from "../components/Layout/Footer";

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
      <Events />
      <NodeSeparator />
      <Team />
      <Footer />
    </main>
  );
}
