"use client";

/**
 * The Quiet Hours — full-bleed cinematic showpiece (Act 1).
 * Renders the R3F Vessel behind an editorial DOM overlay. Escapes the global
 * site chrome by covering it with a fixed z-100 layer + locking body scroll.
 * Honors prefers-reduced-motion with a static night gradient fallback.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VesselScene = dynamic(() => import("./VesselScene"), { ssr: false });

const display = { fontFamily: "var(--font-display)" } as const;
const mono = { fontFamily: "var(--font-mono)" } as const;

export default function QuietHoursClient() {
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setReady(true);
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#06080e] text-white">
      {/* 3D layer (or reduced-motion gradient) */}
      {ready && !reduced ? (
        <div className="absolute inset-0">
          <VesselScene />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 62% at 50% 42%, #1b2433 0%, #0b1018 52%, #05070c 100%)",
          }}
        />
      )}

      {/* cinematic vignette to seat the type */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 42%, transparent 38%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      {/* editorial overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
        {/* top bar */}
        <header className="flex items-start justify-between">
          <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <span
              className="grid h-8 w-8 place-items-center rounded-md bg-white text-[15px] font-extrabold text-[#0b1018]"
              style={display}
            >
              H
            </span>
            <span className="text-[15px] tracking-tight" style={display}>
              Handbuilt
            </span>
          </a>
          <span className="text-[11px] tracking-[0.32em] text-amber-200/70" style={mono}>
            11:47 PM
          </span>
        </header>

        {/* headline — lower-left, brutalist */}
        <div className="max-w-4xl pb-[8vh]">
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.34em] text-amber-200/55"
            style={mono}
          >
            The Quiet Hours · Act 01 / 07
          </p>
          <h1
            className="text-[13vw] font-extrabold leading-[0.9] tracking-[-0.02em] md:text-[8.5vw] lg:text-[6.6vw]"
            style={display}
          >
            The work doesn&rsquo;t stop
            <br />
            <span className="text-white/55">when you do.</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/65">
            Missed calls. Unsent quotes. The invoice you&rsquo;ll chase tomorrow. Handbuilt builds
            the AI worker that catches it &mdash; so the morning&rsquo;s already handled.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/start"
              className="group inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-300/10 px-6 py-3 text-sm font-semibold text-amber-100 backdrop-blur-sm transition-all hover:border-amber-300 hover:bg-amber-300/20"
              style={display}
            >
              Pour your work in
              <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
            <a
              href="/v2"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              style={display}
            >
              See the systems
            </a>
          </div>
        </div>

        {/* scroll hint */}
        <footer className="flex items-center justify-center">
          <span
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-white/35"
            style={mono}
          >
            <span className="h-3 w-px animate-pulse bg-white/30" />
            more at dawn
          </span>
        </footer>
      </div>
    </div>
  );
}
