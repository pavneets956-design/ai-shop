import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getIcon } from "@/lib/icons";
import { creators } from "@/lib/data/creators";

/**
 * Creator Studio — the dark "Cutting Room" hub for /creators.
 *
 * Self-contained page (like MoltenForge). ChromeGate hides the global light
 * nav/footer on the EXACT "/creators" route; the 20 leaf pages keep the light
 * red/white template. Art-direction contract:
 *   ~/.claude/design-os/ledger/ai-shop-creators/contract.md
 *
 * The whole page is an editing timeline: 20 services = clips on 4 named editor
 * tracks (V1/V2/A1/A2) under a mono timecode ruler with a live red playhead.
 */

const CREATE_HREF = "/create?goal=creator-system";

type Clip = { slug: string; label: string; note: string; tc: string; icon?: string };
type Track = { code: string; name: string; clips: Clip[] };

// slug → LandingContent (for icon fallback + link integrity at build time).
const bySlug = Object.fromEntries(creators.map((c) => [c.slug, c]));

const TRACKS: Track[] = [
  {
    code: "V1",
    name: "Shoot + Edit",
    clips: [
      { slug: "ai-video-editing-automation", label: "Video Editing", note: "silence, cuts, captions", tc: "0:42", icon: "Film" },
      { slug: "ai-youtube-video-workflow", label: "YouTube Workflow", note: "idea → upload", tc: "1:18", icon: "Youtube" },
      { slug: "ai-avatar-video-creation", label: "Avatar Video", note: "your likeness, consent-first", tc: "0:56", icon: "Clapperboard" },
      { slug: "ai-faceless-channel-automation", label: "Faceless Channel", note: "script → voice → edit", tc: "2:04", icon: "Film" },
      { slug: "ai-caption-subtitle-automation", label: "Captions + Subs", note: "on-brand, burned-in", tc: "0:31", icon: "Captions" },
    ],
  },
  {
    code: "V2",
    name: "Clip + Post",
    clips: [
      { slug: "ai-tiktok-content-system", label: "TikTok System", note: "hooks → daily posts", tc: "0:59", icon: "Video" },
      { slug: "ai-youtube-shorts-automation", label: "YouTube Shorts", note: "long video → 10 shorts", tc: "0:48", icon: "Youtube" },
      { slug: "ai-podcast-clipping-system", label: "Podcast Clips", note: "episode → a week of clips", tc: "1:32", icon: "Scissors" },
      { slug: "ai-content-repurposing-system", label: "Repurposing", note: "one in, everywhere out", tc: "1:07", icon: "Repeat" },
      { slug: "ai-social-media-scheduling-automation", label: "Scheduling", note: "one approval, all platforms", tc: "0:38", icon: "Calendar" },
    ],
  },
  {
    code: "A1",
    name: "Voice + Script",
    clips: [
      { slug: "ai-script-writing-system", label: "Script Writing", note: "your hooks, your voice", tc: "0:52", icon: "PenTool" },
      { slug: "ai-text-to-speech-for-creators", label: "Text-to-Speech", note: "licensed, natural narration", tc: "0:44", icon: "Radio" },
      { slug: "ai-voice-cloning-workflow", label: "Voice Cloning", note: "your voice only, revocable", tc: "1:10", icon: "Mic" },
      { slug: "ai-newsletter-automation", label: "Newsletter", note: "content → email you own", tc: "0:36", icon: "Newspaper" },
    ],
  },
  {
    code: "A2",
    name: "Audience + Revenue",
    clips: [
      { slug: "ai-fan-message-automation", label: "Fan DMs", note: "triage, never faked", tc: "0:47", icon: "MessagesSquare" },
      { slug: "ai-creator-crm", label: "Creator CRM", note: "brand deals don't die in DMs", tc: "1:24", icon: "Users" },
      { slug: "ai-patreon-creator-automation", label: "Membership", note: "welcomes, perks, win-backs", tc: "0:55", icon: "Star" },
      { slug: "ai-course-creator-automation", label: "Courses", note: "onboarding + completion", tc: "1:16", icon: "GraduationCap" },
      { slug: "ai-coaching-content-system", label: "Coaching", note: "content that books calls", tc: "0:50", icon: "Megaphone" },
    ],
  },
];

// Mono ruler ticks across the top of the timeline.
const RULER = ["00:00", "00:45", "01:30", "02:15", "03:00", "03:45", "04:30"];

