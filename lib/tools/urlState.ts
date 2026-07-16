// Shareable URL state for the calculators. NON-SENSITIVE numeric/config values
// ONLY — never names, emails, phone numbers, or free-text job details.
import { safeNum } from "./format";

type Primitive = number | string | boolean | null | undefined;
type FieldType = "number" | "string" | "boolean";

/** Encode a flat map of primitives into a query string (no leading "?"). */
export function encodeToolState(values: Record<string, Primitive>): string {
  const parts: string[] = [];
  for (const [key, v] of Object.entries(values)) {
    if (v === undefined || v === null || v === "") continue;
    if (typeof v === "number") {
      if (!Number.isFinite(v)) continue;
      parts.push(`${key}=${v}`);
    } else if (typeof v === "boolean") {
      parts.push(`${key}=${v ? "1" : "0"}`);
    } else {
      parts.push(`${key}=${encodeURIComponent(v)}`);
    }
  }
  return parts.join("&");
}

/** Decode a query string / URLSearchParams into typed values per a schema. */
export function decodeToolState<T extends Record<string, FieldType>>(
  input: string | URLSearchParams,
  schema: T
): Record<string, number | string | boolean> {
  const params = typeof input === "string" ? new URLSearchParams(input) : input;
  const out: Record<string, number | string | boolean> = {};
  for (const [key, type] of Object.entries(schema)) {
    if (!params.has(key)) continue;
    const raw = params.get(key) ?? "";
    if (type === "number") out[key] = safeNum(raw, 0);
    else if (type === "boolean") out[key] = raw === "1" || raw.toLowerCase() === "true";
    else out[key] = raw;
  }
  return out;
}
