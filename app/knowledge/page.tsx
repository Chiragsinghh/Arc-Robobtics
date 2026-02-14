import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Knowledge from "../../components/section/Knowledge";

export default function KnowledgePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Knowledge />
      <Footer />
    </main>
  );
}
