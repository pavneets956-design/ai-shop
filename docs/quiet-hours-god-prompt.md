# The Quiet Hours — god prompt + build brief

The cinematic 3D showpiece for Handbuilt. Standalone flex route at `/quiet-hours`
(not the homepage). Concept, full god prompt, and the act script live here so the
build can be regenerated or extended without re-deriving it.

> Strategy: this is a **flex/showpiece** that proves "Handbuilt builds sites nobody
> else around here can" and justifies the $7.5k custom tier. It is NOT the
> converting homepage. Harvest its parts (glass hero, "pour your work in" router,
> night→dawn scroll) into premium client builds later — never resell the whole template.

---

## Central metaphor

Handbuilt sells back the **hours** owners lose to invisible after-hours admin —
the work they want "off their plate." The page is one unbroken scroll from
**NIGHT → DAWN**. The background is a continuous time-of-day gradient (midnight ink
→ pre-dawn slate → amber → dawn cream). **Amber is earned light — a literal
sunrise you scroll toward — never decoration.** AI workers are **vessels that catch
the overflow of work** — never robots, brains, neural nets, dashboards, or
glowing-particle sci-fi.

## Hero object — "The Vessel"

A hand-blown asymmetric glass form floating in a single key light. Refractive
transmission glass (IOR ~1.4, rim dispersion, subsurface warmth). Inside it: a
contained body of dark, turbulent liquid = unhandled work. The cursor disturbs the
**inner liquid**, not the object. As you scroll, the liquid **settles and warms**
from black churn → still amber light, completing its arc by the CTA. The single key
light travels cold → warm across the scroll = the sun rising.

## Scene script — 7 scroll-scrubbed acts

1. **11:47 PM** — midnight ink; Vessel churning black; huge type "The work doesn't
   stop when you do." Mono timestamp advances toward sunrise across the page.
2. **The Overflow** — Vessel overflows; dark labeled droplets ("missed call,"
   "unsent quote," "follow-up," "invoice," "after-hours DM") pool at the bottom.
   "Small business runs on invisible work."
3. **The Catch** (signature interaction) — worker-vessels rise and intercept each
   stream; liquid flows through, exits as a clean warm droplet. Camera tracks across
   Receptionist / Quote / Follow-up / Invoice / Custom.
4. **Handbuilt** — hard cut to a clean studio void; a worker-vessel is formed
   wireframe → glass → filled. "Not generated. Handbuilt."
5. **By 6 AM** — Vessel returns, liquid warmed amber and still; background tips
   night → dawn; timestamp ticks to "6:02 AM." "You slept. It worked. The morning's
   already handled."
6. **What you can hand over** — warm daybreak; filled vessels as products; honest
   pricing (Starter $1k / Business $2.5–5k / Custom $7.5k + Care $250/mo).
7. **Start a build** — full amber dawn; Vessel holds glowing morning light; "Tell me
   what's landing on you after hours." + primary CTA.

## Signature interaction — "Pour your work in"

An input shaped like the Vessel's mouth. Visitor types a real pain ("I keep missing
calls on jobs"); the text dissolves per-glyph into GPU ink particles, falls, is
caught by the matching worker-vessel, which emits one calm amber droplet that
resolves into a one-line answer routing to the right product. Deterministic
keyword → product (zero API cost), optional LLM phrasing pass. The wow moment and
the lead funnel are the same action.

---

## THE GOD PROMPT (paste-ready)

