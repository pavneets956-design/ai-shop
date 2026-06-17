# Form Filler AI — Design Spec

**Date:** 2026-06-15
**Status:** Approved (architecture locked); pending user spec review
**Tool slug:** `form-filler-ca`
**Proof case:** Canadian super visa (parent/grandparent) application package — used live by a real first user (Pavneet's wife) who leaves a review.

---

## 1. Product in one line

Drop in all the forms + all the supporting documents → the tool reads them **entirely inside your browser** → fills every form field → you review each field against its source → download the completed, submission-ready PDFs. Nothing is retyped. **No document ever leaves the user's device.**

## 2. Goals

- Fill the full Canadian super visa form set from a user's uploaded supporting documents, leaving no field for manual retyping (beyond reviewing/confirming).
- **Privacy by architecture:** confidential documents (passports, financials) are processed 100% client-side in the browser and never transmitted to any server. This is verifiable in the browser Network tab.
- Deploy as a public website on Vercel under aibuiltbyhand.com, usable by many people with zero friction (no login required to start).
- Be productized to a "millions of users / corporate-HR-grade" standard: hardened security headers, auditable mapping, accessible UI, graceful errors.
- Establish the **folder-per-tool** pattern that all future tools in the suite follow.

## 3. Non-goals (this version)

- No cloud LLM in the default path. Identity data is parsed deterministically (more reliable than an LLM for government forms).
- No server-side document storage or processing. (If a future form genuinely cannot be filled in-browser, a separate zero-retention server path is a future decision — not built now.)
- No support for legacy XFA "dynamic" forms. The current official IRCC super visa forms are AcroForms (verified 2026-06-15); if a user supplies an old XFA copy, we direct them to the current official version.
- No automatic 2D-barcode generation logic. Current form versions contain no Adobe validation JavaScript (verified); the filled AcroForm is the deliverable. (See §9 open item — confirmed during the first implementation spike.)
- Repeating/expandable subforms are handled for a **fixed, known** number of entries (family size), not as an unbounded dynamic case.

## 4. Verified facts (2026-06-15, corrected after the implementation spike)

Probed the current official IRCC templates with three independent engines (pdf-lib,
pdf.js, MuPDF). An initial byte-scan wrongly suggested all were AcroForms; reading the
actual widget layer corrected this to a **split**:

| Form | Version | Real type | Fillable widgets | Fill path |
|---|---|---|---|---|
| IMM 5645 (Family Information) | 01-01-2021 | **AcroForm** | 145 (92 text, 38 btn, 15 combo) | Auto-fill in-browser ✓ |
| IMM 5257 (Application for TRV) | 01-09-2023 | **XFA (dynamic)** | 1 (signature only) | Guided (no library can write XFA) |
| IMM 0008 (Generic) | 01-03-2025 | XFA (dynamic) | 1 (signature only) | **Out of scope** — not required for a super visa |

**Engine choice:** `pdf-lib` *fails* on these files' cross-reference structure (0 fields,
"invalid object ref"). **MuPDF (WASM)** reads AND writes the 5645 AcroForm cleanly and runs
in the browser — it is the fill engine. Verified: fill→save→re-read round-trips 5/5, all
mapped field names valid 14/14, regression script 12/12, and the full flow runs end-to-end
in a real browser (Playwright).

**IMM 5257 is genuinely XFA** — its field layer renders only in Adobe, so no browser
library can reliably write it. The free tier delivers a *guided* answer sheet (zero risk of
a silently-wrong field); one-click 5257 auto-fill is the Pro/server tier (§12).

## 5. Architecture

**Shape:** A standard Next.js (App Router) page served from Vercel. The page ships static JS + WASM to the browser. **All document processing happens in the browser tab.** The server never receives document bytes.

### 5.1 Folder-per-tool structure

The tool is a self-contained, sellable-standalone module. The Next.js route is only a thin mount point.

