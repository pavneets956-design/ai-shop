import { test, expect } from "@playwright/test";
import nextConfigRaw from "../../next.config.js";

/**
 * Redirects must land in ONE hop.
 *
 * A redirect chain leaks link equity, doubles latency, and is invisible until
 * someone checks. `next.config.js` carries 30+ permanent (308) entries and
 * nothing has ever asserted that their destinations are live, canonical, or
 * non-chaining.
 */

type Redirect = { source: string; destination: string; permanent?: boolean };
const nextConfig = nextConfigRaw as unknown as {
  redirects?: () => Promise<Redirect[]>;
};

test.describe("redirects", () => {
  test("every configured redirect resolves in exactly one hop to a live page", async ({ request }) => {
    test.skip(typeof nextConfig.redirects !== "function", "next.config.js exposes no redirects()");

    const redirects = (await nextConfig.redirects!()).filter(
      // Skip anything with a path parameter — those need real values to test.
      (r) => !r.source.includes(":") && !r.destination.includes(":"),
    );
    expect(redirects.length, "no redirects to check").toBeGreaterThan(0);

    const problems: string[] = [];

    for (const r of redirects) {
      const first = await request.get(r.source, { maxRedirects: 0 });
      const status = first.status();

      if (status < 300 || status >= 400) {
        problems.push(`${r.source}: expected a 3xx, got ${status}`);
        continue;
      }

      const location = first.headers()["location"];
      if (!location) {
        problems.push(`${r.source}: 3xx with no Location header`);
        continue;
      }

      const landedPath = location.startsWith("http") ? new URL(location).pathname : location;
      if (landedPath !== r.destination) {
        problems.push(`${r.source}: Location is ${landedPath}, config says ${r.destination}`);
        continue;
      }

      // Second hop check — the destination must be a real page, not another redirect.
      const second = await request.get(r.destination, { maxRedirects: 0 });
      if (second.status() >= 300 && second.status() < 400) {
        problems.push(`${r.source} -> ${r.destination} -> ${second.headers()["location"]} (chain)`);
      } else if (second.status() >= 400) {
        problems.push(`${r.source} -> ${r.destination} is ${second.status()}`);
      }
    }

    expect(problems, "redirect defects").toEqual([]);
  });

  test("robots.txt and sitemap.xml are served and parse", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const robotsBody = await robots.text();
    expect(robotsBody).toContain("Sitemap:");
    expect(robotsBody).toMatch(/Disallow:\s*\/api\//);
    expect(robotsBody, "the agent CRM must never be crawlable").toMatch(/Disallow:\s*\/agent\//);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBeGreaterThan(50);
    expect(new Set(locs).size, "duplicate <loc> entries").toBe(locs.length);
    expect(locs.every((l) => l.startsWith("https://"))).toBe(true);
  });

  test("no sitemap URL is itself a redirect source", async ({ request }) => {
    test.skip(typeof nextConfig.redirects !== "function", "next.config.js exposes no redirects()");
    const sources = new Set((await nextConfig.redirects!()).map((r) => r.source));

    const sitemap = await request.get("/sitemap.xml");
    const xml = await sitemap.text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

    const offenders = paths.filter((p) => sources.has(p));
    expect(offenders, "sitemap lists URLs that 308 away").toEqual([]);
  });
});
