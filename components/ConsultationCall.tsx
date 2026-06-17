"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Handbuilt "AI call" — a cinematic, voice-led intake experience.
 *
 * A full-screen white overlay: five grey lines act as the AI's "voice".
 * It speaks first (browser SpeechSynthesis — free, no key), greets the
 * visitor, then runs an interview. At the end it captures the lead via
 * /api/build-request (email to the owner) and routes the visitor onward.
 *
 * Two engines, chosen automatically:
 *   LIVE      — /api/consultation drives a real LLM that handles ANY typed
 *               answer and extracts the brief incrementally. Used when
 *               OPENAI_API_KEY is configured in the deploy.
 *   SCRIPTED  — a fixed adaptive interview (buildSteps). Used as the
 *               cold-start fallback when no key is present, AND as a
 *               deterministic finisher if the live model fails mid-call.
 *
 * The probe IS the first live turn, fetched WHILE the fixed greeting plays —
 * so the live path adds no perceptible latency, and /start NEVER breaks in
 * prod with or without the key.
 */

type StepType = "text" | "chips";
type Step = { key: string; q: string; type: StepType; ph?: string; opts?: string[] };
type Answers = Record<string, string>;
type ChatMessage = { role: "user" | "assistant"; content: string };
type LiveTurn = { reply: string; chips: string[]; briefPatch: Answers; done: boolean };
type AnswerSpec = { type: StepType | "input"; opts?: string[]; ph?: string };

const REQUIRED_FIELDS = ["name", "kind", "want", "city", "email"] as const;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const validEmail = (s?: string) => !!s && /\S+@\S+\.\S+/.test(s);

// 1-sample silent WAV — played inside the tap gesture to "bless" the reused
// <audio> element so later programmatic play() works (esp. iOS Safari).
const SILENT_WAV =
  "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAAAAA==";
const hasAll = (b: Answers) =>
  REQUIRED_FIELDS.every((k) => (k === "email" ? validEmail(b[k]) : !!b[k]?.trim()));

function buildSteps(a: Answers): Step[] {
  const name = a.name || "your business";
  return [
    { key: "name", type: "text", q: "Let's start — what's your business called?", ph: "type your answer" },
    {
      key: "kind",
      type: "chips",
      q: `Good to meet you. What does ${name} do?`,
      opts: ["A service business", "A shop / online store", "A clinic or practice", "Something else"],
    },
    {
      key: "want",
      type: "chips",
      q: `What do you want the AI to do for ${name}?`,
      opts: ["Answer calls & book jobs", "Reply to website chats", "Capture leads 24/7", "Just build me a great site"],
    },
    { key: "city", type: "text", q: "Where are you based?", ph: "city" },
    { key: "email", type: "text", q: "Last thing — where should I send your plan?", ph: "you@business.com" },
  ];
}

// Canned prompts for the deterministic finisher (used if the live model dies
// mid-call). Only fields still missing get asked — no re-asking.
const FINISH_STEPS: Step[] = [
  { key: "name", type: "text", q: "Sorry — let's pick this back up. What's your business called?", ph: "type your answer" },
  {
    key: "kind",
    type: "chips",
    q: "And what does it do?",
    opts: ["A service business", "A shop / online store", "A clinic or practice", "Something else"],
  },
  {
    key: "want",
    type: "chips",
    q: "What should the AI handle for you?",
    opts: ["Answer calls & book jobs", "Reply to website chats", "Capture leads 24/7", "Just build me a great site"],
  },
  { key: "city", type: "text", q: "Where are you based?", ph: "city" },
  { key: "email", type: "text", q: "Last thing — what's the best email for your plan?", ph: "you@business.com" },
];

