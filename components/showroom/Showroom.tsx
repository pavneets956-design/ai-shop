"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Headset, Calculator, Send, Receipt, Star, FileText,
  ArrowRight, RefreshCw, Check, Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  WORKERS, INDUSTRIES, QUICK_PROMPTS, fillPrompt,
  scriptedResponse, initialState,
  type Worker, type Industry, type CapturedFields, type DemoResponse,
} from "@/lib/data/showroom";

const ICONS: Record<string, LucideIcon> = {
  Headset, Calculator, Send, Receipt, Star, FileText,
};

const MAX_SESSION_TURNS = 8; // user messages per demo session

type Msg = { role: "user" | "assistant"; content: string; id: number };
type Event = { id: number; text: string };

const spring = { type: "spring" as const, stiffness: 320, damping: 30 };

let uid = 1;
const nextId = () => uid++;

// ---------------------------------------------------------------------------
export default function Showroom() {
  const reduce = useReducedMotion();
  const [worker, setWorker] = useState<Worker>(WORKERS[0]);
  const [industry, setIndustry] = useState<Industry>(INDUSTRIES[0]);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [streaming, setStreaming] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const [captured, setCaptured] = useState<CapturedFields | null>(null);
  const [leadSummary, setLeadSummary] = useState("");
  const [nextActions, setNextActions] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [cta, setCta] = useState<DemoResponse["cta"]>({ show: false, label: "", href: "/create" });

  const [turns, setTurns] = useState(0);
  const [limited, setLimited] = useState(false);
  const [busy, setBusy] = useState(false);

  const runId = useRef(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ---- seed a believable preloaded example whenever worker/industry changes ----
  const seed = useCallback((w: Worker, ind: Industry) => {
    runId.current++;
    const sampleUser = fillPrompt(QUICK_PROMPTS[w.id][0], ind);
    const greet = initialState(w, ind).greeting;
    const r = scriptedResponse(w, ind, [
      { role: "assistant", content: greet },
      { role: "user", content: sampleUser },
    ]);
    setMessages([
      { role: "assistant", content: greet, id: nextId() },
      { role: "user", content: sampleUser, id: nextId() },
      { role: "assistant", content: r.assistantMessage, id: nextId() },
    ]);
    setCaptured(r.capturedFields);
    setLeadSummary(r.leadSummary);
    setNextActions(r.nextActions);
    setEvents(r.systemEvents.map((t) => ({ id: nextId(), text: t })));
    setSuggested(r.suggestedReplies);
    setCta({ show: false, label: "", href: "/create" });
    setTyping(false);
    setStreaming(null);
    setTurns(0);
    setLimited(false);
    setInput("");
  }, []);

  useEffect(() => { seed(WORKERS[0], INDUSTRIES[0]); }, [seed]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, streaming, typing, reduce]);

  const pickWorker = (w: Worker) => { if (w.id !== worker.id) { setWorker(w); seed(w, industry); } };
  const pickIndustry = (ind: Industry) => { if (ind.id !== industry.id) { setIndustry(ind); seed(worker, ind); } };

  // ---- streaming reveal of the AI message ----
  const streamIn = (text: string, myRun: number) =>
    new Promise<void>((resolve) => {
      if (reduce) { setStreaming(text); setTimeout(resolve, 0); return; }
      let i = 0;
      setStreaming("");
      const tick = () => {
        if (myRun !== runId.current) return resolve();
        i += Math.max(1, Math.round(text.length / 90));
        setStreaming(text.slice(0, i));
        if (i < text.length) setTimeout(tick, 16);
        else resolve();
      };
      setTimeout(tick, 16);
    });

  const send = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text || busy || limited) return;
    if (turns >= MAX_SESSION_TURNS) { setLimited(true); return; }

    const myRun = runId.current;
    const userMsg: Msg = { role: "user", content: text.slice(0, 1000), id: nextId() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setBusy(true);
    setTyping(true);
    setSuggested([]);

    let data: { response?: DemoResponse; limited?: boolean } = {};
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerId: worker.id,
          industryId: industry.id,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      data = await res.json();
    } catch {
      data = { response: scriptedResponse(worker, industry, history) };
    }
    if (myRun !== runId.current) return;

    const r = data.response || scriptedResponse(worker, industry, history);

    // typing pause, then stream the reply
    await new Promise((res) => setTimeout(res, reduce ? 0 : 520));
    if (myRun !== runId.current) return;
    setTyping(false);
    await streamIn(r.assistantMessage, myRun);
    if (myRun !== runId.current) return;

    // commit the AI message, then cascade the outcome panel (cross-column)
    setStreaming(null);
    setMessages((m) => [...m, { role: "assistant", content: r.assistantMessage, id: nextId() }]);
    setCaptured(r.capturedFields);
    setLeadSummary(r.leadSummary);
    setNextActions(r.nextActions);

    // stagger system events in for the "command center" feel
    const fresh = r.systemEvents.map((t) => ({ id: nextId(), text: t }));
    for (let k = 0; k < fresh.length; k++) {
      await new Promise((res) => setTimeout(res, reduce ? 0 : 150 + k * 120));
      if (myRun !== runId.current) return;
      setEvents((prev) => [fresh[k], ...prev].slice(0, 7));
    }

    setSuggested(r.suggestedReplies);
    setCta(r.cta);
    setTurns((t) => t + 1);
    if (data.limited) setLimited(true);
    setBusy(false);
  }, [busy, limited, turns, messages, worker, industry, reduce]);

  const atLimit = limited || turns >= MAX_SESSION_TURNS;
  const prompts = useMemo(() => QUICK_PROMPTS[worker.id].map((p) => fillPrompt(p, industry)), [worker, industry]);
  // Carry the chosen worker + trade into the occupation-specific intake (Phase D).
  const createHref = `/create?industry=${industry.id}&goal=${encodeURIComponent(
    `${worker.label} for my ${industry.label} business`,
  )}`;

  return (
    <div className="container-page pb-24 pt-[88px] md:pt-[104px]">
      {/* ---- header copy ---- */}
      <div className="max-w-[680px]">
        <div className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
          Live AI worker showroom
        </div>
        <h1 className="mt-4 text-hero-sm font-display tracking-tight text-ink sm:text-[44px] sm:leading-[1.02]">
          Test a real AI worker.
        </h1>
        <p className="mt-4 max-w-[58ch] text-body text-ink-soft">
          Pretend you&rsquo;re a customer. Ask for a quote, request an appointment, chase an
          invoice, or reply to a review — and watch the AI turn the conversation into business work.
        </p>
      </div>

      {/* ---- 3-zone grid ---- */}
      <div className="mt-9 grid grid-cols-1 gap-6 xl:grid-cols-[300px_360px_320px] xl:justify-center xl:gap-8">
        {/* LEFT — control room */}
        <ControlRoom
          worker={worker} industry={industry}
          onWorker={pickWorker} onIndustry={pickIndustry}
          prompts={prompts} onPrompt={send}
          input={input} setInput={setInput} onSend={() => send(input)}
          busy={busy} atLimit={atLimit} onReset={() => seed(worker, industry)}
        />

        {/* CENTER — phone */}
        <Phone
          ref={scrollRef}
          worker={worker} industry={industry}
          messages={messages} typing={typing} streaming={streaming}
        />

        {/* RIGHT — outcome panel */}
        <OutcomePanel
          captured={captured} leadSummary={leadSummary} nextActions={nextActions}
          events={events} suggested={suggested} cta={cta}
          atLimit={atLimit} onSuggest={send} createHref={createHref}
        />
      </div>
    </div>
  );
}

