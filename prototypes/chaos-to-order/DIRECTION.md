# Art-Direction Contract — "Cold Desk, Handled"

Direction name:     Cold Desk, Handled
One-sentence world: A stop-motion tabletop commercial graded like an A24 title
                    sequence — cold ink-on-fog editorial until the AI hand
                    arrives, then color returns only inside the photographs.

User emotional state on landing: overwhelmed, behind, guilty about the backlog.
The page must say "we see your mess, and we are calmly in control."

Definitely NOT: an orange/amber-themed page (founder veto, 2026-07-02).
Definitely NOT: cold-blue AI SaaS, gradient hero, three-equal-cards.
Warmth may exist ONLY inside the prop photographs. All UI chrome is neutral.

Type pairing:
  Display: Fraunces 500–640, tracking -0.03em, line-height 0.95–1.05
  Body:    Archivo 400/500
  Labels:  IBM Plex Mono 500, uppercase, tracking 0.08em

Color tokens (neutral ink theme — no orange in chrome):
  --bg-cold:    #F1F0ED   cold paper (open)
  --bg-ink:     #131311   near-black ink (close)
  --ink:        #1A1917   primary text on light
  --paper:      #F2F0EA   text on dark
  --muted:      #71706A
  --pain:       #E5484D   red — pain badges only
  --ok:         #8A897F   neutral check chips (NOT green, NOT amber)

Depth strategy: 3.5% SVG grain overlay; feather-masked photo sprites blended
into fog on light stage; sorted props sit on bordered ink plates in the dark
act (photos glow, chrome stays neutral); one light source, top-left,
matching the baked light in every generated image.

Motion tone: slow cinematic scroll-scrub (single rAF, transform/opacity only);
600ms ease for non-scrub reveals; full static fallback for
prefers-reduced-motion.

Color story (the spine): open cold + desaturated → props regain their own
color one by one as the hand sorts them → stage sinks to ink; the only warmth
on the final screen lives inside the photographs. Pain = red, handled = the
photo's own color returning. Amber is never page chrome.

Signature moment 1: scattered desaturated props fly to a tidy shelf mid-scroll,
each snapping into a slot and regaining color; the crumpled invoice is swapped
for the clean one inside the hand's grip zone.
Signature moment 2: the ceramic hand enters from the right edge and rides the
scroll; at the CTA, a small hand slides in and taps the button on hover.

Copy rules: concrete pains only ("3 missed calls", "43 days overdue") —
no "empower/streamline/transform". Voice: dry, calm, certain.
