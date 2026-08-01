"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll reveal for the marketing sections.
 *
 * Deliberately tiny: it adds one class and then disconnects. All the motion
 * lives in the `.v-reveal` / `.is-in` CSS rules, which already no-op under
 * `prefers-reduced-motion`.
 *
 * Fails visible: if JS never runs, `noscript`-equivalent behaviour is handled
 * by starting `shown` true when IntersectionObserver is unavailable, so
 * content is never permanently invisible.
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
  as?: "div" | "li";
}) {
  // Both permitted tags render an HTMLElement, so one ref type covers them and
  // we avoid a cast.
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [shown, setShown] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`v-reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
