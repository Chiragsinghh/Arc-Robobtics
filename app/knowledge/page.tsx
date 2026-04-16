import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Knowledge from "../../components/section/Knowledge";

export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-[#010409]">
      <Header />
      <div className="pt-20"> {/* Offset for fixed header */}
        <Knowledge />
      </div>
      <Footer />
    </main>
  );
}
