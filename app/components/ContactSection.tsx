"use client";

import { useState } from "react";
import { ArrowRight, Layers, Phone } from "lucide-react";
import { PROJECT_TYPES, SITE } from "@/app/data/site-data";

export default function ContactSection() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <section
      id="kontak"
      className="py-20 sm:py-32 lg:py-48 bg-black text-white selection:bg-white selection:text-black"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12">
          {/* Left — Heading */}
          <div className="lg:col-span-5">
            <h2 className="text-5xl sm:text-6xl lg:text-[5.5vw] xl:text-[5vw] font-black leading-[0.9] tracking-tighter uppercase mb-10 sm:mb-12">
              Mulai Bangun <br />
              <span className="text-[#333]">Visi Anda.</span>
            </h2>
            <div className="flex flex-row sm:flex-col gap-6 sm:gap-8 opacity-60 uppercase text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em]">
              <p className="flex items-center gap-3 sm:gap-4">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {SITE.location}
              </p>
              <p className="flex items-center gap-3 sm:gap-4">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {SITE.phone}
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-7 lg:border-l border-white/10 lg:pl-12">
            <form
              className="flex flex-col gap-8 sm:gap-12"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Name */}
              <div className="group relative">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity">
                  Nama Anda
                </label>
                <input
                  type="text"
                  placeholder="E.G. ANDRE SANTOSO"
                  className="w-full bg-transparent border-b border-white/20 py-3 sm:py-4 focus:outline-none focus:border-white transition-colors uppercase font-bold tracking-tighter text-lg sm:text-2xl placeholder:opacity-10"
                />
              </div>

              {/* Project Type */}
              <div className="group relative">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity">
                  Subjek Proyek
                </label>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() =>
                        setSelectedType(selectedType === type ? null : type)
                      }
                      className={`px-5 sm:px-6 py-2.5 sm:py-2 border text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedType === type
                          ? "bg-white text-black border-white"
                          : "border-white/20 hover:bg-white hover:text-black"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="group relative">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity">
                  Pesan
                </label>
                <textarea
                  rows={2}
                  placeholder="CERITAKAN GAGASAN ANDA..."
                  className="w-full bg-transparent border-b border-white/20 py-3 sm:py-4 focus:outline-none focus:border-white transition-colors uppercase font-bold tracking-tighter text-lg sm:text-2xl placeholder:opacity-10 resize-none min-h-[80px]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center justify-between w-full border border-white/20 p-5 sm:p-8 hover:bg-white hover:text-black group transition-all active:scale-[0.98]"
              >
                <span className="text-base sm:text-xl font-black uppercase tracking-tighter">
                  Kirim Pesan
                </span>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-4 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
