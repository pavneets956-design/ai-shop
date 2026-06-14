"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/data/site";
import { LogoMark } from "@/components/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-ink/[0.06] bg-paper/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Handbuilt
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/create" className="btn-primary text-sm">
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
            <Link href="/create" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Start a build <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
