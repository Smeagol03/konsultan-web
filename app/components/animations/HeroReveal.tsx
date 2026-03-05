"use client";

import {
  useRef,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import gsap from "gsap";

// ─── Context ───────────────────────────────────────────────

interface HeroRevealContextValue {
  registerSlot: (el: HTMLElement, order: number) => void;
}

const HeroRevealContext = createContext<HeroRevealContextValue | null>(null);

// ─── Slot Component ────────────────────────────────────────

function Slot({
  children,
  className,
  order,
  from,
}: {
  children: ReactNode;
  className?: string;
  order: number;
  from?: gsap.TweenVars;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(HeroRevealContext);

  useEffect(() => {
    if (ref.current && ctx) {
      ctx.registerSlot(ref.current, order);
    }
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
}: {
  children: ReactNode;
  className?: string;
  order?: number;
}) {
  return (
    <Slot order={order} className={className}>
      {children}
    </Slot>
  );
}

// ─── Main Component ────────────────────────────────────────

export interface HeroRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay between each slot */
  stagger?: number;
  duration?: number;
  ease?: string;
  /** Initial delay before the timeline starts */
  delay?: number;
}

/**
 * Timeline-based hero entrance. Uses compound components for ordered reveals.
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
  const slotsRef = useRef<Map<number, HTMLElement>>(new Map());
  const hasAnimated = useRef(false);

  const registerSlot = (el: HTMLElement, order: number) => {
    slotsRef.current.set(order, el);
  };

  useEffect(() => {
    if (hasAnimated.current) return;

    // Small timeout to ensure all slots are registered
    const timeout = setTimeout(() => {
      const sortedSlots = [...slotsRef.current.entries()]
        .sort(([a], [b]) => a - b)
        .map(([, el]) => el);

      if (sortedSlots.length === 0) return;

      const tl = gsap.timeline({ delay });

      sortedSlots.forEach((el, i) => {
        tl.from(
          el,
          {
            y: i === 0 ? 80 : 40,
            opacity: 0,
            duration,
            ease,
          },
          i * stagger,
        );
      });

      hasAnimated.current = true;
    }, 50);

    return () => clearTimeout(timeout);
  }, [stagger, duration, ease, delay]);

  return (
    <HeroRevealContext.Provider value={{ registerSlot }}>
      <div className={className}>{children}</div>
    </HeroRevealContext.Provider>
  );
}

// Attach compound components
HeroReveal.Title = Title;
HeroReveal.Description = Description;
HeroReveal.Action = Action;
HeroReveal.Extra = Extra;

export default HeroReveal;
