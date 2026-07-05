import Link from "next/link";

/**
 * Handbuilt AI brand mark — an engineered "H" with a RED crossbar and a single
 * red spark node on a near-black tile (Molten Forge). Pure SVG so it stays crisp
 * from 16px favicon to hero scale.
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
        <linearGradient id="hbBar" x1="16" y1="20" x2="32" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6961" />
          <stop offset="1" stopColor="#E0362C" />
        </linearGradient>
      </defs>
      {/* near-black tile */}
      <rect x="2" y="2" width="44" height="44" rx="11" fill="#1D1D1F" />
      {/* subtle corner brackets (red) */}
      <path d="M9 14 V9 H14" stroke="#E0362C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M39 34 V39 H34" stroke="#E0362C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* engineered "H" */}
      <path d="M16 14 V34" stroke="#FBFBFD" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M32 14 V34" stroke="#FBFBFD" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M16 24 H32" stroke="url(#hbBar)" strokeWidth="4.4" strokeLinecap="round" />
      {/* red spark node + soft glow */}
      <circle cx="32" cy="14" r="5" fill="#FF6961" opacity="0.24" />
      <circle cx="32" cy="14" r="2.8" fill="#FF453A" />
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
      <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
      <span className="font-display text-lg font-semibold tracking-tight text-ink">Handbuilt</span>
    </Link>
  );
}
