"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react";
import { packages } from "@/lib/data/packages";
import { shopProducts } from "@/lib/data/shopProducts";
import { TRADES, tradeById, intakeToLabels } from "@/lib/data/intake";
import { site } from "@/lib/data/site";
import OccupationIntake from "@/components/intake/OccupationIntake";

const budgets = [
  { id: "starter", label: "~$1,000 (one tool)" },
  { id: "business", label: "$2,500–$5,000 (a system)" },
  { id: "custom", label: "$7,500+ (custom app)" },
  { id: "unsure", label: "Not sure yet" },
];

const timelines = [
  { id: "asap", label: "ASAP" },
  { id: "1month", label: "Within a month" },
  { id: "quarter", label: "This quarter" },
  { id: "exploring", label: "Just exploring" },
];

const useTypes = [
  { id: "business", label: "For my business" },
  { id: "personal", label: "Personal use" },
];

const hasSite = [
  { id: "none", label: "Nothing yet" },
  { id: "website", label: "A website" },
  { id: "app", label: "An app" },
  { id: "both", label: "Both" },
];

const STEPS = ["The build", "Your setup", "You"] as const;

export default function BuildRequestForm() {
  const params = useSearchParams();
  const presetPackage = params.get("package") ?? "";
  const presetBuild = shopProducts.find((p) => p.slug === params.get("build"));
  // ?goal= lets the homepage hero builder / free tools carry the intent in as the goal.
  const presetGoal = params.get("goal") ?? "";
  // ?industry= (from the showroom "Get this installed" CTA) preselects the trade.
  const presetIndustry = tradeById(params.get("industry") ?? "")?.id ?? "";
  // ?src= carries acquisition attribution (e.g. "tool-missed-call-revenue-calculator")
  // from a free-tool CTA. Non-sensitive machine tag — never a customer field; passed
  // straight through to durable storage + the lead notification, never shown as an input.
  const presetSrc = params.get("src") ?? "";

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({
    goal: presetBuild ? `${presetBuild.name} — ${presetBuild.outcome}` : presetGoal,
    useType: "business",
    industry: presetIndustry,
    tasks: "",
    existing: "none",
    website: "",
    tools: "",
    budget: packages.some((p) => p.id === presetPackage)
      ? presetPackage
      : presetBuild?.packageId ?? "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });
  // Occupation-specific answers (Phase D) — keyed by field key for the selected trade.
  const [intake, setIntake] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));
  const trade = tradeById(form.industry);

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const canAdvance = step === 0 ? form.goal.trim().length > 0 : true;
  const isLast = step === STEPS.length - 1;

  const next = () => {
    if (!canAdvance) return;
    if (!isLast) go(step + 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Only submit from the final step; earlier "Enter" presses advance instead.
    if (!isLast) {
      next();
      return;
    }
    // Guard against an accidental submit with missing contact info.
    if (!form.name.trim() || !form.email.trim() || !form.email.includes("@")) {
      go(STEPS.length - 1);
      return;
    }
    setStatus("sending");
    try {
      const intakeLabels = trade ? intakeToLabels(trade, intake) : {};
      const res = await fetch("/api/build-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "build-request",
          ...form,
          // Send the readable trade label + the occupation answers for the email.
          industry: trade?.label ?? form.industry,
          // Carry free-tool attribution through to durable storage + notification.
          ...(presetSrc ? { src: presetSrc } : {}),
          ...(Object.keys(intakeLabels).length ? { intake: intakeLabels } : {}),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="border-glow glass mx-auto max-w-2xl rounded-3xl p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper-2 text-ink">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold text-ink">Request received.</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/60">
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — I&apos;ll review what you want to
          build and reply within one business day with a plan and a quote.
        </p>
        <p className="mt-4 text-sm text-ink/40">
          Need it sooner? Email{" "}
          <a href={`mailto:${site.email}`} className="underline hover:text-ink/70">
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="border-glow glass mx-auto max-w-2xl rounded-3xl p-6 sm:p-9"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => {
            const state = i < step ? "done" : i === step ? "active" : "todo";
            return (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <button
                  type="button"
                  onClick={() => i < step && go(i)}
                  disabled={i > step}
                  className={`flex items-center gap-2 text-sm transition ${
                    i <= step ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition ${
                      state === "done"
                        ? "border-ink bg-ink text-white"
                        : state === "active"
                          ? "border-ink bg-ink text-white"
                          : "border-ink/15 bg-ink/[0.03] text-ink/40"
                    }`}
                  >
                    {state === "done" ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className={`hidden sm:inline ${i <= step ? "text-ink/80" : "text-ink/40"}`}>
                    {label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <span
                    className={`mx-3 h-px flex-1 transition ${
                      i < step ? "bg-ink/50" : "bg-ink/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-8"
          >
            {step === 0 && (
              <>
                <Group label="What are you trying to build?" required>
                  <textarea
                    autoFocus
                    rows={3}
                    value={form.goal}
                    onChange={(e) => set("goal", e.target.value)}
                    placeholder="e.g. Something that answers my phone and books jobs while I'm on site"
                    className="field resize-none"
                  />
                </Group>
                <Group label="Is this for business or personal use?">
                  <ChipRow options={useTypes} value={form.useType} onPick={(v) => set("useType", v)} />
                </Group>
                <Group label="What's your trade / industry?">
                  <ChipRow options={TRADES} value={form.industry} onPick={(v) => set("industry", v)} wrap />
                </Group>
              </>
            )}

            {step === 1 && (
              <>
                {trade && trade.fields.length > 0 && (
                  <OccupationIntake
                    trade={trade}
                    values={intake}
                    onChange={(k, v) => setIntake((s) => ({ ...s, [k]: v }))}
                  />
                )}
                <Group label="What should the AI actually do?">
                  <textarea
                    rows={2}
                    value={form.tasks}
                    onChange={(e) => set("tasks", e.target.value)}
                    placeholder="e.g. answer calls, qualify leads, send follow-up texts, sync to my calendar"
                    className="field resize-none"
                  />
                </Group>
                <Group label="Do you already have a website or app?">
                  <ChipRow options={hasSite} value={form.existing} onPick={(v) => set("existing", v)} />
                </Group>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Group label="Your website (if you have one)">
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => set("website", e.target.value)}
                      placeholder="https://yourbusiness.com"
                      className="field"
                    />
                  </Group>
                  <Group label="Tools you use today">
                    <input
                      value={form.tools}
                      onChange={(e) => set("tools", e.target.value)}
                      placeholder="e.g. Jobber, Google Calendar, Shopify"
                      className="field"
                    />
                  </Group>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Group label="Budget range">
                    <ChipRow options={budgets} value={form.budget} onPick={(v) => set("budget", v)} wrap />
                  </Group>
                  <Group label="Timeline">
                    <ChipRow options={timelines} value={form.timeline} onPick={(v) => set("timeline", v)} wrap />
                  </Group>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="field-label">Name *</label>
                    <input required value={form.name} onChange={(e) => set("name", e.target.value)} className="field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="field-label">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="field" placeholder="you@business.com" />
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="field" placeholder="Optional" />
                  </div>
                </div>
                <p className="text-center text-xs text-ink/35">
                  No spam, no obligation. You&apos;ll get a real reply from a real person within one business day.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Something went wrong sending that. Email {site.email} and I&apos;ll sort it out.
        </p>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        {!isLast ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className="btn-primary ml-auto disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="btn-primary ml-auto">
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send my build request
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

function Group({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <p className="field-label">
        {label} {required && <span className="text-clay">*</span>}
      </p>
      {children}
    </div>
  );
}

function ChipRow({
  options,
  value,
  onPick,
}: {
  options: { id: string; label: string }[];
  value: string;
  onPick: (v: string) => void;
  wrap?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onPick(o.id)}
          className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 ${
            value === o.id
              ? "border-ink bg-ink text-white"
              : "border-ink/10 bg-ink/[0.03] text-ink/60 hover:border-ink/25 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
