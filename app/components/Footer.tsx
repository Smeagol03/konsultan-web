import { Square } from "lucide-react";
import { SITE, SOCIALS } from "@/app/data/site-data";

export default function Footer() {
  return (
    <footer className="py-10 sm:py-16 lg:py-20 border-t border-black/5 bg-[#F9F9F9]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left */}
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
            <span className="font-black text-[10px] sm:text-xs tracking-widest uppercase">
              {SITE.name} &copy; {SITE.year}
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] opacity-40 uppercase font-medium tracking-[0.15em] sm:tracking-[0.2em]">
            All Rights Reserved. Registered Architectural Consultant in
            Indonesia.
          </p>
        </div>

        {/* Socials */}
        <div className="flex gap-6 sm:gap-8 lg:gap-12 text-[10px] font-black uppercase tracking-widest opacity-40">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="hover:opacity-100 transition-opacity text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
