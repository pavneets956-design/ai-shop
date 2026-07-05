# AI-HAND BACKGROUND — GOD PROMPT v2 · LIGHT EDITION (build spec)

**Project:** aibuiltbyhand.com homepage — cinematic scroll-choreographed background system.
**Date:** 2026-07-03 (v2 supersedes the 2026-07-02 dark-finale spec).
**Starting point — DO NOT REBUILD:** Phase 1 already exists, uncommitted, at `components/home/stage/` (`HandStage.tsx`, `HandVisual.tsx`, `StageObjects.tsx`), wired into `components/home/HomepageNew.tsx:230`. It implements the v1 spec with a warm-BLACK Beat-4 finale. The v2 job is to **restyle and extend that stage**, not start over.
**Brand story the background must tell before any text is read:** your business is drowning in unread and missed everything — a handmade AI hand catches it all and sets it down, organized, on one calm desk.
**Palette:** paper `#FAF7F2`, ink `#191716` (text only), amber `#E88A00`, badge red `#D6453D`. Warm neutrals only; no cool greys anywhere in the scene. **The scene never goes dark. Light throughout.**

---

## 0. What changed in v2 (ratified 2026-07-03, Opus-consulted — don't re-litigate)

1. **All-light film.** The v1 cream→black "lights down" arc is DEAD. Dark finales are where every AI site converges; a light-only cinematic is rarer and more premium. The contrast payoff moves from *light→dark* to **flat-chaos → grounded-order**: same paper, but shadows deepen, objects align, red turns amber. Contrast through shadow depth and alignment, never luminance drop.
2. **Badge numbers are the recognizability engine.** The chaos must be nameable by a roofer in one second: an inbox card with a red **1,000**, a phone with **17 missed**, a message card with **9**. The number is the gut-punch, not any brand's logo.
3. **The destination is a desk.** Beat 4 lands the objects docked on a stylized warm desk surface — the product promise (installed system, one calm workspace) made visual. Device-*implied*, never a photoreal MacBook or literal iOS frame (ages into clipart in 18 months).

### The Quiet Hours lesson (why the Vessel variant failed)
`Quiet Hours 2nd Variant (standalone).html` was beautifully executed and illegible: "Pour it in," a glass vessel filling with amber — a metaphor the visitor must *decode*. Law for this build: **no symbolic objects, ever.** Every object on screen is something the visitor owns (phone, inbox, invoice, review). Every beat's promise is also stated in literal DOM copy. If an element needs explaining, it's cut.

### The logo rule
**No third-party marks anywhere in the scene** — no Gmail "M", no iOS bubbles, no app icons. Two reasons: (a) using another company's trademark as the *villain* in a commercial hero is outside nominative fair use and against Google's/Apple's brand terms — takedown-letter bait; (b) app-icon salad reads $99-template, not premium. Recognition comes from **shape language + badge count**: a neutral envelope glyph with a red 1,000 reads "email hell" instantly. Same punch, zero risk.

---

## 1. The two load-bearing decisions (unchanged from v1)

1. **The hand is BAKED, never live-rigged.** Render the ceramic hand — together with the exact objects it touches — as an alpha sequence in Blender (Apple-product-page method), scrubbed by scroll, composited over a parallax environment. A real-time R3F hand rig is the #1 way this fails: wobbly IK, clipping fingers, toy-plastic materials. Phase 1 ships with one static hero hand still.
2. **Cast of 5 hero objects, not 9.** Mess reads as mess through composition and lighting, not inventory. Five large confident objects + 3 defocused mute props. No emoji, ever.

---

## 2. Object cast (v2)

### Hero objects (large, lit, touchable — each maps to a final dock position)

