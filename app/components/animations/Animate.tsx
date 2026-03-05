"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  VARIANT_MAP,
  type AnimateVariant,
  type BaseAnimationProps,
} from "./types";

export interface AnimateProps extends BaseAnimationProps {
  variant?: AnimateVariant;
  /** Custom GSAP "from" values (overrides variant) */
  from?: gsap.TweenVars;
}

/**
 * Universal entrance animation wrapper.
 *
 * @example
 * <Animate variant="fadeUp">
 *   <h1>Hello</h1>
 * </Animate>
 *
 * <Animate variant="scaleIn" scroll start="top 90%" delay={0.3}>
 *   <div>Card</div>
 * </Animate>
 *
 * <Animate from={{ x: 200, rotation: 45, opacity: 0 }}>
 *   <p>Custom</p>
 * </Animate>
 */
export default function Animate({
  children,
  className,
  variant = "fadeUp",
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  scroll = false,
  start = "top 85%",
  from,
}: AnimateProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const fromVars = from ?? VARIANT_MAP[variant] ?? {};

    const tween = gsap.from(ref.current, {
      ...fromVars,
      duration,
      delay,
      ease,
      ...(scroll
        ? {
            scrollTrigger: {
              trigger: ref.current,
              start,
            },
          }
        : {}),
    });

    return () => {
      tween.kill();
    };
  }, [variant, duration, delay, ease, scroll, start, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
