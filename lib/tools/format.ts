// Shared numeric helpers for the free contractor tools.
// Pure, deterministic, browser-safe. No I/O, no dependencies, no paid APIs.

/** Coerce anything to a finite number, else a fallback (default 0). */
export function safeNum(v: unknown, fallback = 0): number {
  if (typeof v === "number") return Number.isFinite(v) ? v : fallback;
  if (typeof v === "string") {
    const t = v.trim();
    if (t === "") return fallback;
    const n = Number(t);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

/** Sanitise to a finite number and clamp negatives to zero. */
export function clampNonNeg(v: unknown): number {
  const n = safeNum(v, 0);
  return n < 0 ? 0 : n;
}

/**
 * Round to `dp` decimals the way a person reading dollars expects
 * (half-up on the decimal value), sidestepping binary-float edge cases
 * like 1.005 → "1.01" and 2.345 → "2.35" via the shortest-string exponent trick.
 */
export function roundDp(v: number, dp: number): number {
  if (!Number.isFinite(v)) return 0;
  const scaled = Number(`${v}e${dp}`);
  if (!Number.isFinite(scaled)) return v; // extreme magnitudes: leave as-is
  const r = Number(`${Math.round(scaled)}e-${dp}`);
  if (!Number.isFinite(r)) return 0;
  return r === 0 ? 0 : r; // normalise -0
}

/** Round to 2 decimals (money). */
export function round2(v: number): number {
  return roundDp(v, 2);
}

/** Format a value as currency (CAD default). `whole` drops the cents. */
export function formatCurrency(v: unknown, currency = "CAD", whole = false): string {
  const n = round2(safeNum(v));
  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: whole ? 0 : 2,
    }).format(n);
  } catch {
    return `$${formatNumber(n, whole ? 0 : 2)}`;
  }
}

/** Format a value as a percentage string with `digits` decimals (default 1). */
export function formatPercent(v: unknown, digits = 1): string {
  const n = roundDp(safeNum(v), digits);
  return `${n.toFixed(digits)}%`;
}

/** Format a plain number with thousands grouping and `digits` decimals (default 0). */
export function formatNumber(v: unknown, digits = 0): string {
  const n = roundDp(safeNum(v), digits);
  try {
    return new Intl.NumberFormat("en-CA", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(n);
  } catch {
    return n.toFixed(digits);
  }
}
