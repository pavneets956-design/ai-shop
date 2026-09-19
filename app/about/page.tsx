import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/data/site";
import { DEFAULT_OG_IMAGE, FOUNDER_ID, ORG_ID } from "@/lib/seo";
const title = "About Pavneet Singh — Independent Builder | Handbuilt AI";
const description =
  "Meet Pavneet Singh, the independent builder behind Handbuilt AI in Surrey, BC. Custom websites, apps and AI systems, built with you from idea to handover.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: site.url + "/about",
    type: "profile",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { images: [DEFAULT_OG_IMAGE] },
};
const principles = [
  [
    "One person, start to finish.",
    "You talk directly to me about the idea, design, build and handover. We work through the details together and keep the next step clear.",
  ],
  [
    "A useful first version.",
    "We start with a defined problem and agree the scope in writing. A working prototype helps us test the idea before adding more.",
  ],
  [
    "Your work, in your accounts.",
    "Custom code, accounts and business data are handed over as agreed. Any third-party subscriptions and licences are explained upfront.",
  ],
  [
    "Care beyond the happy path.",
    "We check responsive layouts, errors, unusual inputs and the parts that need a human. The limits and ongoing costs are part of the conversation.",
  ],
];
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": FOUNDER_ID,
            name: site.founder,
            jobTitle: "Founder & Builder",
            email: site.email,
            image: site.url + "/founder.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Surrey",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            worksFor: { "@id": ORG_ID },
            knowsAbout: [
              "Web development",
              "Business software",
              "AI agents",
              "Business automation",
            ],
          },
        ]}
      />
      <section className="studio-page-hero studio-container studio-about-intro">
        <div>
          <p className="studio-eyebrow">The person behind the build</p>
          <h1>
            I’m Pavneet.
            <br />
            <span>Let’s make it work.</span>
          </h1>
          <p>
            I run a cedar-fence business in South Surrey and build software.
            Handbuilt AI is where I work with you on websites, apps and AI
            systems—from the rough idea to the details that make it useful.
          </p>
          <Link href="/create" className="studio-button">
            Tell me about your idea ↗
          </Link>
        </div>
        <Image
          src="/founder.jpg"
          alt="Pavneet Singh, founder of Handbuilt AI"
          width={560}
          height={560}
          sizes="(max-width: 800px) 240px, 380px"
          priority
        />
      </section>
      <section className="studio-page-section studio-container">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">A practical starting point</p>
            <h2>
              I build things
              <br />I use myself.
            </h2>
          </div>
          <p>
            Running a business gives me real problems to work on: getting an
            enquiry, keeping track of documents and following up without losing
            the afternoon.
          </p>
        </div>
        <div className="studio-services">
          <article>
            <h3>Ironwood Grounds</h3>
            <p>
              My cedar-fence business in South Surrey, with a website and quote
              intake supporting the work on site.
            </p>
            <a
              href="https://ironwoodgrounds.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="studio-text-link"
            >
              Visit Ironwood Grounds ↗
            </a>
          </article>
          <article>
            <h3>COITracker</h3>
            <p>
              My software product for tracking certificates of insurance,
              reviewing documents and managing expiry reminders.
            </p>
            <a
              href="https://coitracker.co"
              target="_blank"
              rel="noopener noreferrer"
              className="studio-text-link"
            >
              Explore COITracker ↗
            </a>
          </article>
          <article>
            <h3>PayNudge</h3>
            <p>
              My invoice follow-up product, built to send reminders and stop the
              sequence when payment is recorded. Connected invoices update after a successful sync.
            </p>
            <a
              href="https://paynudge.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="studio-text-link"
            >
              Explore PayNudge ↗
            </a>
          </article>
        </div>
        <p className="studio-proof-note">
          These are my own businesses and products.
        </p>
      </section>
      <section className="studio-page-section studio-container">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">Working together</p>
            <h2>Clear from the start.</h2>
          </div>
        </div>
        <div className="studio-about-principles">
          {principles.map(([name, body]) => (
            <article key={name}>
              <h3>{name}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-final">
        <div className="studio-container">
          <p className="studio-eyebrow">One builder. A conversation.</p>
          <h2>
            Bring the idea.
            <br />
            We’ll work through the rest.
          </h2>
          <p>
            Based in Surrey, BC. Available to work remotely.
            <br />I reply to project requests within one business day.
          </p>
          <Link href="/create" className="studio-button">
            Start a conversation ↗
          </Link>
        </div>
      </section>
    </>
  );
}
