"use client";

// Shared, accessible UI primitives for the free-tool calculators. Token-driven
// (Molten Forge: paper/ink/clay), mobile-first, keyboard-friendly, reduced-motion
// aware. No raw hex — everything references the design system.
import { useState, useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check, Printer, RotateCcw, Share2 } from "lucide-react";

// ---- form fields ----------------------------------------------------------

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
  id?: string;
}

function FieldFrame({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  const hintId = `${htmlFor}-hint`;
  const errId = `${htmlFor}-err`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-small font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-small text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "h-input w-full rounded-input border border-line bg-white px-3.5 text-body text-ink " +
  "placeholder:text-muted-light transition-colors " +
  "focus:outline-none focus-visible:border-clay focus-visible:ring-2 focus-visible:ring-clay/25 " +
  "aria-[invalid=true]:border-danger";

function numericProps(value: string, onChange: (v: string) => void, describedBy: string, invalid: boolean) {
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    inputMode: "decimal" as const,
    autoComplete: "off",
    "aria-describedby": describedBy,
    "aria-invalid": invalid,
  };
}

export function NumberField(props: FieldProps) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const desc = props.error ? `${id}-err` : props.hint ? `${id}-hint` : undefined;
  return (
    <FieldFrame label={props.label} hint={props.hint} error={props.error} htmlFor={id}>
      <input id={id} type="text" className={inputBase} placeholder={props.placeholder ?? "0"} {...numericProps(props.value, props.onChange, desc ?? "", !!props.error)} />
    </FieldFrame>
  );
}

export function CurrencyField(props: FieldProps & { symbol?: string }) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const desc = props.error ? `${id}-err` : props.hint ? `${id}-hint` : undefined;
  return (
    <FieldFrame label={props.label} hint={props.hint} error={props.error} htmlFor={id}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body text-muted" aria-hidden>
          {props.symbol ?? "$"}
        </span>
        <input id={id} type="text" className={`${inputBase} pl-8`} placeholder={props.placeholder ?? "0"} {...numericProps(props.value, props.onChange, desc ?? "", !!props.error)} />
      </div>
    </FieldFrame>
  );
}

export function PercentField(props: FieldProps) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const desc = props.error ? `${id}-err` : props.hint ? `${id}-hint` : undefined;
  return (
    <FieldFrame label={props.label} hint={props.hint} error={props.error} htmlFor={id}>
      <div className="relative">
        <input id={id} type="text" className={`${inputBase} pr-8`} placeholder={props.placeholder ?? "0"} {...numericProps(props.value, props.onChange, desc ?? "", !!props.error)} />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body text-muted" aria-hidden>
          %
        </span>
      </div>
    </FieldFrame>
  );
}

export function TextField(props: FieldProps) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const desc = props.error ? `${id}-err` : props.hint ? `${id}-hint` : undefined;
  return (
    <FieldFrame label={props.label} hint={props.hint} error={props.error} htmlFor={id}>
      <input
        id={id}
        type="text"
        className={inputBase}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete="off"
        aria-describedby={desc}
      />
    </FieldFrame>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
  id?: string;
}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldFrame label={label} hint={hint} htmlFor={fieldId}>
      <select
        id={fieldId}
        className={`${inputBase} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236e6e73%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}

export function ToggleField({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-line text-clay accent-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/30"
      />
      <label htmlFor={id} className="cursor-pointer text-small text-ink">
        <span className="font-semibold">{label}</span>
        {hint && <span className="block text-muted">{hint}</span>}
      </label>
    </div>
  );
}

// ---- action buttons -------------------------------------------------------

export function CopyButton({ text, label = "Copy", className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex h-9 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-small font-semibold text-ink transition-colors hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/30 ${className ?? ""}`}
      aria-live="polite"
    >
      {copied ? <Check size={15} className="text-success" aria-hidden /> : <Copy size={15} aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function PrintButton({ label = "Print" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-9 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-small font-semibold text-ink transition-colors hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/30"
    >
      <Printer size={15} aria-hidden />
      {label}
    </button>
  );
}

export function ResetButton({ onClick, label = "Reset" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-small font-semibold text-muted transition-colors hover:bg-paper-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/30"
    >
      <RotateCcw size={15} aria-hidden />
      {label}
    </button>
  );
}

export function ShareButton({ onShare, label = "Share" }: { onShare: () => void; label?: string }) {
  const [done, setDone] = useState(false);
  function share() {
    onShare();
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  }
  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-9 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-small font-semibold text-ink transition-colors hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/30"
      aria-live="polite"
    >
      {done ? <Check size={15} className="text-success" aria-hidden /> : <Share2 size={15} aria-hidden />}
      {done ? "Link copied" : label}
    </button>
  );
}

// ---- results --------------------------------------------------------------

/** Live region wrapper so screen readers hear results without excessive chatter. */
export function ResultsRegion({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-live="polite"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ResultCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card border border-line bg-white p-5 shadow-card sm:p-6 ${className ?? ""}`}>{children}</div>;
}

export function ResultStat({
  label,
  value,
  sub,
  emphasis,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`rounded-card-sm border border-line p-4 ${emphasis ? "bg-clay-soft" : "bg-paper-2"}`}>
      <div className="text-tiny-label font-mono uppercase tracking-wider text-muted">{label}</div>
      <div className={`mt-1 font-display font-bold tabular-nums ${emphasis ? "text-section-sm text-clay-dark" : "text-card-title text-ink"}`}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-small text-muted">{sub}</div>}
    </div>
  );
}

const bannerTone: Record<string, string> = {
  good: "border-success/30 bg-success/[0.06] text-ink",
  warn: "border-danger/30 bg-danger/[0.06] text-ink",
  neutral: "border-line bg-paper-2 text-ink",
};

export function ResultBanner({ tone = "neutral", children }: { tone?: "good" | "warn" | "neutral"; children: ReactNode }) {
  return <div className={`rounded-card-sm border p-4 text-small ${bannerTone[tone]}`}>{children}</div>;
}

export function ScenarioTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: (string | { text: string; tone?: "good" | "warn" })[][];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-small">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-line text-left">
            {columns.map((c, i) => (
              <th key={c} scope="col" className={`py-2 pr-4 font-mono text-tiny-label uppercase tracking-wider text-muted ${i > 0 ? "text-right" : ""}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-line/60">
              {row.map((cell, c) => {
                const val = typeof cell === "string" ? cell : cell.text;
                const tone = typeof cell === "string" ? undefined : cell.tone;
                return (
                  <td
                    key={c}
                    className={`py-2.5 pr-4 tabular-nums ${c > 0 ? "text-right" : "font-medium text-ink"} ${
                      tone === "good" ? "text-success" : tone === "warn" ? "text-danger" : "text-ink"
                    }`}
                  >
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Two-column responsive layout: inputs on the left, results on the right.
    `min-w-0` on both cells lets grid items shrink below content size so wide
    tables scroll inside their own `overflow-x-auto` instead of pushing the page. */
export function CalculatorLayout({ form, results }: { form: ReactNode; results: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="min-w-0 rounded-card border border-line bg-white p-5 shadow-card sm:p-6">{form}</div>
      <div className="min-w-0">{results}</div>
    </div>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
