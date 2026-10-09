import { test, expect } from "./safe-test";
import { phonePlan, PHONE_SETUP_PRICE, PHONE_MONTHLY_PRICE, PHONE_OVERAGE_PRICE } from "../../lib/data/packages";
import { landingGroups } from "../../lib/data/registry";
import { landingPath } from "../../lib/data/landing";
import { useCases } from "../../lib/data/useCases";

// Exercise the real registry and shared templates: correct source constants alone
// previously left old Starter cards, metadata and schema attached to phone pages.
const phonePaths = [...new Set([...landingGroups.flatMap(group => group.items
  .filter(row => /receptionist|phone-answering|voice-agent/i.test(row.slug))
  .map(row => landingPath(group.type, row.slug))),
  ...useCases.filter(row => row.packageId === "phone").map(row => `/use-cases/${row.slug}`)])];

for (const query of ["package=phone", "build=ai-receptionist-setup", "build=ai-receptionist-os"]) {
  test(`phone request keeps its offer through ${query}`, async ({ page }) => {
    await page.goto(`/create?${query}`);
    await expect(page.locator("#br-goal")).toHaveValue(/receptionist/i);
    await page.locator("#br-name").fill("Test Owner");
    await page.locator("#br-contact").fill("test@example.com");
    await page.locator("#br-business").fill("Test Business");
    await page.getByRole("button", { name: /Add detail first/i }).click();
    const choice = page.getByRole("button", { name: /750 setup.*179\/month/i });
    await expect(choice).toHaveAttribute("aria-pressed", "true");
  });
}

test("retired marketplace and prototype URLs cannot expose old receptionist prices", async ({ request }) => {
  for (const [source, destination] of [["/cart", "/shop"], ["/dashboard", "/shop"], ["/v2", "/"], ["/v2/index.html", "/"]]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(new URL(response.headers().location, response.url()).pathname).toBe(destination);
  }
});

for (const route of phonePaths) {
  test(`phone offer terms are visible on ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const main = await page.locator("main").innerText();
    expect(main).toContain(PHONE_SETUP_PRICE);
    expect(main).toContain(PHONE_MONTHLY_PRICE);
    expect(main).toContain(String(phonePlan.includedMinutes));
    expect(main).toContain(PHONE_OVERAGE_PRICE);
    expect(main).not.toMatch(/\bno monthly fee required\b|\bunlimited calls\b/i);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain(route);
    const descriptions = await page.locator('meta[name="description"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("content") ?? ""));
    expect(descriptions.join(" ")).not.toMatch(/\$(?:1,500|129|250|349)\b/);
  });
}

test("shop phone cards carry both charges and included usage", async ({ page }) => {
  await page.goto("/shop");
  const body = await page.locator("main").innerText();
  expect(body).toContain(PHONE_SETUP_PRICE);
  expect(body).toContain(PHONE_MONTHLY_PRICE);
  expect(body).toContain(PHONE_OVERAGE_PRICE);
  const graphs = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent || "{}")));
  const phoneServices: Record<string, unknown>[] = [];
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(visit);
    const row = node as Record<string, unknown>;
    if (row["@type"] === "Service" && /receptionist/i.test(String(row.name))) phoneServices.push(row);
    Object.values(row).forEach(visit);
  };
  graphs.forEach(visit);
  const independentlyPriced = phoneServices.filter(row => row.offers);
  expect(independentlyPriced.length).toBeGreaterThan(0);
  for (const row of independentlyPriced) {
    const offers = JSON.stringify(row.offers);
    expect(offers).toContain(String(phonePlan.setup));
    expect(offers).toContain(String(phonePlan.monthly));
    expect(offers).not.toMatch(/"price":(?:129|250|349|1500)(?:[,}])/);
  }
});
