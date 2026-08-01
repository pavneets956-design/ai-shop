import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./primitives";
import CallTimeline from "./CallTimeline";

/**
 * Homepage hero.
 *
 * Copy is fixed by docs/design/HOMEPAGE-BUILD-SPEC.md section 3 and every line
 * traces to evidence in research/search-demand/:
 *  - "Missed calls" is required customer language and the largest problem cluster
 *  - the AI-receptionist framing is 38.4% of first-party GSC impressions
 *  - the Surrey qualifier targets the only AI-Overview-free SERPs found
 *  - the ownership sentence pre-empts the three verified objection queries
 *
 * Deliberately avoids "AI-powered", sci-fi framing and any statistic.
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
            <Eyebrow>for Surrey &amp; Metro Vancouver contractors</Eyebrow>

            <h1 className="v-h1 mt-5 text-balance">Missed calls become booked jobs.</h1>

            <p className="v-body mt-5 max-w-[36rem]">
              We install an AI receptionist into the phone number and accounts you already own —
              answering, booking and following up while you&rsquo;re on site.
            </p>

            <p className="v-small mt-3 max-w-[36rem]">
              You keep the number, the data and the accounts. Export or cancel any time.
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
