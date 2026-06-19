"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Loader2, Lock, Printer, Sparkles } from "lucide-react";

export type GenField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

export type GenBusiness = { id: string; chip: string; desc: string };

/**
 * Generic input → AI output tool. Posts {kind, business?, fields} to the
 * given endpoint and renders the single AI reply with ALLCAPS labels as
 * headed sections. Powers both the shop product demos (/api/tools-demo,
 * with a business picker) and the self-serve tools (/api/tools, no picker).
 *
 * `copyable` adds a copy button; `printable` adds a Print / Save-as-PDF
 * button (the result is wrapped in .print-area — see globals.css @media print).
 * `upgradeHref` (self-serve only): where the inline upgrade prompt links when
 * the API returns 402 (free run spent / subscription required).
 */
export default function ToolGenerator({
  kind,
  businesses,
  fields,
  submitLabel,
  resultTitle,
  copyable = false,
  printable = false,
  endpoint = "/api/tools-demo",
  upgradeHref = "/tools/pro",
}: {
  kind: string;
  businesses?: GenBusiness[];
  fields: GenField[];
  submitLabel: string;
  resultTitle: string;
  copyable?: boolean;
  printable?: boolean;
  endpoint?: string;
  upgradeHref?: string;
}) {
  const [biz, setBiz] = useState<GenBusiness | undefined>(businesses?.[0]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [upgrade, setUpgrade] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const canSubmit = fields.every((f) => !f.required || (values[f.key] ?? "").trim().length > 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setResult(null);
    setUpgrade(null);
    setNotice(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, business: biz?.desc, fields: values }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 402) {
        // Free run spent / subscription required — prompt to upgrade inline.
        setUpgrade(data.error || "Subscribe to Tools Pro to keep using this tool.");
        return;
      }
      if (res.status === 429) {
        setNotice(data.error || "That's a lot of requests — give it a moment and try again.");
        return;
      }
      if (!res.ok || !data.reply) {
        setNotice(data.error || "Sorry — couldn't generate that. Mind trying again?");
        return;
      }
      setResult(data.reply);
    } catch {
      setNotice("Sorry — something dropped. Mind trying that again?");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Business picker (demo mode only) */}
      {businesses && businesses.length > 0 && (
        <div className="mb-4">
          <p className="field-label mb-2">Try it as:</p>
          <div className="flex flex-wrap gap-2">
            {businesses.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setBiz(b);
                  setResult(null);
                }}
                className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 ${
                  biz?.id === b.id
                    ? "border-ink bg-ink text-white"
                    : "border-ink/10 bg-white text-ink/60 hover:border-ink/25 hover:text-ink"
                }`}
              >
                {b.chip}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={submit} className="border-glow glass space-y-4 rounded-3xl p-5 sm:p-6">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="field-label mb-1.5 block">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                value={values[f.key] ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="field min-h-[88px] w-full"
                maxLength={600}
              />
            ) : f.type === "select" ? (
              <select
                value={values[f.key] ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                className="field w-full"
              >
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={values[f.key] ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                type={f.type}
                className="field w-full"
                maxLength={600}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="btn-primary w-full justify-center disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Working…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" /> {submitLabel}
            </>
          )}
        </button>

        {notice && <p className="text-center text-sm text-ink/60">{notice}</p>}
      </form>

      {/* Upgrade prompt (free run spent) */}
      {upgrade && (
        <div className="mt-5 rounded-3xl border border-line bg-paper-2 p-6 text-center shadow-card">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper-2 text-ink">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-4 text-[15px] text-ink/80">{upgrade}</p>
          <Link href={upgradeHref} className="btn-primary mt-5 inline-flex justify-center">
            See Tools Pro <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="print-area mt-5 rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              {resultTitle}
            </span>
            <div className="flex items-center gap-4 print:hidden">
              {printable && (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-ink"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" /> Print / PDF
                </button>
              )}
              {copyable && (
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-ink"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
          </div>
          <div className="space-y-1.5 text-[15px] leading-relaxed text-ink/80">
            {result.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              const m = trimmed.match(/^([A-Z][A-Z ]{2,}):\s*(.*)$/);
              if (m) {
                return (
                  <p key={i}>
                    <span className="font-semibold text-ink">{m[1]}:</span> {m[2]}
                  </p>
                );
              }
              return <p key={i}>{trimmed}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