```
Build a cinematic, scroll-driven 3D marketing site for "Handbuilt" (aibuiltbyhand.com),
a studio that builds custom AI workers for small businesses (receptionist, quote, lead
follow-up, invoice-reminder agents; plus custom apps). Concept: "THE QUIET HOURS."

CENTRAL METAPHOR — honor exactly: Handbuilt sells back the HOURS owners lose to invisible
after-hours admin — the work they want "off their plate." The whole page is ONE unbroken
vertical journey from NIGHT (top) to DAWN (bottom). The background is a continuous liquid
time-of-day gradient: midnight ink #0A0E14 → pre-dawn slate #3A4452 → amber #F4A24C →
dawn cream #FFF1DF. Amber is EARNED light — a literal sunrise you scroll toward — never
decoration. AI workers are "vessels that catch the overflow of work," NOT robots, brains,
neural nets, dashboards, grid-floors, or glowing-particle sci-fi. Avoid ALL command-center /
holographic / dark-with-glowing-particles AI cliché.

STACK: Next.js (App Router) + React Three Fiber / Three.js + @react-three/drei +
postprocessing (EffectComposer) + custom GLSL shaders + Framer Motion (useScroll) for the
scroll-scrubbed timeline + DOM/type. Deploy on Vercel. Keep the scene self-contained
(no runtime HDRI/CDN fetch) — light glass with in-scene Lightformers.

HERO OBJECT — "The Vessel": a single hand-blown, asymmetric glass form (LatheGeometry
silhouette) floating in a volumetric shaft of one key light. Refractive transmission glass
(MeshTransmissionMaterial, IOR ~1.4, thin-film dispersion on the rim, subsurface warmth).
Inside it: a contained body of dark turbulent liquid (noise-distorted). Cursor disturbs the
INNER liquid, not the object. As the user scrolls, the inner liquid SETTLES and WARMS from
black churn → still amber light by the CTA. The single key light travels cold→warm = sunrise.

SCROLL SCRIPT — 7 scroll-scrubbed acts (tie all motion to scroll position, never autoplay):
1. "11:47 PM" — midnight ink; churning black; "The work doesn't stop when you do." Mono
   timestamp advances toward sunrise across the page.
2. "The Overflow" — Vessel overflows; dark labeled droplets ("missed call," "unsent quote,"
   "follow-up," "invoice," "after-hours DM") pool at the bottom. "Small business runs on
   invisible work."
3. "The Catch" — worker-vessels rise and intercept each stream; liquid exits as a warm droplet.
   Track across Receptionist / Quote / Follow-up / Invoice / Custom, one line of copy each.
4. "Handbuilt" — HARD CUT to a studio void; a worker-vessel forms wireframe→glass→filled.
   "Not generated. Handbuilt."
5. "By 6 AM" — Vessel returns, liquid warmed amber and still; background tips night→dawn;
   timestamp ticks to "6:02 AM." "You slept. It worked. The morning's already handled."
6. "What you can hand over" — warm daybreak; filled vessels as products; honest pricing
   (Starter $1k / Business $2.5–5k / Custom $7.5k + Care $250/mo).
7. "Start a build" — full amber dawn; Vessel holds glowing morning light; "Tell me what's
   landing on you after hours." + a single primary CTA to a start-a-build flow.

SIGNATURE INTERACTION — "Pour your work in" (Act 3): an input shaped like the Vessel's mouth.
Visitor types a real pain; on submit the TEXT dissolves per-glyph into GPU ink particles, falls,
is CAUGHT by the matching worker-vessel, which emits one calm amber droplet that resolves into a
one-line answer routing to the right product. Deterministic keyword→product (zero API cost) with
an optional LLM phrasing pass. This is BOTH the share moment AND the lead funnel.

ART DIRECTION: Display = brutalist EXPANDED grotesque (Archivo, heavy), 7–13vw, tight tracking,
hard left grid. Labels/timestamps = IBM Plex Mono (the honesty signal — matches the current site).
Materials: hand-blown glass, subsurface scattering, transmission, god-rays, deep AO — warm and
crafted, NEVER chrome/holographic. Motion: slow, weighted, liquid easing; the page has gravity;
hard editorial cut only at Act 4. Optional sound (OFF by default): night drone, soft water-drop
per caught droplet, warm swell at the dawn threshold.

PERFORMANCE & ACCESSIBILITY (required): 60fps desktop / 30fps mobile; lazy-init WebGL, pause render
loop when offscreen, cap DPR at 2, instance worker-vessels, single shared particle system.
prefers-reduced-motion: static night→dawn gradient + the 7 acts as fading typographic sections +
a poster per Vessel state; "Pour your work in" still works as a plain form. MOBILE: pre-baked
flowmap instead of live sim, fewer particles, matcap fallback for transmission, keep gradient +
copy; render DOM copy first, hydrate 3D after; never block content on WebGL. No-WebGL/context-loss
fallback. WCAG AA contrast at every scroll position.

CONVERSION GOAL: this is a SALES site, not a tech demo. Every act moves toward "start a build."
The emotional arc (night-churn → dawn-calm) IS the argument. Keep Handbuilt's brand: honest,
anti-hype, "real systems not slide decks" — spectacle proves craft, copy stays plain and true.
```

---

## Build status (this repo)

- **Act 1 LIVE** at `/quiet-hours`: glass Vessel (`components/quiet-hours/VesselScene.tsx`)
  with churning dark inner liquid, in-scene Lightformer reflections (no HDRI fetch),
  Bloom + Vignette + film-grain postprocessing; editorial DOM overlay
  (`QuietHoursClient.tsx`) with brutalist headline, mono "11:47 PM" timestamp,
  "Pour your work in" CTA, reduced-motion gradient fallback, body-scroll lock to
  escape the global nav/footer.
- **Next:** Acts 2–7 (Framer Motion `useScroll` timeline, liquid settle→warm,
  night→dawn gradient, worker-vessels), the real "Pour your work in" particle router,
  mobile transmission fallback, optional sound.
