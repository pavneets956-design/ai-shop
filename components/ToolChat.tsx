"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw, Send } from "lucide-react";

export type ChatMsg = { role: "user" | "assistant"; content: string };

/**
 * Generic live-demo chat core for the shop's conversational tools
 * (lead assistant, website sales assistant). Talks to /api/tools-demo
 * with a `kind`. Mirrors ReceptionistChat's look so all demos feel like
 * one product family.
 */
export default function ToolChat({
  kind,
  business,
  greeting,
  suggestions = [],
  label,
  sub,
  placeholder = "Type your message…",
}: {
  kind: "lead" | "assistant";
  business: string;
  greeting: string;
  suggestions?: string[];
  label: string;
  sub?: string;
  placeholder?: string;
}) {
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: "assistant", content: greeting }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const reset = () => {
    setMessages([{ role: "assistant", content: greeting }]);
    setInput("");
  };

  const sendText = async (text: string) => {
    const clean = text.trim();
    if (!clean || sending) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/tools-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, business, messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "Sorry, could you say that again?" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry — something dropped. Mind trying that again?" },
      ]);
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
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E0362C]/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E0362C]" />
          </span>
          <span className="text-sm font-semibold text-ink">{label}</span>
          {sub && <span className="hidden text-xs text-ink/40 sm:inline">· {sub}</span>}
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-ink/40 transition hover:text-ink/70"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart
        </button>
      </div>

      <div ref={scrollRef} className="h-[20rem] space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                m.role === "user" ? "bg-ink text-white" : "bg-paper-2 text-ink/80"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-paper-2 px-4 py-3">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
              </span>
            </div>
          </div>
        )}
      </div>

      {showSuggestions && (
        <div className="flex flex-wrap gap-2 px-3 pb-1">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendText(s)}
              className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink/70 transition hover:border-line-strong hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-ink/10 px-3 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="field flex-1"
          maxLength={600}
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
  );
}
