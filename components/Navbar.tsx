"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Menu, X, ArrowRight, UserRound } from "lucide-react";
import { navLinks } from "@/lib/data/site";
import { LogoMark } from "@/components/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const authed = status === "authenticated";

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="container-page">
        <div className="flex h-header items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Handbuilt&nbsp;AI
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-nav text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA — compact (not oversized) for the 72px header */}
          <div className="hidden items-center gap-5 md:flex">
            {authed && (
              <Link
                href="/account"
                className="inline-flex items-center gap-1.5 text-nav text-ink-soft transition-colors hover:text-ink"
              >
                <UserRound className="h-4 w-4" /> Account
              </Link>
            )}
            <Link
              href="/create"
              className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-ink px-4 text-nav font-bold text-white shadow-[0_8px_18px_rgba(25,23,22,0.16)] transition hover:bg-ink-hover"
            >
              Start a build <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="p-2 text-ink md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 pb-6 pt-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-ink/75 transition hover:bg-ink/5 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            {authed && (
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-ink/75 transition hover:bg-ink/5 hover:text-ink"
              >
                Account
              </Link>
            )}
            <Link href="/create" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Start a build <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
