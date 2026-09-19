import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Workflow,
  Code2,
  FileCheck2,
  Bell,
  Fence,
  Calculator,
} from "lucide-react";
import WorkflowPreview from "./WorkflowPreview";
import {
  packages,
  formatPackagePrice,
  carePlan,
  phonePlan,
} from "@/lib/data/packages";
import { HOME_OBJECTIONS } from "@/lib/data/homeFaqs";
import { site } from "@/lib/data/site";

const services = [
  {
    icon: Globe2,
    label: "01 / Websites & experiences",
    title: "Make a better first impression.",
    body: "Custom websites, landing pages and interactive 3D experiences. Thoughtful design, responsive layouts and a clear next step for visitors.",
    href: "/web-design-development",
    link: "Websites & interactive design",
  },
  {
    icon: Code2,
    label: "02 / Apps & software",
    title: "Take the idea beyond a mockup.",
    body: "Web apps, customer portals and internal tools. From the first working version to the accounts, data and integrations it needs.",
    href: "/custom-ai-app-development",
    link: "Custom app development",
  },
  {
    icon: Workflow,
    label: "03 / AI agents & automation",
    title: "Give the repeat work a system.",
    body: "AI assistants, receptionists and connected workflows for enquiries, follow-up and everyday admin. Built with clear rules and human handover.",
    href: "/done-for-you-ai-automation",
    link: "Agents & automation",
  },
];

