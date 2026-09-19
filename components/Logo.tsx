import Link from "next/link";
/** Single-colour mark without shared SVG IDs. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#171b24" />
      <path d="M12 11v18M28 11v18M12 20h16" stroke="#fff" strokeWidth="3.5" />
      <path d="M20 16v8" stroke="#81a1ff" strokeWidth="3.5" />
    </svg>
  );
}
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
    <Link href={href} onClick={onClick} className={`studio-brand ${className}`}>
      <LogoMark />
      Handbuilt AI
    </Link>
  );
}
