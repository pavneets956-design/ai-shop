import { chromium } from '@playwright/test';
import fs from 'node:fs';

const BASE = 'http://localhost:3200';
const OUT = 'research/transformation-2026-08-30/qa/shots-responsive';
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  { page: '/', selector: '#founder img[src*="founder.jpg"]', name: 'home-founder' },
  { page: '/about', selector: 'img[src*="founder.jpg"]', name: 'about-hero' },
];
const widths = [390, 1440];

const results = [];

const browser = await chromium.launch();
for (const t of targets) {
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: w <= 480 ? 900 : 1000 } });
    await page.goto(BASE + t.page, { waitUntil: 'networkidle' });

    const imgHandle = await page.$(t.selector);
    if (!imgHandle) {
      results.push({ page: t.page, width: w, error: 'IMAGE NOT FOUND with selector ' + t.selector });
      await page.close();
      continue;
    }

    // Scroll the image into view (home page founder section is lazy-loaded, far down)
    await imgHandle.scrollIntoViewIfNeeded();
    // Wait for the image to actually finish loading
    try {
      await page.waitForFunction(
        (el) => el.complete && el.naturalWidth > 0,
        imgHandle,
        { timeout: 8000 }
      );
    } catch (e) {
      // fall through; will be captured as incomplete in metadata below
    }
    await page.waitForTimeout(400); // settle any fade-in animation

    const info = await imgHandle.evaluate((img) => {
      const rect = img.getBoundingClientRect();
      const cs = window.getComputedStyle(img);
      const parent = img.parentElement;
      const parentRect = parent ? parent.getBoundingClientRect() : null;
      return {
        currentSrc: img.currentSrc,
        srcset: img.getAttribute('srcset'),
        sizesAttr: img.getAttribute('sizes'),
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayWidth: rect.width,
        displayHeight: rect.height,
        objectFit: cs.objectFit,
        objectPosition: cs.objectPosition,
        borderRadius: cs.borderRadius,
        loading: img.getAttribute('loading'),
        fetchPriority: img.getAttribute('fetchpriority'),
        decoding: img.getAttribute('decoding'),
        widthAttr: img.getAttribute('width'),
        heightAttr: img.getAttribute('height'),
        complete: img.complete,
        parentTag: parent ? parent.tagName : null,
        parentWidth: parentRect ? parentRect.width : null,
        rectTop: rect.top,
        rectLeft: rect.left,
      };
    });
    results.push({ page: t.page, width: w, ...info });

    // Screenshot of the viewport as scrolled to the image (shows text/photo relationship)
    await page.screenshot({ path: `${OUT}/portrait__${t.name}__${w}__viewport.png` });
    // Close-up of just the image element
    await imgHandle.screenshot({ path: `${OUT}/portrait__${t.name}__${w}__element.png` });

    await page.close();
  }
}
await browser.close();

fs.writeFileSync(
  `${OUT}/portrait__metadata.json`,
  JSON.stringify(results, null, 2)
);
console.log(JSON.stringify(results, null, 2));
