// Deterministic number formatting — identical output on the server and in the
// browser, so it never triggers React hydration mismatches.
//
// Bare `n.toLocaleString()` (no locale arg) uses the *runtime's* default locale,
// which differs between the Node server (often en-US) and the visitor's browser
// (their OS locale). That mismatch made server-rendered "3,500" disagree with
// the client and tripped React hydration errors #418/#423/#425. This formatter
// has no locale dependency, so both sides always agree.
export function formatNum(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// "$3,500" — convenience wrapper for prices.
export function formatPrice(n: number): string {
  return `$${formatNum(n)}`;
}
