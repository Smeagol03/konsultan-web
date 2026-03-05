"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Attraction strength: 0.1 = subtle, 1.0 = strong */
  strength?: number;
}

/**
 * Magnetic hover effect — element follows cursor within its bounds.
 *
 * @example
 * <MagneticButton strength={0.4}>
 *   <button className="px-8 py-4 bg-black text-white">
 *     Konsultasi
 *   </button>
 * </MagneticButton>
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </div>
  );
}
