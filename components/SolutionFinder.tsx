"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2, Sparkles, CalendarClock, Clock3 } from "lucide-react";
import {
  outcomes,
  industries,
  volumes,
  currentTools,
  recommend as rulesRecommend,
  type FinderInput,
  type Recommendation,
} from "@/lib/data/finder";
import { getIcon } from "@/lib/icons";
import { site } from "@/lib/data/site";

type Step = "outcome" | "questions" | "loading" | "result";

export default function SolutionFinder() {
  const [step, setStep] = useState<Step>("outcome");
  const [input, setInput] = useState<FinderInput>({ outcome: "", tools: [] });
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const pickOutcome = (id: string) => {
    setInput((s) => ({ ...s, outcome: id }));
    setStep("questions");
  };

  const toggleTool = (id: string) =>
    setInput((s) => ({
      ...s,
      tools: s.tools?.includes(id) ? s.tools.filter((t) => t !== id) : [...(s.tools ?? []), id],
    }));

  const getRecommendation = async () => {
    setStep("loading");
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("bad status");
      const data = (await res.json()) as Recommendation;
      setRec(data);
    } catch {
      // graceful fallback — instant rules-based recommendation
      setRec(rulesRecommend(input));
    }
    setStep("result");
  };

  const emailPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/build-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "plan", email, finder: input, recommendation: rec }),
      });
    } catch {
      /* lead still captured client-side intent; non-blocking */
    }
    setSaved(true);
  };

  const reset = () => {
    setStep("outcome");
    setInput({ outcome: "", tools: [] });
    setRec(null);
    setEmail("");
    setSaved(false);
  };

  return (
    <div className="border-glow glass relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-6 shadow-card sm:p-10">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-40 opacity-60 blur-3xl"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(199,93,67,0.22), transparent 70%)" }}
      />

      <AnimatePresence mode="wait">
        {/* ---------- Outcomes ---------- */}
        {step === "outcome" && (
          <motion.div key="outcome" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <p className="mb-6 text-center text-sm font-medium uppercase tracking-[0.18em] text-ink/40">
              Step 1 — Pick your goal
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {outcomes.map((o) => {
                const Icon = getIcon(o.icon);
                return (
                  <button
                    key={o.id}
                    onClick={() => pickOutcome(o.id)}
                    className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 text-left transition-all hover:border-clay/40 hover:bg-ink/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-clay/20 to-clay/20 text-clay transition group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-ink">{o.label}</span>
                      <span className="block truncate text-sm text-ink/45">{o.blurb}</span>
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-ink/20 transition group-hover:translate-x-1 group-hover:text-clay" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ---------- Questions ---------- */}
        {step === "questions" && (
          <motion.div key="questions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <p className="mb-6 text-center text-sm font-medium uppercase tracking-[0.18em] text-ink/40">
              Step 2 — Two quick questions
            </p>

            <div className="space-y-7">
              <div>
                <p className="field-label">What kind of business?</p>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <Chip key={ind.id} active={input.industry === ind.id} onClick={() => setInput((s) => ({ ...s, industry: ind.id }))}>
                      {ind.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="field-label">Roughly how many leads / calls / messages a week?</p>
                <div className="flex flex-wrap gap-2">
                  {volumes.map((v) => (
                    <Chip key={v.id} active={input.volume === v.id} onClick={() => setInput((s) => ({ ...s, volume: v.id }))}>
                      {v.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="field-label">What do you use now? (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {currentTools.map((t) => (
                    <Chip key={t.id} active={input.tools?.includes(t.id) ?? false} onClick={() => toggleTool(t.id)}>
                      {t.label}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button onClick={() => setStep("outcome")} className="btn-ghost">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button onClick={getRecommendation} className="btn-primary">
                <Sparkles className="h-4 w-4" /> Get my recommendation
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------- Loading ---------- */}
        {step === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-clay" />
            <p className="mt-4 text-ink/70">Designing your AI system…</p>
            <p className="mt-1 text-sm text-ink/40">Matching your goal to the right build</p>
          </motion.div>
        )}

        {/* ---------- Result ---------- */}
        {step === "result" && rec && (
          <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-1 flex items-center gap-2 text-sm text-clay">
              <Sparkles className="h-4 w-4" />
              {rec.source === "ai" ? "Personalized for you" : "Recommended for you"}
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{rec.packageName}</h3>
            <p className="mt-3 text-ink/65">{rec.intro}</p>

            <ul className="mt-5 space-y-3">
              {rec.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-ink/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay/20 text-clay">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Stat icon={<Sparkles className="h-4 w-4" />} label="Investment" value={rec.priceLabel} />
              <Stat icon={<CalendarClock className="h-4 w-4" />} label="Timeline" value={rec.timeline} />
              <Stat icon={<Clock3 className="h-4 w-4" />} label="Time saved" value={rec.timeSaved} />
            </div>

            <p className="mt-3 text-xs text-ink/35">Final scope and price confirmed on a quick call.</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={`/create?package=${rec.packageId}&outcome=${input.outcome}`} className="btn-primary flex-1">
                Book a free 15-min call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* email capture */}
            <div className="mt-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-4">
              {saved ? (
                <p className="flex items-center justify-center gap-2 py-2 text-sm text-[#C96F00]">
                  <Check className="h-4 w-4" /> Sent — check your inbox. We&apos;ll be in touch.
                </p>
              ) : (
                <form onSubmit={emailPlan} className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com — email me this plan"
                    className="field flex-1"
                    aria-label="Email address"
                  />
                  <button type="submit" className="btn-secondary whitespace-nowrap">
                    Email me the plan
                  </button>
                </form>
              )}
            </div>

            <button onClick={reset} className="btn-ghost mx-auto mt-5 flex">
              <ArrowLeft className="h-4 w-4" /> Start over
            </button>
            <p className="mt-2 text-center text-xs text-ink/30">
              Prefer to talk? Email{" "}
              <a href={`mailto:${site.email}`} className="underline hover:text-ink/60">
                {site.email}
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 ${
        active
          ? "border-clay/60 bg-clay/15 text-ink"
          : "border-ink/10 bg-ink/[0.03] text-ink/60 hover:border-ink/25 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-4">
      <div className="flex items-center gap-2 text-ink/40">
        {icon}
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 font-medium text-ink">{value}</p>
    </div>
  );
}
