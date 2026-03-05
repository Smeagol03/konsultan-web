"use client";

import { useRef, useEffect, Children, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VARIANT_MAP, type AnimateVariant } from "./types";

export interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Animation variant applied to each child */
  variant?: AnimateVariant;
  /** Custom GSAP "from" values (overrides variant) */
  from?: gsap.TweenVars;
  /** Delay between each child */
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  scroll?: boolean;
  start?: string;
  /** HTML container tag */
  as?: "div" | "ul" | "ol" | "section";
}

/**
 * Stagger container — children animate in sequence.
 *
 * @example
 * <Stagger variant="fadeUp" stagger={0.15} scroll>
 *   <Card />
 *   <Card />
 *   <Card />
 * </Stagger>
 *
 * <Stagger from={{ scale: 0.8, opacity: 0 }} stagger={0.1}>
 *   {items.map(item => <li key={item.id}>{item.text}</li>)}
 * </Stagger>
 */
export default function Stagger({
  children,
  className,
  variant = "fadeUp",
  from,
  stagger: staggerVal = 0.15,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  scroll = false,
  start = "top 85%",
  as: Tag = "div",
}: StaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const items = containerRef.current.children;
    const fromVars = from ?? VARIANT_MAP[variant] ?? {};

    const scrollConfig = scroll
      ? { scrollTrigger: { trigger: containerRef.current, start } }
      : {};

    const tween = gsap.from(items, {
      ...fromVars,
      duration,
      delay,
      ease,
      stagger: staggerVal,
      ...scrollConfig,
    });

    return () => {
      tween.kill();
    };
  }, [variant, from, staggerVal, duration, delay, ease, scroll, start]);

  return (
    <Tag ref={containerRef as any} className={className}>
      {children}
    </Tag>
  );
}
