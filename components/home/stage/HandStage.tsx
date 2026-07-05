"use client";

/**
 * The AI-hand background stage — Phase 1 of AI-HAND-BACKGROUND-GOD-PROMPT.md.
 * A pinned 400vh scroll film in 4 beats: MESS (cream studio) → HAND ARRIVES →
 * ORGANIZING (amber lines, dots go gold) → HANDLED (three spotlit clusters on
 * warm black). All motion is transform/opacity, scrubbed from scroll progress.
 * Left ~40% of the frame is a text-dead-zone in every beat.
 */

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useTime,
  useReducedMotion,
  type MotionValue,
  type MotionStyle,
} from "framer-motion";
import { useRef } from "react";
import HandVisual from "./HandVisual";
import {
  PhoneSprite,
  InvoiceSprite,
  CalendarSprite,
  ReviewSprite,
  MessageSprite,
  ReceiptProp,
  StickyProp,
  CrumpleProp,
} from "./StageObjects";

const AMBER = "#E88A00";
const INK = "#191716";
const PAPER = "#FAF7F2";
const BLACK = "#141110";

/* film-grain tile — also kills banding on the dark gradients */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.55'/></svg>\")";

/* ─────────────────────────── hero copy (shared) ─────────────────────────── */

function HeroCopy({ style }: { style: MotionStyle }) {
  return (
    <motion.div className="max-w-[560px]" style={style}>
      <div
        className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.05em]"
        style={{
          background: "var(--pill-bg)" as never,
          borderColor: "var(--pill-bd)" as never,
          color: "var(--pill-fg)" as never,
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" style={{ boxShadow: "0 0 0 3px rgba(15,169,104,0.18)" }} />
        Built in BC · Installed, not just advice
      </div>

      <h1
        className="font-display font-extrabold leading-[0.96] tracking-[-0.028em]"
        style={{ fontSize: "clamp(40px, 5.8vw, 70px)", color: "var(--ink)" as never }}
      >
        Your busywork
        <br />goes in.
        <br />A working
        <br />
        <span style={{ color: AMBER, textDecoration: "underline", textDecorationColor: `${AMBER}50`, textUnderlineOffset: "4px" }}>
          AI worker
        </span>
        <br />comes out.
      </h1>

      <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed" style={{ color: "var(--sub)" as never }}>
        We take the calls, texts, quotes, and invoices that eat your day — and build them into one real AI worker, wired into your tools and live in days.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/start"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--cta-bg)" as never, color: "var(--cta-fg)" as never }}
        >
          Start a build
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
        <Link
          href="/demo"
          className="inline-flex items-center gap-2.5 rounded-full border px-5 py-3.5 text-[14px] font-semibold transition-all duration-200 hover:border-amber-400"
          style={{ borderColor: "var(--cta2-bd)" as never, color: "var(--cta2-fg)" as never }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px]" style={{ background: AMBER, color: INK }}>
            ▶
          </span>
          Try the live demo
        </Link>
        <Link
          href="/ai-front-desk"
          className="inline-flex items-center gap-1.5 px-2 py-3.5 text-[14px] font-semibold transition-colors duration-200"
          style={{ color: AMBER }}
        >
          See it work
          <span aria-hidden="true">▸</span>
        </Link>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]" style={{ color: "var(--mut)" as never }}>
        <span className="flex items-center gap-1.5"><span style={{ color: "#2F6B4F" }}>✓</span> Fixed CAD pricing</span>
        <span>·</span>
        <span>Real demos, not mockups</span>
        <span>·</span>
        <span className="font-semibold" style={{ color: "var(--sub)" as never }}>one builder, no agency handoff</span>
      </div>
    </motion.div>
  );
}

const LIGHT_VARS: MotionStyle = {
  "--ink": INK,
  "--sub": "#615A53",
  "--mut": "#9B928A",
  "--pill-bg": "rgba(255,248,239,0.8)",
  "--pill-bd": "rgba(232,222,211,1)",
  "--pill-fg": "#6F6862",
  "--cta-bg": INK,
  "--cta-fg": "#FFFFFF",
  "--cta2-bd": "rgba(232,222,211,1)",
  "--cta2-fg": INK,
} as MotionStyle;

