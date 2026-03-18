"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BuildingAnimationProps {
  containerRef: React.RefObject<HTMLElement | null>;
  onProgress?: (progress: number) => void;
}

// Building configuration constants
const BUILDING_WIDTH = 160;
const BUILDING_LEFT = 200 - BUILDING_WIDTH / 2; // 120
const BUILDING_RIGHT = BUILDING_LEFT + BUILDING_WIDTH; // 280
const FLOOR_HEIGHT = 30;
const FLOOR_GAP = 2;
const FLOOR_STEP = FLOOR_HEIGHT + FLOOR_GAP;
const TOTAL_FLOORS = 10;
const GROUND_Y = 462;
const WINDOWS_PER_FLOOR = 4;

export default function BuildingAnimation({
  containerRef,
  onProgress,
}: BuildingAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "center center",
          scrub: 0.5,
          onUpdate: (self) => {
            if (onProgress) {
              onProgress(Math.round(self.progress * 100));
            }
          },
        },
      });

      // 1. Initial State — hide everything
      gsap.set(
        ".anim-ground, .anim-crane, .anim-scaffold, .floor-unit, .anim-rooftop",
        { opacity: 0 },
      );
      // Ensure the ground scales exactly from its center right from the start
      gsap.set(".anim-ground", { transformOrigin: "center center" });

      // 2. Foundation emerges
      tl.fromTo(
        ".anim-ground",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4 },
      );

      // 3. Crane appears
      tl.fromTo(
        ".anim-crane",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        0.3,
      );

      // 4. Floors build up — bottom to top
      for (let i = 0; i < TOTAL_FLOORS; i++) {
        const startTime = 0.5 + i * 0.12;
        tl.fromTo(
          `.floor-unit-${i}`,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" },
          startTime,
        );
      }

      // 5. Scaffolding fades in alongside floors
      tl.fromTo(
        ".anim-scaffold",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.6,
      );

      // 6. Rooftop structure appears last
      tl.fromTo(
        ".anim-rooftop",
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        ">-0.1",
      );
    }, svgRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [containerRef, onProgress]);

  // Calculate floor top Y for a given floor index (0 = ground floor)
  const floorY = (i: number) => GROUND_Y - FLOOR_STEP * (i + 1);
  const topFloorY = floorY(TOTAL_FLOORS - 1);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 520"
      className="w-full h-auto max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
      preserveAspectRatio="xMidYMin meet"
    >
      {/* ===== Blueprint Grid Lines ===== */}
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
        <line x1="200" y1="0" x2="200" y2="520" />
        <line x1={BUILDING_LEFT} y1="0" x2={BUILDING_LEFT} y2="520" />
        <line x1={BUILDING_RIGHT} y1="0" x2={BUILDING_RIGHT} y2="520" />
        <line x1="0" y1={GROUND_Y} x2="400" y2={GROUND_Y} />
      </g>

      {/* ===== Tower Crane ===== */}
      <g className="anim-crane">
        {/* Vertical mast */}
        <line
          x1={BUILDING_RIGHT + 15}
          y1={topFloorY - 60}
          x2={BUILDING_RIGHT + 15}
          y2={GROUND_Y}
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0.3"
        />
        {/* Horizontal jib */}
        <line
          x1={BUILDING_LEFT - 20}
          y1={topFloorY - 60}
          x2={BUILDING_RIGHT + 50}
          y2={topFloorY - 60}
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.3"
        />
        {/* Counter-jib cable */}
        <line
          x1={BUILDING_RIGHT + 15}
          y1={topFloorY - 75}
          x2={BUILDING_RIGHT + 50}
          y2={topFloorY - 60}
          stroke="#ffffff"
          strokeWidth="0.5"
          opacity="0.2"
        />
        <line
          x1={BUILDING_RIGHT + 15}
          y1={topFloorY - 75}
          x2={BUILDING_LEFT - 20}
          y2={topFloorY - 60}
          stroke="#ffffff"
          strokeWidth="0.5"
          opacity="0.2"
        />
        {/* Mast top */}
        <line
          x1={BUILDING_RIGHT + 15}
          y1={topFloorY - 75}
          x2={BUILDING_RIGHT + 15}
          y2={topFloorY - 60}
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0.3"
        />
        {/* Hook cable */}
        <line
          x1={BUILDING_LEFT + 20}
          y1={topFloorY - 60}
          x2={BUILDING_LEFT + 20}
          y2={topFloorY - 30}
          stroke="#ffffff"
          strokeWidth="0.5"
          opacity="0.25"
          strokeDasharray="3 2"
        />
        {/* Hook */}
        <path
          d={`M${BUILDING_LEFT + 17},${topFloorY - 30} l3,-3 l3,3 l-1.5,4 l-3,0 Z`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.7"
          opacity="0.3"
        />
      </g>

      {/* ===== Foundation / Ground Base ===== */}
      <g className="anim-ground">
        {/* Main ground slab */}
        <rect
          fill="#ffffff"
          x={BUILDING_LEFT - 10}
          y={GROUND_Y}
          width={BUILDING_WIDTH + 20}
          height="5"
          opacity="0.9"
        />
        {/* Sub-foundation line */}
        <rect
          fill="#ffffff"
          x={BUILDING_LEFT - 20}
          y={GROUND_Y + 5}
          width={BUILDING_WIDTH + 40}
          height="2"
          opacity="0.3"
        />
        {/* Foundation piles */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <line
            key={`pile-${pct}`}
            x1={BUILDING_LEFT + BUILDING_WIDTH * pct}
            y1={GROUND_Y + 7}
            x2={BUILDING_LEFT + BUILDING_WIDTH * pct}
            y2={GROUND_Y + 16}
            stroke="#ffffff"
            strokeWidth="1"
            opacity="0.2"
          />
        ))}
      </g>

      {/* ===== Building Floors ===== */}
      {Array.from({ length: TOTAL_FLOORS }).map((_, i) => {
        const y = floorY(i);
        const windowWidth = BUILDING_WIDTH / WINDOWS_PER_FLOOR;

        return (
          <g key={`floor-${i}`} className={`floor-unit floor-unit-${i}`}>
            {/* Concrete slab (top beam of each floor) */}
            <rect
              x={BUILDING_LEFT}
              y={y}
              width={BUILDING_WIDTH}
              height="3"
              fill="#ffffff"
              opacity="0.35"
            />

            {/* Floor body — glass fill */}
            <rect
              x={BUILDING_LEFT}
              y={y + 3}
              width={BUILDING_WIDTH}
              height={FLOOR_HEIGHT - 3}
              fill="#ffffff"
              opacity="0.04"
            />

            {/* Outer frame */}
            <rect
              x={BUILDING_LEFT}
              y={y}
              width={BUILDING_WIDTH}
              height={FLOOR_HEIGHT}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Structural columns (left edge, right edge, center) */}
            {[0, BUILDING_WIDTH / 2, BUILDING_WIDTH].map((cx) => (
              <line
                key={`col-${i}-${cx}`}
                x1={BUILDING_LEFT + cx}
                y1={y}
                x2={BUILDING_LEFT + cx}
                y2={y + FLOOR_HEIGHT}
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.5"
              />
            ))}

            {/* Window grid — vertical mullions */}
            {Array.from({ length: WINDOWS_PER_FLOOR - 1 }).map((_, w) => (
              <line
                key={`win-v-${i}-${w}`}
                x1={BUILDING_LEFT + windowWidth * (w + 1)}
                y1={y + 5}
                x2={BUILDING_LEFT + windowWidth * (w + 1)}
                y2={y + FLOOR_HEIGHT - 2}
                stroke="#ffffff"
                strokeWidth="0.4"
                opacity="0.25"
              />
            ))}

            {/* Window grid — horizontal transom */}
            <line
              x1={BUILDING_LEFT + 2}
              y1={y + FLOOR_HEIGHT * 0.55}
              x2={BUILDING_RIGHT - 2}
              y2={y + FLOOR_HEIGHT * 0.55}
              stroke="#ffffff"
              strokeWidth="0.3"
              opacity="0.15"
            />

            {/* Floor number label (small) */}
            <text
              x={BUILDING_LEFT - 14}
              y={y + FLOOR_HEIGHT / 2 + 3}
              fill="#ffffff"
              fontSize="7"
              opacity="0.15"
              fontFamily="monospace"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* ===== Scaffolding (right side) ===== */}
      <g className="anim-scaffold">
        {Array.from({ length: TOTAL_FLOORS }).map((_, i) => {
          const y = floorY(i);
          const sx = BUILDING_RIGHT + 3;
          return (
            <g key={`scaffold-${i}`}>
              {/* Vertical poles */}
              <line
                x1={sx}
                y1={y}
                x2={sx}
                y2={y + FLOOR_HEIGHT}
                stroke="#ffffff"
                strokeWidth="0.6"
                opacity="0.15"
              />
              <line
                x1={sx + 12}
                y1={y}
                x2={sx + 12}
                y2={y + FLOOR_HEIGHT}
                stroke="#ffffff"
                strokeWidth="0.6"
                opacity="0.15"
              />
              {/* Horizontal platform */}
              <line
                x1={sx}
                y1={y + FLOOR_HEIGHT}
                x2={sx + 12}
                y2={y + FLOOR_HEIGHT}
                stroke="#ffffff"
                strokeWidth="0.5"
                opacity="0.12"
              />
              {/* X-brace */}
              <line
                x1={sx}
                y1={y}
                x2={sx + 12}
                y2={y + FLOOR_HEIGHT}
                stroke="#ffffff"
                strokeWidth="0.3"
                opacity="0.1"
              />
              <line
                x1={sx + 12}
                y1={y}
                x2={sx}
                y2={y + FLOOR_HEIGHT}
                stroke="#ffffff"
                strokeWidth="0.3"
                opacity="0.1"
              />
            </g>
          );
        })}
      </g>

      {/* ===== Rooftop Structure ===== */}
      <g className="anim-rooftop">
        {/* Rooftop slab */}
        <rect
          x={BUILDING_LEFT + 30}
          y={topFloorY - 18}
          width={BUILDING_WIDTH - 60}
          height="16"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <rect
          x={BUILDING_LEFT + 30}
          y={topFloorY - 18}
          width={BUILDING_WIDTH - 60}
          height="16"
          fill="#ffffff"
          opacity="0.03"
        />
        {/* Antenna mast */}
        <line
          x1="200"
          y1={topFloorY - 45}
          x2="200"
          y2={topFloorY - 18}
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Antenna dishes */}
        <line
          x1="196"
          y1={topFloorY - 38}
          x2="204"
          y2={topFloorY - 38}
          stroke="#ffffff"
          strokeWidth="0.6"
          opacity="0.3"
        />
        <line
          x1="197"
          y1={topFloorY - 30}
          x2="203"
          y2={topFloorY - 30}
          stroke="#ffffff"
          strokeWidth="0.6"
          opacity="0.3"
        />
        {/* Top beacon */}
        <circle
          cx="200"
          cy={topFloorY - 45}
          r="2"
          fill="#ffffff"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
