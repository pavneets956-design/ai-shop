// S2 QA — analytics events, /demo showroom, embedded use-case chat, /start copy.
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
const ev = (page) => page.evaluate(() => (window.__track || []).filter(t => t[0] === "event").map(t => t[1]));
const clr = (page) => page.evaluate(() => { window.__track = []; });

(async () => {
  const browser = await chromium.launch();

  // ================================================================= Q5 ====
  log("############ Q5 — ANALYTICS ############");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    const beacons = [];
    page.on("request", (r) => { if (r.url().includes("/_vercel/insights")) beacons.push(r.url()); });

    await page.goto(`${BASE}/?utm_source=test&utm_medium=qa&utm_campaign=preview`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    log("\n-- ON LOAD (/?utm_source=test&utm_medium=qa&utm_campaign=preview) --");
    log("all va calls: " + JSON.stringify(await page.evaluate(() => window.__track)));
    log("sessionStorage hb_attr_v1 after homepage load: " + JSON.stringify(await page.evaluate(() => window.sessionStorage.getItem("hb_attr_v1"))));

    // hero demo CTA
    await clr(page);
    await page.locator('a:has-text("Try the live AI demo")').first().click();
    await page.waitForTimeout(1200);
    log("\n-- CLICK hero 'Try the live AI demo' -> " + page.url());
    log("events fired: " + JSON.stringify(await ev(page)));

    // hero contact CTA
    await page.goBack({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    await clr(page);
    await page.locator('a:has-text("Request a free 10-minute fit check")').first().click();
    await page.waitForTimeout(1200);
    log("\n-- CLICK hero 'Request a free 10-minute fit check' -> " + page.url());
    log("events fired: " + JSON.stringify(await ev(page)));

    // pricing CTA
    await page.goto(`${BASE}/pricing`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    await clr(page);
    await page.locator('a:has-text("Start with Starter")').first().click();
    await page.waitForTimeout(1200);
    log("\n-- CLICK pricing 'Start with Starter' -> " + page.url());
    log("events fired: " + JSON.stringify(await ev(page)));

    // form submit, arriving from the UTM'd session
    let body = null;
    await page.route("**/api/build-request", (r) => {
      body = r.request().postDataJSON();
      r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, id: "z", contact: "email", delivery: { persisted: true, emailed: true } }) });
    });
    await page.waitForSelector("#br-name");
    await clr(page);
    await page.fill("#br-name", "Attr QA");
    await page.fill("#br-contact", "attr@example.invalid");
    await page.fill("#br-business", "Attr Co");
    await page.fill("#br-goal", "Track me");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1200);
    log("\n-- FORM SUBMIT after in-session nav from UTM'd homepage --");
    log("events: " + JSON.stringify(await ev(page)));
    log("POST body: " + JSON.stringify(body));
    log("sessionStorage now: " + JSON.stringify(await page.evaluate(() => window.sessionStorage.getItem("hb_attr_v1"))));
    log("\n_vercel/insights requests observed: " + JSON.stringify(beacons));
    await ctx.close();
  }

  // control: land DIRECTLY on /create with the UTMs
  {
    const ctx = await browser.newContext();
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    let body = null;
    await page.route("**/api/build-request", (r) => { body = r.request().postDataJSON(); r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, id: "z2", contact: "email", delivery: { persisted: true, emailed: true } }) }); });
    await page.goto(`${BASE}/create?utm_source=test&utm_medium=qa&utm_campaign=preview&src=tool-missed-call-revenue-calculator`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#br-name");
    await page.fill("#br-name", "Direct QA");
    await page.fill("#br-contact", "direct@example.invalid");
    await page.fill("#br-business", "Direct Co");
    await page.fill("#br-goal", "Track me directly");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1200);
    log("\n-- CONTROL: landed directly on /create WITH utm params --");
    log("events: " + JSON.stringify(await ev(page)));
    log("POST body: " + JSON.stringify(body));
    await ctx.close();
  }

  // ================================================================= /demo =
  log("\n\n############ Q4b — /demo SHOWROOM ############");
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    const consoleErrs = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text().slice(0, 180)); });
    await page.goto(`${BASE}/demo`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    log("\n-- INITIAL STATE (before any visitor input) --");
    log(await page.locator("main").innerText());
    await page.screenshot({ path: `${SHOTS}/demo-initial.png`, fullPage: true });
    log("\nevents on load: " + JSON.stringify(await ev(page)));

    // pick a worker + industry
    await page.locator('button[aria-pressed]:has-text("Quote")').first().click().catch(() => {});
    await page.waitForTimeout(600);
    await page.locator('button[aria-pressed]:has-text("Plumbing")').first().click().catch(() => {});
    await page.waitForTimeout(900);
    const picked = await page.evaluate(() => [...document.querySelectorAll('button[aria-pressed="true"]')].map(b => b.innerText.replace(/\n/g, " | ").trim()));
    log("\n-- AFTER PICKING worker+industry, pressed buttons: " + JSON.stringify(picked));
    log("phone header business: " + JSON.stringify(await page.evaluate(() => document.querySelector(".truncate.text-\\[13px\\]")?.innerText ?? null)));
    await page.screenshot({ path: `${SHOTS}/demo-picked.png`, fullPage: true });

    // send a REAL prompt (no intercept) — this is the true local behaviour
    await clr(page);
    
    await page.locator("textarea").last().fill("My kitchen sink is leaking badly, how much to fix it today?");
    const typingSeen = [];
    const poll = setInterval(async () => {
      try { typingSeen.push(await page.locator("main").innerText().then(t => /AI is responding|AI worker/.test(t))); } catch {}
    }, 200);
    await page.locator('button[aria-label="Send"]').first().click();
    await page.waitForTimeout(600);
    const midText = await page.locator("main").innerText();
    log("\n-- MID-FLIGHT (600ms after send) — is there any 'responding' text? " + /responding|typing|thinking/i.test(midText));
    log("mid-flight aria-live/status nodes: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[aria-live],[role="status"]')].map(e => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), text: (e.innerText || "").trim().slice(0, 120) })))));
    await page.screenshot({ path: `${SHOTS}/demo-inflight.png`, fullPage: true });
    clearInterval(poll);
    await page.waitForTimeout(5000);
    log("\n-- AFTER REAL REPLY --");
    log(await page.locator("main").innerText());
    log("\nevents during demo turn: " + JSON.stringify(await ev(page)));
    await page.screenshot({ path: `${SHOTS}/demo-after-reply.png`, fullPage: true });

    // force fallback explicitly
    await page.route("**/api/demo", (r) => r.fulfill({
      status: 200, contentType: "application/json",
      body: JSON.stringify({
        fallback: true,
        response: {
          assistantMessage: "FORCED-FALLBACK reply for the QA harness.",
          capturedFields: { name: "Dana", phone: "604 555 0142", email: null, service: "Leak repair", location: "Surrey", urgency: "High", budget: null, preferredTime: "today", missingInfo: ["Service address"] },
          leadSummary: "Urgent leak repair in Surrey — callback number captured.",
          nextActions: ["Send the owner a job summary", "Draft a booking confirmation"],
          systemEvents: ["CRM lead created", "SMS confirmation queued"],
          suggestedReplies: ["What time?", "How much?"],
          cta: { show: true, label: "Get this installed", href: "/create" },
        },
      }),
    }));
    await page.locator("textarea").last().fill("Can you send someone this afternoon?");
    await page.locator('button[aria-label="Send"]').first().click();
    await page.waitForTimeout(6000);
    log("\n-- FORCED fallback:true --");
    log(await page.locator("main").innerText());
    log("scripted-notice present: " + await page.locator('text=scripted sample').count());
    await page.screenshot({ path: `${SHOTS}/demo-forced-fallback.png`, fullPage: true });
    log("\nconsole errors on /demo: " + JSON.stringify(consoleErrs));
    await ctx.close();
  }

  // ============================================ embedded use-case chat =====
  log("\n\n############ Q4c — EMBEDDED CHAT /use-cases/ai-receptionist-for-contractors ############");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    const posts = [];
    page.on("request", (r) => { if (r.url().includes("/api/demo")) posts.push(r.postData()); });
    await page.goto(`${BASE}/use-cases/ai-receptionist-for-contractors`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    const chat = page.locator("form:has(input[placeholder*='customer'])").first();
    log("\n-- GREETING + header --");
    log(await page.locator("div:has(> form:has(input[placeholder*='customer']))").last().innerText().catch(async () => await page.locator("main").innerText()));
    await page.screenshot({ path: `${SHOTS}/usecase-chat-initial.png`, fullPage: false });

    const inp = page.locator("input[placeholder*='customer']").first();
    await inp.fill("My hot water tank is leaking all over the basement floor, can you send a plumber today?");
    await page.locator("button[aria-label='Send message']").click();
    await page.waitForTimeout(500);
    log("\n-- MID-FLIGHT status text: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[role="status"],[aria-live]')].map(e => (e.innerText || "").trim()).filter(Boolean))));
    await page.waitForTimeout(5000);
    const bubbles = await page.evaluate(() => [...document.querySelectorAll(".rounded-2xl")].map(e => e.innerText.trim()).filter(Boolean));
    log("\n-- TRANSCRIPT --\n" + JSON.stringify(bubbles, null, 1));
    log("POST payload sent to /api/demo: " + JSON.stringify(posts));
    log("contains 'Sorry, could you say that again'? " + /Sorry, could you say that again/i.test(bubbles.join(" ")));
    log("mentions landscaping/lawn/yard? " + /landscap|lawn|yard|mow/i.test(bubbles.join(" ")));
    log("scripted-sample notice present: " + await page.locator("text=scripted sample").count());
    log("demo-mode footer: " + JSON.stringify(await page.locator("text=Demo mode").first().innerText().catch(() => null)));
    await page.screenshot({ path: `${SHOTS}/usecase-chat-reply.png`, fullPage: false });
    await ctx.close();
  }

  // ======================================================= /start copy =====
  log("\n\n############ Q4d — /start ############");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(VA_STUB);
    const page = await ctx.newPage();
    await page.goto(`${BASE}/start`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    const txt = await page.locator("body").innerText();
    log("\n-- VISIBLE COPY --\n" + txt);
    const html = await page.content();
    const claims = ["check your inbox", "sent to you", "emailed to you", "we've emailed", "we have emailed", "on its way", "check your email", "has been sent"];
    for (const c of claims) log(`claim "${c}" present in HTML? ` + new RegExp(c, "i").test(html));
    log("honest disclaimers present: " + JSON.stringify(["Nothing is emailed to you", "Nothing was emailed to you automatically"].map(s => ({ s, inHtml: html.includes(s) }))));
    await page.screenshot({ path: `${SHOTS}/start-gate.png`, fullPage: true });
    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync("C:/Users/gillp/Documents/Claude/Projects/AI Shop/research/transformation-2026-08-30/qa/_qa-demo-analytics.out.txt", out.join("\n"));
})();
