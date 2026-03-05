// ─── GSAP Animation Components ─────────────────────────────
// Reusable animation library for Next.js + GSAP projects.
// Copy this entire folder to any project with gsap installed.
//
// Usage:
// import { Animate, Stagger, Marquee } from "@/app/components/animations";

export { default as Animate } from "./Animate";
export { default as AnimateText } from "./AnimateText";
export { default as Stagger } from "./Stagger";
export { default as ScrollReveal } from "./ScrollReveal";
export { default as Parallax } from "./Parallax";
export { default as Marquee } from "./Marquee";
export { default as MagneticButton } from "./MagneticButton";
export { default as ImageReveal } from "./ImageReveal";
export { default as HeroReveal } from "./HeroReveal";
export { default as CursorFollower } from "./CursorFollower";

// Re-export types
export type { AnimateVariant, BaseAnimationProps } from "./types";
export type { AnimateProps } from "./Animate";
export type { TextVariant, AnimateTextProps } from "./AnimateText";
export type { StaggerProps } from "./Stagger";
export type { ScrollRevealVariant, ScrollRevealProps } from "./ScrollReveal";
export type { ParallaxProps } from "./Parallax";
export type { MarqueeProps } from "./Marquee";
export type { MagneticButtonProps } from "./MagneticButton";
export type { ImageRevealProps } from "./ImageReveal";
export type { HeroRevealProps } from "./HeroReveal";
export type { CursorFollowerProps } from "./CursorFollower";
