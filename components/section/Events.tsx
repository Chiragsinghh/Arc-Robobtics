"use client";

import { useEffect, useRef, useState } from "react";
import { getEvents } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";

interface SanityEvent {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  date: string;
  image: any;
}

export default function Events() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getEvents();
      setEvents(data);
    }
    fetchData();
  }, []);

  // Infinite Scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !events.length) return;

    const handleScroll = () => {
      const totalWidth = el.scrollWidth / 2;
      if (el.scrollLeft <= 0) el.scrollLeft = totalWidth;
      if (el.scrollLeft >= totalWidth) el.scrollLeft = 1;
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [events]);

  // Wheel scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  if (!events.length) return null;

  const duplicated = [...events, ...events];

  return (
    <section 
    id = "Events"
     className="relative min-h-screen py-32 bg-[#000926] text-white overflow-hidden">
      
      
      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F52BA] opacity-[0.03] blur-[120px]" />

      {/* 🔥 BLUEPRINT GRID */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{ 
          backgroundImage: `
            linear-gradient(#0F52BA 1px, transparent 1px),
            linear-gradient(90deg, #0F52BA 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }} 
      />

      <div className="max-w-7xl mx-auto px-10 md:px-20 relative z-10">
        
        {/* HEADER */}
        <div className="mb-20 space-y-6 max-w-2xl">
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: "48px" }}
             className="h-[2px] bg-[#0F52BA]" 
          />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Arc Journey
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Chronological milestones of workshops, experiments, and 
            collaborative builds that shaped our robotics ecosystem.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          
          {/* LINE */}
          <div className="absolute top-[160px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-[5]" />

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
            className="
              absolute left-6 top-1/2 -translate-y-1/2 z-[200]
              w-14 h-14 flex items-center justify-center
              bg-[#0F52BA]
              shadow-[0_0_30px_rgba(15,82,186,0.8)]
              border border-[#0F52BA]/60
              rounded-full
              text-white text-2xl
              hover:scale-110
              transition-all duration-300
            "
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("right")}
            className="
              absolute right-6 top-1/2 -translate-y-1/2 z-[200]
              w-14 h-14 flex items-center justify-center
              bg-[#0F52BA]
              shadow-[0_0_30px_rgba(15,82,186,0.8)]
              border border-[#0F52BA]/60
              rounded-full
              text-white text-2xl
              hover:scale-110
              transition-all duration-300
            "
          >
            ›
          </button>

          {/* SCROLL */}
          <div
            ref={scrollRef}
            className="
              flex gap-20
              overflow-x-auto
              overflow-y-visible 
              scrollbar-hide
              pt-40
              pb-80
              relative
              snap-x
            "
          >
            {duplicated.map((event, index) => {
              const isHovered = activeHoverIndex === index;

              return (
                <div
                  key={`${event._id}-${index}`}
                  className="relative min-w-[300px] flex flex-col items-center snap-center group"
                  onMouseEnter={() => setActiveHoverIndex(index)}
                  onMouseLeave={() => setActiveHoverIndex(null)}
                  onClick={() => setSelectedEvent(event)}
                >
                  
                  {/* DOT */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.4 : 1,
                      backgroundColor: isHovered ? "#0F52BA" : "#1e293b",
                    }}
                    className="w-3 h-3 rounded-full relative z-10 ring-8 ring-[#000926]"
                  >
                    {isHovered && (
                      <div className="absolute inset-0 rounded-full bg-[#0F52BA] animate-ping opacity-30" />
                    )}
                  </motion.div>

                  {/* TITLE */}
                  <div className="mt-10 text-center space-y-2 cursor-pointer">
                    <motion.div 
                      animate={{ color: isHovered ? "#0F52BA" : "rgba(148, 163, 184, 1)" }}
                      className="text-[10px] font-mono tracking-widest uppercase"
                    >
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </motion.div>

                    <motion.div 
                      animate={{ y: isHovered ? -2 : 0 }}
                      className={`text-xl font-medium ${isHovered ? 'text-[#0F52BA]' : 'text-white'}`}
                    >
                      {event.title}
                    </motion.div>
                  </div>

                  {/* HOVER CARD */}
                  <div className="relative w-full mt-6 h-0 flex justify-center">
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 15 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-0 w-72 bg-[#0B1228]/95 rounded-2xl p-2 border border-white/10 z-[100] pointer-events-none"
                        >
                          {event.image && (
                            <img
                              src={urlFor(event.image).width(400).url()}
                              className="w-full h-40 object-cover rounded-xl"
                            />
                          )}
                          <div className="p-4">
                            <p className="text-xs text-slate-400">
                              {event.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ORIGINAL MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="
                relative
                w-[90%] max-w-2xl
                bg-[#0B1228]
                border border-white/10
                rounded-2xl
                overflow-hidden
                shadow-[0_20px_60px_rgba(0,0,0,0.8)]
              "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-xl z-10"
              >
                ✕
              </button>

              {selectedEvent.image && (
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={urlFor(selectedEvent.image).width(800).url()}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1228] via-transparent to-transparent opacity-80" />
                </div>
              )}

              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-semibold text-white">
                  {selectedEvent.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {selectedEvent.detailedDescription || selectedEvent.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}