"use client";

import { useRef, useState } from "react";
import BuildingAnimation from "./animations/BuildingAnimation";

const AnimateIcon = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#111111] text-white py-24 sm:py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="bgg"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgg)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-5">
          <h4 className="flex items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-8">
            <div className="w-8 sm:w-12 h-px bg-white" />
            Konstruksi Virtual
          </h4>
          <h2 className="text-4xl sm:text-5xl lg:text-[4vw] font-black uppercase tracking-tighter leading-[0.9] mb-12 sm:mb-16">
            Dari <br />
            <span className="text-white/20">Konsep Menjadi</span> <br />
            Realita.
          </h2>

          <div className="flex items-end gap-6 border-l-2 border-white/20 pl-8">
            {/* Dynamic Counter using State */}
            <span className="text-7xl sm:text-8xl lg:text-9xl font-mono font-black tracking-tighter leading-none min-w-[3ch] transition-all duration-75">
              {progress}%
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold opacity-40 mb-4">
              Tahap <br /> Penyelesaian
            </span>
          </div>
        </div>

        {/* Right Content - Encapsulated Building Animation Component */}
        <div className="lg:col-span-7 flex items-end justify-center lg:justify-end lg:scale-110 origin-bottom lg:origin-bottom-right mt-12 lg:mt-0">
          <BuildingAnimation
            containerRef={containerRef}
            onProgress={setProgress}
          />
        </div>
      </div>
    </section>
  );
};

export default AnimateIcon;