| # | Object | Badge | Final dock | Mess state (Beat 1) | Size @1440 |
|---|--------|-------|-----------|---------------------|------------|
| 1 | Envelope/inbox card — neutral envelope glyph, tray edge | red **1,000** | **Work** | upper-right, skewed ~10° | ~180px |
| 2 | Phone slab, screen up, missed-call glyph | red **17 missed** | **Calls** | tilted ~-9°, center-right | ~200px tall |
| 3 | Invoice sheet, slight curl + one fold | — | **Work** | skewed ~12° — **the hero prop the hand manipulates** | ~260px tall |
| 4 | Message bubble card | red **9** | **Calls** | mid-right | ~150px |
| 5 | Review card, 5 stars | — | **Proof** | face-down / stars dimmed | ~170px |

Calendar demotes from hero to mute prop (weakest of the v1 five; the inbox card earns its slot).

### Mute background props (never touched, always defocused, pure depth)
Calendar block, curled receipt, sticky note. Low detail, no labels, no interaction — soft-DOF silhouettes.

### Badges — the ONE readable text in the scene
- Red pill badges with the count, rendered **large and legible** (min ~16px cap-height at 1440) — they are UI-real, crisp, slightly raised with their own contact shadow.
- Exactly **3 counted badges** (1,000 / 17 / 9). No fourth. Numbers never change during the film except at the handled moment.
- On handled contact: count animates to **0** as the badge crossfades red→amber and settles into a small amber check/dot. Red→amber→zero is the entire product pitch in half a second.
- All other text on objects stays abstract lines (nothing readable) — the badges must be the only words the eye can catch.

### Material spec (avoid Canva-flat AND uncanny-clipart)
- Phone: beveled slab with real thickness, matte back, simple rendered screen UI (missed-call glyph + badge — not a screenshot).
- Envelope card: extruded card with a debossed envelope glyph — glyph, not logo.
- Paper: real mesh with curl + fold so the hand can believably bend it; matte, faint grain.
- Cards: 2–4mm extrusion, rounded corners, soft bevel — edge must catch a highlight (the Stripe test).
- Everything: matte, warm-neutral, low-poly, softly lit, subtle grain. Under-detail beats over-detail. No photo textures, no gloss plastic, no emoji, no third-party marks.

---

## 3. Scene layout — 4 beats (desktop 1440px frame)

**Hard rule in every beat: left 0–580px (~40%) is a text-dead-zone.** Nothing sharp, bright, or red lives there — only clean paper + heavily defocused low-contrast prop bokeh. Action lives 620–1440px. Real DOM copy (headline / offer / CTA) overlays the left zone **from scroll-position 0** — this site is a closer; the film is the stage, never a gate.

**Depth stack (all beats):** foreground = 1 mute prop, soft, frames the shot · midground = 5 hero objects + hand (focal plane) · background = paper surface/horizon falloff + remaining mute props, defocused.

### Beat 1 — DROWNING (flat light) — scroll 0–15%
Objects scattered across the right 55% on a loose **diagonal** (unresolved tension). Nothing grid-aligned, nothing grounded: shadows are weak, diffuse, slightly detached — the objects *float*, which is exactly what unhandled work feels like. The three red badges (1,000 / 17 / 9) pulse slowly (>4s period, staggered). High-key, low-contrast, almost shadowless — beautiful but airless.

### Beat 2 — HAND ARRIVES — scroll 15–35%
Hand enters from the **right edge, mid-height, wrist-first**, forearm cropped by frame, decelerating with weight. Furthest reach x≈720 — never crosses the text zone. Objects hold; the nearest badge pulses once (anticipation). Camera pushes in ~4–6%. With the hand, the light gains **direction** for the first time: a soft key from upper-right begins to model the objects.

### Beat 3 — ORGANIZING — scroll 35–70%
Hand performs the micro-actions (§6) on the invoice and one badge. Thin amber workflow lines draw between objects — **only 2–3 lines, sequential, never a web**. Objects rotate/migrate toward alignment; as each one moves it **gains a true contact shadow** — the film's core visual verb: *touched by the system = grounded*. Badges convert red→amber→0 on contact.

