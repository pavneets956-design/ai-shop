"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, RotateCcw, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const BUSINESSES = [
  { id: "trades", chip: "Plumber / Trades", name: "Summit Plumbing & Heating", desc: "Summit Plumbing & Heating, a plumbing & heating company" },
  { id: "clinic", chip: "Dental Clinic", name: "Brightsmile Dental", desc: "Brightsmile Dental, a dental clinic" },
  { id: "salon", chip: "Salon / Spa", name: "Luxe Hair & Spa", desc: "Luxe Hair & Spa, a hair salon and spa" },
  { id: "restaurant", chip: "Restaurant", name: "The Corner Table", desc: "The Corner Table, a restaurant" },
  { id: "realestate", chip: "Real Estate", name: "Westside Realty", desc: "Westside Realty, a real estate agency" },
];

const greeting = (name: string) =>
  `Thanks for calling ${name}! This is the AI receptionist — how can I help you today?`;

export default function ReceptionistDemo() {
  const [biz, setBiz] = useState(BUSINESSES[0]);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: greeting(BUSINESSES[0].name) },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const pickBusiness = (b: (typeof BUSINESSES)[number]) => {
    setBiz(b);
    setMessages([{ role: "assistant", content: greeting(b.name) }]);
    setInput("");
  };

  const reset = () => pickBusiness(biz);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business: biz.desc, messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "Sorry, could you say that again?" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry — the line dropped. Mind trying that again?" },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Business picker */}
      <div className="mb-4">
        <p className="field-label mb-2">This AI receptionist works for:</p>
        <div className="flex flex-wrap gap-2">
          {BUSINESSES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => pickBusiness(b)}
              className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 ${
                biz.id === b.id
                  ? "border-clay/60 bg-clay/15 text-ink"
                  : "border-ink/10 bg-ink/[0.03] text-ink/60 hover:border-ink/25 hover:text-ink"
              }`}
            >
              {b.chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="border-glow glass overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-ink/[0.06] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-ink/80">AI Receptionist — live</span>
          </div>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 text-xs text-ink/40 transition hover:text-ink/70"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restart
          </button>
        </div>

        <div ref={scrollRef} className="h-[22rem] space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-clay/20 text-ink"
                    : "bg-ink/[0.05] text-ink/85"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-ink/[0.05] px-4 py-3 text-ink/60">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/50 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/50 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/50" />
                </span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={send} className="flex items-center gap-2 border-t border-ink/[0.06] px-3 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type as if you're a customer calling in…"
            className="field flex-1"
            maxLength={600}
            autoFocus
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="btn-primary shrink-0 disabled:opacity-40"
            aria-label="Send"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>

      {/* Honest framing + CTA */}
      <p className="mt-3 text-center text-xs text-ink/35">
        This is a real, live AI receptionist — you&apos;re playing the customer. Pick a business above,
        then ask for a quote, book a job, or describe an emergency.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-ink/[0.07] bg-ink/[0.02] p-6 text-center">
        <p className="text-ink/80">
          Want one of these answering <span className="text-ink">your</span> calls — trained on your
          business, booking into your calendar?
        </p>
        <Link href="/create" className="btn-primary">
          Build mine <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
