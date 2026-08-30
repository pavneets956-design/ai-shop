// S2 QA — /demo showroom, embedded use-case chat, /start. Writes incrementally.
import { chromium } from "@playwright/test";
import fs from "node:fs";

const BASE = "http://localhost:3200";
const SHOTS = "C:/Users/gillp/Documents/Claude/Projects/AI Shop/research/transformation-2026-08-30/qa/shots";
const OUT = "C:/Users/gillp/Documents/Claude/Projects/AI Shop/research/transformation-2026-08-30/qa/_qa-chat-start2.out.txt";
fs.writeFileSync(OUT, "");
const log = (...a) => { const s = a.join(" "); console.log(s); fs.appendFileSync(OUT, s + "\n"); };
const VA_STUB = () => { window.__track = []; window.va = function (...p) { window.__track.push(JSON.parse(JSON.stringify(p))); }; };
const ev = (page) => page.evaluate(() => (window.__track || []).filter(t => t[0] === "event").map(t => t[1]));
const clr = (page) => page.evaluate(() => { window.__track = []; });
const step = async (name, fn) => { try { await fn(); } catch (e) { log(`\n!! ${name} FAILED: ${String(e).slice(0, 300)}`); } };

const browser = await chromium.launch();

// ================================================================ /demo ====
if (false) await step("demo", async () => {
  log("############ Q4b — /demo SHOWROOM ############");
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  await ctx.addInitScript(VA_STUB);
  const page = await ctx.newPage();
  const consoleErrs = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text().slice(0, 200)); });
  await page.goto(`${BASE}/demo`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  log("\n-- INITIAL STATE (nothing typed by the visitor yet) --");
  log(await page.locator("main").innerText());
  await page.screenshot({ path: `${SHOTS}/demo-01-initial.png`, fullPage: true });
  log("\nanalytics events on /demo load: " + JSON.stringify(await ev(page)));
  log("composer textarea accessible name: " + JSON.stringify(await page.evaluate(() => {
    const t = document.querySelector("textarea");
    if (!t) return "NO TEXTAREA";
    const lbl = t.id ? document.querySelector(`label[for="${t.id}"]`) : null;
    return { id: t.id || null, ariaLabel: t.getAttribute("aria-label"), ariaLabelledby: t.getAttribute("aria-labelledby"), label: lbl ? lbl.innerText : null, placeholder: t.placeholder };
  })));

  // pick worker + industry
  await page.locator('button[aria-pressed]:has-text("Quote Agent")').first().click();
  await page.waitForTimeout(700);
  await page.locator('button[aria-pressed]:has-text("Plumbing")').first().click();
  await page.waitForTimeout(1100);
  log("\n-- AFTER picking 'Quote Agent' + 'Plumbing' --");
  log("pressed: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('button[aria-pressed="true"]')].map(b => b.innerText.replace(/\n/g, " | ").trim()))));
  log("phone header: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("div")].map(d => d.className).length && document.querySelector('[class*="truncate"][class*="font-bold"]')?.innerText)));
  log("re-seeded transcript:\n" + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[class*="rounded-2xl"]')].map(e => e.innerText.trim()).filter(Boolean)), null, 1));
  await page.screenshot({ path: `${SHOTS}/demo-02-picked.png`, fullPage: true });

  // real send (no intercept)
  await clr(page);
  await page.locator("textarea").last().fill("My kitchen sink is leaking badly, how much to fix it today?");
  await page.locator('button[aria-label="Send"]').first().click();
  await page.waitForTimeout(450);
  log("\n-- MID-FLIGHT (450ms) --");
  log("live/status regions: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[aria-live],[role="status"]')].map(e => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), text: (e.innerText || "").trim().slice(0, 140) })))));
  log("send button disabled while busy: " + await page.locator('button[aria-label="Send"]').first().isDisabled());
  log("any 'responding/typing/thinking' text on screen: " + /responding|typing|thinking/i.test(await page.locator("main").innerText()));
  await page.screenshot({ path: `${SHOTS}/demo-03-inflight.png`, fullPage: true });
  await page.waitForTimeout(6500);
  log("\n-- AFTER REPLY (real, un-intercepted call) --");
  log(await page.locator("main").innerText());
  log("\nanalytics events fired by the demo turn: " + JSON.stringify(await ev(page)));
  await page.screenshot({ path: `${SHOTS}/demo-04-after-reply.png`, fullPage: true });

  // forced fallback
  await page.route("**/api/demo", (r) => r.fulfill({
    status: 200, contentType: "application/json",
    body: JSON.stringify({
      fallback: true,
      response: {
        assistantMessage: "FORCED-FALLBACK reply injected by the QA harness.",
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
  await page.waitForTimeout(7000);
  log("\n-- FORCED { fallback: true } --");
  log(await page.locator("main").innerText());
  log("scripted-sample notice count: " + await page.locator("text=scripted sample").count());
  log("demo-mode pill count: " + await page.locator("text=Demo mode").count());
  await page.screenshot({ path: `${SHOTS}/demo-05-forced-fallback.png`, fullPage: true });
  log("\nconsole errors: " + JSON.stringify(consoleErrs));
  await ctx.close();
});

// ================================================= embedded use-case chat ==
await step("usecase", async () => {
  log("\n\n############ Q4c — EMBEDDED USE-CASE CHAT ############");
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1100 } });
  await ctx.addInitScript(VA_STUB);
  const page = await ctx.newPage();

  // 1) the URL the brief named
  const r = await page.goto(`${BASE}/use-cases/ai-receptionist-for-contractors`, { waitUntil: "domcontentloaded" });
  log(`\n-- /use-cases/ai-receptionist-for-contractors -> final URL ${page.url()} (status ${r.status()})`);
  log("   embedded chat present here? " + await page.locator("input[placeholder*='customer']").count());
  log("   h1: " + JSON.stringify(await page.locator("h1").first().innerText().catch(() => null)));

  // 2) which use-case pages actually carry a chat
  const slugs = ["ai-chatbot-for-restaurants", "ai-receptionist-for-dentists", "automate-admin-for-accountants", "missed-call-automation", "appointment-reminder-automation", "google-business-profile-lead-automation", "facebook-lead-automation", "ai-sop-generator"];
  log("\n-- chat presence across every /use-cases/* page --");
  for (const s of slugs) {
    await page.goto(`${BASE}/use-cases/${s}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(400);
    const n = await page.locator("input[placeholder*='customer']").count();
    const greet = n ? await page.locator('[class*="rounded-2xl"]').first().innerText().catch(() => "") : "";
    log(`   ${s}: chat=${n ? "YES" : "no"} ${greet ? "| greeting: " + JSON.stringify(greet.trim()) : ""}`);
  }

  // 3) drive the dentist chat (the receptionist persona that does exist)
  const posts = [];
  page.on("request", (rq) => { if (rq.url().includes("/api/demo")) posts.push(rq.postData()); });
  await page.goto(`${BASE}/use-cases/ai-receptionist-for-dentists`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  log("\n-- DRIVING /use-cases/ai-receptionist-for-dentists --");
  log("chat header: " + JSON.stringify(await page.locator("text=AI Receptionist — live").first().innerText().catch(() => null)));
  await page.locator("input[placeholder*='customer']").first().fill("I chipped a front tooth this morning, can I get in today?");
  await page.locator("button[aria-label='Send message']").click();
  await page.waitForTimeout(400);
  log("mid-flight status regions: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[role="status"],[aria-live]')].map(e => (e.innerText || "").trim()).filter(Boolean))));
  log("'AI is responding…' visible mid-flight: " + await page.locator("text=AI is responding").count());
  await page.screenshot({ path: `${SHOTS}/usecase-01-inflight.png` });
  await page.waitForTimeout(6000);
  const bubbles = await page.evaluate(() => [...document.querySelectorAll('[class*="rounded-2xl"]')].map(e => e.innerText.trim()).filter(Boolean));
  log("\nTRANSCRIPT:\n" + JSON.stringify(bubbles, null, 1));
  log("POSTs to /api/demo: " + JSON.stringify(posts));
  log("renders 'Sorry, could you say that again'? " + /Sorry, could you say that again/i.test(bubbles.join(" ")));
  log("leaks landscaping persona (landscap|lawn|yard|mow|Greenline)? " + /landscap|lawn|yard|mow|greenline/i.test(bubbles.join(" ")));
  log("scripted-sample notice: " + JSON.stringify(await page.locator("text=scripted sample").first().innerText().catch(() => null)));
  log("demo-mode footer: " + JSON.stringify(await page.locator("text=Demo mode").first().innerText().catch(() => null)));
  await page.screenshot({ path: `${SHOTS}/usecase-02-reply.png` });

  // 4) error path — /api/demo 500
  await page.route("**/api/demo", (rt) => rt.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "boom" }) }));
  await page.locator("input[placeholder*='customer']").first().fill("Do you take insurance?");
  await page.locator("button[aria-label='Send message']").click();
  await page.waitForTimeout(2500);
  log("\n-- /api/demo 500 --");
  log("error text: " + JSON.stringify(await page.locator('[class*="text-danger"]').first().innerText().catch(() => null)));
  log("did the user's message stay in the transcript? " + await page.locator("text=Do you take insurance?").count());
  await page.screenshot({ path: `${SHOTS}/usecase-03-error.png` });
  await ctx.close();
});

// ================================================================ /start ===
await step("start", async () => {
  log("\n\n############ Q4d — /start ############");
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(VA_STUB);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/start`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  log("\n-- VISIBLE COPY --\n" + await page.locator("body").innerText());
  const html = await page.content();
  const claims = ["check your inbox", "sent to you", "emailed to you", "we've emailed", "on its way", "check your email", "has been sent", "your plan has been sent", "we'll email"];
  log("\n-- FALSE-EMAIL CLAIM SCAN (server HTML) --");
  for (const c of claims) log(`  "${c}": ${new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(html) ? "PRESENT" : "absent"}`);
  log("  honest disclaimer 'Nothing is emailed to you': " + html.includes("Nothing is emailed to you"));
  log("  honest disclaimer 'Nothing was emailed to you automatically': " + html.includes("Nothing was emailed to you automatically"));
  log("  analytics events on /start load: " + JSON.stringify(await ev(page)));
  await page.screenshot({ path: `${SHOTS}/start-01-gate.png`, fullPage: true });
  await ctx.close();
});

await browser.close();
log("\nDONE");
