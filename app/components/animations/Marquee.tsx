"use client";

import {
  useRef,
  useEffect,
  Children,
  cloneElement,
  type ReactNode,
  type ReactElement,
} from "react";
import gsap from "gsap";

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Speed in pixels per second */
  speed?: number;
  /** Scroll direction */
  direction?: "left" | "right";
  /** Pause animation on hover */
  pauseOnHover?: boolean;
}

/**
 * Infinite scrolling marquee that duplicates content for seamless loop.
 *
 * @example
 * <Marquee speed={40} pauseOnHover>
 *   <span>STUDIOBINA</span>
 *   <span>•</span>
 *   <span>ARSITEKTUR PREMIUM</span>
 *   <span>•</span>
 * </Marquee>
 */
export default function Marquee({
  children,
  className,
  speed = 50,
  direction = "left",
  pauseOnHover = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const track = containerRef.current.querySelector(
      ".marquee-track",
    ) as HTMLElement;
    if (!track) return;

    const contentWidth = track.scrollWidth / 2; // We duplicate, so half is the real content
    const dur = contentWidth / speed;

    tweenRef.current = gsap.to(track, {
      x: direction === "left" ? -contentWidth : contentWidth,
      duration: dur,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className ?? ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="marquee-track flex items-center gap-8 whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {/* Original */}
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
    </div>
  );
}
