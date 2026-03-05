"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ScrollRevealVariant = "reveal" | "zoom" | "rotate";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  /** Enable scrub (links animation to scroll position) */
  scrub?: boolean | number;
}

/**
 * Scroll-triggered animation wrapper.
 *
 * @example
 * <ScrollReveal variant="reveal">
 *   <section>Content fades up on scroll</section>
 * </ScrollReveal>
 *
 * <ScrollReveal variant="zoom">
 *   <img src="photo.jpg" />
 * </ScrollReveal>
 *
 * <ScrollReveal variant="rotate" scrub>
 *   <div className="icon">⬡</div>
 * </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  className,
  variant = "reveal",
  duration = 1,
  delay = 0,
  ease = "power3.out",
  start = "top 80%",
  scrub = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    let tween: gsap.core.Tween;

    const triggerConfig: ScrollTrigger.Vars = {
      trigger: ref.current,
      start,
      ...(scrub ? { scrub: scrub === true ? 1 : scrub } : {}),
    };

    switch (variant) {
      case "reveal":
        tween = gsap.from(ref.current, {
          y: 80,
          opacity: 0,
          duration,
          delay,
          ease,
          scrollTrigger: triggerConfig,
        });
        break;

      case "zoom":
        tween = gsap.from(ref.current, {
          scale: 1.3,
          opacity: 0,
          duration,
          delay,
          ease,
          scrollTrigger: triggerConfig,
        });
        break;

      case "rotate":
        tween = gsap.to(ref.current, {
          rotation: 360,
          duration,
          ease: scrub ? "none" : ease,
          scrollTrigger: { ...triggerConfig, scrub: scrub || 1 },
        });
        break;
    }

    return () => {
      tween?.kill();
    };
  }, [variant, duration, delay, ease, start, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
