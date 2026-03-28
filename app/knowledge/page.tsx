import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Knowledge from "../../components/section/Knowledge";

export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">

      <Header />

      {/* HERO */}
      <section className="px-8 pt-40 pb-24">
        <div className="max-w-6xl mx-auto space-y-8">

          <div className="w-12 h-[2px] bg-[var(--accent-primary)]" />

          <h1 className="
            text-5xl md:text-6xl
            font-semibold
            tracking-tight
          ">
            Knowledge Base
          </h1>

          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            Structured learning resources across robotics, control systems,
            embedded programming, and system design.
          </p>

        </div>
      </section>

      {/* SEARCH / FILTER BAR (visual for now) */}
      {/* <section className="px-8 pb-16">
        <div className="max-w-6xl mx-auto">

          <div className="
            flex items-center gap-4
            border border-[var(--line)]
            rounded-xl
            px-6 py-4
            bg-[var(--bg-soft)]
          ">
            <input
              placeholder="Search modules, topics, systems..."
              className="
                w-full
                bg-transparent
                outline-none
                text-[var(--text)]
                placeholder:text-[var(--text-muted)]
              "
            />

            <div className="
              text-xs uppercase tracking-wide
              text-[var(--text-muted)]
            ">
              Filter
            </div>
          </div>

        </div>
      </section> */}

      {/* KNOWLEDGE CONTENT */}
      <Knowledge />

      <Footer />

    </main>
  );
}
