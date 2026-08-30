// Programmatic GEO/SEO pages: one per [solution] × [industry].
// Each renders answer-first content + FAQPage + Service schema at /use-cases/[slug].
// Add rows here to expand surface area — the page template handles the rest.

import type { IndustryId, WorkerId } from "@/lib/data/showroom";

export interface UseCase {
  slug: string;
  solution: string;
  industry: string;
  question: string; // H1 — phrased as the query people type/ask an LLM
  answer: string; // answer-first lead paragraph (LLM-citable)
  pain: string;
  steps: string[];
  gets: string[];
  packageId: "starter" | "business" | "custom";
  relatedBuilds: string[];
  keywords: string[];
  faqs: { q: string; a: string }[];
}

export const useCases: UseCase[] = [
  {
    slug: "ai-chatbot-for-restaurants",
    solution: "AI Website Chatbot",
    industry: "Restaurants",
    question: "How do I add an AI chatbot to my restaurant website?",
    answer:
      "An AI chatbot for restaurants answers questions about hours, menu, reservations, allergens and location instantly — and takes booking or catering requests. Handbuilt trains one on your menu and details and adds it to your site, starting at $1,500 CAD.",
    pain: "Restaurants get the same handful of questions all day — hours, do you take reservations, is there parking — pulling staff off the floor to answer DMs and calls.",
    steps: [
      "We train the bot on your menu, hours, location and policies",
      "We add it to your website (and DMs if you want)",
      "It answers guests instantly and takes booking requests",
      "It hands off catering or large-party requests to you",
    ],
    gets: [
      "Instant answers to repeat questions",
      "Reservation & catering request capture",
      "Less time on the phone during service",
      "Works on your site and social DMs",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-website-chatbot", "ai-customer-support-bot"],
    keywords: [
      "ai chatbot for restaurants",
      "restaurant website chatbot",
      "ai reservations bot",
      "ai for restaurant customer service",
    ],
    faqs: [
      {
        q: "Can it take reservations?",
        a: "It can capture reservation and catering requests and either send them to you or book directly if you use an online reservation system.",
      },
    ],
  },
  {
    slug: "ai-receptionist-for-dentists",
    solution: "AI Receptionist",
    industry: "Dental Practices",
    question: "How can a dental practice use an AI receptionist to book patients and cut no-shows?",
    answer:
      "An AI receptionist for dental practices answers patient calls and texts, books and reschedules cleanings and checkups, and sends automatic reminders that cut no-shows. Handbuilt trains it on your services, providers and hours, starting at $1,500 CAD, or as a connected system from $3,500 CAD.",
    pain: "Dental front desks juggle ringing phones, walk-ins and recall calls — and every no-show is a wasted chair-hour that can't be sold back.",
    steps: [
      "We train it on your treatments, providers, hours and policies",
      "It answers calls and texts and books or reschedules",
      "It sends recall and appointment reminders automatically",
      "Anything clinical routes straight to your team",
    ],
    gets: [
      "24/7 patient call & text answering",
      "Automated booking, recalls & reminders",
      "Fewer no-shows and empty chairs",
      "A calmer, less overloaded front desk",
    ],
    packageId: "business",
    relatedBuilds: ["ai-receptionist", "ai-customer-support-bot"],
    keywords: [
      "ai receptionist for dentists",
      "dental appointment booking ai",
      "reduce dental no shows",
      "ai phone answering dental office",
    ],
    faqs: [
      {
        q: "Can it handle recall reminders for cleanings?",
        a: "Yes — it can automatically reach out when patients are due for cleanings or checkups and book them straight in.",
      },
    ],
  },
  {
    slug: "automate-admin-for-accountants",
    solution: "Business Automation",
    industry: "Accountants & Bookkeepers",
    question: "How can accountants automate admin and client follow-ups with AI?",
    answer:
      "AI automation for accountants chases missing client documents, sends deadline reminders, drafts routine client emails, and keeps your data in sync — so you spend time on work that bills, not admin. Handbuilt builds this as a Business AI System from $3,500 CAD.",
    pain: "Tax and bookkeeping seasons drown firms in document-chasing and repetitive client emails that eat billable hours.",
    steps: [
      "We map your recurring admin and document workflows",
      "It chases missing documents and signatures automatically",
      "It sends deadline and reminder emails on schedule",
      "It keeps client data synced across your tools",
    ],
    gets: [
      "Automated document & signature chasing",
      "Deadline and reminder automation",
      "Drafted routine client emails",
      "More billable hours, less admin",
    ],
    packageId: "business",
    relatedBuilds: ["ai-invoice-reminder-system", "ai-business-dashboard"],
    keywords: [
      "ai automation for accountants",
      "automate bookkeeping admin",
      "ai document chasing accounting",
      "ai for tax firm workflow",
    ],
    faqs: [
      {
        q: "Can it integrate with my accounting software?",
        a: "Yes — it can connect to common accounting and document tools so reminders and syncing happen automatically.",
      },
    ],
  },
  {
    slug: "missed-call-automation",
    solution: "Missed-Call Text-Back",
    industry: "Contractors & Local Service Businesses",
    question: "How do I stop losing business from missed calls?",
    answer:
      "Missed-call automation sends an instant text to anyone whose call you could not answer — \"Sorry we missed you, how can we help?\" — so the caller starts a conversation instead of dialling the next business. It is the cheapest automation a contractor can build, because it is a single trigger with a single action and it fires while the person is still holding their phone. Handbuilt sets it up on your existing business number.",
    pain: "Most people who reach voicemail never leave one. They call the next name on the list, and you never learn the call happened — which is why this leak is invisible until you go looking for it in your call log.",
    steps: [
      "We connect the automation to your existing business number — you keep the number",
      "An unanswered call triggers an on-brand text within seconds",
      "The reply conversation answers questions, qualifies the job, and books or routes to you",
      "Every recovered conversation is logged, so you can see what the leak was actually worth",
    ],
    gets: [
      "Instant text-back on calls you could not pick up",
      "A conversation started before the caller moves down the search results",
      "Qualified and booked, or handed to you for anything complex",
      "A record of recovered leads, so the value is measurable rather than assumed",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-lead-follow-up-agent"],
    keywords: [
      "missed call automation",
      "missed call text back",
      "missed call text back for contractors",
      "stop losing missed calls",
      "auto text missed calls small business",
    ],
    faqs: [
      { q: "How fast does the text go out?", a: "Within seconds of the missed call, which is the entire point — the person is still holding their phone and has not dialled anyone else yet. A text that arrives an hour later is competing with the business that already answered." },
      { q: "Can it book the job, not just text?", a: "Yes. The follow-up conversation can qualify and book straight into your calendar, or hand off to you for anything complex. Booking is optional though — plenty of trades want the conversation started and the booking done by a person." },
      { q: "How do I know if this is worth building for my business?", a: "Count the unanswered calls in your phone's call log over two weeks and multiply by your average job value and a realistic recovery rate. The missed-call calculator on this site does exactly that in your browser. If the number comes out small, do not build this — that is a real answer." },
      { q: "Does it work if I already have voicemail?", a: "Yes, and they are complementary rather than competing. Voicemail catches the small share of callers who will leave a message; the text-back catches the much larger share who will not." },
      { q: "What are the limits?", a: "It only works on calls to the number it is connected to, so calls to a personal cell stay invisible unless that line is included. It cannot tell a sales call from a customer, so you will text back the occasional telemarketer. And it is a text — a caller with an emergency needs a person, which is why an emergency path matters more than the text-back does." },
    ],
  },
  {
    slug: "appointment-reminder-automation",
    solution: "Appointment & No-Show Reminders",
    industry: "Service & Appointment Businesses",
    question: "How do I automate appointment reminders and cut no-shows?",
    answer:
      "Appointment reminder automation sends a confirmation when the booking is made and a reminder before the appointment, by text or email, and lets the client confirm, cancel or reschedule from the message itself. The reschedule link is the part that actually reduces no-shows — a reminder with no easy way to move the appointment converts a no-show into a no-show that felt guilty about it.",
    pain: "Manual reminder calls eat front-desk time, the ones that get skipped turn into empty slots, and a client who cannot easily reschedule simply does not turn up.",
    steps: [
      "We connect to your calendar or booking system so the reminders fire off real appointments",
      "A confirmation goes out at booking; a reminder goes out on the schedule you choose",
      "Clients confirm, cancel or reschedule from the message without calling you",
      "Cancellations free the slot automatically, so it can be refilled instead of sitting empty",
    ],
    gets: [
      "Confirmation at booking and a reminder before the appointment",
      "Self-serve confirm, cancel and reschedule from the message",
      "Front-desk time back from the reminder-call routine",
      "A calendar that reflects reality, including the cancellations you would otherwise learn about at the appointment time",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-business-system"],
    keywords: [
      "appointment reminder automation",
      "automated appointment reminders",
      "no show reminder automation",
      "appointment confirmation automation",
      "reminder texts for appointments",
    ],
    faqs: [
      { q: "Text, email or both?", a: "Usually text with email as backup, but it depends on who your clients are. The timing matters more than the channel: too early and it is forgotten, too late and they cannot rearrange their day. A reminder the day before plus one a couple of hours out suits most appointment businesses." },
      { q: "Can clients reschedule themselves?", a: "Yes, and this is the part worth paying for. A reminder that only says \"don't forget\" gives a client with a conflict nowhere to go. A reminder with a reschedule link turns a no-show into a moved booking and frees the slot early enough to refill it." },
      { q: "How many reminders is too many?", a: "Two is normal, three is the ceiling, and more reads as nagging. The failure mode to avoid is reminders that keep sending after somebody has already confirmed — that is the single fastest way to make people opt out of your messages entirely." },
      { q: "What if the appointment gets moved on your side?", a: "The reminder has to fire off the live calendar, not off a copy taken at booking time. If it reads a stale copy, you will confidently remind someone about an appointment that no longer exists — which is worse than sending nothing." },
    ],
  },
  {
    slug: "google-business-profile-lead-automation",
    solution: "Google Business Profile Leads",
    industry: "Local Businesses",
    question: "How do I capture and respond to Google Business Profile leads automatically?",
    answer:
      "Google Business Profile lead automation answers the messages and questions that come through your Google listing instantly, captures the lead, and follows up — so the customers who find you on Maps don't slip away while you're busy. Handbuilt builds it around your services.",
    pain: "Your Google Business Profile is often where local customers first reach out — and a slow reply to a Google message or question sends them straight to a competitor down the list.",
    steps: [
      "We connect to your Google Business Profile messaging and Q&A",
      "Inquiries get instant, on-brand answers",
      "Leads are captured and qualified",
      "Bookings or hot leads are routed to you",
    ],
    gets: [
      "Instant replies to Google messages and questions",
      "Leads from Maps captured, not missed",
      "Qualification and booking",
      "Faster response than nearby competitors",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-automation-agency"],
    keywords: [
      "google business profile lead automation",
      "google business messages automation",
      "gmb lead automation",
      "respond to google messages automatically",
    ],
    faqs: [
      { q: "Does this help my local ranking?", a: "Fast, consistent responses to Google messages and questions support engagement signals, and — more directly — they stop you losing the local searchers who message you first." },
      { q: "Can it answer the Q&A on my listing?", a: "It can help keep common questions answered and capture the people who reach out, so your profile actively converts instead of sitting passive." },
    ],
  },
  {
    slug: "facebook-lead-automation",
    solution: "Facebook Lead Automation",
    industry: "Businesses Running Facebook Ads",
    question: "How do I follow up with Facebook lead ads instantly?",
    answer:
      "Facebook lead automation responds to every Facebook and Instagram lead-ad submission within seconds, qualifies them, and books or routes the good ones — so the leads you're paying for don't go cold. Handbuilt connects it to your ad forms and CRM.",
    pain: "Facebook leads go cold within minutes, but most businesses follow up hours later — so the ad spend is wasted on leads that already forgot they filled out the form.",
    steps: [
      "We connect to your Facebook/Instagram lead forms",
      "New leads get an instant, on-brand response",
      "The AI qualifies and books or routes hot leads",
      "Everything logs to your CRM automatically",
    ],
    gets: [
      "Second-by-second lead response",
      "Higher return on your ad spend",
      "Qualification and booking",
      "Leads logged to your CRM",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-lead-follow-up-agent", "ai-automation-agency"],
    keywords: [
      "facebook lead automation",
      "facebook lead ads follow up",
      "instant facebook lead response",
      "automate facebook ad leads",
    ],
    faqs: [
      { q: "Why does speed matter so much for Facebook leads?", a: "Interest drops off fast — responding within minutes instead of hours dramatically improves the odds a lead engages. Automation makes instant response possible without staffing for it." },
      { q: "Does it work with Instagram lead ads too?", a: "Yes — it handles lead-form submissions across Facebook and Instagram and routes them the same way." },
    ],
  },
  {
    slug: "ai-sop-generator",
    solution: "AI SOP Generator",
    industry: "Growing & Hiring Businesses",
    question: "How can AI help me document SOPs and processes?",
    answer:
      "An AI SOP generator turns how you already do things into clear, consistent standard operating procedures — from a quick description or a screen recording — so you can train staff and delegate without writing documentation from scratch. Handbuilt builds it around your business.",
    pain: "The knowledge that runs your business lives in your head, which makes hiring, delegating and consistency painful — but sitting down to write SOPs never makes it to the top of the list.",
    steps: [
      "We set up a fast way to capture how a task is done",
      "The AI drafts a clear, structured SOP in your format",
      "You review and approve; it's stored where your team can find it",
      "New processes get documented as you go, not never",
    ],
    gets: [
      "SOPs drafted from a description or recording",
      "Consistent, structured documentation",
      "Easier hiring, training and delegation",
      "A process library that actually gets built",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-document-generator", "ai-business-system"],
    keywords: [
      "ai sop generator",
      "ai standard operating procedure generator",
      "document processes with ai",
      "sop automation small business",
    ],
    faqs: [
      { q: "Do I have to write anything?", a: "No — you describe the task or record yourself doing it, and the AI drafts the SOP. You just review and approve." },
      { q: "Where do the SOPs live?", a: "Wherever your team already works — a docs tool, wiki or shared drive — so they're actually found and used, not buried." },
    ],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

// ---------- Live demo config ----------
// Conversational use cases get an embedded, working AI-receptionist demo.
// Derived from solution + industry so we don't hand-author every entry.
export interface UseCaseDemo {
  business: string; // sample-business label shown in the chat header
  workerId: WorkerId; // persona sent to /api/demo
  industryId: IndustryId; // persona sent to /api/demo
  greeting: string; // first assistant line
  suggestions: string[]; // quick-prompt chips
}

const CONVERSATIONAL: Record<string, "receptionist" | "booking" | "chatbot" | "lead" | "support"> = {
  "AI Receptionist": "receptionist",
  "AI Booking Assistant": "booking",
  "AI Website Chatbot": "chatbot",
  "AI Lead Follow-Up Agent": "lead",
  "AI Customer Support Bot": "support",
};

/**
 * The showroom is the only demo persona engine we have, and it only knows the
 * nine industries in `lib/data/showroom.ts`. A use case whose industry is not
 * in this map gets NO embedded chat — previously every one of them silently
 * ran as the default landscaping receptionist while the page claimed it was
 * "a real, working AI for a sample <industry> business".
 */
const DEMO_INDUSTRY: Record<string, IndustryId> = {
  "Contractors & Trades": "plumbing",
  "Real Estate": "realestate",
  Restaurants: "restaurant",
  "Clinics & Health": "dental",
  "Dental Practices": "dental",
  "Salons & Beauty": "salon",
};

const DEMO_WORKER: Record<string, WorkerId> = {
  receptionist: "receptionist",
  booking: "receptionist",
  chatbot: "receptionist",
  support: "receptionist",
  lead: "followup",
};

const SAMPLE_BUSINESS: Record<string, string> = {
  "Contractors & Trades": "Summit Plumbing & Heating, a contracting & trades business",
  "Real Estate": "Westside Realty, a real estate agency",
  Restaurants: "The Corner Table, a restaurant",
  "Clinics & Health": "Brightside Family Clinic, a health clinic",
  "Dental Practices": "Brightsmile Dental, a dental practice",
  "Salons & Beauty": "Luxe Hair & Spa, a salon and spa",
  "E-commerce": "Northgoods, an online store",
  "SaaS & Startups": "Flowdesk, a SaaS product",
};

export function getUseCaseDemo(uc: UseCase): UseCaseDemo | null {
  const kind = CONVERSATIONAL[uc.solution];
  if (!kind) return null;

  const industryId = DEMO_INDUSTRY[uc.industry];
  if (!industryId) return null; // no honest persona for this industry — show no demo

  const business = SAMPLE_BUSINESS[uc.industry] ?? `a ${uc.industry.toLowerCase()} business`;
  const name = business.split(",")[0];
  const ecommerce = uc.industry === "E-commerce";

  const presets = {
    receptionist: {
      greeting: `Thanks for calling ${name}! This is the AI receptionist — how can I help you today?`,
      suggestions: ["Ask for a quote", "Book an appointment", "It's urgent", "What are your hours?"],
    },
    booking: {
      greeting: `Hi, you've reached ${name}! I can get you booked in — what are you after?`,
      suggestions: ["Book an appointment", "What are your prices?", "Any openings today?", "Reschedule"],
    },
    chatbot: ecommerce
      ? {
          greeting: `Hi! 👋 You're chatting with ${name} — happy to help with your order or our products.`,
          suggestions: ["Where's my order?", "What's your return policy?", "Help me pick a size", "Is this in stock?"],
        }
      : {
          greeting: `Hi! 👋 You're chatting with ${name}'s assistant — how can I help?`,
          suggestions: ["Do you take reservations?", "What are your hours?", "Where are you located?", "Book a table"],
        },
    lead: {
      greeting: `Hi, thanks for reaching out to ${name}! Are you looking to buy, sell, or book a viewing?`,
      suggestions: ["Book a viewing", "Is it still available?", "What's the price?", "I'm selling my home"],
    },
    support: {
      greeting: `Hi! You're chatting with ${name}'s support assistant — what can I help with?`,
      suggestions: ["How do I reset my password?", "I have a billing question", "Something's not working", "Talk to a human"],
    },
  };

  return { business, workerId: DEMO_WORKER[kind], industryId, ...presets[kind] };
}
