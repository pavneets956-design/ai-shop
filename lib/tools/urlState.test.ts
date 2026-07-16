import { describe, it, expect } from "vitest";
import { encodeToolState, decodeToolState } from "./urlState";

describe("encodeToolState", () => {
  it("encodes numbers, strings and booleans in key order", () => {
    expect(encodeToolState({ a: 1, b: 2.5, c: "week", d: true, e: false })).toBe(
      "a=1&b=2.5&c=week&d=1&e=0"
    );
  });
  it("skips undefined, null and empty-string values", () => {
    expect(encodeToolState({ a: 1, b: undefined, c: null, d: "" })).toBe("a=1");
  });
  it("url-encodes string values", () => {
    expect(encodeToolState({ trade: "general contractor" })).toBe("trade=general%20contractor");
  });
  it("omits non-finite numbers", () => {
    expect(encodeToolState({ a: Infinity, b: NaN, c: 3 })).toBe("c=3");
  });
});

describe("decodeToolState", () => {
  const schema = { a: "number", b: "number", c: "string", d: "boolean" } as const;
  it("round-trips an encoded state", () => {
    const s = encodeToolState({ a: 1, b: 2.5, c: "week", d: true });
    expect(decodeToolState(s, schema)).toEqual({ a: 1, b: 2.5, c: "week", d: true });
  });
  it("accepts a URLSearchParams too", () => {
    const params = new URLSearchParams("a=5&c=month");
    expect(decodeToolState(params, schema)).toMatchObject({ a: 5, c: "month" });
  });
  it("ignores keys not in the schema", () => {
    expect(decodeToolState("a=1&evil=hack", schema)).toEqual({ a: 1 });
  });
  it("coerces malformed numbers to 0", () => {
    expect(decodeToolState("a=notanumber", schema)).toEqual({ a: 0 });
  });
  it("parses booleans from 1/0 and true/false", () => {
    expect(decodeToolState("d=1", schema)).toEqual({ d: true });
    expect(decodeToolState("d=0", schema)).toEqual({ d: false });
    expect(decodeToolState("d=true", schema)).toEqual({ d: true });
  });
  it("returns an empty object for empty input", () => {
    expect(decodeToolState("", schema)).toEqual({});
  });
});
