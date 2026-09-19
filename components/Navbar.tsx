"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data/site";
import { LogoMark } from "./Logo";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="studio-header">
      <nav aria-label="Main" className="studio-container">
        <div className="studio-nav">
          <Link
            className="studio-brand"
            href="/"
            onClick={() => setOpen(false)}
          >
            <LogoMark />
            Handbuilt AI
          </Link>
          <div className="studio-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            className="studio-button"
            href="/create"
            data-track="hero_contact_click"
            data-track-id="header"
          >
            Start a project
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="studio-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="studio-mobile-nav" id="mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/tools" onClick={() => setOpen(false)}>
              Free tools
            </Link>
            <Link
              href="/create"
              className="studio-button"
              onClick={() => setOpen(false)}
            >
              Start a project
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
