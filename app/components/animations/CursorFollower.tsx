"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export interface CursorFollowerProps {
  /** Cursor size in px */
  size?: number;
  /** Cursor color */
  color?: string;
  /** CSS mix-blend-mode */
  mixBlendMode?: string;
  /** Render as ring (border) instead of solid dot */
  borderOnly?: boolean;
}

/**
 * Custom cursor that follows the mouse with smooth GSAP lerping.
 * Place once in your layout. Hidden on touch devices automatically.
 *
 * @example
 * // Solid dot cursor
 * <CursorFollower size={20} color="black" />
 *
 * // Ring cursor with blend mode
 * <CursorFollower size={40} borderOnly mixBlendMode="difference" color="white" />
 */
export default function CursorFollower({
  size = 24,
  color = "#000",
  mixBlendMode = "normal",
  borderOnly = false,
}: CursorFollowerProps) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current) return;

    // Hide on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      dotRef.current.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(dotRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(dotRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleEnter = () => {
      gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(dotRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-9999"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0,
        ...(borderOnly
          ? { border: `2px solid ${color}`, background: "transparent" }
          : { background: color }),
        mixBlendMode: mixBlendMode as any,
      }}
    />
  );
}
