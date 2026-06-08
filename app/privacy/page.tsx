import type { Metadata } from "next";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share.`,
  alternates: { canonical: "/privacy" },
};

const updated = "June 6, 2026";

export default function PrivacyPage() {
  return (
    <section className="relative pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink/40">Last updated: {updated}</p>

        <div className="legal-prose mt-10 space-y-8 text-ink/70">
          <p>
            {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) builds custom AI software for businesses
            and individuals. This policy explains what information we collect through this website and
            how we use it. We keep it short and plain.
          </p>

          <Section title="What we collect">
            <ul>
              <li>
                <strong>Information you give us.</strong> When you submit the build-request form or
                email us, we collect your name, email, phone (if provided), and the project details
                you share (goal, industry, budget, timeline, current tools, website).
              </li>
              <li>
                <strong>Basic technical data.</strong> Our host (Vercel) records standard request logs
                such as IP address and browser type for security and reliability.
              </li>
            </ul>
          </Section>

          <Section title="How we use it">
            <ul>
              <li>To reply to your inquiry with a plan and a quote.</li>
              <li>To scope, deliver, and support work you ask us to build.</li>
              <li>To keep the site secure and working.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your information, and we do not send marketing email
              unless you ask us to.
            </p>
          </Section>

          <Section title="Who we share it with">
            <p>
              We use a small number of service providers to run the business, and share only what each
              needs:
            </p>
            <ul>
              <li>
                <strong>Vercel</strong> — website hosting and request logs.
              </li>
              <li>
                <strong>Resend</strong> — to deliver the notification email when you submit the form.
              </li>
            </ul>
            <p>
              We may disclose information if required by law. We never share your project details with
              other clients.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              We keep inquiry and project information for as long as needed to serve you and to keep
              business records. You can ask us to delete your information at any time.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              You can request a copy of the information we hold about you, ask us to correct it, or ask
              us to delete it. Email{" "}
              <a href={`mailto:${site.email}`} className="text-clay hover:underline">
                {site.email}
              </a>{" "}
              and we&apos;ll handle it.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy? Email{" "}
              <a href={`mailto:${site.email}`} className="text-clay hover:underline">
                {site.email}
              </a>
              . {site.name} is based in {site.region}, Canada.
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
