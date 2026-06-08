import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { site } from "@/lib/data/site";
import { solutionCategories } from "@/lib/data/solutions";
import { useCases } from "@/lib/data/useCases";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 [filter:drop-shadow(0_0_14px_rgba(199,93,67,0.32))]" />
              <span className="font-display text-lg font-semibold text-ink">AI Shop</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/50">{site.tagline}</p>
            <p className="mt-4 text-sm text-ink/40">Surrey, BC → worldwide</p>
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
              <FooterLink href="/solutions">Solutions</FooterLink>
              <FooterLink href="/use-cases">Use Cases</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/about">About</FooterLink>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Solutions</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {solutionCategories.slice(0, 5).map((c) => (
                <FooterLink key={c.slug} href={`/create?category=${c.slug}`}>
                  {c.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Popular builds (use-case GEO links) */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Popular</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {useCases.slice(0, 5).map((u) => (
                <FooterLink key={u.slug} href={`/use-cases/${u.slug}`}>
                  {u.solution} for {u.industry.split(" ")[0]}
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
