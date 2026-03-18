"use client";

import { useState, useEffect } from "react";
import { Square, X, Instagram, Linkedin, Globe } from "lucide-react";
import { NAV_LINKS, SITE, SOCIALS } from "@/app/data/site-data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-[70] py-4 sm:py-6 bg-black/60 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex justify-between items-center">
          <a
            href="#beranda"
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-white flex items-center justify-center transition-all group-hover:bg-white">
              <Square className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-all group-hover:text-black" fill="currentColor" />
            </div>
            <span className="font-black text-xl sm:text-2xl tracking-tighter uppercase leading-none">
              Studio<span className="font-light opacity-60">Bina</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10 lg:gap-14 font-bold text-[10px] uppercase tracking-[0.2em]">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative py-2 group overflow-hidden"
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {link}
                </span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white/50">
                  {link}
                </span>
              </a>
            ))}
            <a
              href="#kontak"
              className="px-7 py-3.5 border-2 border-white bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300 font-black tracking-widest"
            >
              Mulai Proyek
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center text-white active:scale-90"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <div className="flex flex-col gap-1.5 items-end group">
                <span className="h-0.5 w-8 bg-current transition-all duration-300" />
                <span className="h-0.5 w-5 bg-current group-hover:w-8 transition-all duration-300" />
              </div>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden will-change-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-32">
          <div className="flex flex-col gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter hover:text-neutral-500 transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 inline-block px-8 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] text-center"
            >
              Mulai Proyek Sekarang
            </a>
          </div>

          <div className="mt-auto border-t border-neutral-100 pt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Hubungi Kami</span>
              <a href={`mailto:${SITE.email}`} className="text-base font-bold tracking-tight">{SITE.email}</a>
              <a href={`tel:${SITE.phone}`} className="text-sm font-medium opacity-50">{SITE.phone}</a>
            </div>
            <div className="flex gap-6">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} className="text-neutral-400 hover:text-black transition-colors">
                  {social.label === "Instagram" && <Instagram size={22} />}
                  {social.label === "LinkedIn" && <Linkedin size={22} />}
                  {social.label === "Behance" && <Globe size={22} />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}