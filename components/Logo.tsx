import Link from "next/link";

/**
 * AI Shop brand mark — a faceted "A" monogram (also reads as an upward growth
 * chevron) with a spark node, set on the obsidian→electric brand gradient.
 * Pure SVG so it stays crisp from 16px favicon to hero scale.
 *
 * Note: the gradient id is intentionally static. If two marks render on the
 * same page, both url(#aishopGrad) refs resolve to the first identical
 * gradient — visually correct, no flicker.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="aishopGrad"
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4F8CFF" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#aishopGrad)" />
      {/* subtle top sheen */}
      <rect x="2" y="2" width="44" height="22" rx="13" fill="#FFFFFF" fillOpacity="0.10" />
      {/* "A" apex */}
      <path
        d="M13.5 34.5 L24 12 L34.5 34.5"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "A" crossbar */}
      <path d="M18.7 27 H29.3" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      {/* spark node */}
      <circle cx="37.5" cy="11" r="2.4" fill="#FFFFFF" />
    </svg>
  );
}

/** Full lockup: mark + wordmark. Wraps in a link to home by default. */
export function Logo({
  className = "",
  href = "/",
  onClick,
}: {
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className={`group flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105 [filter:drop-shadow(0_0_14px_rgba(199,93,67,0.32))]" />
      <span className="font-display text-lg font-semibold tracking-tight text-ink">AI Shop</span>
    </Link>
  );
}
