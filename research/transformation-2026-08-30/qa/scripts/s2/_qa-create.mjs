// S2 QA — /create response-shape matrix + form functional tests.
// Every POST to /api/build-request is intercepted; nothing reaches the server.
import { chromium } from "@playwright/test";
import fs from "node:fs";

const BASE = "http://localhost:3200";
const SHOTS = "C:/Users/gillp/Documents/Claude/Projects/AI Shop/research/transformation-2026-08-30/qa/shots";
const out = [];
const log = (...a) => { const s = a.join(" "); console.log(s); out.push(s); };

const VA_STUB = () => {
  window.__track = [];
  window.va = function (...p) { window.__track.push(JSON.parse(JSON.stringify(p))); };
};

const SCENARIOS = [
  { id: "01-ok-persisted-emailed", status: 200, body: { ok: true, id: "cuid_a", contact: "email", delivery: { persisted: true, emailed: true } } },
  { id: "02-ok-persisted-only",    status: 200, body: { ok: true, id: "cuid_b", contact: "email", delivery: { persisted: true, emailed: false } } },
  { id: "03-ok-emailed-only",      status: 200, body: { ok: true, contact: "email", delivery: { persisted: false, emailed: true } } },
  { id: "04-ok-neither-honeypot",  status: 200, body: { ok: true, delivery: { persisted: false, emailed: false } } },
  { id: "05-ok-devmock",           status: 200, body: { ok: true, devMock: true, delivery: { persisted: false, emailed: false }, note: "Development mock: not persisted, not delivered." } },
  { id: "06-duplicate",            status: 200, body: { ok: true, id: "cuid_c", deduped: true, contact: "email", delivery: { persisted: true, emailed: false } } },
  { id: "07-phone-contact",        status: 200, body: { ok: true, id: "cuid_d", contact: "phone", delivery: { persisted: true, emailed: true } } },
  { id: "08-400",                  status: 400, body: { error: "Enter an email or a phone number so we can reply" } },
  { id: "09-403",                  status: 403, body: { ok: false, error: "Invalid request" } },
  { id: "10-413",                  status: 413, body: { ok: false, error: "That request is too long to send. Trim it down, or email us the detail directly." } },
  { id: "11-429",                  status: 429, body: { ok: false, error: "Too many requests from this connection. Try again shortly, or email us directly.", retryAfter: 42 } },
  { id: "12-502",                  status: 502, body: { ok: false, error: "We couldn't save your request just now. Please email us and we'll jump right on it." } },
  { id: "13-500-bodyless",         status: 500, body: null },
  { id: "14-network-abort",        abort: true },
  { id: "15-200-html-not-json",    status: 200, raw: "<!doctype html><h1>gateway</h1>", contentType: "text/html" },
];

async function fillStep0(page, { name = "Pav QA", contact = "qa-noreply@example.invalid", business = "QA Plumbing", goal = "Answer my phone and book jobs" } = {}) {
  await page.fill("#br-name", name);
  await page.fill("#br-contact", contact);
  await page.fill("#br-business", business);
  await page.fill("#br-goal", goal);
}

const visible = async (page) => (await page.locator("main").innerText()).replace(/\n{3,}/g, "\n\n").trim();

