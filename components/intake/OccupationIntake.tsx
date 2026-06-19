"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Trade } from "@/lib/data/intake";

/**
 * Occupation-specific intake fields (Phase D). Renders the right questions for
 * the selected trade. Controlled — parent owns the values object and includes
 * it in the lead payload. Premium black/cream, no orange (focus rings only).
 */
export default function OccupationIntake({
  trade,
  values,
  onChange,
}: {
  trade: Trade;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={trade.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-line bg-paper-2/60 p-5"
      >
        <div className="mb-4 flex items-center gap-2 text-tiny-label font-semibold uppercase tracking-[0.08em] text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
          {trade.label} — job details
        </div>
        <div className="space-y-5">
          {trade.fields.map((f) => (
            <div key={f.key}>
              <label className="mb-2 block text-sm font-medium text-ink/80">{f.label}</label>
              {f.type === "text" ? (
                <input
                  value={values[f.key] ?? ""}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="field"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {f.options?.map((opt) => {
                    const on = values[f.key] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={on}
                        onClick={() => onChange(f.key, on ? "" : opt)}
                        className={`rounded-full border px-3.5 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 ${
                          on
                            ? "border-ink bg-ink text-white"
                            : "border-ink/10 bg-white text-ink/65 hover:border-ink/25 hover:text-ink"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