// Creator software pricing — one-time "own it" (Fable, market-anchored 2026).
// No monthly SaaS: creators buy the tool once, it's theirs, AI runs on their keys.
const PRICES = [
  { name: "Script / hook generator", note: "trained on your niche + voice", price: "$500" },
  { name: "Caption + subtitle generator", note: "on-brand, burned-in", price: "$500" },
  { name: "Thumbnail generator", note: "your brand kit, consistent style", price: "$700" },
  { name: "TTS voiceover tool", note: "your voice or licensed", price: "$700" },
  { name: "Clip finder / repurposer", note: "long video → ready clips", price: "$900" },
  { name: "Custom creator tool", note: "built to your workflow", price: "from $900" },
];

function TrackClip({ clip, delay }: { clip: Clip; delay: number }) {
  const content = bySlug[clip.slug];
  const Icon = getIcon(clip.icon ?? content?.icon ?? "Sparkles");
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/creators/${clip.slug}`}
        className="cr-clip group flex h-full flex-col justify-between rounded-lg py-3.5 pl-5 pr-3.5"
      >
        <div className="flex items-start justify-between gap-2">
          <Icon className="h-5 w-5 text-[color:var(--cr-red)]" strokeWidth={1.75} aria-hidden />
          <span className="font-mono text-[10px] tracking-[0.14em] text-[color:var(--cr-muted)]">
            {clip.tc}
          </span>
        </div>
        <div className="mt-4">
          <div className="font-display text-[15px] font-bold leading-tight text-[color:var(--cr-text)]">
            {clip.label}
          </div>
          <div className="mt-1 text-[12.5px] leading-snug text-[color:var(--cr-muted)]">
            {clip.note}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--cr-muted)] transition-colors group-hover:text-[color:var(--cr-red)]">
          Open
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </Reveal>
  );
}

export default function CreatorStudio() {
  return (
    <div className="creator-studio relative min-h-screen overflow-x-hidden font-sans">
      <div className="cr-atmos" aria-hidden />
      <div className="cr-grain" aria-hidden />

      {/* ---------- Nav ---------- */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--cr-border)] bg-[color:var(--cr-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="cr-rec inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--cr-red)]" aria-hidden />
            <span className="font-display text-[17px] font-bold tracking-tight text-[color:var(--cr-text)]">
              Handbuilt AI
            </span>
          </Link>
          <nav className="flex items-center gap-1.5 sm:gap-4">
            <a
              href="#timeline"
              className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--cr-muted)] transition-colors hover:text-[color:var(--cr-text)] sm:inline"
            >
              The Timeline
            </a>
            <Link
              href="/pricing"
              className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--cr-muted)] transition-colors hover:text-[color:var(--cr-text)] sm:inline"
            >
              Pricing
            </Link>
            <Link
              href={CREATE_HREF}
              className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-bold text-white transition hover:brightness-110"
              style={{ backgroundImage: "linear-gradient(180deg,#ff6961,#e0362c)" }}
            >
              Start a build
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative z-10 mx-auto max-w-[1180px] px-5 pb-6 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--cr-muted)]">
            For Creators · Worldwide · Remote
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-[16ch] font-display text-[40px] font-bold leading-[0.98] tracking-[-0.02em] text-[color:var(--cr-text)] sm:text-[58px]">
            You make the content.
            <br />
            <span className="text-[color:var(--cr-red)]">The machine</span> handles the rest.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-[color:var(--cr-muted)] sm:text-[19px]">
            Clipping, editing, captions, voiceovers, scheduling, DMs, brand-deal admin —
            one system built around your channels and your voice, installed by hand. You
            post more; you don&apos;t burn out.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href={CREATE_HREF}
              className="inline-flex h-[54px] items-center rounded-full px-7 text-[15px] font-bold text-white shadow-[0_16px_40px_-12px_rgba(255,69,58,0.55)] transition hover:-translate-y-0.5 hover:brightness-110"
              style={{ backgroundImage: "linear-gradient(180deg,#ff6961,#e0362c)" }}
            >
              Build my creator system
            </Link>
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--cr-text)] transition-colors hover:text-[color:var(--cr-red)]"
            >
              Scrub the 20 builds
              <span aria-hidden>↓</span>
            </a>
          </div>
        </Reveal>

        {/* REC status HUD */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[color:var(--cr-border)] pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--cr-muted)]">
            <span className="flex items-center gap-2 text-[color:var(--cr-red)]">
              <span className="cr-rec inline-block h-2 w-2 rounded-full bg-[color:var(--cr-red)]" aria-hidden />
              REC
            </span>
            <span aria-hidden>00:14:22:09</span>
            <span className="text-[color:var(--cr-border-strong)]" aria-hidden>·</span>
            <span>20 Builds</span>
            <span className="text-[color:var(--cr-border-strong)]" aria-hidden>·</span>
            <span>4 Tracks</span>
            <span className="text-[color:var(--cr-border-strong)]" aria-hidden>·</span>
            <span>Delivered Worldwide</span>
          </div>
        </Reveal>
      </section>

      {/* ---------- The Timeline (signature) ---------- */}
      <section id="timeline" className="relative z-10 mx-auto max-w-[1180px] scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--cr-red)]">
            The Timeline
          </div>
          <h2 className="mt-3 max-w-[24ch] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.02em] text-[color:var(--cr-text)] sm:text-[40px]">
            Twenty builds, four tracks. Find where your hours are leaking.
          </h2>
        </Reveal>

        {/* Timeline frame: ruler + playhead + tracks */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-[color:var(--cr-border)] bg-[color:var(--cr-surface)]/60">
          {/* Playhead — the one moving element, sweeps across all tracks */}
          <div className="cr-playhead pointer-events-none absolute top-0 bottom-0 z-20 w-px bg-[color:var(--cr-red)]/70" aria-hidden>
            <div className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-[color:var(--cr-red)] shadow-[0_0_10px_2px_rgba(255,69,58,0.7)]" />
          </div>

          {/* Ruler */}
          <div className="flex items-center justify-between border-b border-[color:var(--cr-border)] px-4 py-2.5 sm:px-6">
            {RULER.map((t) => (
              <span key={t} className="font-mono text-[10px] tracking-[0.12em] text-[color:var(--cr-muted)]">
                {t}
              </span>
            ))}
          </div>

          {/* Tracks */}
          <div className="divide-y divide-[color:var(--cr-border)]">
            {TRACKS.map((track) => (
              <div key={track.code} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 md:grid-cols-[130px_1fr] md:gap-6">
                {/* Track gutter */}
                <div className="flex items-center gap-3 md:flex-col md:items-start md:justify-center md:gap-1">
                  <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-[color:var(--cr-red)]">
                    {track.code}
                  </span>
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-[color:var(--cr-muted)]">
                    {track.name}
                  </span>
                </div>
                {/* Clips lane */}
                <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(148px,1fr))]">
                  {track.clips.map((clip, i) => (
                    <TrackClip key={clip.slug} clip={clip} delay={i * 0.04} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master clip — the full system */}
        <Reveal delay={0.1}>
          <Link
            href="/creators/ai-tools-for-content-creators"
            className="cr-clip group mt-4 flex items-center justify-between gap-4 rounded-2xl py-5 pl-6 pr-5"
          >
            <div className="flex items-center gap-4">
              {(() => {
                const Icon = getIcon("Wand2");
                return <Icon className="h-6 w-6 shrink-0 text-[color:var(--cr-red)]" strokeWidth={1.75} aria-hidden />;
              })()}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--cr-muted)]">
                  Master · the full pipeline
                </div>
                <div className="mt-1 font-display text-[19px] font-bold leading-tight text-[color:var(--cr-text)]">
                  One connected creator system
                </div>
              </div>
            </div>
            <span className="hidden shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--cr-text)] transition-colors group-hover:text-[color:var(--cr-red)] sm:flex">
              Open
              <span aria-hidden>→</span>
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ---------- Honest band ---------- */}
      <section className="relative z-10 border-y border-[color:var(--cr-border)] bg-[color:var(--cr-surface)]/40">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--cr-muted)]">
              Why handbuilt
            </div>
            <p className="mt-4 max-w-[30ch] font-display text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[color:var(--cr-text)] sm:text-[32px]">
              The apps are cheap. Wiring ten of them into one system that sounds like
              <span className="text-[color:var(--cr-red)]"> you </span>
              is the actual work.
            </p>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              ["Built around your channels — not the reverse", "Everything is shaped to your niche, your voice and the formats that already work for you. No generic app you bend your workflow around."],
              ["You own the setup. No per-clip tax.", "One build, yours to keep — no per-seat pricing, no per-export fees, no lock-in that punishes you for growing."],
              ["Consent-first on voice, likeness & DMs", "Your voice only. A review step before anything ships. Revocable any time. We never build impersonation or fake personal replies."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="border-l-2 border-[color:var(--cr-red)]/50 pl-5">
                  <div className="font-display text-[17px] font-bold text-[color:var(--cr-text)]">{title}</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[color:var(--cr-muted)]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Own the tools (creator software pricing) ---------- */}
      <section className="relative z-10 mx-auto max-w-[1180px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--cr-red)]">
              Own the tools · one-time
            </div>
            <h2 className="mt-3 max-w-[18ch] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.02em] text-[color:var(--cr-text)] sm:text-[40px]">
              The tools you rent for ~$165/mo — built once, yours forever.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-[color:var(--cr-muted)]">
              Opus Clip, Submagic, ElevenLabs, a thumbnail app, a script tool — that stack runs
              roughly $2,000 a year, forever, with credit caps. I build the ones you actually need
              around your channel and voice. One-time price. No subscription. No credit caps.
            </p>
            <Link
              href={CREATE_HREF}
              className="mt-7 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--cr-text)] transition-colors hover:text-[color:var(--cr-red)]"
            >
              Price my tool <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-[color:var(--cr-border)] bg-[color:var(--cr-surface)]/60">
              {PRICES.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex items-baseline justify-between gap-4 px-5 py-4 ${i > 0 ? "border-t border-[color:var(--cr-border)]" : ""}`}
                >
                  <div>
                    <div className="font-display text-[15px] font-bold text-[color:var(--cr-text)]">{p.name}</div>
                    <div className="text-[12.5px] text-[color:var(--cr-muted)]">{p.note}</div>
                  </div>
                  <div className="whitespace-nowrap font-mono text-[15px] font-medium text-[color:var(--cr-red)]">{p.price}</div>
                </div>
              ))}
              <div className="border-t border-[color:var(--cr-border)] px-5 py-4 text-[12.5px] leading-snug text-[color:var(--cr-muted)]">
                <span className="font-semibold text-[color:var(--cr-text)]">Bundle any three</span> into one
                wired system — that&apos;s the $1,500 Starter build. Prices in CAD, one-time; AI usage runs on your own keys.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA closer ---------- */}
      <section className="relative z-10 mx-auto max-w-[1180px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[34px] font-bold leading-[1.02] tracking-[-0.02em] text-[color:var(--cr-text)] sm:text-[48px]">
            Tell me what eats your week.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-[color:var(--cr-muted)] sm:text-[18px]">
            A $99 audit maps where your hours actually go and what to automate first —
            no obligation to build. Remote, worldwide, in your voice.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href={CREATE_HREF}
              className="inline-flex h-[54px] items-center rounded-full px-8 text-[15px] font-bold text-white shadow-[0_16px_40px_-12px_rgba(255,69,58,0.55)] transition hover:-translate-y-0.5 hover:brightness-110"
              style={{ backgroundImage: "linear-gradient(180deg,#ff6961,#e0362c)" }}
            >
              Start with an audit
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--cr-text)] transition-colors hover:text-[color:var(--cr-red)]"
            >
              See pricing
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- Footer (slim, dark) ---------- */}
      <footer className="relative z-10 border-t border-[color:var(--cr-border)]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--cr-red)]" aria-hidden />
              <span className="font-display text-[15px] font-bold text-[color:var(--cr-text)]">Handbuilt AI</span>
            </div>
            <p className="mt-2 text-[13px] text-[color:var(--cr-muted)]">
              Custom AI, built by hand. Surrey, BC · delivered worldwide.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--cr-muted)]">
            <Link href="/" className="transition-colors hover:text-[color:var(--cr-text)]">Main site</Link>
            <Link href="/pricing" className="transition-colors hover:text-[color:var(--cr-text)]">Pricing</Link>
            <Link href="/services" className="transition-colors hover:text-[color:var(--cr-text)]">All services</Link>
            <Link href="/industries" className="transition-colors hover:text-[color:var(--cr-text)]">For business</Link>
          </nav>
        </div>
        <div className="mx-auto max-w-[1180px] px-5 pb-8 font-mono text-[10px] tracking-[0.12em] text-[color:var(--cr-muted)] sm:px-6 lg:px-8">
          © 2026 Handbuilt AI — all builds delivered remotely.
        </div>
      </footer>
    </div>
  );
}
