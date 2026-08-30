import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data/site";

/**
 * 404. Twenty route files call notFound() and until now every one of them fell
 * through to Next's unstyled default — no branding, no way back, no next step.
 *
 * Deliberately useful rather than decorative: a dead URL is usually a mistyped
 * or stale link, so the fastest recovery is a short list of the places people
 * actually want. These five are the site's real entry points, not a sitemap dump.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Here's where to go instead.",
  // No `robots` key. Next emits `<meta name="robots" content="noindex">` for
  // the not-found route itself, so declaring one here produced TWO robots tags
  // on every 404 (`noindex` and `noindex, follow`). They agreed, so nothing was
  // mis-indexed — but duplicate directives are exactly how a later edit ends up
  // shipping two that DON'T agree.
};

const DESTINATIONS = [
  { href: "/ai-receptionist", label: "AI receptionist", hint: "Every call answered, even on a job" },
  { href: "/pricing", label: "Pricing", hint: "What it costs, in CAD, no quote form" },
  { href: "/tools", label: "Free tools", hint: "Five calculators, no signup" },
  { href: "/industries", label: "By trade", hint: "What this looks like for your business" },
  { href: "/create", label: "Start a build", hint: "Describe it, get a fixed quote" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-32">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Error 404</p>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          That page doesn&rsquo;t exist.
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          The link was probably mistyped, or it pointed at something that has since moved.
          Nothing is broken on your end.
        </p>

        <nav aria-label="Popular pages" className="mt-10 border-t border-line">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex items-baseline justify-between gap-4 border-b border-line py-4 no-underline transition-colors hover:bg-paper-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span className="text-base font-semibold text-ink group-hover:text-ink-hover">
                {d.label}
              </span>
              <span className="text-right text-sm text-muted">{d.hint}</span>
            </Link>
          ))}
        </nav>

        <p className="mt-8 text-sm text-muted">
          Certain a link should work?{" "}
          <a href={`mailto:${site.email}?subject=Broken link on aibuiltbyhand.com`} className="text-ink underline underline-offset-2">
            Tell {site.owner}
          </a>{" "}
          and it gets fixed.
        </p>
      </div>
    </section>
  );
}