```
/tools/form-filler-ca/              ← self-contained tool (browser-safe TypeScript)
   engine/
      ocr.ts            tesseract.js wrapper; crops to MRZ band; returns text
      mrz.ts            passport MRZ parse (check-digit validated) → identity object
      extract.ts        orchestrates OCR + structured extraction from all uploads
      fill.ts           pdf-lib filler: (template bytes, field values) → filled PDF bytes
      pipeline.ts       extract → map → fill, exposes one run(files) → results
      types.ts          shared types (Identity, SourceDoc, FieldValue, FillResult)
   forms/
      imm-5257/  { template.pdf, map.ts, schema.ts }
      imm-5645/  { template.pdf, map.ts, schema.ts }
      imm-0008/  { template.pdf, map.ts, schema.ts }
      index.ts          registry of available forms (add a form = add a folder + register)
   ui/
      FormFiller.tsx     top-level client component (upload → process → review → export)
      ReviewField.tsx    one field beside its source thumbnail; confirm/edit
      UploadZone.tsx     drag-drop, file-type validation
   README.md             standalone product description + privacy/security claims
   __tests__/            unit tests for mrz, fill, maps

/app/tools/form-filler/page.tsx     ← thin route: renders <FormFiller/>, sets metadata
```

**Adding a new form** = add `forms/<imm-xxxx>/` with its template + map + schema and register it. No engine or route changes. (Mirrors the existing data-driven SEO page system.)

### 5.2 The pipeline (all client-side)

| Step | Unit | Library | What it does | Depends on |
|---|---|---|---|---|
| Render uploads | `ui/UploadZone` + `pdf.js` | pdf.js | Thumbnails of every source doc for the review gate | browser |
| OCR | `engine/ocr.ts` | tesseract.js (WASM) | OCR scanned passports/docs; crop to MRZ band for accuracy | browser |
| Identity parse | `engine/mrz.ts` | `mrz` (npm) | Deterministic passport parse w/ check digits → Identity | ocr output |
| Extraction | `engine/extract.ts` | — | Assemble all known values from all uploads into a typed bag | ocr, mrz |
| Map | `forms/*/map.ts` | — | Hand-authored source-value → PDF-field-name mapping | extract output |
| Fill | `engine/fill.ts` | pdf-lib | Write field values into the AcroForm template in-browser | template, map |
| Review | `ui/ReviewField` | React | Every field shown beside its source; user confirms/edits | fill output |
| Export | `ui/FormFiller` | pdf-lib | Generate final PDF bytes; trigger browser download | reviewed values |

Each engine unit has one purpose, a typed interface, and is unit-testable in isolation without the browser DOM (OCR/fill take bytes in, give data out).

### 5.3 Server-side surface

Only the static app shell and (optionally, later) an anonymous review/feedback capture endpoint that stores **no document content**. No auth required to use the tool. No document bytes server-side, ever.

## 6. Security & privacy model

The core control is architectural: **the server never receives the documents.** No server-side store ⇒ nothing to breach, leak, log, or subpoena. Layered on top:

1. **Client-side only processing** — OCR, parse, map, fill all in-browser. Verifiable: the Network tab shows no document upload.
2. **Strict Content-Security-Policy** on tool pages; no third-party scripts, no trackers, no analytics that can see form content. WASM/worker sources explicitly allow-listed.
3. **Subresource Integrity** on the WASM/worker assets; assets self-hosted (not third-party CDNs).
4. **Security headers:** HSTS, X-Content-Type-Options, Referrer-Policy: no-referrer, Permissions-Policy locked down, X-Frame-Options/DENY.
5. **No persistence by default** — in-memory only; cleared on completion/navigation. `localStorage`/IndexedDB used only if the user explicitly opts to "save & resume" (a future paid feature), and then only the structured field data, never raw document images, encrypted with a user-supplied passphrase.
6. **Plain-language, true privacy statement** on the tool page: "Your documents are processed entirely on your device and are never sent to our servers." Backed by a one-paragraph technical explanation a corporate security reviewer can verify.
7. **No cloud LLM** in the default path. Removes the largest data-egress risk.

