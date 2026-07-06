"use client";

import { usePathname } from "next/navigation";

// Routes that ship their own full-bleed chrome (the /ai-front-desk experience
// has its own logo, nav rail, and footer act) — hide the global Navbar/Footer.
const HIDDEN_PREFIXES = ["/ai-front-desk", "/forge"];
// Exact routes with self-contained chrome. The homepage ("/") renders the
// "Molten Forge" landing, and "/creators" renders the dark "Cutting Room"
// hub — both bring their own sticky nav + footer. (Note: EXACT match only —
// the /creators/[slug] leaf pages keep the global light chrome + template.)
const HIDDEN_EXACT = ["/", "/creators"];

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const hidden =
    HIDDEN_EXACT.includes(pathname) ||
    HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (hidden) return null;
  return <>{children}</>;
}
