"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data/site";
import { LogoMark } from "@/components/Logo";

/**
 * Site header — rebuilt 2026-08-01 to the Verseo geometry.
 *
 * Reference measurements (docs/design/VERSE0-REFERENCE-AUDIT.md section 1.7):
 * fixed 76px bar, logo left, centred links, one dark CTA right; 63px and
 * logo + hamburger only on mobile. We keep the existing 72px `h-header` token
 * because `scroll-padding-top` and several anchor targets already depend on it.
 *
 * The CTA is flat near-black, not the retired red gradient — a saturated
 * button destroys the low-opacity elevation system the rest of the page uses.
 * The hairline under the bar is a shadow, not a border, matching the reference.
 *
 * 2026-08-30: dropped `useSession`. The only thing it drove was an "Account"
 * link for the retired Tools Pro backend, and it forced next-auth into the
 * client bundle of every route on the site. The CTA also grew from 40px to
 * 44px — it was the one control in the header below the minimum touch target.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open so the page behind it
  // doesn't scroll under the user's thumb.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes the sheet.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(255,255,255,0.86)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "inset 0 -1px 0 var(--v-hairline)",
      }}
    >
      <nav className="v-container" aria-label="Main">
        <div className="flex h-header items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href="/"
            className="group flex min-h-[44px] flex-none items-center gap-2.5 rounded-[var(--v-r-control)] focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="h-7 w-7" />
            <span
              className="text-[17px] font-semibold tracking-tight"
              style={{ color: "var(--v-ink)", letterSpacing: "-0.02em" }}
            >
              Handbuilt&nbsp;AI
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-[2px] text-[15px] transition-colors focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
                style={{ color: "var(--v-ink-2)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden flex-none items-center gap-5 lg:flex">
            <Link href="/create" className="btn-primary !h-11 !px-5 !text-[14px]">
              Start a project
            </Link>
          </div>

          {/* Mobile toggle — 44px target */}
          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[var(--v-r-control)] lg:hidden focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
            style={{ color: "var(--v-ink)" }}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden"
          style={{ backgroundColor: "#fff", boxShadow: "inset 0 1px 0 var(--v-hairline)" }}
        >
          <div className="v-container py-4">
            <ul className="m-0 list-none space-y-1 p-0">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center rounded-[var(--v-r-control)] px-3 text-[17px] transition-colors focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
                    style={{ color: "var(--v-ink)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/create" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
