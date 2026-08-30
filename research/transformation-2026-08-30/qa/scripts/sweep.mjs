import { chromium } from '@playwright/test';
import fs from 'node:fs';

const BASE = 'http://localhost:3200';
const OUT = 'research/transformation-2026-08-30/qa/shots-responsive';
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { path: '/', slug: 'home' },
  { path: '/demo', slug: 'demo' },
  { path: '/pricing', slug: 'pricing' },
  { path: '/create', slug: 'create' },
  { path: '/start', slug: 'start' },
  { path: '/about', slug: 'about' },
  { path: '/ai-receptionist', slug: 'ai-receptionist' },
  { path: '/ai-receptionist-for-contractors', slug: 'ai-receptionist-for-contractors' },
  { path: '/industries', slug: 'industries' },
  { path: '/tools', slug: 'tools' },
  { path: '/use-cases/ai-receptionist-for-contractors', slug: 'use-cases-ai-receptionist-for-contractors' },
];

const WIDTHS = [320, 375, 390, 768, 1024, 1280, 1440];
const FULLPAGE_WIDTHS = [390, 1440];

function heightFor(w) {
  if (w <= 480) return 844;
  if (w <= 900) return 1024;
  return 900;
}

function runChecks() {
  const results = {};

  // 1. horizontal overflow
  results.scrollWidth = document.documentElement.scrollWidth;
  results.innerWidth = window.innerWidth;
  results.hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 1;

  // 2. elements whose right edge exceeds viewport
  const overflowingEls = [];
  const all = document.body.querySelectorAll('*');
  const vw = window.innerWidth;
  for (const el of all) {
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (rect.right > vw + 2) {
      overflowingEls.push({
        tag: el.tagName,
        cls: (el.className && typeof el.className === 'string') ? el.className.slice(0, 80) : '',
        id: el.id || '',
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        position: cs.position,
        text: (el.textContent || '').trim().slice(0, 60),
      });
    }
  }
  const seen = new Set();
  results.overflowingElements = overflowingEls
    .filter((o) => {
      const key = o.tag + o.cls + o.right;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.right - a.right)
    .slice(0, 15);

  // 3. CTA buttons under 44px tall
  const ctaSelectors = 'a.btn-primary, a.btn-secondary, button.btn-primary, button.btn-secondary, [class*="btn-"]';
  const ctas = document.querySelectorAll(ctaSelectors);
  const shortCtas = [];
  for (const el of ctas) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (rect.height < 44) {
      shortCtas.push({
        tag: el.tagName,
        cls: (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '',
        height: Math.round(rect.height * 100) / 100,
        text: (el.textContent || '').trim().slice(0, 40),
      });
    }
  }
  results.shortCtas = shortCtas;

  // 4. images without reserved space
  const imgs = document.querySelectorAll('img');
  const unreservedImgs = [];
  for (const img of imgs) {
    const hasWH = img.hasAttribute('width') && img.hasAttribute('height');
    const cs = window.getComputedStyle(img);
    const hasAspectRatio = cs.aspectRatio && cs.aspectRatio !== 'auto';
    if (!hasWH && !hasAspectRatio) {
      unreservedImgs.push({
        src: (img.getAttribute('src') || '').slice(0, 80),
        alt: (img.getAttribute('alt') || '').slice(0, 60),
      });
    }
  }
  results.unreservedImages = unreservedImgs;

  // 5. headings with a lone dangling last word
  const headingsInfo = [];
  const headings = document.querySelectorAll('h1, h2, h3');
  for (const h of headings) {
    const text = (h.textContent || '').trim();
    if (!text || text.split(/\s+/).length < 2) continue;
    const range = document.createRange();
    range.selectNodeContents(h);
    const rects = Array.from(range.getClientRects());
    if (rects.length >= 2) {
      const lastLine = rects[rects.length - 1];
      const secondLast = rects[rects.length - 2];
      const approxLastLineWidth = lastLine.width;
      const approxFullLineWidth = secondLast.width;
      if (approxFullLineWidth > 0 && approxLastLineWidth / approxFullLineWidth < 0.22) {
        headingsInfo.push({
          tag: h.tagName,
          text: text.slice(0, 90),
          lines: rects.length,
          lastLineRatio: Math.round((approxLastLineWidth / approxFullLineWidth) * 100) / 100,
        });
      }
    }
  }
  results.danglingHeadings = headingsInfo;

  // 6. header/nav geometry (for 768px collision check)
  const header = document.querySelector('header');
  if (header) {
    const hRect = header.getBoundingClientRect();
    const logo = header.querySelector('a[href="/"], [class*="logo"], svg, img');
    const navLinks = header.querySelectorAll('nav a, header a');
    let logoRight = null;
    let firstNavLeft = null;
    if (logo) {
      logoRight = logo.getBoundingClientRect().right;
    }
    for (const a of navLinks) {
      const r = a.getBoundingClientRect();
      if (logo && a.contains(logo)) continue;
      if (r.left > (logoRight || 0)) {
        firstNavLeft = r.left;
        break;
      }
    }
    results.headerHeight = Math.round(hRect.height);
    results.headerOverflowsViewport = hRect.right > vw + 2 || hRect.width > vw + 2;
    results.logoNavGap = (logoRight !== null && firstNavLeft !== null) ? Math.round(firstNavLeft - logoRight) : null;
  } else {
    results.headerHeight = null;
    results.headerOverflowsViewport = null;
    results.logoNavGap = null;
  }

  return results;
}

const summary = [];

const browser = await chromium.launch();
for (const pg of PAGES) {
  for (const w of WIDTHS) {
    const h = heightFor(w);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    let checks = { error: null };
    let finalUrl = null;
    try {
      const resp = await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 30000 });
      finalUrl = page.url();
      await page.waitForTimeout(350);
      checks = await page.evaluate(runChecks);
      checks.httpStatus = resp ? resp.status() : null;

      await page.screenshot({ path: `${OUT}/${pg.slug}__${w}.png` });

      if (FULLPAGE_WIDTHS.includes(w)) {
        await page.screenshot({ path: `${OUT}/${pg.slug}__${w}__full.png`, fullPage: true });
      }
    } catch (e) {
      checks = { error: String(e && e.message ? e.message : e) };
    }
    summary.push({ path: pg.path, slug: pg.slug, width: w, finalUrl, ...checks });
    console.log('done: ' + pg.slug + ' @ ' + w);
    await page.close();
  }
}
await browser.close();

fs.writeFileSync(
  OUT + '/sweep-results.json',
  JSON.stringify(summary, null, 2)
);
console.log('WROTE sweep-results.json');
