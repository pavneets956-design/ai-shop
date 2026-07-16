"use client";

import Link from "next/link";
import { trackTool } from "@/lib/track";

/** Internal link that carries tool attribution and fires tool_cta_clicked. */
export function ToolCtaLink({
  href,
  slug,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  slug: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackTool("tool_cta_clicked", { tool: slug })}
      className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

/** Compact conversion card shown right after a tool's result. */
export function ToolResultCta({
  href,
  slug,
  heading,
  body,
  label,
}: {
  href: string;
  slug: string;
  heading: string;
  body: string;
  label: string;
}) {
  return (
    <div className="rounded-card border border-clay/20 bg-clay-soft/60 p-5">
      <h3 className="font-display text-card-title font-bold text-ink">{heading}</h3>
      <p className="mt-1.5 text-small text-ink/80">{body}</p>
      <ToolCtaLink href={href} slug={slug} className="mt-4 w-full sm:w-auto">
        {label}
      </ToolCtaLink>
      <p className="mt-3 text-tiny-label text-muted">
        No signup to get results · nothing you enter is uploaded unless you submit the contact form.
      </p>
    </div>
  );
}
