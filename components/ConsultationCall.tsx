"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  buildPlan,
  routeForWant,
  type BuildPlan,
  type IntentKey,
  type IntentRoute,
} from "@/lib/data/builder";

/**
 * Handbuilt "AI Builder" — a voice-led, value-FIRST intake.
 *
 * It does NOT act like ChatGPT and it does NOT ask for contact details up
 * front. It behaves like a business consultant that turns a pain point into a
 * real system on screen:
 *
 *   1. "What's wasting the most time?"          (the hook — their pain)
 *   2. a couple of quick qualifiers             (business + volume)
 *   3. DIAGNOSIS card                           (problem → impact → system → time → price)
 *   4. "Want me to design the exact workflow?"  (commitment micro-yes)
 *   5. VISUAL WORKFLOW                          (the wow moment)
 *   6. deeper qualifiers                        (team / jobs / software)
 *   7. BUILD PLAN card                          (time saved, launch, investment)
 *   8. "Where should I send your plan?"         (email — LAST, never first)
 *
 * Fully deterministic + zero API cost: the plan, pricing, and routing all come
 * from lib/data/builder.ts (shared with the homepage hero), so the call and the
 * site recommend the same systems and route to the same real pages.
 *
 * Voice: premium TTS (/api/tts) when a key is set, else free browser
 * SpeechSynthesis. Voice drives pacing; text types in sync.
 */

type StepType = "text" | "chips";
type Answers = Record<string, string>;
type AnswerSpec = { type: StepType | "input"; opts?: string[]; ph?: string };

type DiagnosisCard = {
  kind: "diagnosis";
  problem: string;
  impact: string;
  system: string;
  includes: string[];
  timeline: string;
  price: string;
};
type WorkflowCard = { kind: "workflow"; system: string; steps: { label: string; sub?: string }[] };
type PlanCard = {
  kind: "plan";
  name: string;
  includes: string[];
  timeSaved: string;
  launch: string;
  price: string;
};
type Card = DiagnosisCard | WorkflowCard | PlanCard;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const validEmail = (s?: string) => !!s && /\S+@\S+\.\S+/.test(s);

// 1-sample silent WAV — played inside the tap gesture to "bless" the reused
// <audio> element so later programmatic play() works (esp. iOS Safari).
const SILENT_WAV =
  "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAAAAA==";

// The pain chips — the very first thing we ask. Order = most common first.
const PAIN_CHIPS = [
  "Answering calls",
  "Following up with leads",
  "Sending quotes",
  "Chasing unpaid invoices",
  "Scheduling jobs",
  "Something else",
];

// Pain → the intent that drives the plan templates in builder.ts. We pass a
// canonical phrase to buildPlan/routeForWant so detectIntent resolves cleanly.
function painToIntentText(pain: string): { intent: IntentKey; text: string } {
  if (/invoice|unpaid/i.test(pain)) return { intent: "invoices", text: "chasing unpaid invoices" };
  if (/quote/i.test(pain)) return { intent: "quotes", text: "sending quotes" };
  if (/lead|follow/i.test(pain)) return { intent: "leads", text: "following up with leads" };
  if (/call|schedul|book|appoint/i.test(pain)) return { intent: "calls", text: "answering calls and booking" };
  return { intent: "admin", text: "everything — run the whole business" };
}

// Per-intent qualifier + diagnosis copy. Volume answer is woven into the
// problem line so the diagnosis feels specific to them.
const DIAG: Record<
  IntentKey,
  {
    volQ: string;
    volOpts: string[];
    problem: (vol: string) => string;
    impact: string;
    includes: string[];
  }
