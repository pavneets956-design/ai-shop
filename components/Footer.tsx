import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { site } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { freeTools, toolPath } from "@/lib/data/freeTools";

/**
 * Site footer — rebuilt 2026-08-01 into the homepage design system.
 *
 * Previously this was the last surviving block of the old design: smaller
 * type, a different muted grey, a different spacing scale, and a flat 6-column
 * link dump. It was the final thing a visitor saw and it visibly did not match
 * the page above it.
 *
 * Now uses the same tokens, the same dimension-callout column labels, and the
 * same 17px/15px type scale as the rest of the page. Three deliberate
 * additions the old one lacked:
 *   - the free tools are listed BY NAME, not hidden behind one "Free tools"
 *     link. They are the strongest asset on the site and the least discoverable.
 *   - Surrey / BC service area is stated, matching the local positioning.
 *   - one real CTA, rather than ending on a link list.
 *
 * Route integrity: every link the previous footer carried is still here.
 * /creators in particular currently ranks best on the site and must not lose
 * its internal links.
 */

const AREAS = "Surrey · Delta · Langley · White Rock · Burnaby · New Westminster · Coquitlam · Richmond · Abbotsford";

export default function Footer() {
  const tools = [...freeTools].sort((a, b) => a.order - b.order);

  return (
    <footer className="relative" style={{ backgroundColor: "var(--v-surface)", boxShadow: "inset 0 1px 0 var(--v-hairline)" }}>
      <div className="v-container py-16 lg:py-20">
        {/* ── brand + CTA ─────────────────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-[var(--v-r-control)] focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
            >
              <LogoMark className="h-7 w-7" />
              <span
                className="text-[17px] font-semibold tracking-tight"
                style={{ color: "var(--v-ink)", letterSpacing: "-0.02em" }}
              >
                Handbuilt&nbsp;AI
              </span>
            </Link>
            <p className="v-body mt-4 max-w-[34rem]">
              We install AI receptionists and follow-up for contractors — on the business number,
              calendar and accounts you already own.
            </p>
            <p className="v-small mt-4">
              <span style={{ color: "var(--v-ink)" }}>Based in Surrey, BC.</span> {AREAS}. Remote
              elsewhere in BC.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="v-link text-[15px]">
                {site.email}
              </a>
              <span className="v-micro" aria-hidden="true">·</span>
              <div className="flex gap-2">
                <IconLink href={`mailto:${site.email}`} label="Email">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </IconLink>
                {site.social.github !== "#" && (
                  <IconLink href={site.social.github} label="GitHub">
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </IconLink>
                )}
                {site.social.linkedin !== "#" && (
                  <IconLink href={site.social.linkedin} label="LinkedIn">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </IconLink>
                )}
              </div>
            </div>
          </div>

          {/* one real CTA rather than ending on a link list */}
          <div
            className="rounded-[var(--v-r-panel)] p-6"
            style={{ backgroundColor: "var(--v-recess)", boxShadow: "0 0 0 1px var(--v-hairline)" }}
          >
            <p className="v-label">start here</p>
            <p className="mt-4 text-[17px] font-medium leading-snug" style={{ color: "var(--v-ink)" }}>
              Find out what the missed calls are costing you.
            </p>
            <p className="v-small mt-2">Free, runs in your browser, asks you for nothing.</p>
            <Link href="/tools/missed-call-revenue-calculator" className="btn-primary mt-5 w-full">
              Open the calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/create" className="btn-secondary mt-2.5 w-full">
              Request a review
            </Link>
          </div>
        </div>

        {/* ── link columns ────────────────────────────────────────────── */}
        <div
          className="mt-14 grid gap-10 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: "var(--v-hairline)" }}
        >
          <Col label="free contractor tools">
            {tools.map((t) => (
              <FooterLink key={t.slug} href={toolPath(t.slug)}>
                {t.name.replace(/^Contractor /, "")}
              </FooterLink>
            ))}
            <FooterLink href="/tools" strong>
              All free tools
            </FooterLink>
          </Col>

          <Col label="what we install">
            <FooterLink href="/ai-receptionist-for-contractors">AI receptionist for contractors</FooterLink>
            <FooterLink href="/ai-receptionist">AI receptionist</FooterLink>
            <FooterLink href="/ai-business-system">AI business system</FooterLink>
            <FooterLink href="/services/ai-review-engine">AI review engine</FooterLink>
            {services.slice(0, 4).map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.h1}
              </FooterLink>
            ))}
            <FooterLink href="/services" strong>
              All services
            </FooterLink>
          </Col>

          <Col label="trades and areas">
            {industries.slice(0, 5).map((i) => (
              <FooterLink key={i.slug} href={`/industries/${i.slug}`}>
                {i.h1.replace(/^AI Automation for /, "")}
              </FooterLink>
            ))}
            <FooterLink href="/locations/ai-receptionist-surrey-bc">AI receptionist, Surrey</FooterLink>
            <FooterLink href="/industries" strong>
              All trades
            </FooterLink>
            <FooterLink href="/locations" strong>
              All locations
            </FooterLink>
          </Col>

          <Col label="company">
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/compare">Compare</FooterLink>
            <FooterLink href="/use-cases">Use cases</FooterLink>
            <FooterLink href="/creators">For creators</FooterLink>
            <FooterLink href="/shop">AI systems shop</FooterLink>
            <FooterLink href="/demo">Live demo</FooterLink>
            <FooterLink href="/remote-ai-development">Remote / international</FooterLink>
          </Col>
        </div>

        {/* ── legal ───────────────────────────────────────────────────── */}
        <div
          className="mt-12 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--v-hairline)" }}
        >
          <p className="v-micro">
            &copy; {new Date().getFullYear()} {site.name}. {site.legalName}, Surrey, British
            Columbia. Prices in CAD.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="v-micro transition-colors hover:text-[color:var(--v-ink)]">
              Privacy
            </Link>
            <Link href="/terms" className="v-micro transition-colors hover:text-[color:var(--v-ink)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="v-label">{label}</p>
      <ul className="mt-5 list-none space-y-2.5 p-0">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, strong }: { href: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-block rounded-[2px] py-0.5 text-[15px] leading-snug transition-colors focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
        style={{ color: strong ? "var(--v-ink)" : "var(--v-muted)" }}
      >
        {children}
      </Link>
    </li>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--v-r-control)] transition-colors focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
      style={{ color: "var(--v-muted)", boxShadow: "0 0 0 1px var(--v-hairline)" }}
    >
      {children}
    </a>
  );
}