### Beat 4 — HANDLED DESK (grounded light) — scroll 75–100%
The paper surface resolves into a **stylized desk plane** — same warm paper, now with a subtle horizon line, gentle perspective, and a faint routed tray/rail detail (desk-implied, not rendered furniture; absolutely no photoreal laptop, no iOS frame). The five objects sit **docked**: aligned to an implied grid on a horizontal eyeline across the right 55% —
- **Calls** (phone + message card) ~x700
- **Work** (invoice + inbox card) ~x980
- **Proof** (review card, stars lit) ~x1240

Every object grounded by a deep, soft, directional contact shadow; amber handled-states (checks, one hairline amber underline along the desk rail) are the only accent. Hand rests relaxed at frame edge, or exits. Stillness = handled. **The frame stays paper-light — the premium is in the order, not in darkness.**

---

## 4. Lighting rig (v2 — one room, light throughout)

### Beat 1 — flat high-key
- Broad soft ambient dome, minimal direction; key:fill ≈ 1.2:1. Shadows: faint, diffuse, slightly offset from objects (un-grounded).
- This flatness is deliberate and must still be *pretty* — luxury-catalog overexposure, not dead render.

### Beats 2–4 — directional grounding (the arc)
- **Key:** one large soft area light from **upper-right** ramps in across Beats 2–3, ~5000K with faint amber bias; by Beat 4, key:fill ≈ 3:1.
- **Shadows:** the protagonist of the grade. Contact shadows + AO deepen and tighten as objects are handled — Beat 4 shadows are rich, warm-umber, long-soft, unmistakably *grounding*. NEVER raw real-time shadow maps as primary.
- **Rim:** subtle, warm-biased, behind-right, lifting heroes off the paper.
- **No luminance drop anywhere.** The paper base value holds within ~5% across the whole film. If a reviewer squints and the end looks "darker," the grade is wrong — it should look *deeper*, not darker.