> = {
  calls: {
    volQ: "Roughly how many calls do you miss in a week?",
    volOpts: ["A few", "5–15", "15–30", "30+"],
    problem: (v) => `You're missing around ${v.toLowerCase()} calls a week — and most callers never try again.`,
    impact: "Even 2–3 missed jobs a week can mean thousands in lost revenue a month.",
    includes: ["AI Receptionist", "SMS follow-up", "Appointment booking", "Lead tracking"],
  },
  leads: {
    volQ: "How many new leads come in each week?",
    volOpts: ["Under 10", "10–25", "25–50", "50+"],
    problem: (v) => `You're getting ${v.toLowerCase()} leads a week, but slow replies let too many go cold.`,
    impact: "Replying in under a minute can double the leads you actually close.",
    includes: ["AI lead follow-up", "Instant first reply", "Booking link", "Lead tracking"],
  },
  quotes: {
    volQ: "How many quotes do you send in a week?",
    volOpts: ["Under 5", "5–15", "15–30", "30+"],
    problem: (v) => `You're writing ${v.toLowerCase()} quotes a week by hand — slow, and some never go out.`,
    impact: "Faster quotes win the job before a competitor even replies.",
    includes: ["AI Quote Agent", "Detail intake", "Auto-drafted estimate", "Follow-up reminder"],
  },
  invoices: {
    volQ: "Roughly how much is usually sitting unpaid?",
    volOpts: ["Under $2k", "$2k–$10k", "$10k–$25k", "$25k+"],
    problem: (v) => `You've got around ${v} in unpaid invoices, and chasing it eats your evenings.`,
    impact: "Polite automatic reminders get you paid days — sometimes weeks — faster.",
    includes: ["AI invoice reminders", "One-tap pay link", "Gentle escalation", "Auto mark-paid"],
  },
  reviews: {
    volQ: "How many reviews do you get in a month?",
    volOpts: ["Barely any", "A handful", "10–25", "25+"],
    problem: (v) => `You're getting ${v.toLowerCase()} reviews — not enough to win the search game.`,
    impact: "More 5-star reviews puts you above competitors when locals search.",
    includes: ["AI Review Manager", "Auto reply drafts", "Review requests", "Reputation alerts"],
  },
  admin: {
    volQ: "How many hours a week disappear into admin and follow-up?",
    volOpts: ["Under 5", "5–10", "10–20", "20+"],
    problem: (v) => `You're losing ${v.toLowerCase()} hours a week to admin that an AI system can run for you.`,
    impact: "One connected system hands those hours back to you every single week.",
    includes: ["AI Receptionist", "Lead follow-up", "Quote generator", "Invoice reminders"],
  },
};

// Light guess of the business "type" from the typed name, so the workflow
// sub-labels read naturally. Falls back to a generic trades flavor.
function guessBizKey(name: string): string {
  const n = (name || "").toLowerCase();
  if (/lawn|turf|landscap|garden|yard|mow/.test(n)) return "landscaping";
  if (/salon|spa|hair|nail|beauty|barber/.test(n)) return "salon";
  if (/dental|dentist|clinic|ortho|chiro|physio|medical/.test(n)) return "dental";
  if (/realty|real ?estate|realtor|homes|properties/.test(n)) return "realestate";
  if (/restaurant|cafe|cafe|bar|grill|kitchen|pizz|bistro/.test(n)) return "restaurant";
  return "trades";
}

