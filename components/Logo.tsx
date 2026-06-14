import Link from "next/link";

/**
 * Handbuilt brand mark — an engineered "H" framed by blueprint corner brackets,
 * on a slate tile, with a single amber spark node. Echoes the site's spec-sheet
 * design language (squared, structural, teal + amber). Pure SVG so it stays crisp
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
      {/* slate tile */}
      <rect x="2" y="2" width="44" height="44" rx="10" fill="#1C2B3A" />
      {/* blueprint corner brackets (teal) */}
      <path d="M9 14 V9 H14" stroke="#2F6F6A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M39 34 V39 H34" stroke="#2F6F6A" strokeWidth="1.6" strokeLinecap="round" />
      {/* engineered "H" */}
      <path d="M16 14 V34" stroke="#F4F5F7" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M32 14 V34" stroke="#F4F5F7" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M16 24 H32" stroke="#2F6F6A" strokeWidth="4.4" strokeLinecap="round" />
      {/* amber spark node */}
      <circle cx="32" cy="14" r="2.7" fill="#E8A13C" />
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
