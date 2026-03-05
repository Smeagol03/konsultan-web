"use client";

import { useEffect, useRef } from "react";
import { SERVICES, SITE } from "@/app/data/site-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MethodologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered reveal for grid items
      const items = gsap.utils.toArray(".grid-item");

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        },
      );

      // Subtle line reveal
      gsap.fromTo(
        ".grid-divider",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="metodologi"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-48 border-b border-black/5 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6">
        {/* Header Branding */}
        <div className="flex items-center gap-6 mb-16 sm:mb-24">
          <div className="w-12 h-px bg-black grid-divider" />
          <h2 className="text-sm font-black uppercase tracking-[0.4em]">
            Metodologi
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/8"
        >
          {/* Introductory Card — Balanced specifically for a 4-column layout */}
          <div className="grid-item p-8 sm:p-10 lg:p-12 border-r border-b border-black/8 flex flex-col justify-between bg-white">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
                Filosofi <br /> &amp; Proses
              </h3>
              <p className="text-black/50 leading-relaxed text-sm sm:text-base">
                Setiap garis memiliki tujuan mutlak. Kami mengeliminasi
                distraksi untuk menonjolkan esensi materialitas dan kejujuran
                struktur.
              </p>
            </div>
            <div className="mt-16 sm:mt-24">
              <span className="text-[10px] font-mono opacity-30 leading-loose">
                {SITE.est} <br /> STUDIOBINA ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Service Cards — Perfectly proportional 1-col items */}
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="grid-item p-8 sm:p-10 lg:p-12 border-r border-b border-black/8 group hover:bg-neutral-50 transition-all duration-500 flex flex-col"
            >
              <div className="flex justify-between items-start mb-16 sm:mb-24 lg:mb-32">
                <span className="font-mono text-sm opacity-20 group-hover:opacity-100 transition-opacity">
                  {service.num}
                </span>
                <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                  <div className="w-1 h-1 bg-black group-hover:bg-white rounded-full" />
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {service.label}
                </h4>
                <p className="text-sm text-black/40 group-hover:text-black/70 leading-relaxed transition-colors">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
