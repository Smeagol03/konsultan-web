"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the reveal mask opens from */
  direction?: "left" | "right" | "top" | "bottom";
  duration?: number;
  delay?: number;
  ease?: string;
  scroll?: boolean;
  start?: string;
}

const CLIP_PATHS: Record<string, { from: string; to: string }> = {
  left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
  right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
  top: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
  bottom: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
};

/**
 * Image reveal with animated clip-path mask.
 *
 * @example
 * <ImageReveal direction="left" scroll>
 *   <img src="/project.jpg" alt="Project" />
 * </ImageReveal>
 *
 * <ImageReveal direction="bottom" duration={1.2}>
 *   <div className="bg-cover w-full h-96" style={{ backgroundImage: "url(...)" }} />
 * </ImageReveal>
 */
export default function ImageReveal({
  children,
  className,
  direction = "left",
  duration = 1.2,
  delay = 0,
  ease = "power4.inOut",
  scroll = false,
  start = "top 80%",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const paths = CLIP_PATHS[direction];

    const scrollConfig = scroll
      ? { scrollTrigger: { trigger: ref.current, start } }
      : {};

    // Set initial state
    gsap.set(ref.current, { clipPath: paths.from });

    const tween = gsap.to(ref.current, {
      clipPath: paths.to,
      duration,
      delay,
      ease,
      ...scrollConfig,
    });

    return () => {
      tween.kill();
    };
  }, [direction, duration, delay, ease, scroll, start]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      {children}
    </div>
  );
}
