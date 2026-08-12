"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/data/site";

/**
 * Route-level error boundary. Catches render/data errors inside the layout, so
 * the header and footer survive and the visitor keeps a way out.
 *
 * Two rules from the project's no-silent-states standard are load-bearing here:
 * say plainly whose fault it is (ours), and give a next action that works even
 * if the retry fails again — hence the mailto alongside reset().
 *
 * The digest is shown because it is the only handle Pav has when someone
 * reports "it broke"; without it a report is unactionable.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface it where a human actually looks. A failure only the browser knows
    // about is a silent state.
    console.error("[route-error]", error);
  }, [error]);

  const subject = encodeURIComponent(
    `Error on aibuiltbyhand.com${error.digest ? ` (ref ${error.digest})` : ""}`,
  );

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-32">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-danger">
          Something broke
        </p>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          That&rsquo;s on us, not you.
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          This page hit an error on our end. Nothing you did caused it, and nothing you
          typed was saved or sent.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink no-underline transition-colors hover:bg-paper-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Go home
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted">
          Still broken after a retry?{" "}
          <a
            href={`mailto:${site.email}?subject=${subject}`}
            className="text-ink underline underline-offset-2"
          >
            Email {site.owner}
          </a>{" "}
          — it&rsquo;s a one-person studio, so it reaches the person who can fix it.
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-xs text-muted-light">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
