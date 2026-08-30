import type { FAQ } from "@/lib/data/faqs";

/**
 * FAQ accordion — native `<details>`/`<summary>`, no JavaScript.
 *
 * Rewritten 2026-08-30 to fix a structured-data honesty problem. The previous
 * version was a client component that kept exactly ONE answer mounted at a time
 * (framer `AnimatePresence` unmounted the rest), while roughly 200 pages emitted
 * `FAQPage` JSON-LD listing every question and answer. Structured data must
 * describe content that is actually on the page; measured on production,
 * `/pricing` shipped 1 of its 6 answers in the HTML and claimed all 6 in schema.
 *
 * `<details>` puts every answer in the server-rendered HTML — visible to Google,
 * to answer engines, to Reader mode, and to anyone with JS disabled — while
 * still collapsing visually. It is also keyboard-operable and screen-reader
 * announced for free, which the custom button was not, and it removes
 * framer-motion from every page that renders an FAQ.
 *
 * The first item stays open so the section never reads as an empty stack.
 */
export default function FAQSection({ items }: { items: Pick<FAQ, "q" | "a">[] }) {
  return (
    <div
      className="mx-auto max-w-3xl overflow-hidden rounded-[var(--v-r-panel)]"
      style={{ backgroundColor: "var(--v-surface)", boxShadow: "var(--v-shadow-card)" }}
    >
      {items.map((f, idx) => (
        <details
          key={f.q}
          open={idx === 0}
          className="faq-item group"
          style={idx > 0 ? { boxShadow: "inset 0 1px 0 var(--v-hairline)" } : undefined}
        >
          <summary className="faq-summary">
            <span className="text-[17px] font-medium" style={{ color: "var(--v-ink)" }}>
              {f.q}
            </span>
            {/* Plus/minus drawn in CSS so there is no icon component and no JS. */}
            <span className="faq-marker" aria-hidden="true" />
          </summary>
          <p className="v-body px-5 pb-5" style={{ color: "var(--v-ink-2)" }}>
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