## 7. Super visa scope (proof case)

**Forms filled:** IMM 5257 (TRV application), IMM 5645 (Family Information), and IMM 0008 if required by the specific stream. (Schedule 1 / IMM 5409 / IMM 5476 added later as `forms/` folders if needed.)

**Supporting documents read (sources):** passport(s) (MRZ + bio page), and any user-provided structured inputs (host info, addresses, employment, funds). Identity fields come from the MRZ deterministically; non-MRZ fields (invitation/relationship/funds) are entered by the user in guided inputs for this version and confirmed at the review gate. Free-text auto-extraction (e.g., parsing an invitation letter) is a later enhancement, always flagged "review."

**Definition of done for the proof:** the filled IMM 5257 + IMM 5645 open correctly in a standard PDF viewer with every field populated and correct against a hand-filled control copy, ready for the user to print/submit.

## 8. Build sequence (proof-first, UI-last)

1. **Spike — enumerate & fill (kills remaining risk).** Use `pdf-lib` to list every field in the real IMM 5257 + IMM 5645, write ~6 known values incl. one dropdown/choice field and one date, save, open in a viewer, confirm acceptance and correct rendering. Works ⇒ green light. (Also confirms the no-barcode-JS finding in practice.)
2. **Deterministic extraction.** `engine/ocr.ts` + `engine/mrz.ts`: a real passport image → check-digit-validated Identity JSON. No LLM.
3. **Author maps.** `forms/imm-5257/map.ts` and `imm-5645/map.ts` from the enumerated field names; wire `pipeline.ts` end-to-end (files → filled PDFs) as a headless function with unit tests.
4. **Minimal review UI.** `FormFiller` + `ReviewField` + `UploadZone`: upload → process → review every field beside its source thumbnail → export. Run the real file through it.
5. **Harden + ship.** CSP/SRI/security headers, privacy statement, accessibility pass, route at `/app/tools/form-filler`. Deploy to aibuiltbyhand.com. Wife uses it live, leaves a review.
6. **Deferred (post-proof):** additional forms, free-text extraction via optional in-browser model, save/resume + paid tier behind existing Stripe/NextAuth, multi-applicant packages.

## 9. Open verification items

- **Field enumeration & fill acceptance** — confirmed in spike step 1 (not assumed).
- **Barcode** — current forms have no Adobe validation JS; confirm in step 1 that a pure pdf-lib fill produces a viewer-correct, submission-ready PDF. If any residual barcode dependency surfaces, document the one-time free-Adobe-Reader step; it does not change the client-side architecture.
- **User's actual files** — if the wife has an older XFA copy, direct her to the current official template (which the tool can link/host).

## 10. Error handling

- Unreadable/low-quality scan → OCR confidence below threshold ⇒ flag the field as "couldn't read — please enter," never silently guess.
- MRZ check-digit failure ⇒ reject the parse, ask for a clearer image; never write an unvalidated identity field.
- Unknown/missing form field name during fill ⇒ surface a developer-visible error in dev, skip-with-warning in prod; covered by map unit tests.
- Every exported field passes through the human review gate; nothing is auto-submitted anywhere.

## 11. Testing

- Unit: `mrz.ts` (known MRZ strings incl. deliberately corrupted check digits), `fill.ts` (fill a fixture template, re-read fields, assert values), each `forms/*/map.ts` (mapping completeness — every required field has a source).
- Integration: `pipeline.ts` on a synthetic identity + template → assert filled output fields.
- Manual acceptance: the real super visa file, filled output compared field-by-field to a hand-filled control copy.

## 12. Future / paid tier (deferred, designed-for-not-built)

Code is structured so a paid tier slots in without rework: gate advanced features (additional form packages, save/resume, free-text extraction, multi-applicant) behind the existing NextAuth + Stripe. The free anonymous core filler remains free and client-side.
