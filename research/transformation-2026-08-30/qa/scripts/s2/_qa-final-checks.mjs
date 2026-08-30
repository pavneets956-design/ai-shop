// S2 QA — delayed-response states + end-to-end honeypot.
import { chromium } from "@playwright/test";
import fs from "node:fs";
const BASE = "http://localhost:3200";
const SHOTS = "C:/Users/gillp/Documents/Claude/Projects/AI Shop/research/transformation-2026-08-30/qa/shots";
const OUT = "C:/Users/gillp/Documents/Claude/Projects/AI Shop/research/transformation-2026-08-30/qa/_qa-final.out.txt";
fs.writeFileSync(OUT, "");
const log = (...a) => { const s = a.join(" "); console.log(s); fs.appendFileSync(OUT, s + "\n"); };
const VA_STUB = () => { window.__track = []; window.va = function (...p) { window.__track.push(JSON.parse(JSON.stringify(p))); }; };

const DEMO_OK = {
  fallback: false,
  response: {
    assistantMessage: "Absolutely — I can get you in this afternoon. What's the best number to text the confirmation to?",
    capturedFields: { name: null, phone: null, email: null, service: "Emergency chipped tooth", location: null, urgency: "High", budget: null, preferredTime: "today", missingInfo: ["Callback number"] },
    leadSummary: "Urgent chipped-tooth appointment requested for today.",
    nextActions: ["Hold a same-day slot", "Text the patient a confirmation"],
    systemEvents: ["Calendar hold created", "SMS confirmation queued"],
    suggestedReplies: ["604 555 0188", "What time?"],
    cta: { show: false, label: "", href: "/create" },
  },
};

const browser = await chromium.launch();

// 1) use-case chat: "AI is responding…" with a 3s delayed reply
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  await ctx.addInitScript(VA_STUB);
  const page = await ctx.newPage();
  await page.route("**/api/demo", async (r) => { await new Promise((x) => setTimeout(x, 3000)); r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(DEMO_OK) }); });
  await page.goto(`${BASE}/use-cases/ai-receptionist-for-dentists`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await page.locator("input[placeholder*='customer']").first().fill("I chipped a front tooth this morning, can I get in today?");
  await page.locator("button[aria-label='Send message']").click();
  await page.waitForTimeout(1200);
  log("### USE-CASE CHAT, 3s delayed LIVE reply (fallback:false) ###");
  log("visible 'AI is responding…' mid-flight: " + await page.locator("text=AI is responding").count());
  log("status-region text mid-flight: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[role="status"],[aria-live]')].map(e => (e.innerText || "").trim()).filter(Boolean))));
  log("sr-only announcement mid-flight: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll(".sr-only")].map(e => e.textContent.trim()).filter(Boolean))));
  log("send button disabled mid-flight: " + await page.locator("button[aria-label='Send message']").isDisabled());
  await page.screenshot({ path: `${SHOTS}/usecase-04-responding.png` });
  await page.waitForTimeout(3000);
  log("\nTRANSCRIPT after live reply:\n" + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[class*="rounded-2xl"]')].map(e => e.innerText.trim()).filter(Boolean)), null, 1));
  log("scripted-sample notice shown on a LIVE (fallback:false) reply? " + await page.locator("text=scripted sample").count());
  log("demo-mode footer still shown: " + await page.locator("text=Demo mode").count());
  await page.screenshot({ path: `${SHOTS}/usecase-05-live-reply.png` });
  await ctx.close();
}

// 2) /demo showroom: typing state with a 3s delayed reply
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  await ctx.addInitScript(VA_STUB);
  const page = await ctx.newPage();
  await page.route("**/api/demo", async (r) => { await new Promise((x) => setTimeout(x, 3000)); r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(DEMO_OK) }); });
  await page.goto(`${BASE}/demo`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1600);
  await page.locator("textarea").last().fill("It's urgent — can someone come today?");
  await page.locator('button[aria-label="Send"]').first().click();
  await page.waitForTimeout(1400);
  log("\n\n### /demo SHOWROOM, 3s delayed LIVE reply (fallback:false) ###");
  const main = await page.locator("main").innerText();
  log("any 'responding/typing/thinking/loading' TEXT mid-flight: " + /responding|typing|thinking|loading/i.test(main));
  log("status/aria-live regions mid-flight: " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[role="status"],[aria-live]')].map(e => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), text: (e.innerText || "").trim().slice(0, 120) })))));
  log("animated typing-dot node present: " + await page.evaluate(() => !!document.querySelector('div.inline-flex.items-center.gap-1')));
  await page.screenshot({ path: `${SHOTS}/demo-06-typing.png`, fullPage: true });
  await page.waitForTimeout(6000);
  log("scripted notice after a LIVE reply: " + await page.locator("text=scripted sample").count());
  log("demo-mode pill after a LIVE reply: " + await page.locator("text=Demo mode").count());
  log("captured Service value: " + JSON.stringify(await page.evaluate(() => { const dts = [...document.querySelectorAll("dt")]; const dt = dts.find(d => d.innerText.trim() === "Service"); return dt?.nextElementSibling?.innerText.trim() ?? null; })));
  await page.screenshot({ path: `${SHOTS}/demo-07-live-reply.png`, fullPage: true });
  await ctx.close();
}

// 3) END-TO-END honeypot against the REAL server
{
  const ctx = await browser.newContext();
  await ctx.addInitScript(VA_STUB);
  const page = await ctx.newPage();
  let serverStatus = null, serverBody = null;
  page.on("response", async (r) => { if (r.url().includes("/api/build-request")) { serverStatus = r.status(); serverBody = await r.text().catch(() => null); } });
  await page.goto(`${BASE}/create`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#br-name");
  await page.fill("#br-name", "Honeypot QA");
  await page.fill("#br-contact", "honeypot-qa@example.invalid");
  await page.fill("#br-business", "HP Co");
  await page.fill("#br-goal", "prove the honeypot false-positive path");
  // simulate an over-eager autofill/extension filling the hidden field
  await page.evaluate(() => {
    const el = document.querySelector("#company_website");
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    setter.call(el, "https://hpco.example");
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.waitForTimeout(200);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);
  log("\n\n### END-TO-END HONEYPOT (real server, no intercept) ###");
  log("server responded: " + serverStatus + " " + serverBody);
  log("WHAT THE USER SEES:\n" + (await page.locator("main").innerText()));
  await page.screenshot({ path: `${SHOTS}/create-honeypot-false-success.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
log("\nDONE");
