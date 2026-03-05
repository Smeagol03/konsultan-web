"use client";

import { useRef } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-svh flex flex-col pt-24 sm:pt-32 lg:pt-48 border-b border-black/5 bg-black selection:bg-white selection:text-black"
      style={{ clipPath: "inset(0)" }}
    >
      {/* Background Image — True Fixed Parallax (clipped by section's clip-path) */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/swiss_architecture_hero_1772712304283.png"
          alt="Swiss Architecture Background"
          fill
          priority
          className="object-cover opacity-60 grayscale brightness-[0.7]"
        />
        {/* Gradients to blend and improve readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/60 pointer-events-none" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 w-full grow flex flex-col justify-end relative z-10 text-white">
        <div className="pb-12 sm:pb-20 lg:pb-32">
          {/* Subtitle */}
          <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 text-white/70">
            <Minus className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1px] text-white" />
            Konsultan Arsitektur &amp; Perancang
          </h4>

          {/* Headline */}
          <h1 className="text-[15vw] sm:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase mb-8 sm:mb-12">
            Presisi <br />
            <span className="text-white/20 inline-block -mt-[2vw]">
              Tanpa Batas.
            </span>
          </h1>

          {/* Description + CTA — stacked on mobile, side on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-base sm:text-xl md:text-2xl font-medium leading-snug tracking-tight text-white/70 max-w-xl">
              Kami merancang ruang yang tidak hanya fungsional, tapi bersifat
              abadi melalui pendekatan minimalisme Swiss dan teknologi material
              mutakhir.
            </p>
            <a
              href="#kontak"
              className="group inline-flex items-center gap-4 bg-white text-black px-7 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:pr-12 transition-all self-start lg:self-auto shrink-0"
            >
              Mulai Proyek
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Watermark — subtle against dark bg */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] text-[40vw] font-black pointer-events-none -mr-[10vw] select-none hidden sm:block text-white">
        SB
      </div>
    </section>
  );
}
