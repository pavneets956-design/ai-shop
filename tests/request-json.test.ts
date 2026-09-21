import { afterEach, describe, expect, it, vi } from "vitest";
import { readJsonObject } from "@/lib/requestJson";
import { POST as demo } from "@/app/api/demo/route";
import { POST as toolsDemo } from "@/app/api/tools-demo/route";
import { POST as tts } from "@/app/api/tts/route";
import { POST as consultation } from "@/app/api/consultation/route";
import { POST as tools } from "@/app/api/tools/route";

vi.mock("@/lib/prisma", () => ({ prisma: {} }));
vi.mock("@/lib/subscription", () => ({ getSubStatus: vi.fn(() => { throw new Error("Must not reach subscription lookup"); }) }));
vi.mock("openai", () => ({ default: class { constructor() { throw new Error("Must not reach paid API"); } } }));
afterEach(() => vi.unstubAllEnvs());
function request(body: string, headers: Record<string, string> = {}) {
  return new Request("https://aibuiltbyhand.com/api/demo", { method: "POST", body,
    headers: { host: "aibuiltbyhand.com", origin: "https://aibuiltbyhand.com", ...headers } });
}
describe("bounded JSON reader", () => {
  it("counts UTF-8 bytes, not JavaScript characters", async () => {
    await expect(readJsonObject(request(JSON.stringify({ text: "é".repeat(12) })), 30)).rejects.toMatchObject({ status: 413 });
  });
  it("accepts an object exactly at the byte limit", async () => {
    await expect(readJsonObject(request('{"x":1}'), 7)).resolves.toEqual({ x: 1 });
  });
  it("decodes a multibyte character split across chunks", async () => {
    const bytes = new TextEncoder().encode('{"x":"é"}');
    const stream = new ReadableStream({ start(c) { c.enqueue(bytes.slice(0, 7)); c.enqueue(bytes.slice(7)); c.close(); } });
    const req = new Request("https://example.com", { method: "POST", body: stream, duplex: "half" } as RequestInit);
    await expect(readJsonObject(req)).resolves.toEqual({ x: "é" });
  });
  it("stops reading and cancels a chunked request beyond the cap", async () => {
    const cancel = vi.fn();
    let pulls = 0;
    const stream = new ReadableStream({ pull(c) { pulls++; c.enqueue(new Uint8Array(100)); }, cancel }, { highWaterMark: 0 });
    const req = new Request("https://example.com", { method: "POST", body: stream, duplex: "half" } as RequestInit);
    await expect(readJsonObject(req, 150)).rejects.toMatchObject({ status: 413 });
    expect(cancel).toHaveBeenCalledOnce();
    expect(pulls).toBe(2);
  });
});
describe.each([["demo", demo], ["tools-demo", toolsDemo], ["tts", tts], ["consultation", consultation], ["tools", tools]] as const)("%s input boundary", (_, handler) => {
  it.each(["null", "[]", "true", '"text"', "{broken"])("rejects %s without throwing or using downstream services", async (body) => {
    vi.stubEnv("CONSULTATION_API_ENABLED", "true");
    const response = await handler(request(body));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid request" });
  });
  it("rejects oversized bodies even with a false small Content-Length", async () => {
    vi.stubEnv("CONSULTATION_API_ENABLED", "true");
    const response = await handler(request(JSON.stringify({ text: "a".repeat(33 * 1024) }), { "content-length": "2" }));
    expect(response.status).toBe(413);
  });
});
it("preserves the disabled consultation gate before parsing", async () => {
  vi.stubEnv("CONSULTATION_API_ENABLED", "false");
  expect((await consultation(request("null"))).status).toBe(404);
});
