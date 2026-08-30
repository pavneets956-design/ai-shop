"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2, RotateCcw, Send } from "lucide-react";
import type { IndustryId, WorkerId } from "@/lib/data/showroom";

export type ChatMsg = { role: "user" | "assistant"; content: string };

/**
 * Shared live AI-receptionist chat core. Talks to /api/demo.
 * Embedded in use-case pages with a fixed worker + industry persona.
 *
 * CONTRACT (do not drift): /api/demo takes { workerId, industryId, messages }
 * and answers { response: DemoResponse, fallback?: boolean, limited?: boolean }.
 * It has never returned `reply`, and it ignores a `business` string — sending
 * one silently personified every chat as the default landscaping receptionist.
 * Both bugs shipped together and made every turn render the catch-all line.
 */
export default function ReceptionistChat({
  workerId,
  industryId,
  greeting,
  suggestions = [],
  label = "AI Receptionist — live",
  sub,
}: {
  workerId: WorkerId;
  industryId: IndustryId;
  greeting: string;
  suggestions?: string[];
  label?: string;
  sub?: string;
}) {
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: "assistant", content: greeting }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [scripted, setScripted] = useState(false);
  const [limited, setLimited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const reset = () => {
    setMessages([{ role: "assistant", content: greeting }]);
    setInput("");
    setScripted(false);
    setError(null);
  };

  const sendText = async (text: string) => {
    const clean = text.trim();
    if (!clean || sending || limited) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, industryId, messages: next }),
      });
      const data: {
        response?: { assistantMessage?: string };
        fallback?: boolean;
        limited?: boolean;
        error?: string;
      } = await res.json().catch(() => ({}));

      const answer = data.response?.assistantMessage?.trim();
      if (!res.ok || !answer) {
        setError(
          "The demo didn't answer that one. Try again, or tell Pavneet what you were testing and he'll look at it.",
        );
        return;
      }
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
      if (data.fallback) setScripted(true);
      if (data.limited) setLimited(true);
    } catch {
      setError("Connection dropped before the AI answered. Check your network and try again.");
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendText(input);
  };

  const showSuggestions = suggestions.length > 0 && messages.length <= 1;

  return (
    <div className="border-glow glass overflow-hidden rounded-3xl">
      {/* header */}
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E0362C]/70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E0362C]" />
          </span>
          <span className="text-sm font-semibold text-ink">{label}</span>
          {sub && <span className="hidden text-xs text-ink-soft sm:inline">· {sub}</span>}
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-ink-soft transition hover:text-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Restart
        </button>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="h-[20rem] space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                m.role === "user" ? "bg-ink text-white" : "bg-paper-2 text-ink"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-paper-2 px-4 py-3">
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.3s] motion-reduce:animate-none" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.15s] motion-reduce:animate-none" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 motion-reduce:animate-none" />
              </span>
              <span className="text-xs text-ink-soft">AI is responding…</span>
            </div>
          </div>
        )}
      </div>

      {/* status: announced to screen readers, visible when it matters */}
      <div role="status" aria-live="polite" className="px-5">
        <span className="sr-only">{sending ? "AI is responding" : ""}</span>
        {error && (
          <p className="mb-3 rounded-md border border-danger/40 bg-white px-3 py-2 text-xs text-danger">
            {error}
          </p>
        )}
        {limited && (
          <p className="mb-3 rounded-md border border-line bg-white px-3 py-2 text-xs text-ink">
            That&apos;s the free demo limit for today.{" "}
            <a href="/create" className="font-semibold underline underline-offset-2">
              Tell Pavneet what you want it to handle
            </a>{" "}
            and he&apos;ll build the real one.
          </p>
        )}
        {scripted && !limited && (
          <p className="mb-3 rounded-md border border-danger/40 bg-white px-3 py-2 text-xs text-danger">
            Live AI is unavailable right now — these replies are a scripted sample, not the real
            model.
          </p>
        )}
      </div>

      {/* suggestions */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-2 px-3 pb-1">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendText(s)}
              className="min-h-[36px] rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink transition hover:border-line-strong"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* input */}
      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-ink/10 px-3 py-3">
        <label htmlFor={inputId} className="sr-only">
          Type a message to the AI receptionist
        </label>
        <input
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type as if you're a customer calling in…"
          className="field flex-1"
          maxLength={600}
          disabled={limited}
        />
        <button
          type="submit"
          disabled={sending || limited || !input.trim()}
          className="btn-primary shrink-0 disabled:opacity-40"
          aria-label="Send message"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </form>

      {/* honesty footer — mirrors the Showroom's demo-mode pill */}
      <p className="border-t border-ink/10 px-5 py-2.5 text-center text-[10px] font-medium text-ink-soft">
        Demo mode — no real call, text, email or booking is sent.
      </p>
    </div>
  );
}
