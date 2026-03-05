"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Speed multiplier: 0.1 = subtle, 1.0 = normal, 2.0 = intense */
  speed?: number;
  /** Direction of movement */
  direction?: "up" | "down";
}

/**
 * Parallax wrapper — scrub-linked vertical movement.
 *
 * @example
 * <Parallax speed={0.5}>
 *   <img src="background.jpg" />
 * </Parallax>
 *
 * <Parallax speed={1.5} direction="down">
 *   <div className="decorative-element" />
 * </Parallax>
 */
export default function Parallax({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const distance = speed * 200;
    const yValue = direction === "up" ? -distance : distance;

    const tween = gsap.to(ref.current, {
      y: yValue,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
