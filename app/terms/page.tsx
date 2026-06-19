import type { Metadata } from "next";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms for using the ${site.name} website and working with us.`,
  alternates: { canonical: "/terms" },
};

const updated = "June 6, 2026";

export default function TermsPage() {
  return (
    <section className="relative pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-ink/40">Last updated: {updated}</p>

        <div className="legal-prose mt-10 space-y-8 text-ink/70">
          <p>
            These terms cover your use of the {site.name} website. Work we deliver is governed by a
            separate written proposal or agreement for that specific project; where the two differ, the
            project agreement wins.
          </p>

          <Section title="What we do">
            <p>
              {site.name} designs and builds custom AI apps, agents, automations, and tools. The
              website describes our services and lets you request a build. Submitting the form is a
              request, not a contract — no work begins until we agree on scope and price in writing.
            </p>
          </Section>

          <Section title="Using this site">
            <ul>
              <li>Provide accurate information when you contact us.</li>
              <li>Don&apos;t misuse the site, attempt to break it, or use it unlawfully.</li>
              <li>
                Content on this site (text, design, code, the {site.name} name and logo) belongs to us
                and may not be copied without permission.
              </li>
            </ul>
          </Section>

          <Section title="Quotes and estimates">
            <p>
              Prices, packages, and timelines shown on the site are starting estimates, not binding
              quotes. Your final quote is the one we send you in writing after reviewing your request.
            </p>
          </Section>

          <Section title="No guarantees on the site">
            <p>
              The website is provided &ldquo;as is.&rdquo; We work to keep it accurate and available,
              but we don&apos;t guarantee it will be error-free or uninterrupted. Any third-party links
              are provided for convenience and are not our responsibility.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the extent permitted by law, {site.name} is not liable for indirect or consequential
              losses arising from your use of this website. Nothing here limits liability that cannot
              be limited under applicable law.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These terms are governed by the laws of British Columbia, Canada. Any dispute relating to
              the website will be handled in the courts of British Columbia.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${site.email}`} className="text-ink hover:underline">
                {site.email}
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed [&_a]:font-medium [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink/90 [&_ul]:space-y-2">
        {children}
      </div>
    </div>
  );
}
