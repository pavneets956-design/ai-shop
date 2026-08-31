import type { LandingContent } from "./landing";
import { creatorsB } from "./_creators_b";

// Creator-economy landing pages (the /creators page type). Global/remote
// framing — no local geo modifiers, since creator work is delivered remotely.
// Voice, avatar and fan-messaging pages are written strictly for legal,
// consensual, non-deceptive use, with consent / likeness / platform-rules
// language baked in. batch A (1–10) here; batch B in _creators_b.ts.
const creatorsA: LandingContent[] = [

  {
    slug: "ai-video-editing-automation",
    // Noindexed 2026-08-30: 0 impressions in the 2026-06-14→08-10 GSC window.
    // URL and content preserved; delete this flag to re-index (disposition §1.6, G2).
    noindex: true,
    eyebrow: "For Creators",
    h1: "AI Video Editing Automation",
    title: "AI Video Editing Automation for Creators | Handbuilt",
    description:
      "Automate the tedious parts of editing — cuts, silence removal, captions, b-roll and formatting — in a workflow built around your style. From $1,500.",
    answer:
      "AI video editing automation handles the repetitive parts of the edit — removing silences and filler, rough cuts, captions, reframing for vertical and applying your presets — so you finish videos in a fraction of the time. Handbuilt builds the pipeline around your editing style so the output looks like you, not a template.",
    pain: "Editing is where creators lose whole days. The creative part is minutes; the tedium — cutting silences, captioning, reframing, exporting — is hours.",
    scenario:
      "A creator spends 4 hours editing every long-form video. Most of it is mechanical: cutting dead air, adding captions, pulling b-roll, reframing clips for shorts. We build automation that does the mechanical 70% — silence and filler removal, first-pass cuts, captions, vertical reframes — and hands them a rough cut styled to their presets. Four hours of editing becomes one hour of polish.",
    steps: [
      "We study your editing style, presets and pacing",
      "We automate cuts, silence/filler removal, captions and reframing",
      "We match your look — fonts, transitions, b-roll rules",
      "You get a styled rough cut to polish instead of a raw file",
    ],
    gets: [
      "Automated silence/filler removal and rough cuts",
      "Auto-captions and vertical reframes for shorts",
      "Your presets and style applied automatically",
      "Hours of tedium removed from every video",
    ],
    packageId: "starter",
    ctaLabel: "Automate my editing",
    keywords: [
      "ai video editing automation",
      "automate video editing for youtube",
      "ai edit long form video",
      "silence removal automation",
    ],
    related: [
      { label: "AI Caption & Subtitle Automation", href: "/creators/ai-caption-subtitle-automation" },
      { label: "AI Podcast Clipping System", href: "/creators/ai-podcast-clipping-system" },
      { label: "AI Tools for Content Creators", href: "/creators" },
    ],
    faqs: [
      {
        q: "Does AI fully replace my editor?",
        a: "No — it removes the mechanical 70% so you (or your editor) spend time on the creative polish that actually differentiates your videos. You always get the final say.",
      },
      {
        q: "Can it match my existing style?",
        a: "Yes. We build it around your presets, fonts, pacing and b-roll rules so the output looks like your channel, not a generic auto-edit.",
      },
    ],
    schema: "Service",
    icon: "Film",
  },
  {
    slug: "ai-tiktok-content-system",
    eyebrow: "For Creators",
    h1: "AI TikTok Content System",
    title: "AI TikTok Content System for Creators | Handbuilt",
    description:
      "A system that keeps your TikTok fed — hooks, scripts, edits, captions and posting — built around your niche and voice. Post daily without burning out.",
    answer:
      "A TikTok content system is an end-to-end pipeline — hook ideas, scripts, edits, captions and scheduled posting — built around your niche so you can post consistently without living in the app. Handbuilt assembles it around your voice and your best-performing formats, so volume goes up and burnout goes down.",
    pain: "TikTok rewards volume and consistency more than any other platform — which is exactly why it burns creators out fastest. Falling off for a week can cost you the algorithm.",
    scenario:
      "A creator knows TikTok wants daily posts but can only sustain three a week before burning out. We build a system: a hook bank tuned to what performs in their niche, quick script drafts, automated captioning and reframing, and scheduled posting at peak times. Daily posting becomes sustainable because the grind around the creativity is handled.",
    steps: [
      "We analyse what performs in your niche and build a hook bank",
      "We set up fast scripting, editing and captioning for short-form",
      "We schedule posts at your audience's peak times",
      "We tune the system to your voice and what your audience responds to",
    ],
    gets: [
      "A niche-tuned hook bank so you never stare at a blank screen",
      "Fast scripting, captioning and reframing for daily shorts",
      "Scheduled posting at peak times",
      "Sustainable volume without the burnout",
    ],
    packageId: "business",
    ctaLabel: "Build my TikTok system",
    keywords: [
      "ai tiktok content system",
      "ai tiktok automation",
      "automate tiktok content creation",
      "tiktok content system for creators",
    ],
    related: [
      { label: "AI YouTube Shorts Automation", href: "/creators" },
      { label: "AI Script Writing System", href: "/creators/ai-script-writing-system" },
      { label: "AI Social Media Scheduling Automation", href: "/creators/ai-social-media-scheduling-automation" },
      { label: "AI Tools for Content Creators", href: "/creators" },
    ],
    faqs: [
      {
        q: "Will this make my content generic?",
        a: "The opposite is the goal — it's built on what already works for you and in your niche, so it amplifies your voice instead of flattening it. You approve everything before it posts.",
      },
      {
        q: "Does it post automatically?",
        a: "It can, at peak times — or leave you a queue to approve. Most creators start with approval and move to scheduled once they trust it.",
      },
      {
        q: "Will AI-assisted TikToks get flagged or throttled?",
        a: "Low-effort, obviously synthetic spam can be — that is what the unoriginal-content rules target. Original ideas produced with AI assistance, in your voice, are not treated differently from anything else you post. The line platforms draw is effort and originality, not which tools touched the file. If a system is producing videos you would not put your own name on, that is the signal to slow it down.",
      },
    ],
    schema: "Service",
    icon: "Video",
  },

  {
    slug: "ai-youtube-video-workflow",
    // Noindexed 2026-08-30: 0 impressions in the 2026-06-14→08-10 GSC window.
    // URL and content preserved; delete this flag to re-index (disposition §1.6, G2).
    noindex: true,
    eyebrow: "For Creators",
    h1: "AI YouTube Video Workflow",
    title: "AI YouTube Video Workflow — End to End | Handbuilt",
    description:
      "One connected workflow from idea to upload — research, scripts, editing, thumbnails, titles, chapters and Shorts. Built around your channel.",
    answer:
      "A YouTube video workflow connects every step from idea to upload — topic research, scripting, editing assists, thumbnail concepts, titles, chapters, descriptions and Shorts — into one system so nothing is done from scratch each time. Handbuilt builds it around your channel and voice so your output goes up without your quality going down.",
    pain: "Every YouTube video is a dozen separate jobs done from zero — research, script, edit, thumbnail, title, chapters, description, clips. Doing them all, every time, is what caps how often you can publish.",
    scenario:
      "A creator wants to go from one video a week to two but can't add the hours. We map their whole process and build a connected workflow: topic and title research, a script draft in their voice, editing automation, thumbnail concepts, auto-chapters and descriptions, plus Shorts from the final cut. Each step starts from an intelligent draft instead of a blank page, so a second weekly video becomes realistic.",
    steps: [
      "We map your end-to-end process from idea to published video",
      "We build assists for research, scripting, editing, thumbnails and metadata",
      "We auto-generate chapters, descriptions and Shorts from the final cut",
      "We connect it all so each step feeds the next",
    ],
    gets: [
      "A connected pipeline from idea to upload",
      "Drafts for scripts, titles, thumbnails and descriptions",
      "Auto chapters and Shorts from every finished video",
      "The capacity to publish more without losing quality",
    ],
    packageId: "business",
    ctaLabel: "Build my YouTube workflow",
    keywords: [
      "ai youtube workflow",
      "youtube automation for creators",
      "ai youtube video production system",
      "automate youtube content pipeline",
    ],
    related: [
      { label: "AI YouTube Shorts Automation", href: "/creators" },
      { label: "AI Script Writing System", href: "/creators/ai-script-writing-system" },
      { label: "AI Video Editing Automation", href: "/creators/ai-video-editing-automation" },
      { label: "AI Tools for Content Creators", href: "/creators" },
    ],
    faqs: [
      {
        q: "Can I start with just one part of the workflow?",
        a: "Yes. Most creators start with the biggest bottleneck — often editing or thumbnails/titles — and we connect more of the pipeline over time.",
      },
      {
        q: "Does this work for faceless channels too?",
        a: "It does — and we have a dedicated faceless-channel build if that's your model. The workflow adapts to whether you're on camera or not.",
      },
    ],
    schema: "Service",
    icon: "Youtube",
  },
  {
    slug: "ai-podcast-clipping-system",
    // Noindexed 2026-08-30: 0 impressions in the 2026-06-14→08-10 GSC window.
    // URL and content preserved; delete this flag to re-index (disposition §1.6, G2).
    noindex: true,
    eyebrow: "For Creators",
    h1: "AI Podcast Clipping System",
    title: "AI Podcast Clipping System for Creators | Handbuilt",
    description:
      "Turn every podcast episode into a week of clips — best moments found, captioned, reframed and ready to post across platforms. Built for you.",
    answer:
      "A podcast clipping system scans each episode for the most shareable moments, clips them, adds captions and speaker framing, and formats them for every platform — so one recording promotes itself all week. Handbuilt builds it around your show and your clip style.",
    pain: "The best marketing for a podcast is clips from the podcast — but sitting through a two-hour episode to find and cut the good moments is the work that never gets done.",
    scenario:
      "A two-host podcast records weekly but promotes episodes with a single graphic. We build a clipping system: it scans the episode for punchy, self-contained moments, cuts them, adds captions and speaker labels, reframes to vertical, and outputs a batch ready for TikTok, Shorts, Reels and X. One episode now produces a week of clips that actually drive new listeners.",
    steps: [
      "We connect your recording workflow and define your clip criteria",
      "We auto-detect strong, self-contained moments in each episode",
      "We caption, add speaker framing and reframe for each platform",
      "We deliver a batch of ready-to-post clips per episode",
    ],
    gets: [
      "Best moments auto-found in every episode",
      "Captions, speaker framing and per-platform reframing",
      "A batch of clips per episode across TikTok, Shorts, Reels and X",
      "Podcast promotion that finally happens every week",
    ],
    packageId: "starter",
    ctaLabel: "Automate my podcast clips",
    keywords: [
      "ai podcast clipping system",
      "automate podcast clips",
      "podcast to shorts automation",
      "ai clip generator for podcasts",
    ],
    related: [
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "AI YouTube Shorts Automation", href: "/creators" },
      { label: "AI Caption & Subtitle Automation", href: "/creators/ai-caption-subtitle-automation" },
    ],
    faqs: [
      {
        q: "Does it handle multiple speakers?",
        a: "Yes — it can label and frame speakers so clips stay clear even in a multi-host or interview format.",
      },
      {
        q: "Can I approve clips before they post?",
        a: "Always. You get a batch to review; posting can be manual, or scheduled once you're happy with the picks.",
      },
    ],
    schema: "Service",
    icon: "Mic",
  },
  {
    slug: "ai-text-to-speech-for-creators",
    // Noindexed 2026-08-30: 0 impressions in the 2026-06-14→08-10 GSC window.
    // URL and content preserved; delete this flag to re-index (disposition §1.6, G2).
    noindex: true,
    eyebrow: "For Creators",
    h1: "AI Text-to-Speech for Creators",
    title: "AI Text-to-Speech Workflow for Creators | Handbuilt",
    description:
      "A text-to-speech workflow for voiceovers, faceless videos and narration — consistent, natural narration built into how you produce content. Built for you.",
    answer:
      "An AI text-to-speech workflow turns scripts into natural, consistent voiceovers for faceless videos, narration and shorts — built into your production pipeline so a script becomes a finished voice track without re-recording. Handbuilt sets it up around your content, using properly licensed voices.",
    pain: "Recording voiceovers is slow and inconsistent, and re-recording one line means redoing the whole take — a real drag on faceless and narration-heavy channels.",
    scenario:
      "A faceless history channel needs a consistent narrator for every video. Recording by hand is slow and the tone drifts between sessions. We build a text-to-speech workflow: the script becomes a clean, consistent voice track using a licensed voice, with pacing and emphasis tuned to their style, and it drops straight into their edit. Voiceover stops being the bottleneck.",
    steps: [
      "We select a licensed voice that fits your channel and audience",
      "We tune pacing, emphasis and pronunciation for your niche",
      "We wire script-to-voice into your editing workflow",
      "You get consistent narration without re-recording",
    ],
    gets: [
      "Natural, consistent narration from your scripts",
      "A properly licensed voice — no rights headaches",
      "Pacing and pronunciation tuned to your content",
      "Voice tracks that drop straight into your edit",
    ],
    packageId: "starter",
    ctaLabel: "Set up my TTS workflow",
    keywords: [
      "ai text to speech for creators",
      "ai voiceover for faceless videos",
      "text to speech workflow youtube",
      "ai narration for creators",
    ],
    related: [
      { label: "AI Faceless Channel Automation", href: "/creators/ai-faceless-channel-automation" },
      { label: "AI Voice Cloning Workflow", href: "/creators/ai-voice-cloning-workflow" },
      { label: "AI Script Writing System", href: "/creators/ai-script-writing-system" },
    ],
    faqs: [
      {
        q: "Are the voices licensed for commercial use?",
        a: "We build only with voices that are properly licensed for monetised content, so you're not risking a takedown or a rights claim on your channel.",
      },
      {
        q: "Can it sound natural, not robotic?",
        a: "Today's TTS is very natural, and we tune pacing, emphasis and pronunciation for your niche so narration doesn't feel flat.",
      },
    ],
    schema: "Service",
    icon: "Radio",
  },
  {
    slug: "ai-voice-cloning-workflow",
    // Noindexed 2026-08-30: 0 impressions in the 2026-06-14→08-10 GSC window.
    // URL and content preserved; delete this flag to re-index (disposition §1.6, G2).
    noindex: true,
    eyebrow: "For Creators",
    h1: "AI Voice Cloning Workflow (Consent-First)",
    title: "AI Voice Cloning Workflow for Creators | Handbuilt",
    description:
      "Clone your own voice — with consent — to scale narration and voiceovers without re-recording. Built ethically, for your voice only, with your control.",
    answer:
      "A consent-first voice cloning workflow lets you scale narration in your own voice — you record a consented sample, and scripts become voiceovers that sound like you, without re-recording every line. Handbuilt builds this strictly for cloning your own voice (or a voice you have explicit written rights to), never for impersonation or deception.",
    pain: "As your output grows, being the only person who can voice your content becomes a hard ceiling — but re-recording everything, forever, isn't a real answer either.",
    scenario:
      "A creator narrates everything themselves and can't keep up as they scale to daily content. With their explicit consent, we build a workflow around a clone of their own voice: they approve a sample, and future scripts render in their voice for review before use. They stay the voice of their brand while removing the re-recording bottleneck — and they control exactly where it's used.",
    steps: [
      "We confirm consent and rights — your own voice, or one you have written permission for",
      "You record and approve a voice sample",
      "We build a review-first workflow: scripts render in your voice for your approval",
      "You control where it's used and can revoke it at any time",
    ],
    gets: [
      "Your own voice, scaled — with your explicit consent",
      "A review-first workflow so nothing is published without you",
      "Narration without endless re-recording",
      "Full control and the ability to revoke access",
    ],
    packageId: "starter",
    ctaLabel: "Discuss a voice workflow",
    keywords: [
      "ai voice cloning workflow",
      "clone my own voice for narration",
      "consent based voice cloning creators",
      "ai voice for content creators",
    ],
    related: [
      { label: "AI Text-to-Speech for Creators", href: "/creators/ai-text-to-speech-for-creators" },
      { label: "AI Avatar Video Creation", href: "/creators/ai-avatar-video-creation" },
      { label: "AI Faceless Channel Automation", href: "/creators/ai-faceless-channel-automation" },
    ],
    faqs: [
      {
        q: "Will you clone someone else's voice?",
        a: "No. We build voice cloning only for your own voice, or a voice you have explicit written permission to use. We won't build impersonation, deepfakes of real people without consent, or anything deceptive.",
      },
      {
        q: "Is voice cloning legal?",
        a: "Cloning your own voice with your consent is legitimate and increasingly common. Laws on voice and likeness vary by region — we build with consent, disclosure where appropriate, and your control, and recommend you confirm specifics for your jurisdiction.",
      },
      {
        q: "Do I stay in control of my voice?",
        a: "Yes. It's used only where you approve, with a review step before anything publishes, and you can revoke it at any time.",
      },
    ],
    schema: "Service",
    icon: "Mic",
  },
  {
    slug: "ai-avatar-video-creation",
    // Noindexed 2026-08-30: 0 impressions in the 2026-06-14→08-10 GSC window.
    // URL and content preserved; delete this flag to re-index (disposition §1.6, G2).
    noindex: true,
    eyebrow: "For Creators",
    h1: "AI Avatar Video Creation",
    title: "AI Avatar Video Creation for Creators | Handbuilt",
    description:
      "Create presenter-style avatar videos at scale — from your own likeness, with consent — for content in multiple languages without filming every take.",
    answer:
      "AI avatar video creation turns a script into presenter-style video using an avatar built from your own consented likeness — so you can produce talking-head content, or localise it into other languages, without filming every take. Handbuilt builds this only from your likeness or one you have explicit rights to, never to impersonate real people.",
    pain: "On-camera content scales worst of all — every video means filming, lighting and re-shooting, and translating your content into other languages means re-filming everything from scratch.",
    scenario:
      "An educator wants to reach non-English audiences but can't re-film every lesson in four languages. With their consent, we build an avatar from their likeness that can present scripts — including translated ones — as talking-head video. They review each output before publishing. Their reach multiplies across languages without multiplying their filming days.",
    steps: [
      "We confirm consent and rights for the likeness used",
      "We build a presenter avatar from your approved footage",
      "We connect scripts (including translations) to avatar video output",
      "You review every video before it's published",
    ],
    gets: [
      "Presenter-style video from your own consented likeness",
      "Content and localisation without re-filming every take",
      "A review step on every output before it goes live",
      "Ethical setup — your likeness, your control",
    ],
    packageId: "business",
    ctaLabel: "Discuss an avatar build",
    keywords: [
      "ai avatar video creation",
      "ai presenter video for creators",
      "ai avatar from my likeness",
      "ai talking head video automation",
    ],
    related: [
      { label: "AI Voice Cloning Workflow", href: "/creators/ai-voice-cloning-workflow" },
      { label: "AI Faceless Channel Automation", href: "/creators/ai-faceless-channel-automation" },
      { label: "AI Text-to-Speech for Creators", href: "/creators/ai-text-to-speech-for-creators" },
    ],
    faqs: [
      {
        q: "Whose likeness can you use?",
        a: "Only your own, or a likeness you have explicit written permission to use. We do not build avatars of real people without their consent, and we won't build deceptive or impersonation content.",
      },
      {
        q: "Should I disclose that a video uses an avatar?",
        a: "We recommend transparency with your audience, and some platforms now require labelling AI-generated or synthetic media. We help you set this up to stay within platform rules and keep audience trust.",
      },
    ],
    schema: "Service",
    icon: "Clapperboard",
  },
  {
    slug: "ai-faceless-channel-automation",
    // Noindexed 2026-08-30: 0 impressions in the 2026-06-14→08-10 GSC window.
    // URL and content preserved; delete this flag to re-index (disposition §1.6, G2).
    noindex: true,
    eyebrow: "For Creators",
    h1: "AI Faceless Channel Automation",
    title: "AI Faceless Channel Automation | Handbuilt",
    description:
      "A full production system for faceless channels — scripts, voiceover, visuals, editing and publishing — built to run at volume. Consistent output, less grind.",
    answer:
      "Faceless channel automation is an end-to-end production system — topic research, scripts, licensed voiceover, visuals, editing and publishing — that lets a faceless channel produce consistently at volume. Handbuilt builds it around your niche and format so the channel runs like a small studio instead of a solo grind.",
    pain: "Faceless channels live on volume and consistency, but producing script-voice-visuals-edit for every video by hand is a treadmill that stalls the moment you take a break.",
    scenario:
      "A faceless finance channel needs 4–5 videos a week to grow, but each one is a full production from scratch. We build a system: topic research feeds scripts, scripts render to licensed voiceover, visuals and b-roll are assembled to the format, edits are automated, and finished videos queue for review and upload. The channel produces studio-like volume with the creator directing rather than doing every step.",
    steps: [
      "We define your niche, format and quality bar",
      "We build research → script → voiceover → visuals → edit as one pipeline",
      "We use licensed voices and assets so the channel is monetisation-safe",
      "Finished videos queue for your review and scheduled upload",
    ],
    gets: [
      "An end-to-end faceless production pipeline",
      "Licensed voiceover and assets — safe to monetise",
      "Consistent volume without doing every step by hand",
      "You direct and approve; the system produces",
    ],
    packageId: "business",
    ctaLabel: "Build my faceless system",
    keywords: [
      "ai faceless channel automation",
      "faceless youtube automation",
      "automate faceless channel production",
      "ai faceless video system",
    ],
    related: [
      { label: "AI Text-to-Speech for Creators", href: "/creators/ai-text-to-speech-for-creators" },
      { label: "AI YouTube Video Workflow", href: "/creators/ai-youtube-video-workflow" },
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "AI Tools for Content Creators", href: "/creators" },
    ],
    faqs: [
      {
        q: "Will the channel be safe to monetise?",
        a: "We build with licensed voices and assets and original scripting, and design for platform and monetisation rules. We avoid the reused-content patterns that get faceless channels demonetised.",
      },
      {
        q: "How much control do I keep?",
        a: "You set the niche, format and quality bar, and approve videos before they publish. The system does the production; you stay the director.",
      },
    ],
    schema: "Service",
    icon: "Film",
  },
];

export const creators: LandingContent[] = [...creatorsA, ...creatorsB];

export function getCreator(slug: string): LandingContent | undefined {
  return creators.find((c) => c.slug === slug);
}