/* ─────────────────────── scroll-scrubbed hero objects ────────────────────── */

type ObjCfg = {
  k: number[];
  x: string[];
  y: string[];
  rk: number[];
  r: number[];
  sk: number[];
  s: number[];
  shK: number[];
  shO: number[];
  phase: number;
  z: number;
};

function StageObject({
  p,
  time,
  amp,
  cfg,
  children,
}: {
  p: MotionValue<number>;
  time: MotionValue<number>;
  amp: MotionValue<number>;
  cfg: ObjCfg;
  children: React.ReactNode;
}) {
  const x = useTransform(p, cfg.k, cfg.x);
  const y = useTransform(p, cfg.k, cfg.y);
  const rotate = useTransform(p, cfg.rk, cfg.r);
  const scale = useTransform(p, cfg.sk, cfg.s);
  const shadowO = useTransform(p, cfg.shK, cfg.shO);
  const driftY = useTransform([time, amp] as MotionValue<number>[], ([t, a]: number[]) => Math.sin(t / 1500 + cfg.phase) * 5 * a);
  const driftX = useTransform([time, amp] as MotionValue<number>[], ([t, a]: number[]) => Math.cos(t / 1900 + cfg.phase) * 3 * a);

  return (
    <motion.div className="pointer-events-none absolute inset-0" style={{ x, y, zIndex: cfg.z, willChange: "transform" }}>
      <motion.div className="inline-block" style={{ x: driftX, y: driftY }}>
        <motion.div className="relative inline-block" style={{ rotate, scale }}>
          {children}
          <motion.div
            className="absolute"
            style={{
              left: "4%",
              right: "4%",
              bottom: -16,
              height: 18,
              background: "radial-gradient(closest-side, rgba(25,23,22,0.22), transparent 72%)",
              opacity: shadowO,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────── the film ────────────────────────────────── */

function StageFilm() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const time = useTime();

  /* ambient drift dies as the hand starts organizing */
  const amp = useTransform(p, [0, 0.35, 0.55], [1, 1, 0]);

  /* camera: push in as the hand enters, settle level for the finale */
  const sceneScale = useTransform(p, [0, 0.15, 0.35, 0.78], [1, 1, 1.045, 1.02]);

  /* backdrop: room lights die, black studio + spots come up.
     The umber bridge must stay WARM — a weak brown over cream reads muddy grey. */
  const creamO = useTransform(p, [0, 0.6, 0.72], [1, 1, 0]);
  const umberO = useTransform(p, [0.56, 0.64, 0.74, 0.84], [0, 0.75, 0.55, 0]);
  const grainO = useTransform(p, [0, 0.6, 0.8], [0.06, 0.06, 0.11]);
  const spot1 = useTransform(p, [0.70, 0.77], [0, 1]);
  const spot2 = useTransform(p, [0.72, 0.79], [0, 1]);
  const spot3 = useTransform(p, [0.74, 0.81], [0, 1]);
  const rimO = useTransform(p, [0.74, 0.84], [0, 1]);
  const labelO = useTransform(p, [0.8, 0.88], [0, 1]);
  const labelY = useTransform(p, [0.8, 0.88], [10, 0]);
  const hintO = useTransform(p, [0, 0.08], [1, 0]);

  /* mute props */
  const muteO = useTransform(p, [0, 0.6, 0.8], [0.55, 0.5, 0.13]);
  const bgPropY = useTransform(p, [0, 1], ["0%", "-4%"]);
  const fgPropY = useTransform(p, [0, 1], ["0%", "6%"]);

  /* dots: red → gold, staggered as objects arrive (system status flips) */
  const phoneRed = useTransform(p, [0.575, 0.59], [1, 0]);
  const phoneGold = useTransform(p, [0.575, 0.59], [0, 1]);
  const phoneGoldS = useTransform(p, [0.575, 0.59, 0.615], [0.5, 1.3, 1]);
  const calRed = useTransform(p, [0.635, 0.65], [1, 0]);
  const calGold = useTransform(p, [0.635, 0.65], [0, 1]);
  const calGoldS = useTransform(p, [0.635, 0.65, 0.675], [0.5, 1.3, 1]);
  const msgRed = useTransform(p, [0.695, 0.71], [1, 0]);
  const msgGold = useTransform(p, [0.695, 0.71], [0, 1]);
  const msgGoldS = useTransform(p, [0.695, 0.71, 0.735], [0.5, 1.3, 1]);
  const starLit = useTransform(p, [0.66, 0.745], [0, 1]);

  /* amber workflow lines — drawn sequentially in Beat 3 */
  const line1 = useTransform(p, [0.52, 0.64], [0, 1]);
  const line2 = useTransform(p, [0.62, 0.74], [0, 1]);
  const line1Off = useTransform(line1, (v) => 1 - v);
  const line2Off = useTransform(line2, (v) => 1 - v);

  /* the hand: enters with weight, tracks the invoice it pinches, exits */
  const handK = [0.15, 0.22, 0.3, 0.35, 0.38, 0.485, 0.5, 0.56, 0.6, 0.72];
  const handX = useTransform(p, handK, ["105%", "74%", "63%", "60%", "60%", "47.6%", "48%", "48%", "58%", "114%"]);
  const handY = useTransform(p, handK, ["38%", "39%", "40%", "40%", "40.4%", "32.4%", "32%", "32%", "34%", "44%"]);
  const handR = useTransform(p, [0.15, 0.3, 0.35, 0.5, 0.6, 0.72], [-4, -2, -1.5, -1, 0, 4]);
  const handAmp = useTransform(p, [0.3, 0.35, 0.56, 0.6], [0, 1, 1, 0]);
  const handDrift = useTransform([time, handAmp] as MotionValue<number>[], ([t, a]: number[]) => Math.sin(t / 1700) * 3 * a);

  /* hero copy re-lights as the studio goes dark */
  const inkC = useTransform(p, [0.58, 0.72], [INK, "#F6EFE6"]);
  const subC = useTransform(p, [0.58, 0.72], ["#615A53", "#B7AEA4"]);
  const mutC = useTransform(p, [0.58, 0.72], ["#9B928A", "#8F867D"]);
  const pillBg = useTransform(p, [0.58, 0.72], ["rgba(255,248,239,0.8)", "rgba(246,239,230,0.05)"]);
  const pillBd = useTransform(p, [0.58, 0.72], ["rgba(232,222,211,1)", "rgba(246,239,230,0.18)"]);
  const pillFg = useTransform(p, [0.58, 0.72], ["#6F6862", "#B7AEA4"]);
  const ctaBg = useTransform(p, [0.58, 0.72], [INK, AMBER]);
  const ctaFg = useTransform(p, [0.58, 0.72], ["#FFFFFF", INK]);
  const cta2Bd = useTransform(p, [0.58, 0.72], ["rgba(232,222,211,1)", "rgba(246,239,230,0.25)"]);
  const cta2Fg = useTransform(p, [0.58, 0.72], [INK, "#F6EFE6"]);

  const copyVars = {
    "--ink": inkC,
    "--sub": subC,
    "--mut": mutC,
    "--pill-bg": pillBg,
    "--pill-bd": pillBd,
    "--pill-fg": pillFg,
    "--cta-bg": ctaBg,
    "--cta-fg": ctaFg,
    "--cta2-bd": cta2Bd,
    "--cta2-fg": cta2Fg,
  } as MotionStyle;

  /* hero object choreography — mess → (staggered, with servo settle) → clusters */
  const objects: { cfg: ObjCfg; node: React.ReactNode }[] = [
    {
      cfg: {
        // invoice: pressed at contact (.365), lifted, carried, placed with settle
        k: [0, 0.35, 0.365, 0.38, 0.485, 0.5],
        x: ["52%", "52%", "52%", "52%", "39.6%", "40%"],
        y: ["50%", "50%", "50.5%", "50%", "42.4%", "42%"],
        rk: [0, 0.38, 0.485, 0.5],
        r: [12, 12, -1, 0],
        sk: [0, 0.38, 0.44, 0.5],
        s: [1.04, 1.04, 1.11, 1],
        shK: [0, 0.38, 0.44, 0.5],
        shO: [0.8, 0.8, 0.4, 0.85],
        phase: 0.8,
        z: 5,
      },
      node: <InvoiceSprite />,
    },
    {
      cfg: {
        k: [0, 0.45, 0.555, 0.57],
        x: ["30%", "30%", "10.4%", "10%"],
        y: ["36%", "36%", "40.4%", "40%"],
        rk: [0, 0.45, 0.555, 0.57],
        r: [-9, -9, 1, 0],
        sk: [0, 1], s: [1, 1],
        shK: [0, 1], shO: [0.75, 0.75],
        phase: 2.1,
        z: 4,
      },
      node: <PhoneSprite redOpacity={phoneRed} goldOpacity={phoneGold} goldScale={phoneGoldS} />,
    },
    {
      cfg: {
        k: [0, 0.5, 0.605, 0.62],
        x: ["66%", "66%", "53.4%", "53%"],
        y: ["14%", "14%", "60.5%", "60%"],
        rk: [0, 0.5, 0.605, 0.62],
        r: [7, 7, -1, 0],
        sk: [0, 1], s: [1, 1],
        shK: [0, 1], shO: [0.75, 0.75],
        phase: 3.7,
        z: 3,
      },
      node: <CalendarSprite redOpacity={calRed} goldOpacity={calGold} goldScale={calGoldS} />,
    },
    {
      cfg: {
        k: [0, 0.55, 0.655, 0.67],
        x: ["44%", "44%", "19.6%", "20%"],
        y: ["22%", "22%", "62.5%", "62%"],
        rk: [0, 0.55, 0.655, 0.67],
        r: [-6, -6, 1, 0],
        sk: [0, 1], s: [1, 1],
        shK: [0, 1], shO: [0.75, 0.75],
        phase: 5.2,
        z: 3,
      },
      node: <MessageSprite redOpacity={msgRed} goldOpacity={msgGold} goldScale={msgGoldS} />,
    },
    {
      cfg: {
        k: [0, 0.58, 0.685, 0.7],
        x: ["72%", "72%", "74.5%", "74%"],
        y: ["64%", "64%", "51.5%", "52%"],
        rk: [0, 0.58, 0.685, 0.7],
        r: [-13, -13, 1.5, 0],
        sk: [0, 1], s: [1, 1],
        shK: [0, 1], shO: [0.75, 0.75],
        phase: 6.4,
        z: 3,
      },
      node: <ReviewSprite starLit={starLit} />,
    },
  ];

  const clusters = [
    { label: "Calls", left: "17%", spot: spot1 },
    { label: "Paperwork", left: "47%", spot: spot2 },
    { label: "Proof", left: "80%", spot: spot3 },
  ];

  return (
    <section ref={ref} id="top" className="relative" style={{ height: "400vh", background: BLACK }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── backdrop: warm-black base → cream room light → umber dimming ── */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(80% 60% at 70% 30%, #1C1712, ${BLACK} 70%)` }} />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: creamO,
            background: `radial-gradient(90% 90% at 78% 16%, #FFFDF8 0%, rgba(255,253,248,0) 60%), radial-gradient(120% 80% at 50% 118%, rgba(25,23,22,0.10), transparent 55%), ${PAPER}`,
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ opacity: umberO, background: "radial-gradient(100% 100% at 70% 40%, #4A3218 0%, #2A1D10 72%)" }}
        />

        {/* ── the scene (camera scale) ── */}
        <motion.div className="absolute inset-0" style={{ scale: sceneScale, transformOrigin: "62% 50%" }}>
          {/* action zone — right 60% of the frame; left 40% is the text-dead-zone */}
          <div className="absolute bottom-0 right-0 top-0" style={{ width: "60%" }}>
            {/* spotlight pools + amber rims (behind objects) */}
            {clusters.map((c) => (
              <motion.div
                key={`spot-${c.label}`}
                className="absolute"
                style={{
                  left: c.left, top: "-6%", width: "32%", height: "96%",
                  transform: "translateX(-50%)",
                  opacity: c.spot,
                  background: "radial-gradient(50% 44% at 50% 30%, rgba(255,241,214,0.13), rgba(232,138,0,0.05) 55%, transparent 75%)",
                }}
              />
            ))}
            {clusters.map((c) => (
              <motion.div
                key={`rim-${c.label}`}
                className="absolute"
                style={{
                  left: c.left, top: "38%", width: "27%", height: "38%",
                  transform: "translateX(-50%)",
                  opacity: rimO,
                  background: "radial-gradient(closest-side, rgba(232,138,0,0.34), rgba(232,138,0,0.12) 55%, transparent 74%)",
                }}
              />
            ))}

            {/* mute background props */}
            <motion.div className="absolute" style={{ left: "6%", top: "6%", y: bgPropY, opacity: muteO, rotate: 14, filter: "blur(3px)" }}>
              <ReceiptProp />
            </motion.div>
            <motion.div className="absolute" style={{ left: "84%", top: "30%", y: bgPropY, opacity: muteO, rotate: -10, filter: "blur(3.5px)" }}>
              <StickyProp />
            </motion.div>

            {/* amber workflow lines (under the objects) */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ zIndex: 2, overflow: "visible" }}
            >
              <g className="stage-line-pulse">
                <motion.path d="M17 57 C 26 47, 38 47, 47 55" pathLength={1} strokeDasharray="1" fill="none" stroke={AMBER}
                  strokeWidth="7" strokeOpacity="0.28" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                  style={{ strokeDashoffset: line1Off, filter: "blur(3px)" }} />
                <motion.path d="M17 57 C 26 47, 38 47, 47 55" pathLength={1} strokeDasharray="1" fill="none" stroke={AMBER}
                  strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                  style={{ strokeDashoffset: line1Off }} />
                <motion.path d="M47 55 C 58 47, 70 48, 80 57" pathLength={1} strokeDasharray="1" fill="none" stroke={AMBER}
                  strokeWidth="7" strokeOpacity="0.28" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                  style={{ strokeDashoffset: line2Off, filter: "blur(3px)" }} />
                <motion.path d="M47 55 C 58 47, 70 48, 80 57" pathLength={1} strokeDasharray="1" fill="none" stroke={AMBER}
                  strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                  style={{ strokeDashoffset: line2Off }} />
              </g>
            </svg>

            {/* hero objects */}
            {objects.map((o, i) => (
              <StageObject key={i} p={p} time={time} amp={amp} cfg={o.cfg}>
                {o.node}
              </StageObject>
            ))}

            {/* the hand */}
            <motion.div className="pointer-events-none absolute inset-0" style={{ x: handX, y: handY, zIndex: 8, willChange: "transform" }}>
              <motion.div style={{ y: handDrift }}>
                <motion.div className="inline-block" style={{ rotate: handR, filter: "drop-shadow(0 30px 26px rgba(25,23,22,0.30))" }}>
                  <HandVisual />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* cluster labels */}
            {clusters.map((c) => (
              <motion.div
                key={`label-${c.label}`}
                className="absolute font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ left: c.left, top: "76%", x: "-50%", opacity: labelO, y: labelY, color: "#9B928A", zIndex: 6 }}
              >
                {c.label}
              </motion.div>
            ))}
          </div>

          {/* foreground mute prop — frames the shot from the lower action edge */}
          <motion.div
            className="absolute"
            style={{ left: "42%", top: "84%", y: fgPropY, opacity: muteO, rotate: -8, scale: 1.5, filter: "blur(2.5px)" }}
          >
            <CrumpleProp />
          </motion.div>
        </motion.div>

        {/* grain */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: grainO, backgroundImage: GRAIN, mixBlendMode: "overlay" }} />

        {/* hero copy — left column, persists through the whole film */}
        <div className="relative z-30 mx-auto flex h-full max-w-[1200px] items-center px-6">
          <HeroCopy style={copyVars} />
        </div>

        {/* scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2" style={{ opacity: hintO }}>
          <span className="font-mono text-[9px] uppercase tracking-[0.34em]" style={{ color: "rgba(25,23,22,0.35)" }}>Scroll</span>
          <div className="h-6 w-px animate-pulse" style={{ background: "rgba(25,23,22,0.2)" }} />
        </motion.div>
      </div>

      <style>{`
        .stage-line-pulse { animation: stageLinePulse 4.5s ease-in-out infinite; }
        @keyframes stageLinePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.72; } }
        @keyframes stageDotPulse { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.4; } }
        .stage-dot-pulse { animation: stageDotPulse 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .stage-line-pulse, .stage-dot-pulse { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ─────────── handled panel — the calm destination (mobile + fallback) ────── */

export function HandledPanel() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[24px]"
      style={{ background: `radial-gradient(90% 80% at 55% 20%, #1E1813, ${BLACK} 72%)`, aspectRatio: "4 / 3" }}
    >
      {/* spots */}
      {["16%", "50%", "84%"].map((left) => (
        <div
          key={left}
          className="absolute"
          style={{
            left, top: "-8%", width: "48%", height: "100%", transform: "translateX(-50%)",
            background: "radial-gradient(50% 44% at 50% 28%, rgba(255,241,214,0.13), rgba(232,138,0,0.05) 55%, transparent 75%)",
          }}
        />
      ))}
      {/* amber line */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="stage-line-pulse" d="M16 58 C 28 48, 40 48, 50 56 C 60 48, 74 48, 84 58" fill="none" stroke={AMBER}
          strokeWidth="1.4" strokeOpacity="0.85" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      </svg>

      {/* clusters — static gold state */}
      <div className="absolute" style={{ left: "6%", top: "22%", transform: "scale(0.52)", transformOrigin: "top left" }}>
        <PhoneSprite redOpacity={0} goldOpacity={1} goldScale={1} />
      </div>
      <div className="absolute" style={{ left: "34%", top: "18%", transform: "scale(0.52)", transformOrigin: "top left" }}>
        <InvoiceSprite />
      </div>
      <div className="absolute" style={{ left: "56%", top: "48%", transform: "scale(0.52)", transformOrigin: "top left" }}>
        <CalendarSprite redOpacity={0} goldOpacity={1} goldScale={1} />
      </div>
      <div className="absolute" style={{ left: "72%", top: "26%", transform: "scale(0.52)", transformOrigin: "top left" }}>
        <ReviewSprite starLit={1} />
      </div>

      {/* labels */}
      {[
        { t: "Calls", l: "16%" },
        { t: "Paperwork", l: "50%" },
        { t: "Proof", l: "84%" },
      ].map((c) => (
        <div
          key={c.t}
          className="absolute font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ left: c.l, bottom: "7%", transform: "translateX(-50%)", color: "#9B928A" }}
        >
          {c.t}
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.09, backgroundImage: GRAIN, mixBlendMode: "overlay" }} />
    </div>
  );
}

/* ────────────── static hero (reduced motion / desktop fallback) ──────────── */

function StaticHero() {
  return (
    <section id="top" className="relative overflow-hidden" style={{ background: PAPER, minHeight: "calc(100vh - 64px)" }}>
      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <HeroCopy style={LIGHT_VARS} />
        <HandledPanel />
      </div>
    </section>
  );
}

/* ───────────────────────────── mobile hero ───────────────────────────────── */

export function MobileHero() {
  return (
    <section className="relative overflow-hidden md:hidden" style={{ background: PAPER }}>
      <div className="mx-auto max-w-[560px] px-6 pb-14 pt-16">
        <HeroCopy style={LIGHT_VARS} />
        <div className="mt-12">
          <HandledPanel />
          <div className="mt-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#9B928A" }}>
            Handled — calls, paperwork, proof
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── export ──────────────────────────────────── */

export default function HandStage() {
  const reduce = useReducedMotion();
  return (
    <div className="hidden md:block">
      {reduce ? <StaticHero /> : <StageFilm />}
    </div>
  );
}
