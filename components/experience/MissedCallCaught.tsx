"use client";

/**
 * "Missed Call, Caught" — the Conversion Layer (§1 of the spec).
 * Real <section>s are the source of truth for scroll; the fixed WebGL canvas
 * (PhoneScene) reacts. Reads as a normal long-form article with WebGL off,
 * JS off, or as a bot:
 *   - SSR / no-JS → data-mode="article": compact flowing article, all copy.
 *   - reduced-motion / no-WebGL → article + a static warm poster of the catch.
 *   - otherwise → data-mode="film": tall scrubbed acts + the 3D phone.
 */

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { animate, useInView } from "framer-motion";
import "./experience.css";
import {
  ACT1_CTA_SUBLINE,
  ACTS,
  DASHBOARD_LABEL,
  FAQ,
  FOOTER_LINES,
  MISSED_LOG,
  MISSED_MICRO_LINE,
  PAINS,
  PRICING_FOOTNOTE,
  SCORE_ITEMS,
  SUMMARY_PARAGRAPH,
  TIERS,
  TRANSCRIPT,
  WAGE,
  WEEK_PINGS,
  WORKERS,
  getWorker,
} from "@/lib/data/alwaysAnswering";
import {
  ACT_VH,
  CATCH_LOCAL,
  DUST,
  GRADE_BG,
  GRADE_FOG,
  KEY_COLOR,
  KEY_INTENSITY,
  clockLabel,
  exp,
  rgbToCss,
  rgbToOklab,
  sampleGradeHex,
  sampleNumber,
  type WorkerId,
} from "./expStore";

const PhoneScene = dynamic(() => import("./PhoneScene"), { ssr: false });

const serverSnapshot = () => 0;
function useExpVersion() {
  return useSyncExternalStore(exp.subscribe, exp.getVersion, serverSnapshot);
}

// ---------------------------------------------------------------------------
// Sound — synthesized, off by default; a quiet ring in Act III + a warm chime
// on the catch. No audio assets, no autoplay.
// ---------------------------------------------------------------------------
class SoundKit {
  private ctx: AudioContext | null = null;
  private ringGain: GainNode | null = null;
  private ringOsc: OscillatorNode[] = [];
  private cadence: ReturnType<typeof setInterval> | null = null;

  private ensure() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    return this.ctx;
  }
  startRing() {
    if (this.ringGain) return;
    const ctx = this.ensure();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    this.ringOsc = [440, 480].map((f) => {
      const o = ctx.createOscillator();
      o.frequency.value = f;
      o.type = "sine";
      o.connect(gain);
      o.start();
      return o;
    });
    this.ringGain = gain;
    let on = false;
    this.cadence = setInterval(() => {
      if (!this.ringGain || !this.ctx) return;
      on = !on;
      this.ringGain.gain.setTargetAtTime(on ? 0.018 : 0, this.ctx.currentTime, 0.04);
    }, 700);
  }
  stopRing() {
    if (this.cadence) clearInterval(this.cadence);
    this.cadence = null;
    this.ringOsc.forEach((o) => o.stop());
    this.ringOsc = [];
    this.ringGain?.disconnect();
    this.ringGain = null;
  }
  chime() {
    const ctx = this.ensure();
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(g);
      g.connect(ctx.destination);
      const t0 = ctx.currentTime + i * 0.09;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.05, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.4);
      o.start(t0);
      o.stop(t0 + 1.5);
    });
  }
}

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

