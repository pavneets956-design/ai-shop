import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SectionHeading, SectionLabel } from "@/components/marketing/primitives";
import { ProofSection } from "@/components/marketing/ProofFounder";
import { ProcessSteps } from "@/components/marketing/HomeSections";
import { site } from "@/lib/data/site";
import { DEFAULT_OG_IMAGE, FOUNDER_ID, ORG_ID } from "@/lib/seo";

/**
 * About — rewritten 2026-08-30.
 *
 * The page it replaces was the site's biggest credibility problem. It was
 * written in the corporate "we" for a one-person business, claimed to be
 * "working with clients worldwide" when there are no clients at all, never
 * named or showed the builder, and closed with a gradient-text headline and a
 * magnetic button. The site said "one builder" on every page and then never
 * introduced him.
 *
 * Every claim here is from the verified register in
 * research/transformation-2026-08-30/09-proof-founder-positioning.md. Where a
 * fact could not be verified it is simply absent — there is no LinkedIn link
 * because no profile was found, no phone number because there is no business
 * line, and no client count because the number is zero and the page says so.
 */

const TITLE = `About ${site.founder} — the one builder behind Handbuilt AI`;
const DESCRIPTION =
  "Handbuilt AI is one person in Surrey, BC. Pavneet Singh runs a cedar-fence company, builds two live software products, and installs AI receptionists and admin systems for BC contractors. No agency, no account managers, no invented case studies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/about`,
    type: "profile",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { images: [DEFAULT_OG_IMAGE] },
};

/** Person node for the founder, referenced by the sitewide organization. */
const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: site.founder,
  jobTitle: "Founder & Builder",
  email: site.email,
  image: `${site.url}/founder.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surrey",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  worksFor: { "@id": ORG_ID },
  knowsAbout: [
    "AI receptionist",
    "AI lead follow-up",
    "business automation for contractors",
    "Next.js",
    "TypeScript",
  ],
};

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "You talk to the person building it",
    body: "The first conversation, the workflow map, the build, the testing and the handover are all me. Nothing gets passed to someone who has never spoken to you, because there is nobody else to pass it to.",
  },
  {
    title: "A fixed CAD quote before any work starts",
    body: "We agree the scope and the number first. If the scope grows, we agree that too, in writing, before I build it. No hourly drip and no surprise invoice at the end.",
  },
  {
    title: "It runs inside the accounts you already have",
    body: "Your phone number, your calendar, your CRM, your inbox. I am not trying to move you onto a platform I control, and you can export or switch it off without asking me first.",
  },
  {
    title: "Tested on real calls before you rely on it",
    body: "Every build gets run against the awkward cases — the caller who mumbles the address, the one who wants a price I can't give, the one who asks for a human. I would rather find those before your customers do.",
  },
  {
    title: "I tell you what it can't do",
    body: "An AI receptionist will not close a complex quote, and it should not pretend to be a person. Where a build has a limit, you'll hear about the limit from me before you pay for it.",
  },
  {
    title: "No invented proof, ever",
    body: "No stock testimonials, no borrowed client logos, no statistic I didn't measure myself. When I have a customer result worth showing, it will have a real name attached to it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[founderSchema]} />

      {/* ── Founder hero ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--v-surface)" }}>
        <div className="v-container pb-14 pt-14 md:pb-16 md:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:gap-16">
            <div>
              <SectionLabel>Surrey / Delta, BC</SectionLabel>
              <h1
                className="v-h1 mt-5 text-balance"
                style={{ fontSize: "clamp(34px, 5vw, 52px)" }}
              >
                Handbuilt AI is one person. This is him.
              </h1>
              <p className="v-lead mt-5 max-w-[38rem]">
                I&rsquo;m {site.founder}. I run a cedar-fence company in South Surrey, I build
                software, and I install AI receptionists and admin systems for contractors and local
                service businesses around Metro Vancouver and the Fraser Valley.
              </p>
              <p className="v-body mt-4 max-w-[38rem]">
                I built an AI receptionist for my own business line before I offered one to anybody
                else — which is also how I learned what it gets wrong.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/demo" className="btn-primary w-full sm:w-auto">
                  Try the live AI demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/create" className="btn-secondary w-full sm:w-auto">
                  Request a free 10-minute fit check
                </Link>
              </div>
            </div>

            <div className="order-first max-w-[240px] lg:order-none lg:max-w-none">
              <Image
                src="/founder.jpg"
                alt={`${site.founder}, founder of Handbuilt AI`}
                width={560}
                height={560}
                sizes="(min-width: 1024px) 320px, 240px"
                priority
                className="w-full rounded-[var(--v-r-panel)]"
                style={{ boxShadow: "var(--v-shadow-card)" }}
              />
              <p className="v-micro mt-3">
                {site.founder} — founder and builder. Reachable at{" "}
                <a href={`mailto:${site.email}`} className="v-link">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The honest position ──────────────────────────────────────────── */}
      <section className="v-section-tight" style={{ backgroundColor: "var(--v-field)" }}>
        <div className="v-container">
          <div className="max-w-[46rem]">
            <SectionLabel>where this is up to</SectionLabel>
            <h2 className="v-h2 mt-5 text-balance">
              I don&rsquo;t have client case studies yet. Here&rsquo;s what I do have.
            </h2>
            <div className="mt-5 space-y-4">
              <p className="v-body">
                Most agencies open with a wall of logos. I can&rsquo;t, because this is new and the
                honest number of contractor clients I&rsquo;ve delivered for is small. Inventing a
                testimonial would be the fastest way to lose the kind of customer I want, and every
                contractor I&rsquo;ve met can smell a fake number from across a parking lot.
              </p>
              <p className="v-body">
                What I can do is show you three systems that are live right now, tell you exactly how
                they were built and tested, and let you talk to the receptionist yourself before you
                give me your name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof (shared with the homepage — one source, one set of facts) ─ */}
      <ProofSection />

      {/* ── How I work ───────────────────────────────────────────────────── */}
      <section className="v-section" style={{ backgroundColor: "var(--v-field)" }}>
        <div className="v-container">
          <SectionHeading
            align="left"
            eyebrow="how I work"
            title="Six things you can hold me to."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="v-card p-6">
                <h3 className="v-h3" style={{ fontSize: 20 }}>
                  {p.title}
                </h3>
                <p className="v-small mt-2.5" style={{ color: "var(--v-ink-2)" }}>
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process (shared component, single source of truth) ───────────── */}
      <ProcessSteps />

      {/* ── Close ────────────────────────────────────────────────────────── */}
      <section className="v-section" style={{ backgroundColor: "var(--v-surface)" }}>
        <div className="v-container">
          <div className="max-w-[42rem]">
            <SectionLabel>next step</SectionLabel>
            <h2 className="v-h2 mt-5 text-balance">
              Try it first. Talk to me second.
            </h2>
            <p className="v-lead mt-4">
              The demo asks you for nothing. If it does something useful, tell me what you&rsquo;re
              trying to stop losing and I&rsquo;ll tell you whether it&rsquo;s worth building —
              including when the answer is no.
            </p>
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
              I read every one myself and reply within one business day — there is no calendar to
              book and no sales team to get past.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
