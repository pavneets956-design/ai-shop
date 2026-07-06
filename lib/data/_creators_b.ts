import type { LandingContent } from "./landing";

// Creator-economy landing pages, batch B (11–20). Concatenated into `creators`
// by creators.ts. Global/remote framing — creators are served worldwide, so
// these pages carry no local geo modifiers. Voice, avatar and fan-messaging
// pages are written for legal, consensual, non-deceptive use only.
export const creatorsB: LandingContent[] = [
  {
    slug: "ai-script-writing-system",
    eyebrow: "For Creators",
    h1: "AI Script Writing System for Creators",
    title: "AI Script Writing System for Creators | Handbuilt",
    description:
      "A custom AI script system trained on your voice, hooks and niche that drafts video and short scripts you can film the same day. Built for you from $1,500.",
    answer:
      "An AI script-writing system is a set of prompts, hook banks and formats trained on your best-performing content so it drafts scripts in your actual voice — not generic AI filler. Handbuilt builds one around your niche, your hooks and your structure, so you get a first draft in seconds and film instead of staring at a blank page.",
    pain: "The blank page is the real bottleneck. Most creators don't stop posting because filming is hard — they stop because coming up with the next hook every single day burns them out.",
    scenario:
      "Take a finance creator posting 5 shorts a week. Their retention lives and dies on the first 3 seconds. We feed the system their 30 best-performing hooks, their tone (dry, fast, no fluff) and their content pillars. Now they type a topic — \"why your emergency fund is too big\" — and get three hook options plus a 45-second script structured to their retention pattern. Ideation drops from an hour to five minutes.",
    steps: [
      "We analyse your best-performing videos for hooks, pacing and voice",
      "We build a hook bank and script templates tuned to your niche and platform",
      "We wire it into a tool you already use — a doc, a chat window, or Notion",
      "You type a topic, pick a hook, tweak the draft, and film",
    ],
    gets: [
      "A script engine trained on your real voice and top content",
      "A reusable hook bank for your niche",
      "Formats for shorts, long-form and hooks/CTAs",
      "14 days of tuning after launch so the voice actually sounds like you",
    ],
    packageId: "starter",
    ctaLabel: "Build my script system",
    keywords: [
      "ai script writing system",
      "ai script generator for youtube",
      "ai video script writer",
      "ai hook generator for creators",
    ],
    related: [
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
      { label: "AI YouTube Video Workflow", href: "/creators/ai-youtube-video-workflow" },
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Won't the scripts sound like generic AI?",
        a: "That's the whole point of building it around your content instead of using ChatGPT raw. We train it on your real hooks, phrasing and pacing, then tune it for two weeks so drafts read like you wrote them.",
      },
      {
        q: "Do you write the scripts for me?",
        a: "No — we build the system so you can draft them in seconds yourself, any time, without paying per script. You stay in control of the final cut.",
      },
    ],
    schema: "Service",
    icon: "PenTool",
  },
  {
    slug: "ai-caption-subtitle-automation",
    eyebrow: "For Creators",
    h1: "AI Caption & Subtitle Automation",
    title: "AI Caption & Subtitle Automation for Video | Handbuilt",
    description:
      "Auto-generate accurate, on-brand captions and burned-in subtitles for every video — styled to your channel, in your workflow. Built for you from $1,500.",
    answer:
      "AI caption and subtitle automation transcribes your video, formats the captions to your channel's style, and outputs burned-in subtitles or SRT files without you touching a caption editor. Handbuilt sets up the pipeline around your editing workflow so every clip ships captioned — the way 80% of social video is now watched, on mute.",
    pain: "Most short-form video is watched on mute, so uncaptioned clips lose the majority of their audience in the first second — but captioning by hand is the most tedious part of editing.",
    scenario:
      "A travel creator batches 12 reels every Sunday. Hand-captioning each one in CapCut eats two hours and the styling drifts. We build a pipeline: they drop the raw exports in a folder, and get back captioned versions styled to their brand — font, position, highlight colour — plus SRT files for YouTube. Two hours of caption work becomes a five-minute review.",
    steps: [
      "We pick the transcription engine and tune it for your accent and niche terms",
      "We set your caption style — font, size, position, highlight and animation",
      "We connect it to how you already work: a folder, an editor, or an upload step",
      "Every video comes back captioned and ready to post, with SRT files included",
    ],
    gets: [
      "Accurate transcription tuned to your voice and vocabulary",
      "On-brand burned-in captions plus SRT/VTT files for SEO",
      "Batch processing so a whole week of clips runs at once",
      "A workflow that fits your existing editor, not a new app to learn",
    ],
    packageId: "starter",
    ctaLabel: "Automate my captions",
    keywords: [
      "ai caption automation",
      "ai subtitle generator for video",
      "auto caption reels tiktok",
      "burned in subtitles automation",
    ],
    related: [
      { label: "AI Video Editing Automation", href: "/creators/ai-video-editing-automation" },
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
    ],
    faqs: [
      {
        q: "How accurate is the transcription?",
        a: "Modern engines are extremely accurate for clear audio. We tune it for your accent and any niche terms you use often, and the review step lets you fix the rare miss before posting.",
      },
      {
        q: "Can it match my exact caption style?",
        a: "Yes. We set the font, size, position, highlight colour and animation to match your channel so captions are consistent on every clip.",
      },
    ],
    schema: "Service",
    icon: "Captions",
  },
  {
    slug: "ai-content-repurposing-system",
    eyebrow: "For Creators",
    h1: "AI Content Repurposing System",
    title: "AI Content Repurposing System for Creators | Handbuilt",
    description:
      "Turn one long video or podcast into a week of shorts, posts, captions and a newsletter — automatically, in your voice. Custom system built for you.",
    answer:
      "A content repurposing system takes one piece of long-form content — a video, stream or podcast — and turns it into clips, captions, social posts, a thread and a newsletter, all in your voice. Handbuilt builds the pipeline around your channels so one recording becomes a full week of content instead of a one-off upload.",
    pain: "You already make great long-form content — but turning each episode into the ten posts it deserves is a second full-time job most creators never get to.",
    scenario:
      "A podcaster records one 60-minute episode a week and posts... the episode. That's it. We build a system: they drop the recording in, and get back 6 clip-ready segments with captions, 5 platform posts, a thread, and a draft newsletter summarising the episode — each shaped for its platform and written in their voice. One recording now feeds every channel for a week.",
    steps: [
      "We map your long-form source and every channel you want to feed",
      "We build the extraction: clip selection, captions, posts, threads and newsletter",
      "We train each output on your voice and each platform's format",
      "You drop in a recording and review a full week of content, not a blank calendar",
    ],
    gets: [
      "One-to-many pipeline: long-form in, a week of content out",
      "Clips, captions, social posts, threads and a newsletter draft",
      "Every output shaped for its platform and written in your voice",
      "A review step so you approve before anything posts",
    ],
    packageId: "business",
    ctaLabel: "Build my repurposing system",
    keywords: [
      "ai content repurposing system",
      "repurpose podcast into clips",
      "long form to short form automation",
      "ai content multiplier for creators",
    ],
    related: [
      { label: "AI Podcast Clipping System", href: "/creators/ai-podcast-clipping-system" },
      { label: "AI Social Media Scheduling Automation", href: "/creators/ai-social-media-scheduling-automation" },
      { label: "AI Newsletter Automation", href: "/creators/ai-newsletter-automation" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
    ],
    faqs: [
      {
        q: "Does it post automatically or do I approve first?",
        a: "Your choice. Most creators want a review step so they approve everything before it goes out — we can wire it either way, including fully scheduled once you trust it.",
      },
      {
        q: "What source content works best?",
        a: "Anything long-form with clear audio: podcasts, long YouTube videos, livestreams, webinars or course lessons. The richer the source, the more the system can pull from it.",
      },
    ],
    schema: "Service",
    icon: "Repeat",
  },
  {
    slug: "ai-social-media-scheduling-automation",
    eyebrow: "For Creators",
    h1: "AI Social Media Scheduling Automation",
    title: "AI Social Media Scheduling Automation | Handbuilt",
    description:
      "Auto-schedule and cross-post your content to every platform at the right times, with captions and hashtags tailored per network. Built for you from $1,500.",
    answer:
      "Social media scheduling automation plans, formats and cross-posts your content to each platform at optimal times, with captions and hashtags adapted per network — so you post consistently without living in the apps. Handbuilt builds it around your channels and your calendar so publishing runs itself.",
    pain: "Consistency wins the algorithm, but manually reformatting and posting the same content to five platforms every day is exactly the grind that makes creators fall off.",
    scenario:
      "A fitness creator posts to Instagram, TikTok, YouTube Shorts and a Facebook page. Doing it by hand means four uploads, four caption rewrites and four sets of hashtags a day. We build a scheduler: they approve a week of content once, and it publishes to each platform at that platform's best times, with the caption and hashtags tuned per network. Four daily uploads become one weekly approval.",
    steps: [
      "We connect your platforms and set your posting cadence and best times",
      "We build per-platform caption and hashtag formatting from one source post",
      "We add a content calendar you approve in one pass",
      "It publishes on schedule and flags anything that needs your eyes",
    ],
    gets: [
      "One approval, published everywhere at the right times",
      "Captions and hashtags tailored per platform",
      "A content calendar you control",
      "Consistency without living inside the apps",
    ],
    packageId: "starter",
    ctaLabel: "Automate my posting",
    keywords: [
      "ai social media scheduling automation",
      "auto cross post content creators",
      "content calendar automation",
      "schedule reels tiktok youtube automatically",
    ],
    related: [
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "AI Creator CRM", href: "/creators/ai-creator-crm" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
    ],
    faqs: [
      {
        q: "Which platforms can it post to?",
        a: "The major networks — Instagram, TikTok, YouTube, Facebook, X, LinkedIn and Threads — subject to each platform's API rules. We confirm exactly what's supported for your mix before building.",
      },
      {
        q: "Can it decide the best times to post?",
        a: "Yes. We set posting windows based on your audience's activity and let you override them any time.",
      },
    ],
    schema: "Service",
    icon: "Calendar",
  },
  {
    slug: "ai-newsletter-automation",
    eyebrow: "For Creators",
    h1: "AI Newsletter Automation for Creators",
    title: "AI Newsletter Automation for Creators | Handbuilt",
    description:
      "Turn your videos, podcasts and posts into a consistent newsletter your audience actually opens — drafted in your voice, on schedule. Built for you.",
    answer:
      "Newsletter automation turns the content you already make into a regular email your audience owns — drafted from your latest videos, posts or episodes, in your voice, ready for you to send. Handbuilt builds it so your list stays warm without the newsletter becoming another thing you dread writing.",
    pain: "Your email list is the one audience no algorithm can take from you — yet it's the first thing creators neglect because writing a newsletter every week is its own chore.",
    scenario:
      "A design creator has 8,000 email subscribers and emails them... rarely. We build a system that pulls their week — a new video, two popular posts, a tool they mentioned — and drafts a newsletter in their casual, helpful voice. They spend ten minutes editing instead of two hours writing, hit send, and the list stays alive between launches.",
    steps: [
      "We connect your content sources and your email platform",
      "We build a template and voice the drafts match every week",
      "The system drafts each issue from your latest content",
      "You review, tweak and send — or schedule it to go out automatically",
    ],
    gets: [
      "Weekly (or any cadence) drafts built from your real content",
      "Your voice and a clean, on-brand template",
      "Works with your existing email platform",
      "A warm list between launches, without the writing dread",
    ],
    packageId: "starter",
    ctaLabel: "Automate my newsletter",
    keywords: [
      "ai newsletter automation",
      "ai newsletter writer for creators",
      "automate creator email newsletter",
      "turn videos into newsletter",
    ],
    related: [
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "AI Course Creator Automation", href: "/creators/ai-course-creator-automation" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
    ],
    faqs: [
      {
        q: "Which email platforms do you support?",
        a: "The common ones — Beehiiv, Substack, ConvertKit/Kit, Mailchimp and others with an API or clean import. We confirm yours before building.",
      },
      {
        q: "Will subscribers know it's AI-assisted?",
        a: "It's drafted from your content in your voice and you edit and send it — it's your newsletter, just faster to write. We never fabricate facts or quotes.",
      },
    ],
    schema: "Service",
    icon: "Newspaper",
  },
  {
    slug: "ai-fan-message-automation",
    eyebrow: "For Creators",
    h1: "AI Fan Message & DM Automation",
    title: "AI Fan Message & DM Automation for Creators | Handbuilt",
    description:
      "Handle high-volume comments and DMs without losing your voice — triage, auto-reply to FAQs, and route real conversations to you. Consent-first, platform-safe.",
    answer:
      "Fan message automation triages the flood of comments and DMs you get, auto-answers the repetitive questions in your voice, and routes genuine or sensitive messages to you personally. Handbuilt builds it for legitimate, non-deceptive fan operations — clearly assisted, respecting each platform's rules and your audience's trust.",
    pain: "Past a certain size, the DMs and comments that made your community special become impossible to keep up with — so fans feel ignored and you feel guilty.",
    scenario:
      "A creator with 400k followers gets hundreds of DMs a day: 70% are the same handful of questions (\"what mic do you use?\", \"is the course still open?\"), the rest are real. We build triage: FAQs get an instant, on-brand answer, sponsorship and press inquiries route to a labelled inbox, and genuine personal messages are surfaced for the creator to answer themselves. The community feels heard without the creator drowning.",
    steps: [
      "We map your real message volume and the recurring questions",
      "We build on-brand answers for FAQs and rules for what must reach you",
      "We route business inquiries (sponsors, press) to a labelled inbox",
      "Personal and sensitive messages are flagged for you — never faked",
    ],
    gets: [
      "Instant, on-brand replies to your most common questions",
      "Sponsor and press inquiries sorted into their own inbox",
      "Real conversations routed to you, not auto-answered",
      "Consent and platform-compliance built into the setup",
    ],
    packageId: "starter",
    ctaLabel: "Set up message triage",
    keywords: [
      "ai fan message automation",
      "ai dm automation for creators",
      "automate instagram dms creator",
      "comment triage automation",
    ],
    related: [
      { label: "AI Creator CRM", href: "/creators/ai-creator-crm" },
      { label: "AI Patreon Automation", href: "/creators/ai-patreon-creator-automation" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
    ],
    faqs: [
      {
        q: "Isn't auto-replying to fans deceptive?",
        a: "It shouldn't be, and we don't build it that way. Automation handles genuinely repetitive FAQs and routing; real personal messages go to you. We recommend being open that common questions are assisted, and we never impersonate you in sensitive conversations.",
      },
      {
        q: "Does this follow platform rules?",
        a: "We build within each platform's API and automation policies. Some platforms limit DM automation — we tell you upfront what's allowed on yours and design to stay compliant.",
      },
    ],
    schema: "Service",
    icon: "MessagesSquare",
  },
  {
    slug: "ai-creator-crm",
    eyebrow: "For Creators",
    h1: "AI Creator CRM for Brand Deals & Sponsors",
    title: "AI Creator CRM for Brand Deals & Sponsors | Handbuilt",
    description:
      "Stop losing brand deals in your DMs. A custom CRM that captures sponsor inquiries, tracks deals, drafts replies and chases follow-ups. Built for you.",
    answer:
      "A creator CRM captures every brand-deal and sponsorship inquiry, tracks each deal through your pipeline, drafts replies with your rates, and reminds you to follow up so money doesn't die in your DMs. Handbuilt builds it around how you actually close deals — no enterprise sales software you'll never open.",
    pain: "The most expensive thing a growing creator loses isn't a video idea — it's the sponsorship inquiry that got buried in the DMs and never got a reply.",
    scenario:
      "A creator lands 4–5 brand inquiries a week across email and Instagram. Some are lowballs, some are real, and half get forgotten. We build a CRM: inquiries are captured automatically, sorted by budget, and given a draft reply with the creator's media kit and rates. A pipeline shows what's open, and follow-ups are chased on schedule. Deals that used to evaporate now close.",
    steps: [
      "We centralise inquiries from email, DMs and your inquiry form",
      "We build a pipeline: new, negotiating, booked, delivered, paid",
      "We draft on-brand replies with your rates and media kit attached",
      "It reminds you (or auto-nudges) so no deal goes cold",
    ],
    gets: [
      "Every sponsor inquiry captured in one place",
      "A deal pipeline built for creator brand deals, not enterprise sales",
      "Draft replies with your rates and media kit",
      "Automatic follow-up so money doesn't slip through",
    ],
    packageId: "business",
    ctaLabel: "Build my creator CRM",
    keywords: [
      "ai creator crm",
      "brand deal crm for creators",
      "sponsorship management for influencers",
      "track brand deals automation",
    ],
    related: [
      { label: "AI Fan Message & DM Automation", href: "/creators/ai-fan-message-automation" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
      { label: "AI Coaching Content System", href: "/creators/ai-coaching-content-system" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Do I need to already get brand deals for this to help?",
        a: "It helps most once inquiries are coming in and slipping through the cracks. If you're just starting, we can keep it lightweight and grow it as your deal flow grows.",
      },
      {
        q: "Can it store my media kit and rates?",
        a: "Yes — your rate card, media kit and standard terms live in the system so replies go out fast and consistent without you digging for files.",
      },
    ],
    schema: "Service",
    icon: "Users",
  },
  {
    slug: "ai-patreon-creator-automation",
    eyebrow: "For Creators",
    h1: "AI Patreon & Membership Automation",
    title: "AI Patreon & Membership Automation | Handbuilt",
    description:
      "Automate member welcomes, tier perks, content delivery and churn-saving messages for your Patreon or membership — in your voice. Built for you from $1,500.",
    answer:
      "Membership automation handles the operational grind of a paid community — welcoming new members, delivering tier perks, answering member questions and flagging churn risk — so you can focus on the content they pay for. Handbuilt builds it around your Patreon, Ko-fi or membership platform and your voice.",
    pain: "Paid members expect more attention, not less — but the admin of welcoming, delivering perks and answering the same questions scales faster than any solo creator can keep up with.",
    scenario:
      "A creator with 600 Patreon members spends hours on member admin: welcome messages, \"where's the Discord link\", perk delivery, and quietly losing members who drift. We build automation: every new member gets a personal-feeling welcome and their tier's perks, common questions are answered instantly, and members who go quiet get a friendly, on-brand check-in before they cancel. The membership feels high-touch while the creator's time goes back to content.",
    steps: [
      "We connect your membership platform and map each tier's perks",
      "We build welcomes, perk delivery and FAQ answers in your voice",
      "We add churn-risk detection and gentle win-back messages",
      "You keep the personal moments; the system handles the repetitive ones",
    ],
    gets: [
      "Automated welcomes and tier-perk delivery",
      "Instant answers to common member questions",
      "Churn-risk flags and on-brand win-back messages",
      "A high-touch membership that doesn't eat your week",
    ],
    packageId: "starter",
    ctaLabel: "Automate my membership",
    keywords: [
      "ai patreon automation",
      "membership automation for creators",
      "patreon churn automation",
      "automate paid community",
    ],
    related: [
      { label: "AI Fan Message & DM Automation", href: "/creators/ai-fan-message-automation" },
      { label: "AI Course Creator Automation", href: "/creators/ai-course-creator-automation" },
      { label: "AI Creator CRM", href: "/creators/ai-creator-crm" },
    ],
    faqs: [
      {
        q: "Which membership platforms do you support?",
        a: "Patreon, Ko-fi, and membership tools with an API or Discord/community integration. We confirm what's possible on your exact stack before building.",
      },
      {
        q: "Will members feel like they're talking to a bot?",
        a: "The goal is the opposite — fast, warm, on-brand touches for the repetitive stuff so you have time for the real conversations that keep members loyal.",
      },
    ],
    schema: "Service",
    icon: "Star",
  },
  {
    slug: "ai-course-creator-automation",
    eyebrow: "For Creators",
    h1: "AI Automation for Course Creators",
    title: "AI Automation for Course Creators | Handbuilt",
    description:
      "Automate student onboarding, support answers, lesson follow-ups and completion nudges for your course — trained on your material. Built for you.",
    answer:
      "Course automation handles the operations behind an online course — onboarding new students, answering support questions from your own material, nudging people to finish, and following up on launches — so your course runs without you being the help desk. Handbuilt builds it trained on your curriculum and your voice.",
    pain: "The dream of a course is passive income; the reality is answering the same student questions forever and watching most buyers never finish the thing they paid for.",
    scenario:
      "A creator sells a $400 course to 1,200 students. Support is a swamp of \"how do I access module 3\" and completion sits at 15%. We build automation: students get a guided onboarding, a support assistant trained on the course answers 80% of questions instantly, and students who stall get nudged to the next lesson. Support load drops, completion climbs, and the refund rate falls with it.",
    steps: [
      "We train a support assistant on your curriculum and FAQs",
      "We build student onboarding and progress-based nudges",
      "We connect it to your course platform and email",
      "We add launch follow-up sequences for new cohorts",
    ],
    gets: [
      "A support assistant that answers from your course material",
      "Onboarding that gets students started fast",
      "Completion nudges that lift finish rates (and cut refunds)",
      "Launch and re-engagement follow-ups",
    ],
    packageId: "business",
    ctaLabel: "Automate my course",
    keywords: [
      "ai automation for course creators",
      "ai student support for online course",
      "course completion automation",
      "automate online course operations",
    ],
    related: [
      { label: "AI Coaching Content System", href: "/creators/ai-coaching-content-system" },
      { label: "AI Newsletter Automation", href: "/creators/ai-newsletter-automation" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Which course platforms do you work with?",
        a: "Teachable, Kajabi, Thinkific, Skool, Circle and others with an API or clean integration. We confirm yours before scoping.",
      },
      {
        q: "How does the assistant avoid giving wrong answers?",
        a: "It answers from your actual course content, not the open internet, and hands off anything outside its material to you. That keeps answers accurate and on-message.",
      },
    ],
    schema: "Service",
    icon: "GraduationCap",
  },
  {
    slug: "ai-coaching-content-system",
    eyebrow: "For Creators",
    h1: "AI Content System for Coaches",
    title: "AI Content System for Coaches & Educators | Handbuilt",
    description:
      "A content and lead system for coaches — turn your expertise into consistent posts, lead magnets and nurture that books calls. Trained on your method.",
    answer:
      "A coaching content system turns your expertise into a consistent stream of content, lead magnets and nurture sequences that fill your calendar — trained on your method and your voice. Handbuilt builds it so your marketing runs while you coach, instead of choosing between the two.",
    pain: "Coaches sell through trust, which means content — but the coaches who are great at coaching are usually the ones with no time or system to market consistently.",
    scenario:
      "A business coach knows their method cold but posts sporadically and books clients only when they hustle. We build a system: their frameworks become a content engine that drafts posts and emails in their voice, a lead magnet captures the right people, and a nurture sequence warms leads toward a discovery call. Marketing stops being the thing that only happens when revenue dips.",
    steps: [
      "We capture your coaching method, frameworks and voice",
      "We build a content engine that drafts posts and emails from them",
      "We create a lead magnet and capture flow for your ideal client",
      "We add a nurture sequence that routes warm leads to a call",
    ],
    gets: [
      "Consistent content drafted from your own method",
      "A lead magnet and capture flow that attracts the right clients",
      "A nurture sequence that books discovery calls",
      "Marketing that runs while you coach",
    ],
    packageId: "business",
    ctaLabel: "Build my coaching system",
    keywords: [
      "ai content system for coaches",
      "ai marketing for coaches",
      "lead generation automation for coaches",
      "content automation for educators",
    ],
    related: [
      { label: "AI Course Creator Automation", href: "/creators/ai-course-creator-automation" },
      { label: "AI Creator CRM", href: "/creators/ai-creator-crm" },
      { label: "AI Newsletter Automation", href: "/creators/ai-newsletter-automation" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
    ],
    faqs: [
      {
        q: "I'm a coach, not a content creator — is this still for me?",
        a: "Yes. This is built for coaches, consultants and educators who sell through trust and need consistent content and lead flow without it becoming a second job.",
      },
      {
        q: "Will the content actually sound like me?",
        a: "It's trained on your frameworks, phrasing and point of view, then tuned after launch. You review before anything publishes, so your voice stays yours.",
      },
    ],
    schema: "Service",
    icon: "Megaphone",
  },
];