export default function ConsultationCall({ onHomepage = false }: { onHomepage?: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const [started, setStarted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [shown, setShown] = useState(""); // text currently revealed
  const [mode, setMode] = useState<"idle" | "chips" | "input" | "done">("idle");
  const [chips, setChips] = useState<string[]>([]);
  const [inputPh, setInputPh] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [voiceName, setVoiceName] = useState<string | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [route, setRoute] = useState<IntentRoute | null>(null);

  const briefRef = useRef<Answers>({});
  const leadSentRef = useRef(false);
  const resolverRef = useRef<((v: string) => void) | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ttsAvailableRef = useRef<boolean | null>(null); // null=unknown, false=browser TTS only

  // Pick a reasonable English voice once available.
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const pick = () => {
      const vs = window.speechSynthesis.getVoices();
      if (!vs.length) return;
      const v =
        vs.find((x) => /Samantha|Aria|Jenny|Google US English|Natural/i.test(x.name) && /en/i.test(x.lang)) ||
        vs.find((x) => x.lang === "en-US") ||
        vs.find((x) => /^en/i.test(x.lang)) ||
        vs[0];
      voiceRef.current = v || null;
      setVoiceName(v ? v.name : null);
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // On the homepage, don't re-nag a visitor who already skipped this session.
  useEffect(() => {
    if (onHomepage && typeof window !== "undefined" && sessionStorage.getItem("hb_call_skipped")) {
      setDismissed(true);
    }
  }, [onHomepage]);

  // Lock background scroll while the overlay is open (mobile bleed-through).
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!dismissed) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [dismissed]);

  const dismiss = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch {
        /* ignore */
      }
    }
    if (onHomepage && typeof window !== "undefined") sessionStorage.setItem("hb_call_skipped", "1");
    setDismissed(true);
  }, [onHomepage]);

  // Speak + type a line. Resolves when the voice finishes (voice drives pacing).
  // Tries premium TTS (/api/tts) first, overlapped with the typewriter; falls
  // back to free browser SpeechSynthesis on no-key / error / blocked playback.
  const speak = useCallback((text: string) => {
    return new Promise<void>((resolve) => {
      setThinking(false);
      setSpeaking(true);
      setMode("idle");
      setChips([]);
      setShown("");

      // Typewriter starts immediately — text is free, so the screen is alive
      // while premium audio is fetched (overlap = near-zero perceived latency).
      let i = 0;
      const typeDelay = 20;
      const typer = setInterval(() => {
        i = Math.min(i + 1, text.length);
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(typer);
      }, typeDelay);

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        clearTimeout(net);
        clearInterval(typer);
        setShown(text); // force-complete text on audio end — kills dub desync
        setSpeaking(false);
        setTimeout(resolve, 200);
      };

      // Ultimate net so a stuck line can never hang the await-chain.
      const net = setTimeout(done, text.length * 90 + 9000);

      let usedBrowser = false;
      const browserSpeak = () => {
        if (usedBrowser || finished) return;
        usedBrowser = true;
        const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
        // Speak even when no specific voice was pre-selected — the engine uses
        // its system default. Requiring voiceRef.current here was the #1 cause
        // of total silence (voices load async / regex misses on some browsers).
        if (synth) {
          const u = new SpeechSynthesisUtterance(text);
          if (voiceRef.current) u.voice = voiceRef.current;
          u.lang = voiceRef.current?.lang || "en-US";
          u.rate = 1.12;
          u.pitch = 1;
          u.volume = 1;
          u.onend = done;
          u.onerror = done;
          try {
            synth.cancel();
            // Chrome/Edge frequently get stuck "paused" after the silent-unlock
            // utterance — speak() then does nothing. resume() defeats that.
            synth.resume();
            synth.speak(u);
            // If it didn't actually start, nudge it once.
            setTimeout(() => {
              if (!finished && !synth.speaking && !synth.pending) {
                try {
                  synth.resume();
                  synth.speak(u);
                } catch {
                  /* ignore */
                }
              }
            }, 120);
          } catch {
            setTimeout(done, text.length * typeDelay + 600);
            return;
          }
          setTimeout(done, text.length * 48 + 1500);
        } else {
          setTimeout(done, text.length * typeDelay + 600);
        }
      };

      // Premium TTS first (when available).
      (async () => {
        if (ttsAvailableRef.current === false || !audioRef.current) {
          browserSpeak();
          return;
        }
        let url: string | null = null;
        try {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });
          const ct = res.headers.get("content-type") || "";
          if (!res.ok || ct.includes("application/json")) {
            // {fallback:true} or error → no premium voice this session (429 is
            // transient, so don't disable on rate-limit).
            if (res.status !== 429) ttsAvailableRef.current = false;
            browserSpeak();
            return;
          }
          const blob = await res.blob();
          url = URL.createObjectURL(blob);
          ttsAvailableRef.current = true;
          const a = audioRef.current;
          const cleanup = () => {
            if (url) {
              try {
                URL.revokeObjectURL(url);
              } catch {
                /* ignore */
              }
            }
          };
          a.onended = () => {
            cleanup();
            done();
          };
          a.onerror = () => {
            cleanup();
            browserSpeak();
          };
          a.src = url;
          await a.play(); // rejects if not unlocked → caught below
        } catch {
          if (url) {
            try {
              URL.revokeObjectURL(url);
            } catch {
              /* ignore */
            }
          }
          browserSpeak();
        }
      })();
    });
  }, []);

  const waitForAnswer = useCallback((spec: AnswerSpec) => {
    return new Promise<string>((resolve) => {
      resolverRef.current = resolve;
      if (spec.type === "chips") {
        setChips(spec.opts || []);
        setMode("chips");
      } else {
        setInputVal("");
        setInputPh(spec.ph || "");
        setMode("input");
        setTimeout(() => inputRef.current?.focus(), 60);
      }
    });
  }, []);

  const submitAnswer = useCallback((value: string) => {
    const v = value.trim();
    if (!v) return;
    const r = resolverRef.current;
    resolverRef.current = null;
    setMode("idle");
    setChips([]);
    r?.(v);
  }, []);

  const buildTranscript = useCallback((): string => {
    const a = briefRef.current;
    return [
      `Pain: ${a.pain || "—"}`,
      `Business: ${a.name || "—"}`,
      `Volume: ${a.volume || "—"}`,
      `Team: ${a.employees || "—"}`,
      `Jobs/week: ${a.jobs || "—"}`,
      `Software: ${a.software || "—"}`,
      `Recommended: ${a.system || "—"}`,
    ].join("\n");
  }, []);

  // Fire the lead exactly once (guarded), best-effort, never blocks the UI.
  const sendLead = useCallback(() => {
    if (leadSentRef.current) return;
    leadSentRef.current = true;
    const a = briefRef.current;
    fetch("/api/build-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "ai-builder",
        name: a.name || "",
        email: a.email || "",
        kind: a.pain || "",
        want: a.pain || "",
        city: "",
        recommendedBuild: a.system || "",
        transcript: buildTranscript(),
      }),
    }).catch(() => {});
  }, [buildTranscript]);

  // The value-first interview. Deterministic, zero API cost.
  const runBuilder = useCallback(async () => {
    // 1) The hook — their pain, before anything else.
    await wait(120);
    await speak("Hi — I'm the AI Builder. Tell me what part of your business is wasting the most time right now.");
    const pain = await waitForAnswer({ type: "chips", opts: PAIN_CHIPS });
    briefRef.current.pain = pain;
    const { intent, text } = painToIntentText(pain);
    const diag = DIAG[intent];

    // 2) Two quick qualifiers — business + volume.
    await speak("Got it. What's the business called?");
    const name = await waitForAnswer({ type: "input", ph: "e.g. Delta Turf Mowers" });
    briefRef.current.name = name;

    await speak(diag.volQ);
    const volume = await waitForAnswer({ type: "chips", opts: diag.volOpts });
    briefRef.current.volume = volume;

    // Build the plan from the shared engine (same data the site uses).
    const plan: BuildPlan = buildPlan(guessBizKey(name), text);
    briefRef.current.system = plan.system;
    const intentRoute = routeForWant(text);
    setRoute(intentRoute);

    // 3) Diagnosis — problem → impact → system → time → price.
    setThinking(true);
    await wait(900);
    setThinking(false);
    setCard({
      kind: "diagnosis",
      problem: diag.problem(volume),
      impact: diag.impact,
      system: plan.system,
      includes: diag.includes,
      timeline: plan.timeline,
      price: plan.priceRange,
    });
    const cleanTimeline = plan.timeline.replace(/^[≈~]\s*/, "");
    await speak(
      `Here's what I'm seeing for ${name}. I'd build you the ${plan.system} — roughly ${plan.priceRange}, ready in ${cleanTimeline}.`
    );

    // 4) Micro-commitment before the wow moment.
    await speak("Want me to design the exact workflow?");
    await waitForAnswer({ type: "chips", opts: ["Yes, show me the plan"] });

    // 5) The visual workflow — the part that gets people excited.
    setCard({ kind: "workflow", system: plan.system, steps: plan.steps });
    await speak("Here's exactly how it'll run, end to end.");

    // 6) Deeper qualifiers — now that they're invested.
    await speak("A few quick things so the plan fits you. How many people work in the business right now?");
    briefRef.current.employees = await waitForAnswer({
      type: "chips",
      opts: ["Just me", "2–5", "6–15", "15+"],
    });

    await speak("And roughly how many jobs do you complete in a week?");
    briefRef.current.jobs = await waitForAnswer({ type: "input", ph: "e.g. 20" });

    await speak("Last one — what software do you already use?");
    briefRef.current.software = await waitForAnswer({
      type: "input",
      ph: "e.g. QuickBooks, Jobber — or 'none yet'",
    });

    // 7) The finished build plan.
    setThinking(true);
    await wait(1000);
    setThinking(false);
    setCard({
      kind: "plan",
      name: name,
      includes: diag.includes,
      timeSaved: plan.impact,
      launch: plan.timeline,
      price: plan.priceRange,
    });
    await speak(`Your AI build plan is ready, ${name}.`);

    // 8) Email — LAST. Now there's a reason to give it.
    await speak("Where should I send it?");
    let email = await waitForAnswer({ type: "input", ph: "you@business.com" });
    if (!validEmail(email)) {
      await speak("That email looks off — what's the best one to send your plan to?");
      email = await waitForAnswer({ type: "input", ph: "you@business.com" });
    }
    briefRef.current.email = email;
    if (validEmail(email)) sendLead();

    await speak("Done — it's on its way. Here's where to go next.");
    setMode("done");
  }, [speak, waitForAnswer, sendLead]);

  const start = useCallback(() => {
    setStarted(true);
    // Unlock audio within the user gesture (both engines need their own unlock).
    if (typeof window !== "undefined") {
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(" "));
        } catch {
          /* ignore */
        }
      }
      try {
        const a = audioRef.current ?? new Audio();
        a.setAttribute("playsinline", "");
        a.preload = "auto";
        a.src = SILENT_WAV;
        const p = a.play();
        if (p && typeof p.then === "function") p.then(() => a.pause()).catch(() => {});
        audioRef.current = a;
      } catch {
        /* ignore */
      }
    }
    runBuilder();
  }, [runBuilder]);

  if (dismissed) return null;

  return (
    <div className="hbc-root">
      {/* inject as raw HTML so the quotes in font-family don't get escaped to
          &quot; on the server but left raw on the client (that mismatch tripped
          React hydration errors #418/#423/#425). */}
      <style dangerouslySetInnerHTML={{ __html: HBC_CSS }} />

      {onHomepage ? (
        <button className="hbc-exit" onClick={dismiss} aria-label="Skip and explore the site">
          ✕ Skip
        </button>
      ) : (
        <Link href="/" className="hbc-exit" aria-label="Back to Handbuilt">
          ← Handbuilt
        </Link>
      )}
      {voiceName && <span className="hbc-voice">voice: {voiceName}</span>}

      {!started && (
        <div className="hbc-gate">
          <button className="hbc-gate-tap" onClick={start} aria-label="Start the AI Builder">
            <span className="hbc-dot" />
            <span className="hbc-gate-title">Tap to start the AI Builder</span>
            <span className="hbc-gate-sub">turn your sound on · it talks you through it</span>
          </button>
          {onHomepage && (
            <button className="hbc-gate-skip" onClick={dismiss}>
              skip — just explore the site →
            </button>
          )}
        </div>
      )}

      <div className="hbc-stage">
        <div
          className={`hbc-lines ${speaking ? "speaking" : thinking ? "thinking" : "idle"}`}
          aria-hidden
        >
          <span className="ln" />
          <span className="ln" />
          <span className="ln" />
          <span className="ln" />
          <span className="ln" />
        </div>

        <div className="hbc-q" aria-live="polite">
          {shown}
          {speaking && <span className="hbc-cursor" />}
        </div>

        {/* Diagnosis / workflow / plan cards render here, between the spoken
            line and the answer controls. */}
        {card && card.kind === "diagnosis" && (
          <div className="hbc-card hbc-diag">
            <div className="hbc-diag-row">
              <span className="hbc-diag-k">Current problem</span>
              <span className="hbc-diag-v">{card.problem}</span>
            </div>
            <div className="hbc-diag-row">
              <span className="hbc-diag-k">Potential impact</span>
              <span className="hbc-diag-v">{card.impact}</span>
            </div>
            <div className="hbc-diag-row">
              <span className="hbc-diag-k">Recommended system</span>
              <span className="hbc-diag-v">
                <strong>{card.system}</strong>
                <span className="hbc-chips-inline">
                  {card.includes.map((x) => (
                    <span key={x}>✓ {x}</span>
                  ))}
                </span>
              </span>
            </div>
            <div className="hbc-diag-split">
              <div>
                <span className="hbc-diag-k">Build time</span>
                <span className="hbc-diag-v">{card.timeline}</span>
              </div>
              <div>
                <span className="hbc-diag-k">Estimated investment</span>
                <span className="hbc-diag-v">{card.price}</span>
              </div>
            </div>
          </div>
        )}

        {card && card.kind === "workflow" && (
          <div className="hbc-card hbc-flow">
            <div className="hbc-flow-title">{card.system}</div>
            {card.steps.map((s, idx) => (
              <div className="hbc-flow-step" key={s.label}>
                <div className="hbc-flow-node">
                  <span className="hbc-flow-label">{s.label}</span>
                  {s.sub && <span className="hbc-flow-sub">{s.sub}</span>}
                </div>
                {idx < card.steps.length - 1 && <span className="hbc-flow-arrow">↓</span>}
              </div>
            ))}
          </div>
        )}

        {card && card.kind === "plan" && (
          <div className="hbc-card hbc-plan">
            <div className="hbc-plan-head">Your AI Build Plan</div>
            <div className="hbc-row">
              <span>Business</span>
              <span>{card.name}</span>
            </div>
            <div className="hbc-row hbc-row-top">
              <span>Recommended systems</span>
              <span className="hbc-plan-sys">
                {card.includes.map((x) => (
                  <span key={x}>✓ {x}</span>
                ))}
              </span>
            </div>
            <div className="hbc-row">
              <span>Estimated time saved</span>
              <span>{card.timeSaved}</span>
            </div>
            <div className="hbc-row">
              <span>Estimated launch</span>
              <span>{card.launch}</span>
            </div>
            <div className="hbc-row">
              <span>Estimated investment</span>
              <span>{card.price}</span>
            </div>
          </div>
        )}

        <div className="hbc-answers">
          {thinking && <span className="hbc-thinking" aria-label="designing" />}

          {!thinking && mode === "chips" && (
            <div className="hbc-chips">
              {chips.map((c) => (
                <button key={c} className="hbc-chip" onClick={() => submitAnswer(c)}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {!thinking && mode === "input" && (
            <form
              className="hbc-inputrow"
              onSubmit={(e) => {
                e.preventDefault();
                submitAnswer(inputVal);
              }}
            >
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={inputPh}
                autoComplete="off"
                inputMode={inputPh.includes("@") ? "email" : "text"}
              />
              <button type="submit" aria-label="Send">
                ↵
              </button>
            </form>
          )}
        </div>

        {mode === "done" && route && (
          <div className="hbc-cta">
            <Link className="primary" href={route.primaryHref}>
              {route.primaryLabel} →
            </Link>
            <Link className="ghost" href={route.demoHref}>
              {route.demoLabel}
            </Link>
            {onHomepage ? (
              <button className="ghost hbc-linkbtn" onClick={dismiss}>
                Back to site
              </button>
            ) : (
              <Link className="ghost" href="/">
                Back to site
              </Link>
            )}
            <p className="hbc-note">Your plan has been sent. I&apos;ll follow up by email shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const HBC_CSS = `
.hbc-root{position:fixed;inset:0;z-index:100;background:#fff;color:#1d1d1f;
  display:flex;align-items:center;justify-content:center;padding:24px;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif;-webkit-font-smoothing:antialiased;overflow-y:auto}
.hbc-exit{position:fixed;top:18px;left:20px;font-size:13px;color:#a1a1a6;text-decoration:none;z-index:120}
.hbc-exit:hover{color:#1d1d1f}
.hbc-voice{position:fixed;top:20px;right:20px;font-size:11px;color:#d2d2d7;z-index:120}
.hbc-gate{position:fixed;inset:0;z-index:110;background:#fff;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px}
.hbc-gate-tap{border:none;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:24px}
.hbc-gate-skip{border:none;background:none;cursor:pointer;color:#a1a1a6;font-size:13px;position:absolute;bottom:36px}
.hbc-gate-skip:hover{color:#1d1d1f}
.hbc-dot{width:14px;height:14px;border-radius:50%;background:#D97706;animation:hbc-pulse 1.8s ease-in-out infinite}
@keyframes hbc-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.4}}
.hbc-gate-title{font-size:17px;color:#1d1d1f}
.hbc-gate-sub{font-size:12px;color:#a1a1a6}
.hbc-stage{width:100%;max-width:600px;display:flex;flex-direction:column;align-items:center;gap:32px;padding:40px 0}
.hbc-lines{display:flex;flex-direction:column;gap:10px;width:160px}
.hbc-lines .ln{height:2px;border-radius:2px;background:#c7c7cc;transform-origin:center}
.hbc-lines.idle .ln{animation:hbc-breathe 3.8s ease-in-out infinite}
.hbc-lines.idle .ln:nth-child(1){width:100%}
.hbc-lines.idle .ln:nth-child(2){width:78%;animation-delay:.4s}
.hbc-lines.idle .ln:nth-child(3){width:90%;animation-delay:.8s}
.hbc-lines.idle .ln:nth-child(4){width:64%;animation-delay:1.2s}
.hbc-lines.idle .ln:nth-child(5){width:84%;animation-delay:1.6s}
@keyframes hbc-breathe{0%,100%{transform:scaleX(.5);opacity:.3}50%{transform:scaleX(1);opacity:.6}}
.hbc-lines.speaking .ln{background:#8a8a8e;animation:hbc-talk .5s ease-in-out infinite}
.hbc-lines.speaking .ln:nth-child(2){animation-delay:.08s}
.hbc-lines.speaking .ln:nth-child(3){animation-delay:.16s}
.hbc-lines.speaking .ln:nth-child(4){animation-delay:.24s}
.hbc-lines.speaking .ln:nth-child(5){animation-delay:.32s}
@keyframes hbc-talk{0%,100%{transform:scaleY(1);opacity:.45}50%{transform:scaleY(3.4);opacity:1}}
.hbc-lines.thinking .ln{background:#c7c7cc;animation:hbc-think 1.4s ease-in-out infinite}
.hbc-lines.thinking .ln:nth-child(2){animation-delay:.12s}
.hbc-lines.thinking .ln:nth-child(3){animation-delay:.24s}
.hbc-lines.thinking .ln:nth-child(4){animation-delay:.36s}
.hbc-lines.thinking .ln:nth-child(5){animation-delay:.48s}
@keyframes hbc-think{0%,100%{transform:scaleX(.4);opacity:.25}50%{transform:scaleX(.8);opacity:.55}}
.hbc-q{font-size:26px;line-height:1.45;font-weight:400;text-align:center;min-height:64px;max-width:540px;letter-spacing:-.01em}
.hbc-cursor{display:inline-block;width:2px;height:26px;background:#1d1d1f;margin-left:1px;vertical-align:text-bottom;animation:hbc-blink 1.1s step-end infinite}
@keyframes hbc-blink{50%{opacity:0}}
.hbc-answers{min-height:54px;display:flex;align-items:center;justify-content:center;width:100%}
.hbc-thinking{width:8px;height:8px;border-radius:50%;background:#c7c7cc;
  box-shadow:14px 0 #c7c7cc,28px 0 #c7c7cc;animation:hbc-dots 1s ease-in-out infinite}
@keyframes hbc-dots{0%,100%{opacity:.25}50%{opacity:.7}}
.hbc-chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.hbc-chip{border:1px solid #d2d2d7;background:#fff;border-radius:999px;padding:11px 22px;font-size:16px;cursor:pointer;transition:all .18s;color:#1d1d1f}
.hbc-chip:hover{background:#1d1d1f;color:#fff;border-color:#1d1d1f}
.hbc-inputrow{display:flex;gap:8px;width:100%;max-width:420px}
.hbc-inputrow input{flex:1;border:none;border-bottom:1.5px solid #d2d2d7;background:none;padding:12px 4px;font-size:19px;outline:none;text-align:center;color:#1d1d1f}
.hbc-inputrow input:focus{border-color:#1d1d1f}
.hbc-inputrow button{border:none;background:none;color:#86868b;font-size:22px;cursor:pointer;padding:0 8px}
.hbc-inputrow button:hover{color:#1d1d1f}

/* ---- cards ---- */
.hbc-card{width:100%;max-width:480px;text-align:left;border:1px solid #ececef;border-radius:16px;padding:22px;background:#fafafa;animation:hbc-rise .4s ease both}
@keyframes hbc-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.hbc-diag-row{padding:12px 0;border-bottom:1px solid #f0f0f2;display:flex;flex-direction:column;gap:5px}
.hbc-diag-k{font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#a1a1a6}
.hbc-diag-v{font-size:16px;color:#1d1d1f;line-height:1.4}
.hbc-chips-inline{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:8px}
.hbc-chips-inline span{font-size:13px;color:#D97706;font-weight:600}
.hbc-diag-split{display:flex;gap:18px;padding-top:14px}
.hbc-diag-split>div{flex:1;display:flex;flex-direction:column;gap:5px}
.hbc-diag-split .hbc-diag-v{font-weight:600;font-size:17px}

.hbc-flow{display:flex;flex-direction:column;align-items:center;gap:0;max-width:400px}
.hbc-flow-title{font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#D97706;margin-bottom:14px}
.hbc-flow-step{display:flex;flex-direction:column;align-items:center;width:100%}
.hbc-flow-node{width:100%;text-align:center;border:1px solid #e6e6ea;border-radius:12px;padding:11px 14px;background:#fff;display:flex;flex-direction:column;gap:2px}
.hbc-flow-label{font-size:15px;font-weight:600;color:#1d1d1f}
.hbc-flow-sub{font-size:12px;color:#a1a1a6}
.hbc-flow-arrow{color:#D97706;font-size:16px;line-height:1;padding:5px 0}

.hbc-plan-head{font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#D97706;margin-bottom:8px}
.hbc-row{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:15px}
.hbc-row span:first-child{color:#86868b;white-space:nowrap}
.hbc-row span:last-child{font-weight:500;text-align:right}
.hbc-row-top{align-items:flex-start}
.hbc-plan-sys{display:flex;flex-direction:column;gap:4px;align-items:flex-end}
.hbc-plan-sys span{font-size:14px;color:#D97706;font-weight:600}

.hbc-cta{display:flex;flex-direction:column;gap:1px;width:100%;max-width:460px}
.hbc-cta a,.hbc-cta button{text-align:center;text-decoration:none;font-size:16px;padding:15px;border-radius:12px;border:none;background:none;cursor:pointer;width:100%;font-family:inherit}
.hbc-cta .primary{background:#D97706;color:#fff;font-weight:600}
.hbc-cta .ghost{color:#1d1d1f}
.hbc-cta .ghost:hover{color:#86868b}
.hbc-note{font-size:12px;color:#c7c7cc;text-align:center;margin-top:16px}
@media (prefers-reduced-motion: reduce){
  .hbc-lines .ln,.hbc-dot,.hbc-cursor,.hbc-thinking,.hbc-card{animation:none!important}
}
`;
