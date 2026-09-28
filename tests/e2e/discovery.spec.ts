import { test, expect } from "./safe-test";
import AxeBuilder from "@axe-core/playwright";
import { discoveryServices, discoveryResources, discoveryHowtos } from "../../lib/data/discovery";

const pages = [
  ...discoveryServices.map(content => ({ path: `/services/${content.slug}`, content })),
  ...discoveryResources.map(content => ({ path: `/resources/${content.slug}`, content })),
  ...discoveryHowtos.map(content => ({ path: `/how-to/${content.slug}`, content })),
];

for (const { path, content } of pages) {
  test(`${path} exposes its answer, sources, canonical and request path`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${content.searchTitle} | Handbuilt AI`);
    await expect(page.getByRole("heading", { level: 1, name: content.h1, exact: true })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://aibuiltbyhand.com${path}`);
    await expect(page.getByText(content.answer, { exact: true })).toBeVisible();
    const request = page.getByRole("link", { name: content.ctaLabel!, exact: true }).first();
    await expect(request).toHaveAttribute("href", "/create");
    await expect(page.getByRole("link", { name: content.secondaryCta!.label, exact: true }).first())
      .toHaveAttribute("href", content.secondaryCta!.href);
    const schemaText = await page.locator('script[type="application/ld+json"]').allTextContents();
    const schema = schemaText.map(text => JSON.parse(text));
    const flattened = JSON.stringify(schema);
    for (const faq of content.faqs) {
      expect(flattened).toContain(JSON.stringify(faq.q).slice(1, -1));
      const question = page.locator("summary").filter({ hasText: faq.q });
      const details = page.locator("details").filter({ has: question });
      await question.scrollIntoViewIfNeeded();
      if (await details.getAttribute("open") === null) await question.click();
      await expect(page.getByText(faq.a, { exact: true })).toBeVisible();
    }
    for (const section of content.sections ?? []) {
      for (const source of section.sources ?? []) {
        const citation = page.getByRole("link", { name: source.label, exact: true }).first();
        await citation.scrollIntoViewIfNeeded();
        await expect(citation).toBeVisible();
        await expect(citation).toHaveAttribute("href", source.href);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    if (["ai-search-visibility", "get-your-business-recommended-by-chatgpt", "track-where-your-customers-found-you"].includes(content.slug)) {
      expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations).toEqual([]);
    }
    await request.click();
    await expect(page).toHaveURL(/\/create(?:\?|$)/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("discovery pages are reachable from public hubs and sitemap", async ({ page, request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const sitemapText = await sitemap.text();
  for (const { path } of pages) expect(sitemapText).toContain(`https://aibuiltbyhand.com${path}`);
  for (const hub of ["services", "resources", "how-to"]) {
    await page.goto(`/${hub}`);
    for (const { path } of pages.filter(p => p.path.startsWith(`/${hub}/`))) {
      await expect(page.locator(`a[href="${path}"]`).first()).toBeAttached();
    }
  }
});
