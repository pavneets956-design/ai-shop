# Form Filler CA — Canadian Super Visa

A self-contained, **privacy-by-architecture** form-filling tool. The user drops in a
passport and supporting details; the tool fills their Canadian super visa forms. Every
byte is processed **in the browser** — no document is ever uploaded to a server.

## Why it's private (and verifiable)

OCR, passport parsing, and PDF filling all run client-side via WebAssembly
(Tesseract + MuPDF). The server only ships static JS/WASM. There is no upload endpoint
and no document store — so there is nothing to breach or leak. Open the browser Network
tab while using it: no document leaves the device. The strict Content-Security-Policy on
the route (`connect-src` limited to the engine-asset CDNs only) enforces this at the
platform level.

> One caveat for full honesty: the Tesseract OCR engine downloads its WASM core + English
> model once from a public CDN (jsdelivr / tessdata). That is engine code, **not** user
> data — your documents still never upload. Self-hosting those assets (to work fully
> offline and drop the CDN) is a planned hardening step.

## What it does today (free tier)

| Form | Type | How it's filled |
|---|---|---|
| **IMM 5645** (Family Information) | AcroForm | **Auto-filled.** Download the completed PDF, ready to print & sign. |
| **IMM 5257** (TRV application) | XFA (dynamic) | **Guided.** Every answer is pre-computed; open the official form in free Adobe Reader and copy them across (~2 min). |

IMM 5257 is an XFA "dynamic" PDF — its field layer renders only in Adobe, so no browser
library can reliably *write* it. We deliberately do **not** fake a write to a real visa
form; the guided sheet carries zero risk of a silently-wrong field.

## Architecture

```
engine/      types · mrz (passport) · ocr (tesseract) · fill (mupdf) · pipeline
forms/       imm-5645/{template.pdf, map.ts} · imm-5257/{map.ts} · registry.ts
ui/          FormFiller.tsx (the whole client flow)
```

The Next.js route at `app/tools/form-filler/page.tsx` is a thin, `ssr:false` mount point.

**Add a new form** = add `forms/<imm-xxxx>/` with a `map.ts`, drop the template in
`/public/form-templates/`, and register it in `registry.ts`. No engine or route changes.

## Verified

- MuPDF fills + saves IMM 5645 and the values round-trip on re-read (5/5).
- All mapped field names validated against the real template (14/14 across every section
  and field type, both pages).
- End-to-end in a real browser via Playwright: manual entry → in-browser fill →
  downloadable filled PDF, zero console errors.

## Roadmap — Pro / bulk tier (paid)

For immigration consultants / HR filling for many applicants, the Adobe-import step
doesn't scale. The Pro tier adds **server-side batch fill** (zero-retention, in-memory):
upload a batch → get fully-filled PDFs back, including a one-click-filled IMM 5257 via an
Adobe-grade XFA engine. Gated behind the existing Stripe/NextAuth. Not built yet.
