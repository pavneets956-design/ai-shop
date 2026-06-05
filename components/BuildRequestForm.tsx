"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, Send } from "lucide-react";
import { packages } from "@/lib/data/packages";
import { industries } from "@/lib/data/finder";
import { site } from "@/lib/data/site";

const budgets = [
  { id: "starter", label: "~$750 (one tool)" },
  { id: "business", label: "$2,500–$7,500 (a system)" },
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

export default function BuildRequestForm() {
  const params = useSearchParams();
  const presetPackage = params.get("package") ?? "";

  const [form, setForm] = useState({
    goal: "",
    useType: "business",
    industry: "",
    tasks: "",
    existing: "none",
    budget: packages.some((p) => p.id === presetPackage) ? presetPackage : "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/build-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "build-request", ...form }),
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
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold text-white">Request received.</h2>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — I&apos;ll review what you want to
          build and reply within one business day with a plan and a quote.
        </p>
        <p className="mt-4 text-sm text-white/40">
          Need it sooner? Email{" "}
          <a href={`mailto:${site.email}`} className="underline hover:text-white/70">
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border-glow glass mx-auto max-w-2xl space-y-8 rounded-3xl p-6 sm:p-9">
      <Group label="What are you trying to build?" required>
        <textarea
          required
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

      <Group label="What industry / area?">
        <ChipRow options={industries} value={form.industry} onPick={(v) => set("industry", v)} />
      </Group>

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
        <Group label="Budget range">
          <ChipRow options={budgets} value={form.budget} onPick={(v) => set("budget", v)} wrap />
        </Group>
        <Group label="Timeline">
          <ChipRow options={timelines} value={form.timeline} onPick={(v) => set("timeline", v)} wrap />
        </Group>
      </div>

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

      {status === "error" && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Something went wrong sending that. Email {site.email} and I&apos;ll sort it out.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
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
      <p className="text-center text-xs text-white/35">
        No spam, no obligation. You&apos;ll get a real reply from a real person within one business day.
      </p>
    </form>
  );
}

function Group({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <p className="field-label">
        {label} {required && <span className="text-electric">*</span>}
      </p>
      {children}
    </div>
  );
}

function ChipRow({
  options,
  value,
  onPick,
  wrap,
}: {
  options: { id: string; label: string }[];
  value: string;
  onPick: (v: string) => void;
  wrap?: boolean;
}) {
  return (
    <div className={`flex gap-2 ${wrap ? "flex-wrap" : "flex-wrap"}`}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onPick(o.id)}
          className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-electric/50 ${
            value === o.id
              ? "border-electric/60 bg-electric/15 text-white"
              : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
