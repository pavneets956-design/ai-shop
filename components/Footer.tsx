import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { site } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { resources } from "@/lib/data/resources";
import { howtos } from "@/lib/data/howto";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 [filter:drop-shadow(0_0_14px_rgba(25,23,22,0.32))]" />
              <span className="font-display text-lg font-semibold text-ink">Handbuilt</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/50">{site.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a href={`mailto:${site.email}`} className="rounded-lg border border-ink/10 p-2 text-ink/60 transition hover:text-ink" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
              {site.social.github !== "#" && (
                <a href={site.social.github} className="rounded-lg border border-ink/10 p-2 text-ink/60 transition hover:text-ink" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              )}
              <a href={site.social.linkedin} className="rounded-lg border border-ink/10 p-2 text-ink/60 transition hover:text-ink" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <FooterLink href="/services">All services</FooterLink>
              <FooterLink href="/industries">By industry</FooterLink>
              <FooterLink href="/use-cases">Use cases</FooterLink>
              <FooterLink href="/compare">Compare</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>

          {/* Popular services */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.h1}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Industries</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {industries.slice(0, 6).map((i) => (
                <FooterLink key={i.slug} href={`/industries/${i.slug}`}>
                  {i.h1.replace(/^AI Automation for /, "")}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Learn</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {resources.slice(0, 4).map((r) => (
                <FooterLink key={r.slug} href={`/resources/${r.slug}`}>
                  {r.h1}
                </FooterLink>
              ))}
              {howtos.slice(0, 2).map((h) => (
                <FooterLink key={h.slug} href={`/how-to/${h.slug}`}>
                  {h.h1}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 sm:flex-row">
          <p className="text-sm text-ink/40">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-ink/50 transition-colors hover:text-ink">
        {children}
      </Link>
    </li>
  );
}
