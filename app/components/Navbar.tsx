"use client";

import { useState, useEffect } from "react";
import { Square, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/app/data/site-data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-black/5 ${
        scrolled
          ? "py-3 sm:py-4 bg-white/80 backdrop-blur-xl"
          : "py-4 sm:py-8 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#beranda"
          className="flex items-center gap-2 group cursor-pointer z-50"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black flex items-center justify-center group-hover:bg-black transition-colors duration-300">
            <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black group-hover:text-white group-hover:scale-75 transition-all" />
          </div>
          <span className="font-black text-lg sm:text-xl tracking-tighter uppercase leading-none">
            Studio<span className="font-light opacity-50">Bina</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 font-medium text-xs uppercase tracking-widest">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:opacity-40 transition-opacity"
            >
              {link}
            </a>
          ))}
          <a
            href="#kontak"
            className="px-5 lg:px-6 py-3 border border-black/10 hover:border-black transition-colors"
          >
            Konsultasi
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black uppercase tracking-tighter hover:opacity-40 transition-all"
            style={{ transitionDelay: isMenuOpen ? `${i * 75}ms` : "0ms" }}
          >
            {link}
          </a>
        ))}
        <a
          href="#kontak"
          onClick={() => setIsMenuOpen(false)}
          className="mt-4 px-10 py-4 border-2 border-black text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
        >
          Konsultasi
        </a>
      </div>
    </nav>
  );
}
