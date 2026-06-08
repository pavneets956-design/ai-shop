"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Handbuilt "AI call" — a cinematic, voice-led intake experience.
 *
 * A full-screen white overlay: five grey lines act as the AI's "voice".
 * It speaks first (browser SpeechSynthesis — free, no key), greets the
 * visitor, then runs a short adaptive interview. At the end it captures
 * the lead via /api/build-request (email to the owner) and routes the
 * visitor to the right page.
 *
 * v1 is fully client-side + scripted — no LLM key required, so it ships
 * without the OPENAI_API_KEY blocker. The conversation can be upgraded to
 * a live model later behind the same UI.
 */

type StepType = "text" | "chips";
type Step = {
  key: string;
  q: string;
  type: StepType;
  ph?: string;
  opts?: string[];
};

type Answers = Record<string, string>;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

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
  const [shown, setShown] = useState(""); // text currently revealed
  const [mode, setMode] = useState<"idle" | "chips" | "input" | "done">("idle");
  const [chips, setChips] = useState<string[]>([]);
  const [inputPh, setInputPh] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [voiceName, setVoiceName] = useState<string | null>(null);
  const [plan, setPlan] = useState<{ rows: [string, string][]; build: string } | null>(null);

  const answersRef = useRef<Answers>({});
  const resolverRef = useRef<((v: string) => void) | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    const open = !dismissed;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [dismissed]);

  const dismiss = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    if (onHomepage && typeof window !== "undefined") sessionStorage.setItem("hb_call_skipped", "1");
    setDismissed(true);
  }, [onHomepage]);

  // Speak + type a line. Resolves when the voice finishes (voice drives pacing).
  const speak = useCallback((text: string) => {
    return new Promise<void>((resolve) => {
      setSpeaking(true);
      setMode("idle");
      setChips([]);
      setShown("");
      let i = 0;
      const typeDelay = 42;
      const typer = setInterval(() => {
        i = Math.min(i + 1, text.length);
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(typer);
      }, typeDelay);

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        clearInterval(typer);
        setShown(text);
        setSpeaking(false);
        setTimeout(resolve, 480);
      };

      const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
      if (synth && voiceRef.current) {
        const u = new SpeechSynthesisUtterance(text);
        u.voice = voiceRef.current;
        u.rate = 0.96;
        u.pitch = 1;
        u.volume = 1;
        u.onend = done;
        u.onerror = done;
        synth.cancel();
        synth.speak(u);
        // Safety net if the browser never fires onend.
        setTimeout(done, text.length * 70 + 2500);
      } else {
        setTimeout(done, text.length * typeDelay + 600);
      }
    });
  }, []);

  const waitForAnswer = useCallback((step: Step) => {
    return new Promise<string>((resolve) => {
      resolverRef.current = resolve;
      if (step.type === "chips") {
        setChips(step.opts || []);
        setMode("chips");
      } else {
        setInputVal("");
        setInputPh(step.ph || "");
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

  const sendLead = useCallback((a: Answers) => {
    const transcript = buildSteps(a)
      .map((s) => `${s.q}\n→ ${a[s.key] || "—"}`)
      .join("\n\n");
    // Best-effort; never blocks the UI.
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
        transcript,
      }),
    }).catch(() => {});
  }, []);

  const finish = useCallback(
    async (a: Answers) => {
      const name = a.name || "your business";
      sendLead(a);
      await speak(`Perfect. Your plan is on its way, ${a.name || "and"} I'll be in touch shortly.`);
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
    },
    [sendLead, speak]
  );

  const runFlow = useCallback(async () => {
    await wait(500);
    await speak("Hello.");
    await wait(450);
    await speak("You've reached Handbuilt.");
    await wait(350);
    await speak("I build AI agents and AI-powered websites for businesses.");
    await wait(350);
    await speak("Think of this as a quick call. I'll ask a few things, then hand you a plan.");
    await wait(300);

    let step = 0;
    // Steps are rebuilt each turn so {name} interpolation fills in.
    while (true) {
      const steps = buildSteps(answersRef.current);
      if (step >= steps.length) break;
      const s = steps[step];
      await speak(s.q);
      const ans = await waitForAnswer(s);
      answersRef.current = { ...answersRef.current, [s.key]: ans };
      step += 1;
    }
    await finish(answersRef.current);
  }, [speak, waitForAnswer, finish]);

  const start = useCallback(() => {
    setStarted(true);
    // Unlock audio within the user gesture.
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(" "));
      } catch {
        /* ignore */
      }
    }
    runFlow();
  }, [runFlow]);

  if (dismissed) return null;

  return (
    <div className="hbc-root">
      <style>{HBC_CSS}</style>

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
        <div className={`hbc-lines ${speaking ? "speaking" : "idle"}`} aria-hidden>
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
          {mode === "chips" && (
            <div className="hbc-chips">
              {chips.map((c) => (
                <button key={c} className="hbc-chip" onClick={() => submitAnswer(c)}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {mode === "input" && (
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
.hbc-dot{width:14px;height:14px;border-radius:50%;background:#1d1d1f;animation:hbc-pulse 1.8s ease-in-out infinite}
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
.hbc-q{font-size:27px;line-height:1.45;font-weight:400;text-align:center;min-height:80px;max-width:540px;letter-spacing:-.01em}
.hbc-cursor{display:inline-block;width:2px;height:26px;background:#1d1d1f;margin-left:1px;vertical-align:text-bottom;animation:hbc-blink 1.1s step-end infinite}
@keyframes hbc-blink{50%{opacity:0}}
.hbc-answers{min-height:54px;display:flex;justify-content:center;width:100%}
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
.hbc-cta .primary{background:#1d1d1f;color:#fff;font-weight:500}
.hbc-cta .ghost{color:#1d1d1f}
.hbc-cta .ghost:hover{color:#86868b}
.hbc-note{font-size:12px;color:#c7c7cc;text-align:center;margin-top:20px}
@media (prefers-reduced-motion: reduce){
  .hbc-lines .ln,.hbc-dot,.hbc-cursor{animation:none!important}
}
`;