### Amber discipline (no cheap bloom)
- Amber comes from **emissive states** (handled badges, workflow lines, the desk-rail underline) — light sources in the scene, not post-slapped glow.
- Bloom if any: low-threshold, high-smoothing, whisper-intensity.
- **Amber < 10% of frame color mass at any moment** (tighter than v1's 15% — on a light ground amber spreads louder).
- Badge red obeys the same law: 3 badges max, and red exits the frame entirely by Beat 4.

---

## 5. Camera (unchanged from v1)

- **~50mm-equivalent, slightly long.** Product-photography lens. Never wide (24–35mm = video-game look).
- **One continuous move, no cuts:** Beat 1→2 slow push-in (~4–6%); Beat 2→3 near-hold with micro drift down-right following the hand; Beat 3→4 settles and levels into symmetric product framing, decelerating to near-still.
- **Scroll parallax (subtle):** foreground travels ~40–60px more than background across the full scroll; midground ~20–30px. Optional mouse parallax ±6px, desktop only.
- **DOF:** Beat 1 mid-aperture · Beats 2–3 focus racks to the hand · Beat 4 deeper, outer docks slightly soft. Never blur an object into an unreadable smear.

---

## 6. Hand — design + choreography (unchanged from v1)

### Design
Off-white ceramic shell, brushed-metal joints (subtle anisotropy), visible finger articulation, engineered knuckles, fine seam lines. Matte ceramic with soft subsurface. Not toy plastic, not horror robot, not glove-smooth human.

### The physics language: weight vs. servo precision
- **Weight** = object lags the hand on acceleration, leads on deceleration; wrist counter-rotations; follow-through on paper edges.
- **Servo precision** = confident even-velocity mid-travel, decelerations *harder* than human, and **every contact ends in a damped micro-settle** — one over-damped oscillation, ~0.5mm, like a stepper motor finding its detent. Offset finger motions 1–2 frames so it reads mechanical-but-alive.
- Travel paths are gentle **arcs**, never straight lines. **No bobbing, ever.**

### Action A — pinch·lift·place the invoice (~2.2s, mapped across Beat 3 scroll)
1. **Approach + anticipation (0.0–0.5s):** decelerate over the corner; thumb+index pre-open wider than needed; wrist tilts to present fingers.
2. **Contact + pinch (0.5–0.8s):** hard decelerate to dead stop. **Contact pause 4–6 frames** (80% of the believability). Paper corner depresses ~1.5mm and dimples.
3. **Servo settle #1 (0.8–0.9s):** 2–3 frame damped counter-motion as the grip locks.
4. **Lift (0.9–1.4s):** paper leads slightly; wrist counter-rotates; far edge droops with follow-through.
5. **Reposition (1.4–1.8s):** slow confident arc to the dock position.
6. **Place (1.8–2.0s):** touchdown, **second contact pause 3–4 frames**, object settles ~1mm into the desk plane — and its contact shadow snaps rich.
7. **Release + settle #2 (2.0–2.2s):** fingers open with slight delay; the OBJECT does a 2-frame damped tilt-correction into perfect alignment. Hand retracts slow-out.

### Action B — tap badge: red 17 → amber 0 (~0.6s, punctuation beat)
Index cocks back (0.1s) → quick decelerate to contact, hard stop, 2-frame pause → badge scale-punches 1.0→1.15→1.0, crossfades red→amber AND the count rolls to 0 **on the exact contact frame** (missed sync = instantly fake) with a soft 300ms glow pulse → fingertip lifts with tiny servo settle.

### Action C — slide-align a card (~0.8s)
Edge-of-finger contact, smooth push with card leading, then the card **overshoots by 1px and corrects** into the grid line.

Author all easing as Blender F-curves. The web side only scrubs — never re-derive easing in code.

---

## 7. The grounding transition (replaces v1 "lights down") — scroll ~60–78%

Never a background-color change. It is the room gaining gravity:
1. Key light finishes ramping to full directionality (3:1); ambient flatness drains out.
2. Contact shadows deepen and tighten in a **stagger, one object per ~150ms**, in the order the hand handled them — the eye reads a wave of things being *set down*.
3. The desk plane's horizon + rail detail fade in beneath the docking grid.
4. **Amber emissives hold constant** — as flat brightness gives way to modeled depth, the amber handled-states read as the system quietly on.
5. Support: hair of vignette, slight grain increase, DOF deepen, camera settling to stillness.
6. Pace: 1.5–2.5s of scroll range. Rushing this = "the div changed color."

**Banding guard:** light gradients band too — keep the full-viewport grain layer at low opacity across every beat.

---

## 8. Implementation architecture

### Page structure
Existing pinned **400vh** sticky stage in `HandStage.tsx`, driven by normalized scroll progress 0–1 (framer-motion `useScroll` + `useTransform`, rAF-driven). **v2 change:** Beat 4 now unpins into the page on **warm paper**, not black.

### ⚠ Downstream seam — required companion change
The section that follows the stage (Live Demo, currently black) **must be restyled to warm paper** or the light finale dies at the fold. This is in-scope for the v2 build: same paper ground, ink text, amber accents. If any later section stays dark, insert it further down with a deliberate transition — never immediately after the finale.

### Path A — fully baked compositing (RECOMMENDED, zero WebGL)
Everything renders from ONE Blender scene so materials/light match perfectly:
- **Environment:** layered stills per depth layer (bg / mid / fg) with alpha, parallax-translated on scroll.
- **Migrating objects:** individual alpha sprites (WebP) transform-animated (GPU-composited) between baked keyframe positions — scattered → docked.
- **Hand + touched objects:** alpha sequence — VP9 WebM alpha + HEVC-alpha for Safari, scrubbed frame-accurately (`requestVideoFrameCallback`); if scrubbing stutters, pre-decoded WebP frames to `<canvas>` for the critical pinch range. Preload the critical range before it's reachable.
- **Workflow lines:** SVG paths, `stroke-dashoffset` draw-on, amber with soft CSS glow.
- **Contact shadows:** separate blurred-ellipse layers that deepen/tighten with "handled" state — in v2 these carry the whole third act; give them real art direction.
- **Badges:** live DOM/SVG (crisp text at any DPR), position-synced to their object sprites.
- **Grain:** one full-viewport tiling noise layer at low opacity.
- Free bonus: every fallback (reduced-motion, low-GPU, mobile) is a real render and looks premium.

### Path B — live R3F environment + baked hand (optional, only if live-light interactivity is truly wanted)
5 low-poly meshes + drei `ContactShadows` + `Environment`, <50 draw calls. Risk: live materials must not mismatch the baked hand render. three@0.169 + R3F 8 already in `package.json`.

### Asset acquisition (honest ranking)
1. **Commission the Blender work** (rigged ceramic hand + 3-action choreography + all renders, you keep the .blend): low four figures — cheap against the $7.5k tier it sells.
2. **DIY Blender with a purchased rigged hand model**, re-materialed to ceramic+metal: weeks of learning curve.
3. **Phase-1 stopgap (current state):** ONE static hero hand mid-pinch, art-directed to the material spec.
Never: procedural R3F primitive hand, or a live IK rig.

### Performance budget
- All animation transform/opacity only; `will-change: transform` on per-frame layers only.
- Hand sequence: a few seconds at hero res, low-single-digit MB; lazy-load below-the-fold beats.
- Test on a mid-tier laptop AND a real phone. Scroll jank = instant "cheap" verdict.

### Fallbacks
- **`prefers-reduced-motion`:** freeze to curated per-beat stills, opacity-only reveals.
- **Low-GPU / decode failure:** static Beat-4 handled-desk image.

### Mobile (portrait is a different film)
- **Show the destination, not the journey:** the Beat-4 handled desk (docked objects, deep contact shadows, amber states, warm paper) as a near-static hero visual. Text top third, visual bottom two-thirds. Update the existing `HandledPanel` in `HandStage.tsx` from black to this.
- Cast cut to 3: phone (17→0), inbox (1,000→0), review card. No mute props.
- ONE subtle motion only: a badge count settling to 0, or gentle device-tilt parallax.
- Hand: single hero still mid-pinch, or omit. No scrubbed video, no bloom/DOF post.

---

## 9. Build plan (v2)

1. **Restyle pass on the existing stage** (`components/home/stage/`): kill the black Beat 4 + lights-down code path; implement the light grounding transition (§7), desk-dock finale (§3 Beat 4), badge system (1,000/17/9 → 0), inbox card in, calendar demoted. Restyle the Live Demo seam to warm paper.
2. **Verify** on desktop + real phone: scroll-scrub smoothness, badge sync, reduced-motion stills, text readable at scroll-0.
3. **Phase 2 (unchanged):** commission the baked hand sequence, drop into the existing scrub slot.

---

## 10. Failure guardrails (the 8 ways this goes cheap)

1. **Uncanny live-rigged hand** → bake it; render hand + touched objects together.
2. **Object clutter / motion soup** → 5 heroes, one focal action at a time, slow drift only — no bobbing ever.
3. **Neon amber / cranked bloom** → emissive-driven, whisper-bloom, amber <10% of frame.
4. **Flat cards betraying the 3D** → real thickness + bevels + contact shadows + parallax; zero emoji.
5. **Invaded text zone / unreadable value prop** → left 40% clean in every beat; headline + CTA legible at scroll-position 0. This is a closer site — the film is never a gate.
6. **Scroll-scrub stutter** → frame-accurate decode, preload critical range, rAF-throttled progress, test mid-tier hardware.
7. **Third-party logos or app icons** → neutral glyphs + badge counts only. The number is the punch.
8. **Symbolic metaphor creep** (vessels, pouring, abstract liquid) → every object literal and nameable in 1 second; promise stated in DOM copy. The Quiet Hours rule.

**The one-line quality bar:** a viewer should feel "expensive product film" before reading a single word, know exactly where to look — and never once see the lights go down.
