import { ArrowUpRight, Minus } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-svh flex flex-col pt-24 sm:pt-32 lg:pt-48 border-b border-black/5"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 w-full grow flex flex-col justify-end">
        <div className="pb-12 sm:pb-20 lg:pb-32">
          {/* Subtitle */}
          <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <Minus className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1px]" />
            Konsultan Arsitektur &amp; Perancang
          </h4>

          {/* Headline */}
          <h1 className="text-[15vw] sm:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase mb-8 sm:mb-12">
            Presisi <br />
            <span className="text-[#E2E2E2] inline-block -mt-[2vw]">
              Tanpa Batas.
            </span>
          </h1>

          {/* Description + CTA — stacked on mobile, side on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-base sm:text-xl md:text-2xl font-medium leading-snug tracking-tight text-black/70 max-w-xl">
              Kami merancang ruang yang tidak hanya fungsional, tapi bersifat
              abadi melalui pendekatan minimalisme Swiss dan teknologi material
              mutakhir.
            </p>
            <a
              href="#kontak"
              className="group inline-flex items-center gap-4 bg-black text-white px-7 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:pr-12 transition-all self-start lg:self-auto shrink-0"
            >
              Mulai Proyek
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02] text-[40vw] font-black pointer-events-none -mr-[10vw] select-none hidden sm:block">
        SB
      </div>
    </section>
  );
}
