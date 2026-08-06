import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./primitives";
import CallTimeline from "./CallTimeline";

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

            <p className="v-small mt-3 max-w-[36rem]">
              Not a subscription you have to figure out. You keep the number, the data and the
              accounts — export or cancel any time.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/create" className="btn-primary w-full sm:w-auto">
                Book an AI opportunity review
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/tools/missed-call-revenue-calculator" className="btn-secondary w-full sm:w-auto">
                See what missed calls cost you
              </Link>
            </div>

            <p className="v-micro mt-5">
              Free calculators below — no signup, no email, nothing gated.
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