export default function StudioHome() {
  return (
    <div className="studio-home">
      <section className="studio-hero studio-container">
        <p className="studio-eyebrow">
          <span className="studio-status-dot" /> Independent AI studio · Surrey,
          BC
        </p>
        <h1>
          You have the idea.
          <br />
          <span>Let’s build it properly.</span>
        </h1>
        <p className="studio-hero-copy">
          Custom websites, apps and AI systems. One independent builder working
          with you from the first sketch to something you can actually use.
        </p>
        <div className="studio-actions">
          <Link
            className="studio-button"
            href="/create"
            data-track="hero_contact_click"
            data-track-id="studio_hero"
          >
            Tell me about your idea{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link className="studio-button studio-button-secondary" href="#work">
            Explore the work <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <p className="studio-hero-note">
          Your accounts. A fixed scope. One builder from start to finish.
        </p>
        <WorkflowPreview />
        <div className="studio-trust-row">
          <span>Based in Surrey, BC</span>
          <span>Fixed quotes in CAD</span>
          <span>Your code, accounts & data</span>
          <span>Design → build → handover</span>
        </div>
      </section>
      <section className="studio-section studio-container" id="what-we-build">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">
              From the first pixel to the final workflow
            </p>
            <h2>
              Good ideas deserve
              <br />a thoughtful build.
            </h2>
          </div>
          <p>
            A new website, a tool your team needs, or an AI workflow. We work
            through the details together, then build the right first version.
          </p>
        </div>
        <div className="studio-services">
          {services.map((s) => (
            <article key={s.href}>
              <s.icon size={25} strokeWidth={1.5} aria-hidden="true" />
              <p className="studio-kicker">{s.label}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <Link href={s.href} className="studio-text-link">
                {s.link}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-section studio-proof" id="work">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">Built, and out in the world</p>
              <h2>
                Real work.
                <br />
                From my own businesses.
              </h2>
            </div>
            <p>
              These are products and systems I own and build. Open them, explore
              the work, and see how I approach a practical problem.
            </p>
          </div>
          <div className="studio-projects">
            <a
              className="studio-project"
              href="https://ironwoodgrounds.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="studio-project-art studio-art-fence"
                aria-hidden="true"
              >
                <Fence size={90} strokeWidth={0.8} />
                <div className="studio-art-caption">Enquiry → quote → job</div>
              </div>
              <div className="studio-project-title">
                <h3>Ironwood Grounds</h3>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
              <p>
                My cedar-fence business. A website and quote intake built around
                work on site.
              </p>
              <span className="studio-small">
                Owned business · South Surrey
              </span>
            </a>
            <a
              className="studio-project"
              href="https://coitracker.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="studio-project-art studio-art-docs"
                aria-hidden="true"
              >
                <div className="studio-document">
                  <FileCheck2 size={30} strokeWidth={1.3} />
                  <span>Certificate received</span>
                  <i />
                  <i />
                  <div>
                    <Check size={12} /> Review → reminders
                  </div>
                </div>
              </div>
              <div className="studio-project-title">
                <h3>COITracker</h3>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
              <p>
                Certificate tracking with document review and reminders before
                insurance expires.
              </p>
              <span className="studio-small">
                Owned product · Document workflows
              </span>
            </a>
            <a
              className="studio-project"
              href="https://paynudge.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="studio-project-art studio-art-nudge"
                aria-hidden="true"
              >
                <div className="studio-nudge">
                  <Bell size={26} strokeWidth={1.3} />
                  <span>Follow up. Then get on with it.</span>
                  <div>
                    <i /> Reminder <i /> Reply <i /> Resolved
                  </div>
                </div>
              </div>
              <div className="studio-project-title">
                <h3>PayNudge</h3>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
              <p>
                Invoice reminders that stop when payment is recorded, so follow-up
                stays useful.
              </p>
              <span className="studio-small">
                Owned product · Invoice follow-up
              </span>
            </a>
          </div>
          <p className="studio-proof-note">
            Workflow illustrations above; these are owned projects, not client
            case studies.
          </p>
          <div className="studio-founder">
            <Image
              src="/founder.jpg"
              width={76}
              height={88}
              alt="Pavneet Singh, founder of Handbuilt AI"
            />
            <div>
              <h3>A builder you can talk to.</h3>
              <p>
                I’m {site.founder}. I run a trade business in South Surrey and
                build the software around it. You work directly with me from the
                first conversation to handover.
              </p>
            </div>
            <Link href="/about" className="studio-text-link">
              Meet Pavneet <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="studio-section studio-container" id="pricing">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">Clear scope. Clear price.</p>
            <h2>
              Build something useful.
              <br />
              Then build on it.
            </h2>
          </div>
          <p>
            AI build packages below are starting points. Websites and 3D
            experiences get a project-specific quote, based on design, content
            and interaction scope.
          </p>
        </div>
        <div className="studio-price-grid">
          {packages.map((p, index) => (
            <article
              key={p.id}
              className={
                index === 1
                  ? "studio-price studio-price-featured"
                  : "studio-price"
              }
            >
              <p className="studio-kicker">
                {index === 0
                  ? "One focused workflow"
                  : index === 1
                    ? "Connected workflows"
                    : "Built around your business"}
              </p>
              <h3>{p.name}</h3>
              <p className="studio-price-number">{formatPackagePrice(p)}</p>
              <p className="studio-small">CAD · one-time build</p>
              <ul>
                {p.includes.slice(0, 3).map((x) => (
                  <li key={x}>
                    <Check size={15} aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link
                href={p.cta.href}
                className="studio-button studio-button-secondary"
                data-track="pricing_cta_click"
                data-track-id={p.id}
              >
                Explore this build
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <div className="studio-price-note">
          <p>
            Optional care from <strong>${carePlan.monthly}/month CAD</strong>.
            Phone reception is separately scoped: setup{" "}
            {formatPackagePrice(packages[0]).toLowerCase()} CAD, monthly service
            from <strong>${phonePlan.monthly}/month CAD</strong>, plus provider
            usage.
          </p>
          <Link href="/pricing" className="studio-text-link">
            Full pricing & inclusions{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="studio-tool-strip">
          <Calculator size={27} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h3>Make the numbers useful first.</h3>
            <p>
              Free tools for missed calls, pricing, labour costs and quote
              follow-up. No signup.
            </p>
          </div>
          <Link href="/tools" className="studio-text-link">
            Explore the tools <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="studio-section studio-faq studio-container" id="faq">
        <div>
          <p className="studio-eyebrow">Before we start</p>
          <h2>
            A few straight
            <br />
            answers.
          </h2>
          <p className="studio-faq-intro">
            The details matter. If your question isn’t here, include it in your
            project request.
          </p>
        </div>
        <div>
          {HOME_OBJECTIONS.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="studio-final">
        <div className="studio-container">
          <p className="studio-eyebrow">Let’s make something useful</p>
          <h2>
            What have you
            <br />
            been wanting to build?
          </h2>
          <p>
            A rough idea is a good place to start.
            <br />
            I’ll reply within one business day.
          </p>
          <Link
            href="/create"
            className="studio-button"
            data-track="hero_contact_click"
            data-track-id="studio_final"
          >
            Tell me about your idea{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <span className="studio-small">A short request. No obligation.</span>
          <div className="studio-local-links">
            <Link href="/locations/ai-receptionist-surrey-bc">
              AI receptionist in Surrey
            </Link>
            <Link href="/locations/ai-automation-burnaby-bc">
              Automation in Burnaby
            </Link>
            <Link href="/ai-lead-follow-up-agent">Lead follow-up</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
