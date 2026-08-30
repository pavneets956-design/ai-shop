import { chromium } from '@playwright/test';
import fs from 'node:fs';

const BASE = 'http://localhost:3200';
const OUT = 'research/transformation-2026-08-30/qa/shots-responsive/headings';
fs.mkdirSync(OUT, { recursive: true });

const jobs = [
  { path: '/', text: 'How long does installation take?', widths: [375, 390, 768], slug: 'home-faq-install' },
  { path: '/', text: 'How much does an AI receptionist cost in Canada?', widths: [1024, 1280, 1440], slug: 'home-faq-cost' },
  { path: '/start', text: 'The AI Builder', widths: [768, 1024, 1440], slug: 'start-h1' },
  { path: '/about', text: 'You talk to the person building it', widths: [375], slug: 'about-h3' },
  { path: '/industries', text: 'AI Automation for Auto Detailing Shops', widths: [375, 390, 1440], slug: 'industries-h2-detailing' },
];

function heightFor(w) {
  if (w <= 480) return 1400;
  if (w <= 900) return 1400;
  return 1400;
}

const browser = await chromium.launch();
for (const job of jobs) {
  for (const w of job.widths) {
    const page = await browser.newPage({ viewport: { width: w, height: heightFor(w) } });
    await page.goto(BASE + job.path, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(300);
    const handle = await page.locator(`h1, h2, h3`).filter({ hasText: job.text }).first();
    try {
      await handle.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await handle.screenshot({ path: `${OUT}/${job.slug}__${w}.png` });
      console.log('captured', job.slug, w);
    } catch (e) {
      console.log('FAILED', job.slug, w, String(e.message || e));
    }
    await page.close();
  }
}
await browser.close();
console.log('done');