function recommendBuild(want: string): string {
  if (/calls|book/i.test(want)) return "AI Receptionist";
  if (/leads|capture/i.test(want)) return "Lead Engine";
  if (/chat/i.test(want)) return "Website + AI chat";
  return "Custom website build";
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
  const [plan, setPlan] = useState<{ rows: [string, string][]; build: string } | null>(null);

  const briefRef = useRef<Answers>({});
  const messagesRef = useRef<ChatMessage[]>([]);
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
        if (synth && voiceRef.current) {
          const u = new SpeechSynthesisUtterance(text);
          u.voice = voiceRef.current;
          u.rate = 1.12;
          u.pitch = 1;
          u.volume = 1;
          u.onend = done;
          u.onerror = done;
          synth.cancel();
          synth.speak(u);
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

  // Build a readable transcript from the live conversation, or from the brief
  // if the call was scripted/degraded (thin message history).
  const buildTranscript = useCallback((): string => {
    const msgs = messagesRef.current;
    if (msgs.length >= 2) {
      return msgs.map((m) => (m.role === "assistant" ? "AI:  " : "You: ") + m.content).join("\n");
    }
    return buildSteps(briefRef.current)
      .map((s) => `${s.q}\n→ ${briefRef.current[s.key] || "—"}`)
      .join("\n\n");
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
        source: "consultation",
        name: a.name || "",
        email: a.email || "",
        kind: a.kind || "",
        want: a.want || "",
        city: a.city || "",
        recommendedBuild: recommendBuild(a.want || ""),
        transcript: buildTranscript(),
      }),
    }).catch(() => {});
  }, [buildTranscript]);

  const showPlan = useCallback(() => {
    const a = briefRef.current;
    setMode("done");
    setPlan({
      build: recommendBuild(a.want || ""),
      rows: [
        ["Business", a.name || "—"],
        ["Type", a.kind || "—"],
        ["AI should", a.want || "—"],
        ["Location", a.city || "—"],
        ["Recommended build", recommendBuild(a.want || "")],
      ],
    });
  }, []);

  // Wrap up. speakClosing=false when the live model already spoke its closing.
  const finish = useCallback(
    async (speakClosing: boolean) => {
      if (validEmail(briefRef.current.email)) sendLead();
      if (speakClosing) {
        const n = briefRef.current.name;
        await speak(`Perfect. Your plan is on its way${n ? ", " + n : ""} — I'll be in touch shortly.`);
      }
      showPlan();
    },
    [sendLead, speak, showPlan]
  );

  // One live turn against the API. Returns null on no-key / error / bad shape.
  const callConsult = useCallback(async (): Promise<LiveTurn | null> => {
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesRef.current, brief: briefRef.current }),
      });
      if (!res.ok) return null;
      const d = await res.json();
      if (!d || d.fallback || typeof d.reply !== "string" || !d.reply.trim()) return null;
      return {
        reply: d.reply.trim(),
        chips: Array.isArray(d.chips) ? d.chips.filter((c: unknown) => typeof c === "string") : [],
        briefPatch: d.briefPatch && typeof d.briefPatch === "object" ? d.briefPatch : {},
        done: Boolean(d.done),
      };
    } catch {
      return null;
    }
  }, []);

  // Retry once — most gpt-4o-mini hiccups are transient.
  const callConsultRetry = useCallback(async (): Promise<LiveTurn | null> => {
    const first = await callConsult();
    if (first) return first;
    await wait(500);
    return callConsult();
  }, [callConsult]);

  const mergeBrief = useCallback((patch: Answers) => {
    const merged = { ...briefRef.current };
    REQUIRED_FIELDS.forEach((k) => {
      const v = patch?.[k];
      if (typeof v === "string" && v.trim()) merged[k] = v.trim();
    });
    briefRef.current = merged;
  }, []);

  // Deterministic finisher: collect whatever's still missing with canned
  // prompts (never re-asking), then wrap up. Used when the model fails mid-call.
  const degradedFinish = useCallback(async () => {
    for (const s of FINISH_STEPS) {
      const have = briefRef.current[s.key];
      if (s.key === "email" ? validEmail(have) : have?.trim()) continue;
      await speak(s.q);
      const ans = await waitForAnswer({ type: s.type, opts: s.opts, ph: s.ph });
      briefRef.current = { ...briefRef.current, [s.key]: ans };
    }
    await finish(true);
  }, [speak, waitForAnswer, finish]);

  // Live LLM loop. `first` is the prefetched opening turn.
  const runLive = useCallback(
    async (first: LiveTurn) => {
      let turn = first;
      while (true) {
        mergeBrief(turn.briefPatch);
        await speak(turn.reply);
        messagesRef.current = [...messagesRef.current, { role: "assistant", content: turn.reply }];

        if (turn.done) {
          if (hasAll(briefRef.current)) await finish(false);
          else await degradedFinish();
          return;
        }

        const ph = /e-?mail/i.test(turn.reply) ? "you@business.com" : "type your answer";
        const ans = await waitForAnswer({
          type: turn.chips.length ? "chips" : "input",
          opts: turn.chips,
          ph,
        });
        messagesRef.current = [...messagesRef.current, { role: "user", content: ans }];

        setThinking(true);
        const next = await callConsultRetry();
        setThinking(false);
        if (!next) {
          await degradedFinish();
          return;
        }
        turn = next;
      }
    },
    [mergeBrief, speak, waitForAnswer, callConsultRetry, finish, degradedFinish]
  );

  // Scripted cold-start flow (no key). Same fields, fixed questions.
  const runScripted = useCallback(async () => {
    let step = 0;
    while (true) {
      const steps = buildSteps(briefRef.current);
      if (step >= steps.length) break;
      const s = steps[step];
      await speak(s.q);
      const ans = await waitForAnswer({ type: s.type, opts: s.opts, ph: s.ph });
      briefRef.current = { ...briefRef.current, [s.key]: ans };
      step += 1;
    }
    await finish(true);
  }, [speak, waitForAnswer, finish]);

  const runFlow = useCallback(async () => {
    // Prefetch the first live turn so the interview starts instantly if the
    // visitor opts in. null => no key (or error) => scripted flow.
    const firstTurn = callConsultRetry();

    // 1) Orient: where they are + what we do (short, snappy).
    await wait(180);
    await speak("Hi — you've reached Handbuilt.");
    await wait(140);
    await speak("We build AI workers for small businesses — receptionists, quote agents, and follow-up systems that answer your calls, send quotes, and chase leads for you.");
    await wait(140);

    // 2) Offer the choice: plan + quote here, or skip to the site.
    await speak("I can build you a custom plan and a ballpark quote in about a minute. Want to do that now, or skip and explore the site?");
    const choice = await waitForAnswer({
      type: "chips",
      opts: ["Yes — build my plan", "Skip — explore the site"],
    });
    if (/skip/i.test(choice)) {
      dismiss();
      return;
    }

    // 3) Run the interview (live LLM if a key is set, else scripted).
    await wait(120);
    await speak("Perfect — let's do it.");
    await wait(120);
    const first = await firstTurn;
    if (first) await runLive(first);
    else await runScripted();
  }, [callConsultRetry, speak, waitForAnswer, dismiss, runLive, runScripted]);

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
    runFlow();
  }, [runFlow]);

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
          <button className="hbc-gate-tap" onClick={start} aria-label="Take the call">
            <span className="hbc-dot" />
            <span className="hbc-gate-title">Tap to take the call</span>
            <span className="hbc-gate-sub">turn your sound on · built-in voice</span>
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

        <div className="hbc-answers">
          {thinking && <span className="hbc-thinking" aria-label="thinking" />}

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

        {mode === "done" && plan && (
          <div className="hbc-plan">
            {plan.rows.map(([k, v]) => (
              <div className="hbc-row" key={k}>
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
            <div className="hbc-cta">
              <Link className="primary" href="/pricing">
                See your recommended build →
              </Link>
              <Link className="ghost" href="/demo">
                Watch a live demo
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
            </div>
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
.hbc-stage{width:100%;max-width:600px;display:flex;flex-direction:column;align-items:center;gap:44px}
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
.hbc-q{font-size:27px;line-height:1.45;font-weight:400;text-align:center;min-height:80px;max-width:540px;letter-spacing:-.01em}
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
.hbc-plan{width:100%;max-width:460px;text-align:left}
.hbc-row{display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid #f0f0f2;font-size:16px}
.hbc-row span:first-child{color:#86868b}
.hbc-row span:last-child{font-weight:500;text-align:right;max-width:60%}
.hbc-cta{display:flex;flex-direction:column;gap:1px;margin-top:28px}
.hbc-cta a,.hbc-cta button{text-align:center;text-decoration:none;font-size:16px;padding:15px;border-radius:12px;border:none;background:none;cursor:pointer;width:100%;font-family:inherit}
.hbc-cta .primary{background:#D97706;color:#fff;font-weight:600}
.hbc-cta .ghost{color:#1d1d1f}
.hbc-cta .ghost:hover{color:#86868b}
.hbc-note{font-size:12px;color:#c7c7cc;text-align:center;margin-top:20px}
@media (prefers-reduced-motion: reduce){
  .hbc-lines .ln,.hbc-dot,.hbc-cursor,.hbc-thinking{animation:none!important}
}
`;
