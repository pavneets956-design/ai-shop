import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./primitives";
import CallTimeline from "./CallTimeline";
import { carePlan, getPackage, packages } from "@/lib/data/packages";

/** Rendered from packages.ts, never hand-typed — hand-typed copies are what
 *  produced the price contradictions this release is fixing. */
const nf = new Intl.NumberFormat("en-CA");
const STARTER_PRICE = `$${nf.format(getPackage("starter")?.price ?? packages[0].price)}`;
const CARE_PRICE = `$${nf.format(carePlan.monthly)}`;

/**
 * Homepage hero.
 *
 * Copy is fixed by docs/design/HOMEPAGE-BUILD-SPEC.md section 3. Every line is
 * traceable to research/search-demand/ — see 13-hero-decision.md for the full
 * three-way comparison behind the current H1.
 *
 * Short version of that decision:
 *  - "AI receptionist" + "contractors" must both survive: the bare term is 50%
 *    builder/agency intent on YouTube, and the "for contractors" qualifier is
 *    what flips it to 100% buyer. It is also the site's #1 first-party GSC
 *    query and the head of its largest topical cluster.
 *  - Those words used ALONE would be the category label — the same phrase a
 *    dozen competitors lead with — so the differentiator has to be in the
 *    headline too.
 *  - Wording revised 2026-08-01 after owner review. The previous construction
 *    "— on the number you already own" put the differentiator in a trailing
 *    dependent clause and read awkwardly. Leading with "Your business number"
 *    puts the contractor's own asset first, makes "answered" the verb, and
 *    keeps category + audience intact. Comprehension beat keyword order.
 *  - Factually accurate: the receptionist answers the contractor's existing
 *    advertised business number. It is not a new line and not a number we own.
 *
 * "Missed calls" is retained as the problem framing in the support line, where
 * the customer language belongs, rather than as the whole headline.
 *
 * Deliberately avoids "AI-powered", sci-fi framing, absolutes like "never",
 * and any statistic.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--v-surface)" }}>
      {/* quiet dotted field, masked out toward the edges */}
      <div className="v-dotfield pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="v-container relative pb-16 pt-14 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
          {/* ---- copy ---- */}
          <div>
            <SectionLabel>for Surrey &amp; Metro Vancouver contractors</SectionLabel>

            {/* Capped below the 60px .v-h1 default. The reference's 60px is sized
                for a 4-word headline; this one is 11 words and set at 60px it ran
                to four lines and crowded out the supporting copy. Dropping the
                ceiling to 52px brings it to three balanced lines. */}
            <h1 className="v-h1 mt-5 text-balance" style={{ fontSize: "clamp(34px, 5vw, 52px)" }}>
              Your business number, answered by an AI receptionist built for contractors.
            </h1>

            <p className="v-body mt-5 max-w-[36rem]">
              It answers the calls you miss while you&rsquo;re on site, books the job into your
              calendar, and chases the quotes that go quiet. Installed in about a week.
            </p>

            {/* Price and timeline belong above the fold. They were previously
                eight sections down, so the two questions every contractor asks
                first ("what does it cost" / "how long") went unanswered until
                the visitor had scrolled most of the page. */}
            <p className="v-small mt-4 max-w-[36rem]" style={{ color: "var(--v-ink-2)" }}>
              <strong style={{ color: "var(--v-ink)", fontWeight: 600 }}>
                From {STARTER_PRICE} CAD, one time
              </strong>{" "}
              · live in about a week · optional care plan from {CARE_PRICE}/month. You keep the
              number, the data and the accounts — cancel any time.
            </p>

            {/* Exactly two CTAs, site-wide policy. The demo leads because it is
                the only thing here that proves the claim without a conversation.
                The second is deliberately NOT "Book a call": there is no calendar
                integration, so the site must not imply a time is being reserved. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/demo" className="btn-primary w-full sm:w-auto">
                Try the live AI demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/create" className="btn-secondary w-full sm:w-auto">
                Request a free 10-minute fit check
              </Link>
            </div>

            <p className="v-micro mt-5">
              The demo needs no signup. The fit check is a short form — I read it myself and reply
              within one business day.
            </p>
          </div>

          {/* ---- product visual ---- */}
          <div className="lg:pl-4">
            <CallTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}
