"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealTag = "div" | "section" | "li" | "span" | "ul";

/**
 * Scroll reveal — an ENHANCEMENT, never a precondition for reading the page.
 *
 * The rule this enforces: **first paint is never `opacity: 0`.**
 *
 * The previous implementation (both of them — this one and the framer version
 * in components/Reveal.tsx) shipped `opacity: 0` in the server-rendered HTML
 * and only revealed after hydration. On ~210 routes that included the H1, the
 * lead paragraph and the primary CTA, so the most important content on the
 * page was invisible until JS ran, and stayed invisible forever if it didn't.
 *
 * How this version avoids it:
 *  1. SSR output is visible. `.v-reveal` has no hiding styles until it is
 *     armed, and only client JS can arm it.
 *  1b. Even when armed, the animation is TRANSFORM ONLY — never opacity. Text
 *     that fades from 0 is unreadable until an observer fires, and axe reports
 *     every such element as a serious contrast failure because at 0 alpha the
 *     foreground and background are literally the same colour.
 *  2. It arms only elements that are BELOW the fold at hydration time
 *     (`rect.top > innerHeight`), so nothing the visitor is already looking at
 *     can flash or animate.
 *  3. It never arms under `prefers-reduced-motion: reduce`, or when
 *     IntersectionObserver is missing.
 *
 * Result: no-JS, slow-JS, reduced-motion and above-the-fold all render the
 * finished page immediately. This also replaced the framer-motion reveal, which
 * removes framer from every page that only used it to fade content in.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    if (state !== "idle") return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return; // stays visible
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen: leave it exactly as the server drew it.
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    setState("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [state]);

  const props = {
    ref: ref as React.Ref<never>,
    className: `v-reveal ${state === "in" ? "is-in" : ""} ${className}`.trim(),
    ...(state !== "idle" ? { "data-armed": "" } : {}),
    ...(delay && state !== "idle" ? { style: { transitionDelay: `${delay}ms` } } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
}