(async () => {
  const browser = await chromium.launch();

  // ------------------------------------------------------------------ Q2 --
  log("\n############ Q2 — /create RESPONSE-SHAPE MATRIX ############");
  for (const sc of SCENARIOS) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    let sentBody = null;
    await page.route("**/api/build-request", async (route) => {
      try { sentBody = route.request().postDataJSON(); } catch { sentBody = route.request().postData(); }
      if (sc.abort) return route.abort("failed");
      if (sc.raw !== undefined) return route.fulfill({ status: sc.status, contentType: sc.contentType, body: sc.raw });
      return route.fulfill({ status: sc.status, contentType: "application/json", body: sc.body === null ? "" : JSON.stringify(sc.body) });
    });
    await page.goto(`${BASE}/create`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#br-name");
    await fillStep0(page, sc.id === "07-phone-contact" ? { contact: "604 555 0100" } : {});
    await page.click('button[type="submit"]');
    await page.waitForTimeout(900);
    const text = await visible(page);
    const events = await page.evaluate(() => window.__track);
    log(`\n--- ${sc.id} (HTTP ${sc.abort ? "ABORT" : sc.status}) ---`);
    log("USER SEES:\n" + text);
    log("TRACK: " + JSON.stringify(events));
    if (sc.id === "01-ok-persisted-emailed") log("POST BODY SENT: " + JSON.stringify(sentBody));
    await page.screenshot({ path: `${SHOTS}/create-${sc.id}.png`, fullPage: true });
    await ctx.close();
  }

  // ------------------------------------------------------------------ Q4 --
  log("\n\n############ Q4 — /create FORM FUNCTIONAL ############");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    await page.goto(`${BASE}/create`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#br-name");

    // --- label association -------------------------------------------------
    const labels = await page.evaluate(() => {
      const rows = [];
      document.querySelectorAll("form input, form textarea, form select").forEach((el) => {
        const lbl = el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null;
        rows.push({
          id: el.id || "(none)", tag: el.tagName.toLowerCase(), type: el.type || "",
          labelText: lbl ? lbl.innerText.trim() : null,
          ariaRequired: el.getAttribute("aria-required"),
          ariaDescribedby: el.getAttribute("aria-describedby"),
          autocomplete: el.getAttribute("autocomplete"),
          hiddenByCss: !(el.offsetWidth || el.offsetHeight || el.getClientRects().length),
        });
      });
      const fs = [...document.querySelectorAll("form fieldset")].map((f) => f.querySelector("legend")?.innerText.trim());
      return { rows, fieldsets: fs };
    });
    log("\n--- FIELD/LABEL MAP (step 1) ---\n" + JSON.stringify(labels, null, 1));

    // --- honeypot ----------------------------------------------------------
    const hp = await page.evaluate(() => {
      const el = document.querySelector("#company_website");
      if (!el) return "MISSING";
      const wrap = el.closest("div");
      return {
        name: el.name, tabIndex: el.tabIndex, autocomplete: el.getAttribute("autocomplete"),
        wrapperAriaHidden: wrap?.getAttribute("aria-hidden"),
        computedDisplay: getComputedStyle(wrap).display,
        visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length),
      };
    });
    log("\n--- HONEYPOT ---\n" + JSON.stringify(hp));

    // --- required-field behaviour on empty submit --------------------------
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    log("\n--- EMPTY SUBMIT: visible errors ---");
    log(await visible(page));
    log("SUBMIT DISABLED AFTER INVALID? " + await page.locator('button[type="submit"]').isDisabled());
    log("FOCUSED ELEMENT: " + await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName));
    log("LIVE REGION (assertive): " + JSON.stringify(await page.locator('[aria-live="assertive"]').first().innerText().catch(() => "")));
    log("aria-invalid set on: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[aria-invalid="true"]')].map(e => e.id))));
    await page.screenshot({ path: `${SHOTS}/create-empty-submit.png`, fullPage: true });

    // --- inline validation: bad email --------------------------------------
    await page.fill("#br-contact", "pav@");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(400);
    log("\n--- BAD EMAIL 'pav@' -> " + JSON.stringify(await page.locator("#br-contact-error").innerText().catch(() => "(no error node)")));
    await page.fill("#br-contact", "12345");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(400);
    log("--- SHORT NUMBER '12345' -> " + JSON.stringify(await page.locator("#br-contact-error").innerText().catch(() => "(no error node)")));
    await page.fill("#br-contact", "604 555 0100");
    await page.waitForTimeout(200);
    log("--- error cleared on typing? contact-error present: " + await page.locator("#br-contact-error").count());

    // --- optional step is genuinely skippable ------------------------------
    await fillStep0(page);
    await page.click('button:has-text("Add detail first")');
    await page.waitForTimeout(500);
    const step2 = await visible(page);
    log("\n--- STEP 2 (optional) ---\n" + step2);
    log("REQUIRED MARKERS ON STEP 2: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("form *")].filter(e => e.children.length === 0 && /\(required\)/.test(e.textContent || "")).map(e => e.textContent.trim()))));
    await page.screenshot({ path: `${SHOTS}/create-step2.png`, fullPage: true });

    // --- typed data survives an error --------------------------------------
    await page.route("**/api/build-request", (r) => r.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ ok: false, error: "We couldn't save your request just now. Please email us and we'll jump right on it." }) }));
    await page.click('button:has-text("Budget range")').catch(() => {});
    await page.click('button:has-text("Within a month")').catch(() => {});
    await page.click('button[type="submit"]');
    await page.waitForTimeout(800);
    log("\n--- AFTER 502, step index / typed values retained ---");
    log(JSON.stringify(await page.evaluate(() => ({
      name: document.querySelector("#br-name")?.value ?? "(step0 not mounted)",
      contact: document.querySelector("#br-contact")?.value ?? "(step0 not mounted)",
      timelineChipPressed: [...document.querySelectorAll('button[aria-pressed="true"]')].map(b => b.innerText.trim()),
      alert: document.querySelector('[role="alert"]')?.innerText.trim() ?? null,
    }))));
    await page.screenshot({ path: `${SHOTS}/create-error-retains-data.png`, fullPage: true });
    await ctx.close();
  }

  // --- double-submit prevention ------------------------------------------
  {
    const ctx = await browser.newContext();
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    let hits = 0;
    await page.route("**/api/build-request", async (route) => {
      hits++;
      await new Promise((r) => setTimeout(r, 1500));
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, id: "x", contact: "email", delivery: { persisted: true, emailed: true } }) });
    });
    await page.goto(`${BASE}/create`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#br-name");
    await fillStep0(page);
    const btn = page.locator('button[type="submit"]');
    await btn.click();
    await page.waitForTimeout(150);
    const inflightText = await btn.innerText();
    const inflightDisabled = await btn.isDisabled();
    const busy = await page.locator("form").getAttribute("aria-busy");
    const politeStatus = await page.locator('form p[aria-live="polite"]').innerText().catch(() => "");
    // hammer it
    for (let i = 0; i < 5; i++) { await btn.click({ force: true }).catch(() => {}); await page.keyboard.press("Enter").catch(() => {}); }
    await page.waitForTimeout(2500);
    log("\n--- DOUBLE-SUBMIT ---");
    log(`in-flight button label: ${JSON.stringify(inflightText)} disabled=${inflightDisabled} form[aria-busy]=${busy}`);
    log(`in-flight polite status: ${JSON.stringify(politeStatus)}`);
    log(`POST count after 5 extra clicks + 5 Enters: ${hits}`);
    await ctx.close();
  }

  // --- keyboard-only completion -------------------------------------------
  {
    const ctx = await browser.newContext();
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    let posted = false;
    await page.route("**/api/build-request", (route) => { posted = true; route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, id: "kb", contact: "email", delivery: { persisted: true, emailed: true } }) }); });
    await page.goto(`${BASE}/create`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#br-name");
    await page.keyboard.press("Tab"); // land somewhere deterministic first
    await page.evaluate(() => document.querySelector("#br-name").focus());
    const order = [];
    await page.keyboard.type("Keyboard User");
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const cur = await page.evaluate(() => { const a = document.activeElement; return a ? (a.id || a.getAttribute("aria-label") || a.innerText?.trim().slice(0, 40) || a.tagName) : "none"; });
      order.push(cur);
      if (cur === "br-contact") await page.keyboard.type("kb@example.invalid");
      if (cur === "br-business") await page.keyboard.type("KB Co");
      if (cur === "br-goal") await page.keyboard.type("Answer the phone");
      if (/Send my request/.test(cur)) { await page.keyboard.press("Enter"); break; }
    }
    await page.waitForTimeout(1200);
    log("\n--- KEYBOARD-ONLY ---");
    log("TAB ORDER: " + JSON.stringify(order));
    log("POST fired from keyboard only: " + posted);
    log("RESULT SCREEN:\n" + await visible(page));
    await page.screenshot({ path: `${SHOTS}/create-keyboard-success.png`, fullPage: true });
    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync("C:/Users/gillp/AppData/Local/Temp/claude/C--Users-gillp-Documents-Claude-Projects-AI-Shop/8e631d95-4e19-4e8a-b855-a37ad25b98c5/scratchpad/qa-create.out.txt", out.join("\n"));
})();
