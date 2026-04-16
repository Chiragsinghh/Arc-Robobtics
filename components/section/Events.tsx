"use client";

import { useEffect, useRef, useState } from "react";
import { getEvents } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import gsap from "gsap";
import InteractiveGrid from "../ui/InteractiveGrid";

interface SanityEvent {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  date: string;
  image: any;
}

export default function Events() {
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null);

  const orbitalRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleNavigate = (direction: "prev" | "next") => {
    const newIndex = direction === "next" 
      ? (currentIndex + 1) % events.length 
      : (currentIndex - 1 + events.length) % events.length;
    
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (loading || events.length === 0) return;

    const angleIncrement = 360 / events.length;
    const targetRotation = -angleIncrement * currentIndex;

    gsap.to(orbitalRef.current, {
      rotation: targetRotation,
      duration: 1.2,
      ease: "power3.inOut",
    });

    // Content Reveal Animation
    gsap.fromTo(displayRef.current, 
      { opacity: 0, x: 50, filter: "blur(10px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
    );
  }, [currentIndex, loading, events.length]);

  // Modal Animation Logic
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedEvent) {
      const tl = gsap.timeline();
      tl.fromTo(modalWrapperRef.current, 
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(20px)", duration: 0.4 }
      );
      tl.fromTo(modalContentRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" },
        "-=0.2"
      );
      tl.from(".modal-stagger", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4");
    }
  }, [selectedEvent]);

  const closeModal = () => {
    gsap.to(modalContentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedEvent(null)
    });
  };

  if (loading || events.length === 0) return null;

  return (
    <section id="Events" className="relative min-h-[100vh] bg-[#010409] flex items-center overflow-hidden py-20 px-6 lg:px-16">
      <InteractiveGrid />

      {/* 1. Rotating Orbital Arc (Left Side) */}
      <div className="absolute left-[-40vw] lg:left-[-25vw] top-1/2 -translate-y-1/2 w-[90vw] h-[90vw] lg:w-[65vw] lg:h-[65vw] pointer-events-none">
        <div ref={orbitalRef} className="relative w-full h-full border-2 border-[var(--accent-primary)]/20 rounded-full">
           
           {/* Tick Marks */}
           {[...Array(12)].map((_, i) => (
             <div 
               key={i} 
               className="absolute top-1/2 left-1/2 w-4 h-px bg-[var(--accent-primary)]/30 origin-left"
               style={{ transform: `rotate(${i * 30}deg) translateX(calc(45vw - 20px)) lg:translateX(calc(32.5vw - 20px))` } as any}
             />
           ))}

           {events.map((event, i) => {
             const angle = (360 / events.length) * i;
             const isActive = i === currentIndex;

             return (
               <div 
                 key={event._id}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                 style={{
                   transform: `rotate(${angle}deg) translateX(calc(45vw - 2px)) lg:translateX(calc(32.5vw - 2px))`
                 } as any}
               >
                 <div className={`relative flex items-center justify-center transition-all duration-700 ${isActive ? 'scale-[1.8]' : 'scale-75 opacity-20'}`}>
                    <div className="absolute inset-0 bg-[var(--accent-primary)]/20 blur-xl rounded-full" />
                    <div className="relative w-16 h-16 lg:w-24 lg:h-24 rounded-full border-[3px] border-[var(--accent-primary)] overflow-hidden bg-black ring-4 ring-black">
                       <div 
                        style={{ transform: `rotate(${-angle + (currentIndex * (360/events.length))}deg)`}}
                        className="w-full h-full transition-transform duration-1200"
                       >
                         <img 
                          src={urlFor(event.image).width(400).url()} 
                          alt="" 
                          className="w-full h-full object-cover"
                         />
                       </div>
                    </div>
                 </div>
               </div>
             );
           })}
        </div>
      </div>

      {/* 2. Content Display Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/3 min-w-[300px] space-y-10">
           <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.5em]">
              <div className="w-10 h-px bg-[var(--accent-primary)]" />
              <span>Log_Sequence_0{currentIndex + 1}</span>
           </div>
           
           <h2 className="text-7xl lg:text-8xl font-mono font-bold italic text-white uppercase tracking-tighter leading-[0.8]">
              MISSION <br /> <span className="text-[var(--accent-primary)]">LOG.</span>
           </h2>

           <div className="flex items-center gap-6 pt-6">
              <button 
                onClick={() => handleNavigate('prev')}
                className="group relative flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 border border-white/5 hover:border-[var(--accent-primary)]/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-[var(--accent-primary)]/[0.05]" />
                <span className="relative text-[10px] font-mono text-white/40 group-hover:text-white">{"[ < PREV ]"}</span>
              </button>

              <button 
                onClick={() => handleNavigate('next')}
                className="group relative flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 border border-white/5 hover:border-[var(--accent-primary)]/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-[var(--accent-primary)]/[0.05]" />
                <span className="relative text-[10px] font-mono text-white/40 group-hover:text-white">{"[ NEXT > ]"}</span>
              </button>
           </div>
        </div>

        <div ref={displayRef} className="lg:w-2/3 w-full">
           <div 
             onClick={() => setSelectedEvent(events[currentIndex])}
             className="group relative w-full max-w-3xl aspect-[16/10] lg:aspect-video glass-effect p-2 border border-white/5 cursor-pointer hover:border-[var(--accent-primary)]/40 transition-all duration-500 overflow-hidden"
           >
              <div className="absolute inset-0">
                 <img src={urlFor(events[currentIndex].image).width(1200).url()} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-transparent" />
              </div>

              <div className="relative h-full flex flex-col justify-end p-10 lg:p-16">
                 <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] font-mono text-[var(--accent-primary)] tracking-[0.4em] uppercase font-bold">{new Date(events[currentIndex].date).toLocaleDateString()}</span>
                    <h3 className="text-4xl lg:text-6xl font-mono font-bold italic text-white uppercase tracking-tighter leading-none">{events[currentIndex].title}</h3>
                    <div className="pt-6 flex items-center gap-4 text-[9px] font-mono text-white/60 uppercase">
                       <span>VIEW_DOSSIER</span>
                       <div className="w-10 h-px bg-[var(--accent-primary)]" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 3. Modal Overlay */}
      {selectedEvent && (
        <div ref={modalWrapperRef} className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/80 transition-all">
           <div 
             ref={modalContentRef} 
             className="relative w-[95vw] lg:w-[80vw] h-[90vh] lg:h-[80vh] glass-effect border border-white/10 flex flex-col lg:flex-row overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)]"
           >
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 z-[600] text-white/50 hover:text-white font-mono text-xl"
              >
                {"[ X ]"}
              </button>

              <div className="lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
                <img src={urlFor(selectedEvent.image).width(1200).url()} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#010409] hidden lg:block" />
              </div>
              
              <div className="lg:w-1/2 h-1/2 lg:h-full p-10 lg:p-20 flex flex-col items-start overflow-y-auto custom-scrollbar">
                 <div className="w-full space-y-10">
                    <div className="space-y-4 modal-stagger">
                       <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.6em] block">MISSION_RECORD // REF_{selectedEvent._id.slice(0,6)}</span>
                       <h2 className="text-5xl lg:text-7xl font-mono font-bold text-white uppercase italic tracking-tighter leading-none break-words w-full">
                         {selectedEvent.title}
                       </h2>
                    </div>
                    
                    <div className="h-px w-full bg-white/5 modal-stagger" />
                    
                    <div className="space-y-6 modal-stagger">
                       <div className="flex gap-8 text-[10px] font-mono text-white/40 uppercase">
                          <span>Date: {new Date(selectedEvent.date).toLocaleDateString()}</span>
                       </div>
                       <p className="text-sm lg:text-base text-white/60 font-mono leading-relaxed">{selectedEvent.detailedDescription || selectedEvent.description}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </section>
  );
}