function CountUp({ value, animated }: { value: number; animated: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  useEffect(() => {
    if (!animated || !inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, animated]);
  // SSR renders the real number so the article/no-JS view is complete
  return <span ref={ref}>{value}</span>;
}

/** DOM twin of the on-screen transcript (§8) — types on the catch, readable always. */
function TranscriptBlock() {
  useExpVersion();
  const [chars, setChars] = useState(Infinity);
  const seq = exp.replaySeq;
  useEffect(() => {
    if (!exp.caught || exp.catchAt < 0) return;
    let raf = 0;
    const tick = () => {
      const ct = (performance.now() - exp.catchAt) / 1000;
      setChars(Math.max(0, Math.floor((ct - 1.1) * 26)));
      if (ct < 9) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seq]);

  let used = 0;
  return (
    <div className="transcript" aria-live="off">
      <p style={{ color: "var(--kicker)", fontSize: 10, letterSpacing: "0.2em" }}>
        HANDBUILT {getWorker(exp.worker).name.toUpperCase()} — {exp.caught ? "ANSWERING…" : "ON STANDBY"}
      </p>
      {TRANSCRIPT.map((line, i) => {
        const avail = Math.max(0, chars - used);
        used += line.text.length + 8;
        const text = Number.isFinite(chars) ? line.text.slice(0, avail) : line.text;
        return (
          <p key={i} style={{ opacity: exp.caught || !Number.isFinite(chars) ? 1 : 0.55 }}>
            <span className="who">{line.who === "ai" ? "AI" : "CALLER"}</span>
            {text}
          </p>
        );
      })}
    </div>
  );
}

/** §7 — the honest payback input. Uses THEIR number; computes nothing fake. */
function Payback() {
  const [raw, setRaw] = useState("");
  const value = Number(raw.replace(/[^0-9.]/g, ""));
  let line = "";
  if (value > 0) {
    if (value >= WAGE.starterOneTime) {
      line = "Then this pays for itself the first time it catches one.";
    } else {
      const n = Math.ceil(WAGE.starterOneTime / value);
      line = `Then this pays for itself after ${n} caught jobs.`;
    }
  }
  return (
    <div className="payback">
      <label htmlFor="payback-input">What&rsquo;s one job worth to you?</label>
      <div className="row">
        <span className="field">
          $
          <input
            id="payback-input"
            inputMode="numeric"
            placeholder="600"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            aria-describedby="payback-answer"
          />
        </span>
      </div>
      <p className="answer" id="payback-answer" aria-live="polite">
        {line}
      </p>
    </div>
  );
}

function NavRail({ jump }: { jump: (n: number) => void }) {
  useExpVersion();
  return (
    <nav className="exp-rail" aria-label="Acts">
      {ACTS.map((a) => (
        <button key={a.n} aria-current={exp.act === a.n} onClick={() => jump(a.n)}>
          <span className="dot" aria-hidden="true" />
          {a.roman}
        </button>
      ))}
    </nav>
  );
}

function ActCopy({
  act,
  children,
  h1,
}: {
  act: (typeof ACTS)[number];
  children?: React.ReactNode;
  h1?: boolean;
}) {
  const H = (h1 ? "h1" : "h2") as "h1";
  return (
    <div className="act-copy">
      <p className="kicker rv">{act.kicker}</p>
      <H className="hx rv rv2" id={`act-${act.n}-h`}>
        {act.h[0]}
        <em>{act.h[1]}</em>
        {act.h[2]}
      </H>
      <p className="lede rv rv3">{act.lede}</p>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// The experience
// ---------------------------------------------------------------------------

export default function MissedCallCaught() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const clockRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"article" | "film">("article");
  const [poster, setPoster] = useState(false);
  const [mobile, setMobile] = useState(false);
  const sound = useMemo(() => (typeof window !== "undefined" ? new SoundKit() : null), []);
  useExpVersion();

  // ---- mode detection -----------------------------------------------------
  useEffect(() => {
    rootRef.current?.setAttribute("data-exp-js", "");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    if (reduced || !webgl) {
      setPoster(true);
      exp.setTheme("dark");
    } else {
      setMode("film");
    }
  }, []);

  // ---- scroll controller (film) -------------------------------------------
  useEffect(() => {
    if (mode !== "film") return;
    const root = rootRef.current;
    if (!root) return;

    let bounds: { top: number; height: number }[] = [];
    const measure = () => {
      bounds = sectionRefs.current.map((el) => ({
        top: el?.offsetTop ?? 0,
        height: el?.offsetHeight ?? 1,
      }));
    };
    measure();

    let raf = 0;
    let ringOn = false;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const doc = document.documentElement.scrollHeight - vh;
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, doc > 0 ? y / doc : 0));
      exp.progress = p;

      // which act, local progress
      let act = 1;
      let local = 0;
      for (let i = 0; i < bounds.length; i++) {
        const b = bounds[i];
        if (y >= b.top - vh * 0.5) {
          act = i + 1;
          const span = Math.max(1, b.height - vh);
          local = Math.min(1, Math.max(0, (y - b.top) / span));
        }
      }
      exp.actLocal = local;
      exp.setAct(act);

      // the grade (OKLab) → scene + wrapper + theme flip
      const bg = sampleGradeHex(GRADE_BG, p);
      exp.bg = bg;
      exp.fog = sampleGradeHex(GRADE_FOG, p);
      exp.key = sampleGradeHex(KEY_COLOR, p);
      exp.keyIntensity = sampleNumber(KEY_INTENSITY, p);
      exp.dust = sampleNumber(DUST, p);
      root.style.setProperty("--exp-bg", rgbToCss(bg));

      const L = rgbToOklab(bg).L;
      if (L > 0.66 && exp.theme === "dark") exp.setTheme("golden");
      else if (L < 0.6 && exp.theme === "golden") exp.setTheme("dark");

      // clock
      const label = clockLabel(p);
      exp.clock = label;
      if (clockRef.current && clockRef.current.textContent !== label) {
        clockRef.current.textContent = label;
      }

      // the catch — fires on scroll, resets if the visitor rewinds past Act III
      if (act === 3 && local >= CATCH_LOCAL && !exp.caught) {
        exp.fireCatch();
        if (exp.soundOn) sound?.chime();
      } else if (act < 3 && exp.caught) {
        exp.resetCatch();
      }

      // quiet ring while the Act III call is about to slip
      const wantRing = exp.soundOn && act === 3 && !exp.caught && local > 0.08;
      if (wantRing && !ringOn) {
        sound?.startRing();
        ringOn = true;
      } else if (!wantRing && ringOn) {
        sound?.stopRing();
        ringOn = false;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      sound?.stopRing();
    };
  }, [mode, sound]);

  // ---- staggered act entrances --------------------------------------------
  useEffect(() => {
    const acts = rootRef.current?.querySelectorAll(".act");
    if (!acts) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.18 }
    );
    acts.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, [mode]);

  // ---- contrast audit hook (verification §10.3) ----------------------------
  useEffect(() => {
    if (mode !== "film") return;
    registerContrastAudit(rootRef);
    return () => {
      delete (window as unknown as Record<string, unknown>).__contrastAudit;
    };
  }, [mode]);

  const jump = useCallback((n: number) => {
    sectionRefs.current[n - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const replayFromTop = useCallback(() => {
    exp.resetCatch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const pickPain = useCallback(
    (worker: WorkerId) => {
      exp.replay(worker);
      if (exp.soundOn) sound?.chime();
    },
    [sound]
  );

  const filmStyle = (i: number) =>
    mode === "film" && i !== 2 && i !== 5 ? { height: `${ACT_VH[i]}vh` } : undefined;

  const setSection = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div ref={rootRef} className="experience" data-theme={exp.theme} data-mode={mode}>
      {/* the film — phone, bench, light. Never a headline glyph. */}
      {mode === "film" && (
        <div className="exp-canvas" aria-hidden="true">
          <PhoneScene mobile={mobile} />
        </div>
      )}

      {/* global chrome */}
      <header className="exp-chrome">
        <a href="/" className="exp-logo">
          <span className="mark" aria-hidden="true">
            H
          </span>
          Handbuilt
        </a>
        <div className="exp-topright">
          {mode === "film" && (
            <button
              className="exp-sound"
              aria-pressed={exp.soundOn}
              onClick={() => exp.setSound(!exp.soundOn)}
            >
              SOUND {exp.soundOn ? "ON" : "OFF"}
            </button>
          )}
          <Link href="/start" className="btn-cream">
            Start a build <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
      {mode === "film" && (
        <div className="exp-clock" aria-hidden="true">
          <span className="t" ref={clockRef}>
            7:00 AM
          </span>
          <span className="l">ALWAYS ANSWERING</span>
        </div>
      )}
      {mode === "film" && <NavRail jump={jump} />}

      <div className="exp-content">
        {/* poster — reduced-motion / no-WebGL fallback: the phone mid-catch, warm */}
        {poster && (
          <figure className="exp-poster" aria-hidden="true">
            <div className="poster-phone">
              <div className="poster-screen">
                <span className="k">HANDBUILT RECEPTIONIST</span>
                <span className="ring">✆</span>
                <span className="t">answering…</span>
                <span className="k">MISSED → ANSWERED ✓</span>
              </div>
            </div>
            <figcaption>THE MISSED CALL, CAUGHT</figcaption>
          </figure>
        )}

        {/* ACT I · THE PROMISE */}
        <section
          ref={setSection(0)}
          className="act"
          id="act-1"
          aria-labelledby="act-1-h"
          style={filmStyle(0)}
        >
          <div className="act-viewport">
            <div className="act-grid">
              <div className="copy-slot">
                <ActCopy act={ACTS[0]} h1>
                  <div className="rv rv4" style={{ marginTop: 28, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
                    <Link href="/start" className="btn-amber">
                      Start a build <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                  <p className="microline rv rv4">{ACT1_CTA_SUBLINE}</p>
                  <p className="rv rv4" style={{ marginTop: 22, fontSize: 13, lineHeight: 1.6, color: "var(--ink-low)", maxWidth: "52ch" }}>
                    {SUMMARY_PARAGRAPH}
                  </p>
                </ActCopy>
              </div>
            </div>
          </div>
        </section>

        {/* ACT II · THE CALL YOU CAN'T TAKE */}
        <section
          ref={setSection(1)}
          className="act"
          id="act-2"
          aria-labelledby="act-2-h"
          data-side="right"
          style={filmStyle(1)}
        >
          <div className="act-viewport">
            <div className="act-grid">
              <div className="copy-slot">
                <ActCopy act={ACTS[1]}>
                  <ul className="missed-log rv rv4">
                    {MISSED_LOG.map((row) => (
                      <li key={row.time}>
                        <span className="when">
                          {row.time} · {row.context}
                        </span>
                        <span className="what">{row.item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="microline rv rv4">{MISSED_MICRO_LINE}</p>
                </ActCopy>
              </div>
            </div>
          </div>
        </section>

        {/* ACT III · CAUGHT — the signature reversal */}
        <section
          ref={setSection(2)}
          className="act"
          id="act-3"
          aria-labelledby="act-3-h"
          data-flow=""
          style={mode === "film" ? { minHeight: `${ACT_VH[2]}vh` } : undefined}
        >
          <div className="act-viewport">
            <div className="act-grid">
              <div className="copy-slot">
                <ActCopy act={ACTS[2]}>
                  <div className="pain-chips rv rv4" role="group" aria-label="What keeps slipping?">
                    {PAINS.map((p) => (
                      <button
                        key={p.id}
                        className="chip"
                        aria-pressed={exp.worker === p.worker}
                        onClick={() => pickPain(p.worker)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <TranscriptBlock />

                  <div className="routed" aria-live="polite">
                    <span>✦ ROUTED TO — {getWorker(exp.worker).name.toUpperCase()}</span>
                    <Link
                      href={`/create?goal=${encodeURIComponent(PAINS.find((p) => p.worker === exp.worker)?.goal ?? PAINS[0].goal)}`}
                      className="btn-quiet"
                      style={{ color: "var(--amber-signal)" }}
                    >
                      Start this build <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  <ul className="week-pings" style={{ marginTop: 26 }} aria-label="The workers">
                    {WORKERS.map((w) => (
                      <li key={w.id}>
                        <span className="w">{w.name.toUpperCase()}</span>
                        {w.catches}
                      </li>
                    ))}
                  </ul>

                  <Payback />

                  <div className="exp-faq">
                    {FAQ.map((f) => (
                      <details key={f.q}>
                        <summary>{f.q}</summary>
                        <p>{f.a}</p>
                      </details>
                    ))}
                  </div>
                </ActCopy>
              </div>
            </div>
          </div>
        </section>

        {/* ACT IV · THE STUDIO */}
        <section
          ref={setSection(3)}
          className="act"
          id="act-4"
          aria-labelledby="act-4-h"
          data-side="right"
          style={filmStyle(3)}
        >
          <div className="act-viewport">
            <div className="act-grid">
              <div className="copy-slot">
                <ActCopy act={ACTS[3]} />
              </div>
            </div>
          </div>
        </section>

        {/* ACT V · THE PROOF (THE CAUGHT WEEK) */}
        <section
          ref={setSection(4)}
          className="act"
          id="act-5"
          aria-labelledby="act-5-h"
          style={filmStyle(4)}
        >
          <div className="act-viewport">
            <div className="act-grid">
              <div className="copy-slot">
                <ActCopy act={ACTS[4]}>
                  <div className="scoreboard rv rv4">
                    <div className="grid">
                      {SCORE_ITEMS.map((s) => (
                        <div key={s.label}>
                          <div className="num">
                            <CountUp value={s.value} animated={mode === "film"} />
                          </div>
                          <div className="lbl">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="tag">{DASHBOARD_LABEL}</p>
                  </div>
                  <ul className="week-pings rv rv4">
                    {WEEK_PINGS.map((p) => (
                      <li key={p.text}>
                        <span className="ok" aria-hidden="true">
                          ✓
                        </span>
                        <span className="w">{p.worker.toUpperCase()}</span>
                        {p.text}
                      </li>
                    ))}
                  </ul>
                </ActCopy>
              </div>
            </div>
          </div>
        </section>

        {/* ACT VI · WHAT YOU CAN HAND OVER */}
        <section
          ref={setSection(5)}
          className="act"
          id="act-6"
          aria-labelledby="act-6-h"
          data-side="right"
          data-flow=""
          style={mode === "film" ? { minHeight: `${ACT_VH[5]}vh` } : undefined}
        >
          <div className="act-viewport">
            <div className="act-grid">
              <div className="copy-slot" style={{ gridColumn: "1 / 13", maxWidth: "none" }}>
                <ActCopy act={ACTS[5]} />
                <div className="tiers rv rv4">
                  {TIERS.map((t) => (
                    <article key={t.id} className={`tier${t.badge ? " hi" : ""}`}>
                      {t.badge && <span className="badge">{t.badge}</span>}
                      <h3 className="t-name">{t.name}</h3>
                      <p className="t-price">{t.price}</p>
                      <p className="t-tag">{t.tagline}</p>
                      <ul>
                        {t.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      {t.wageAnchor && (
                        <p className="wage">
                          <strong>{t.wageAnchor}</strong>
                        </p>
                      )}
                      <Link href={t.cta.href} className="cta">
                        {t.cta.label} <span aria-hidden="true">→</span>
                      </Link>
                    </article>
                  ))}
                </div>
                <p className="tiers-foot">{PRICING_FOOTNOTE}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ACT VII · ALWAYS ANSWERING — the money act */}
        <section
          ref={setSection(6)}
          className="act"
          id="act-7"
          aria-labelledby="act-7-h"
          style={filmStyle(6)}
        >
          <div className="act-viewport">
            <div className="act-grid">
              <div className="copy-slot">
                <ActCopy act={ACTS[6]}>
                  <div className="rv rv4" style={{ marginTop: 30, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                    <Link href="/start" className="btn-amber">
                      Start a build <span aria-hidden="true">→</span>
                    </Link>
                    <button className="btn-quiet" onClick={replayFromTop}>
                      Watch it again <span aria-hidden="true">↺</span>
                    </button>
                  </div>
                  <footer className="exp-footer rv rv4">
                    <p>
                      Built by <strong>Pavneet</strong> in Surrey/Delta, BC · real builder, no agency
                      handoff
                    </p>
                    <p>{FOOTER_LINES[1]}</p>
                  </footer>
                </ActCopy>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// window.__contrastAudit — measures headline + lede against the COMPOSITED
// scrim (scrim alpha over the live WebGL pixels beneath), per §10.3.
// Requires preserveDrawingBuffer on the canvas (set in PhoneScene).
// ---------------------------------------------------------------------------

function registerContrastAudit(rootRef: React.RefObject<HTMLDivElement>) {
  const lum = (r: number, g: number, b: number) => {
    const f = (c: number) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

  (window as unknown as Record<string, unknown>).__contrastAudit = async (steps = 21) => {
    const root = rootRef.current;
    if (!root) return { error: "no root" };
    root.querySelectorAll(".act").forEach((a) => a.classList.add("in"));
    const gl = root.querySelector<HTMLCanvasElement>(".exp-canvas canvas");
    const tmp = document.createElement("canvas");
    tmp.width = tmp.height = 1;
    const tctx = tmp.getContext("2d", { willReadFrequently: true })!;
    const doc = document.documentElement.scrollHeight - window.innerHeight;
    const rows: { pct: number; text: string; ratio: number; theme: string }[] = [];
    const prevY = window.scrollY;
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    for (let s = 0; s < steps; s++) {
      const pct = s / (steps - 1);
      window.scrollTo(0, doc * pct);
      await new Promise((r) => setTimeout(r, 480)); // let the grade + token flip settle
      const theme = root.getAttribute("data-theme") || "dark";
      const scrim =
        theme === "golden"
          ? { r: 244, g: 233, b: 214, a0: 0.78, a1: 0.4 }
          : { r: 6, g: 8, b: 13, a0: 0.72, a1: 0.35 };

      const els = Array.from(root.querySelectorAll<HTMLElement>(".act-copy .hx, .act-copy .lede"));
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 40 || r.top > window.innerHeight - 40 || r.width === 0) continue;
        const plate = el.closest(".act-copy")!.getBoundingClientRect();
        const m = getComputedStyle(el).color.match(/\d+/g)!.map(Number);
        const tl = lum(m[0], m[1], m[2]);
        const pts: [number, number][] = [
          [r.left + r.width * 0.5, r.top + r.height * 0.5],
          [r.left + r.width * 0.12, r.top + r.height * 0.15],
          [r.left + r.width * 0.88, r.top + r.height * 0.15],
          [r.left + r.width * 0.12, r.top + r.height * 0.85],
          [r.left + r.width * 0.88, r.top + r.height * 0.85],
        ];
        let worst = Infinity;
        for (const [px, py] of pts) {
          // scene pixel under the point (averaged 16×16)
          let sr = 6, sg = 8, sb = 13;
          if (gl) {
            const sx = (px / gl.clientWidth) * gl.width;
            const sy = (py / gl.clientHeight) * gl.height;
            tctx.imageSmoothingEnabled = true;
            tctx.clearRect(0, 0, 1, 1);
            tctx.drawImage(gl, sx - 8, sy - 8, 16, 16, 0, 0, 1, 1);
            const d = tctx.getImageData(0, 0, 1, 1).data;
            sr = d[0];
            sg = d[1];
            sb = d[2];
          }
          // scrim alpha at the point (the CSS radial: 120% 90% at 20% 40%)
          const cx = plate.left + plate.width * 0.2;
          const cy = plate.top + plate.height * 0.4;
          const rx = plate.width * 1.2;
          const ry = plate.height * 0.9;
          const d = Math.sqrt(((px - cx) / rx) ** 2 + ((py - cy) / ry) ** 2);
          let a: number;
          if (d <= 0) a = scrim.a0;
          else if (d < 0.45) a = scrim.a0 + (scrim.a1 - scrim.a0) * (d / 0.45);
          else if (d < 0.72) a = scrim.a1 * (1 - (d - 0.45) / 0.27);
          else a = 0;
          const cr = scrim.r * a + sr * (1 - a);
          const cg = scrim.g * a + sg * (1 - a);
          const cb = scrim.b * a + sb * (1 - a);
          worst = Math.min(worst, ratio(tl, lum(cr, cg, cb)));
        }
        rows.push({
          pct: Math.round(pct * 100),
          text: (el.textContent || "").slice(0, 42),
          ratio: Math.round(worst * 100) / 100,
          theme,
        });
      }
    }
    window.scrollTo(0, prevY);
    document.documentElement.style.scrollBehavior = prevBehavior;
    const failures = rows.filter((r) => r.ratio < 4.5);
    return { pass: failures.length === 0, failures, rows };
  };
}
