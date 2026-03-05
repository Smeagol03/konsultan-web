"use client";

import {
  useRef,
  useLayoutEffect,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import gsap from "gsap";

// ─── Types ──────────────────────────────────────────────────

interface SlotEntry {
  el: HTMLElement;
  order: number;
  from: gsap.TweenVars;
}

interface HeroRevealContextValue {
  registerSlot: (el: HTMLElement, order: number, from: gsap.TweenVars) => void;
}

const HeroRevealContext = createContext<HeroRevealContextValue | null>(null);

// ─── Slot Component ────────────────────────────────────────

interface SlotProps {
  children: ReactNode;
  className?: string;
  order: number;
  /** GSAP 'from' vars — these are now actually passed to the timeline */
  from?: gsap.TweenVars;
}

function Slot({ children, className, order, from = {} }: SlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(HeroRevealContext);

  useLayoutEffect(() => {
    if (ref.current && ctx) {
      // Hide immediately to prevent FOUC before timeline runs
      gsap.set(ref.current, { opacity: 0 });
      ctx.registerSlot(ref.current, order, from);
    }
    // `from` is defined statically per compound component, safe to omit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, order]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─── Compound Components ───────────────────────────────────

function Title({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Slot order={0} from={{ y: 80, opacity: 0 }} className={className}>
      {children}
    </Slot>
  );
}

function Description({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Slot order={1} from={{ y: 40, opacity: 0 }} className={className}>
      {children}
    </Slot>
  );
}

function Action({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Slot order={2} from={{ scale: 0.9, opacity: 0 }} className={className}>
      {children}
    </Slot>
  );
}

function Extra({
  children,
  className,
  order = 3,
  from = { y: 30, opacity: 0 },
}: {
  children: ReactNode;
  className?: string;
  order?: number;
  from?: gsap.TweenVars;
}) {
  return (
    <Slot order={order} from={from} className={className}>
      {children}
    </Slot>
  );
}

// ─── Main Component ────────────────────────────────────────

export interface HeroRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay between each slot (seconds) */
  stagger?: number;
  /** Animation duration per slot (seconds) */
  duration?: number;
  /** GSAP ease string */
  ease?: string;
  /** Initial delay before the timeline starts (seconds) */
  delay?: number;
}

/**
 * Timeline-based hero entrance. Uses compound components for ordered reveals.
 * Each sub-component declares its own `from` animation vars, which are
 * respected by the parent timeline.
 *
 * @example
 * <HeroReveal stagger={0.25}>
 *   <HeroReveal.Title>
 *     <h1>Presisi Tanpa Batas</h1>
 *   </HeroReveal.Title>
 *   <HeroReveal.Description>
 *     <p>We create spaces…</p>
 *   </HeroReveal.Description>
 *   <HeroReveal.Action>
 *     <button>Start Project</button>
 *   </HeroReveal.Action>
 * </HeroReveal>
 */
function HeroReveal({
  children,
  className,
  stagger = 0.2,
  duration = 1,
  ease = "power4.out",
  delay = 0.3,
}: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<SlotEntry[]>([]);
  const hasAnimated = useRef(false);

  const registerSlot = useCallback(
    (el: HTMLElement, order: number, from: gsap.TweenVars) => {
      // Avoid duplicates on strict-mode double-mount
      const exists = slotsRef.current.some((s) => s.el === el);
      if (!exists) {
        slotsRef.current.push({ el, order, from });
      }
    },
    [],
  );

  useLayoutEffect(() => {
    if (hasAnimated.current || !containerRef.current) return;

    // Use requestAnimationFrame to ensure all children have registered
    const rafId = requestAnimationFrame(() => {
      const sorted = [...slotsRef.current].sort((a, b) => a.order - b.order);

      if (sorted.length === 0) return;

      // Wrap everything in gsap.context for proper cleanup
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay });

        sorted.forEach((slot, i) => {
          tl.from(
            slot.el,
            {
              ...slot.from, // Use the actual `from` vars declared per slot
              duration,
              ease,
            },
            i * stagger,
          );
        });
      }, containerRef);

      // Store ctx for cleanup
      (
        containerRef as React.MutableRefObject<HTMLDivElement | null> & {
          __gsapCtx?: gsap.Context;
        }
      ).__gsapCtx = ctx;
      hasAnimated.current = true;
    });

    return () => {
      cancelAnimationFrame(rafId);
      const stored = (
        containerRef as React.MutableRefObject<HTMLDivElement | null> & {
          __gsapCtx?: gsap.Context;
        }
      ).__gsapCtx;
      if (stored) {
        stored.revert();
      }
    };
  }, [stagger, duration, ease, delay]);

  return (
    <HeroRevealContext.Provider value={{ registerSlot }}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </HeroRevealContext.Provider>
  );
}

// ─── Compound Component Typing ─────────────────────────────

HeroReveal.Title = Title;
HeroReveal.Description = Description;
HeroReveal.Action = Action;
HeroReveal.Extra = Extra;

export default HeroReveal;
