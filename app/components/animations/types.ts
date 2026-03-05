import type { ReactNode } from "react";

// ─── Entrance Variants ─────────────────────────────────────

export type AnimateVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fadeIn"
  | "scaleIn"
  | "scaleUp"
  | "rotateIn"
  | "flipIn";

// ─── Shared Props ──────────────────────────────────────────

export interface BaseAnimationProps {
  children: ReactNode;
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** GSAP easing function */
  ease?: string;
  /** Enable ScrollTrigger */
  scroll?: boolean;
  /** ScrollTrigger start position e.g. "top 80%" */
  start?: string;
}

// ─── Variant Map ───────────────────────────────────────────

export const VARIANT_MAP: Record<AnimateVariant, gsap.TweenVars> = {
  fadeUp:    { y: 60, opacity: 0 },
  fadeDown:  { y: -60, opacity: 0 },
  fadeLeft:  { x: -80, opacity: 0 },
  fadeRight: { x: 80, opacity: 0 },
  fadeIn:    { opacity: 0 },
  scaleIn:   { scale: 0.8, opacity: 0 },
  scaleUp:   { scale: 0, opacity: 0 },
  rotateIn:  { rotation: -15, opacity: 0 },
  flipIn:    { rotationY: 90, opacity: 0 },
};