// ===========================================================================
// LEFT — Control Room
// ===========================================================================
function ControlRoom(props: {
  worker: Worker; industry: Industry;
  onWorker: (w: Worker) => void; onIndustry: (i: Industry) => void;
  prompts: string[]; onPrompt: (p: string) => void;
  input: string; setInput: (s: string) => void; onSend: () => void;
  busy: boolean; atLimit: boolean; onReset: () => void;
}) {
  const { worker, industry, onWorker, onIndustry, prompts, onPrompt, input, setInput, onSend, busy, atLimit, onReset } = props;
  return (
    <div className="flex flex-col gap-5">
      <Section label="Pick an AI worker">
        <div className="grid grid-cols-1 gap-2">
          {WORKERS.map((w) => {
            const Icon = ICONS[w.icon] ?? Headset;
            const on = w.id === worker.id;
            return (
              <button
                key={w.id}
                onClick={() => onWorker(w)}
                aria-pressed={on}
                className={`relative flex items-center gap-3 rounded-card-sm border px-3.5 py-3 text-left transition
                  ${on ? "border-ink bg-ink text-white shadow-card" : "border-line bg-white text-ink hover:border-line-strong"}`}
              >
                <span className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${on ? "bg-white/15 text-white" : "bg-paper-2 text-ink"}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13.5px] font-semibold leading-tight">{w.label}</span>
                  <span className={`block truncate text-[11.5px] ${on ? "text-white/70" : "text-ink-soft"}`}>{w.tagline}</span>
                </span>
                {on && (
                  <motion.span layoutId="worker-on" className="absolute right-3 h-1.5 w-1.5 rounded-full bg-clay" />
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <Section label="Pick an industry">
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((ind) => {
            const on = ind.id === industry.id;
            return (
              <button
                key={ind.id}
                onClick={() => onIndustry(ind)}
                aria-pressed={on}
                className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition
                  ${on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-soft hover:border-line-strong hover:text-ink"}`}
              >
                {ind.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section label="Quick test prompts">
        <div className="flex flex-col gap-2">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => onPrompt(p)}
              disabled={busy || atLimit}
              className="group flex items-center gap-2 rounded-card-sm border border-line bg-white px-3.5 py-2.5 text-left text-[12.5px] text-ink transition hover:border-line-strong disabled:opacity-50"
            >
              <span className="grid h-5 w-5 flex-none place-items-center rounded-md bg-paper-2 text-ink-soft transition group-hover:text-ink">
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="min-w-0">{p}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* free type-in */}
      <div className="rounded-card-sm border border-line bg-white p-2.5 shadow-card">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 1000))}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
            rows={2}
            disabled={atLimit}
            placeholder={atLimit ? "Free demo limit reached" : "Type as the customer…"}
            className="max-h-28 min-h-[44px] w-full resize-none bg-transparent px-2 py-1.5 text-[13px] text-ink placeholder-ink/35 focus:outline-none disabled:opacity-60"
          />
          <button
            onClick={onSend}
            disabled={busy || atLimit || !input.trim()}
            aria-label="Send"
            className="grid h-10 w-10 flex-none place-items-center rounded-btn bg-ink text-white transition hover:bg-ink-hover disabled:opacity-40"
          >
            {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Send className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      <button onClick={onReset} className="inline-flex items-center gap-1.5 self-start text-small text-ink-soft transition hover:text-ink">
        <RefreshCw className="h-3.5 w-3.5" /> Reset conversation
      </button>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 text-tiny-label font-semibold uppercase tracking-[0.08em] text-muted-light">{label}</div>
      {children}
    </div>
  );
}

// ===========================================================================
// CENTER — Phone
// ===========================================================================
const Phone = forwardRef<
  HTMLDivElement,
  { worker: Worker; industry: Industry; messages: Msg[]; typing: boolean; streaming: string | null }
>(function Phone({ worker, industry, messages, typing, streaming }, ref) {
    const Icon = ICONS[worker.icon] ?? Headset;
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-[332px] max-w-full" style={{ filter: "drop-shadow(0 40px 70px rgba(25,23,22,0.22))" }}>
          {/* device frame */}
          <div className="rounded-[46px] bg-[#0e0d0c] p-[11px]" style={{ boxShadow: "inset 0 0 0 2px #2a2724, 0 0 0 1px #0e0d0c" }}>
            <div className="relative h-[640px] overflow-hidden rounded-[36px] bg-gradient-to-b from-[#FBFAF8] to-[#F2EFEA]">
              {/* notch + status bar */}
              <div className="absolute left-1/2 top-[11px] z-20 h-[26px] w-[100px] -translate-x-1/2 rounded-[15px] bg-black" />
              <div className="absolute left-0 right-0 top-[15px] z-10 flex justify-between px-7 text-[11px] font-semibold text-ink">
                <span>9:41</span><span>5G&nbsp;&nbsp;100%</span>
              </div>
              {/* app header */}
              <div className="absolute inset-x-0 top-[46px] z-10 flex items-center gap-2.5 border-b border-[#e7e3db] bg-white/90 px-4 py-2.5 backdrop-blur">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-[9px] bg-ink text-white"><Icon className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-bold text-ink">{industry.business}</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-clay" /> {worker.online}
                  </div>
                </div>
              </div>
              {/* chat */}
              <div ref={ref} className="absolute inset-x-0 bottom-0 top-[96px] flex flex-col gap-2.5 overflow-y-auto px-3.5 py-4" style={{ scrollbarWidth: "none" }}>
                {messages.map((m) => (<Bubble key={m.id} role={m.role} text={m.content} />))}
                {typing && <Typing />}
                {streaming !== null && <Bubble role="assistant" text={streaming || "…"} />}
                <div className="h-1 flex-none" />
              </div>
              {/* demo-mode footer */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#F2EFEA] via-[#F2EFEA]/90 to-transparent px-4 pb-3 pt-5 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/80 px-2.5 py-1 text-[10px] font-medium text-ink-soft">
                  <span className="h-1 w-1 rounded-full bg-clay" /> Demo mode — no real call, text, email or booking sent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
});

function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const me = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={`max-w-[86%] text-[12.5px] leading-relaxed ${me ? "self-end" : "self-start"}`}
    >
      <div className={`mb-1 text-[8.5px] font-bold uppercase tracking-[0.05em] ${me ? "text-right text-ink/40" : "text-ink/40"}`}>{me ? "You (customer)" : "AI worker"}</div>
      <div className={me
        ? "rounded-2xl rounded-br-sm bg-ink px-3.5 py-2.5 text-white"
        : "rounded-2xl rounded-bl-sm border border-[#e7e3db] bg-white px-3.5 py-2.5 text-ink"}>
        {text}
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <div className="self-start">
      <div className="mb-1 text-[8.5px] font-bold uppercase tracking-[0.05em] text-ink/40">AI worker</div>
      <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[#e7e3db] bg-white px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/40"
            animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.12 }} />
        ))}
      </div>
    </div>
  );
}

// ===========================================================================
// RIGHT — Outcome Panel
// ===========================================================================
function OutcomePanel(props: {
  captured: CapturedFields | null; leadSummary: string; nextActions: string[];
  events: Event[]; suggested: string[]; cta: DemoResponse["cta"];
  atLimit: boolean; onSuggest: (s: string) => void; createHref: string;
}) {
  const { captured, leadSummary, nextActions, events, suggested, cta, atLimit, onSuggest, createHref } = props;
  const high = captured?.urgency?.toLowerCase().includes("high");
  const fields: [string, string | null][] = captured ? [
    ["Name", captured.name],
    ["Phone", captured.phone],
    ["Service", captured.service],
    ["Location", captured.location],
    ["Preferred time", captured.preferredTime],
    ["Budget", captured.budget],
  ] : [];

  return (
    <div className="flex flex-col gap-4">
      {/* captured */}
      <div className="rounded-card border border-line bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div className="text-tiny-label font-semibold uppercase tracking-[0.08em] text-muted-light">What the AI captured</div>
          {captured?.urgency && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink">
              <span className={`h-1.5 w-1.5 rounded-full ${high ? "bg-clay" : "bg-success"}`} />
              {high ? "Urgent" : "Normal"}
            </span>
          )}
        </div>
        <dl className="mt-3 divide-y divide-line">
          {fields.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 py-2 text-small">
              <dt className="text-ink-soft">{k}</dt>
              <dd className="min-w-0 truncate text-right font-medium">
                {v ? (
                  <motion.span
                    key={v}
                    initial={{ backgroundColor: "rgba(224,54,44,0.16)" }}
                    animate={{ backgroundColor: "rgba(224,54,44,0)" }}
                    transition={{ duration: 1.1 }}
                    className="rounded px-1 text-ink"
                  >
                    {v}
                  </motion.span>
                ) : (
                  <span className="text-ink/30">—</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
        {captured?.missingInfo && captured.missingInfo.length > 0 && (
          <div className="mt-3 rounded-card-sm bg-paper-2 px-3 py-2 text-[11.5px] text-ink-soft">
            <span className="font-semibold text-ink">Still needed:</span> {captured.missingInfo.join(" · ")}
          </div>
        )}
      </div>

      {/* lead summary + next actions */}
      <div className="rounded-card border border-line bg-white p-5 shadow-card">
        <div className="text-tiny-label font-semibold uppercase tracking-[0.08em] text-muted-light">Lead / job summary</div>
        <p className="mt-2 text-small leading-relaxed text-ink">{leadSummary}</p>
        <div className="mt-4 text-tiny-label font-semibold uppercase tracking-[0.08em] text-muted-light">What happens next</div>
        <ul className="mt-2 space-y-2">
          {nextActions.map((a, i) => (
            <li key={`${a}-${i}`} className="flex items-start gap-2.5 text-small text-ink">
              <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-ink text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* simulated system events feed */}
      <div className="rounded-card border border-line bg-white p-5 shadow-card">
        <div className="text-tiny-label font-semibold uppercase tracking-[0.08em] text-muted-light">Simulated business updates</div>
        <div className="mt-3 flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {events.map((e) => (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={spring}
                className="flex items-center gap-2.5 rounded-card-sm border border-line bg-paper-2 px-3 py-2 text-[12px] text-ink"
              >
                <motion.span
                  initial={{ backgroundColor: "#E0362C" }}
                  animate={{ backgroundColor: "#1D1D1F" }}
                  transition={{ duration: 1.2 }}
                  className="h-1.5 w-1.5 flex-none rounded-full"
                />
                {e.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* suggested customer replies */}
      {suggested.length > 0 && !atLimit && (
        <div className="flex flex-wrap gap-2">
          {suggested.map((s) => (
            <button key={s} onClick={() => onSuggest(s)}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-ink-soft transition hover:border-line-strong hover:text-ink">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* CTA */}
      <AnimatePresence>
        {(cta.show || atLimit) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}
            className="rounded-card border border-ink bg-ink p-5 text-white shadow-card"
          >
            <div className="flex items-center gap-2 text-[13px] font-semibold">
              <Sparkles className="h-4 w-4" />
              {atLimit ? "You've reached the free demo limit." : "Want this trained on your business?"}
            </div>
            <p className="mt-1.5 text-[12.5px] text-white/70">
              {atLimit
                ? "Start your build and we'll set this AI worker up on your real calls, messages and jobs."
                : "We customize this exact worker on your business, connect it to your tools, and launch in days."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link href={createHref} className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-white px-4 text-[13px] font-bold text-ink transition hover:bg-paper-2">
                {atLimit ? "Start my build" : "Get this installed"} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="inline-flex h-10 items-center rounded-btn border border-white/25 px-4 text-[13px] font-semibold text-white transition hover:border-white/50">
                See pricing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
