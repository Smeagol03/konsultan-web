"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type TextVariant = "words" | "chars" | "slideUp" | "slideLeft";

export interface AnimateTextProps {
  children: string;
  variant?: TextVariant;
  className?: string;
  /** Per-element stagger delay */
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  scroll?: boolean;
  start?: string;
  /** HTML tag to render */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Text animation component — splits text into words or characters
 * and animates each with stagger.
 *
 * @example
 * <AnimateText variant="words" as="h1">
 *   Presisi Tanpa Batas
 * </AnimateText>
 *
 * <AnimateText variant="chars" stagger={0.03} as="span">
 *   STUDIOBINA
 * </AnimateText>
 *
 * <AnimateText variant="slideUp" as="h2">
 *   Headline
 * </AnimateText>
 */
export default function AnimateText({
  children,
  variant = "words",
  className,
  stagger = 0.08,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  scroll = false,
  start = "top 85%",
  as: Tag = "div",
}: AnimateTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const elements = containerRef.current.querySelectorAll(".anim-unit");

    const scrollConfig = scroll
      ? { scrollTrigger: { trigger: containerRef.current, start } }
      : {};

    if (variant === "words" || variant === "chars") {
      gsap.from(elements, {
        opacity: 0,
        y: 20,
        duration,
        delay,
        ease,
        stagger,
        ...scrollConfig,
      });
    } else if (variant === "slideUp") {
      gsap.from(elements, {
        yPercent: 100,
        duration,
        delay,
        ease,
        stagger,
        ...scrollConfig,
      });
    } else if (variant === "slideLeft") {
      gsap.from(elements, {
        xPercent: -100,
        opacity: 0,
        duration,
        delay,
        ease,
        stagger,
        ...scrollConfig,
      });
    }

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [variant, stagger, duration, delay, ease, scroll, start]);

  // Split the text
  const units =
    variant === "chars"
      ? children.split("").map((char, i) => (
          <span
            key={i}
            className="anim-unit inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char}
          </span>
        ))
      : children.split(" ").map((word, i) => (
          <span key={i} className="anim-unit inline-block mr-[0.3em]">
            {word}
          </span>
        ));

  // For slideUp, wrap in overflow-hidden containers
  const content =
    variant === "slideUp"
      ? children.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <span className="anim-unit inline-block">{word}</span>
          </span>
        ))
      : units;

  return (
    <Tag ref={containerRef as any} className={className}>
      {content}
    </Tag>
  );
}
