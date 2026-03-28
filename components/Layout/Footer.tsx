export default function Footer() {
  return (
    <footer className="mt-32 border-t border-neutral-200 dark:border-neutral-800 px-8 py-12">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-sm opacity-80">
        
        {/* LEFT: BRAND + ADDRESS */}
        <div className="space-y-4">
          <div className="font-semibold text-base tracking-tight">
            ARC ROBOTICS
          </div>

          <div className="text-xs leading-relaxed opacity-70 max-w-xs">
            IIIT Kota Permanent Campus, <br />
            RIICO Industrial Area, Kuber Extension, <br />
            Ranpur, Kota, Rajasthan – 325003
          </div>
        </div>

        {/* MIDDLE: QUICK LINKS */}
        <div className="space-y-4">
          <div className="font-medium text-xs uppercase tracking-wider opacity-60">
            Quick Links
          </div>

          <div className="flex flex-col gap-2">
            <a href="/" className="hover:opacity-100 transition-opacity">
              Home
            </a>
            <a href="/knowledge" className="hover:opacity-100 transition-opacity">
              Knowledge
            </a>
            {/* <a href="/gallery" className="hover:opacity-100 transition-opacity">
              Gallery
            </a> */}
          </div>
        </div>

        {/* RIGHT: MORE LINKS */}
        <div className="space-y-4">
          <div className="font-medium text-xs uppercase tracking-wider opacity-60">
            Quick Links
          </div>

          <div className="flex flex-col gap-2">
            <a href="#team" className="hover:opacity-100 transition-opacity">
              Team
            </a>
            <a
              href="https://iiitkota.ac.in"
              target="_blank"
              className="hover:opacity-100 transition-opacity"
            >
              IIIT Kota
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="max-w-6xl mx-auto mt-10 text-xs opacity-60">
        © {new Date().getFullYear()} ARC Robotics · All rights reserved
      </div>

    </footer>
  );
}