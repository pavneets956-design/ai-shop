import type { LandingContent } from "./landing";

// Industry landing pages, batch C (Phase 2). Concatenated into `industries` by
// industries.ts. Each page targets a distinct trade/profession with its own
// pain, worked example and workflows — no city-swap or template padding.
export const industriesC: LandingContent[] = [





  {
    slug: "immigration-consultant-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Immigration Consultants",
    title: "AI Automation for Immigration Consultants | Handbuilt",
    description:
      "AI that qualifies inquiries, books consults, and handles document intake for immigration consultants — so you focus on cases, not repetitive questions. From $1,500.",
    answer:
      "AI automation for an immigration consultant qualifies inquiries by program, books paid consults, and streamlines document intake — so your time goes to casework, not answering the same eligibility questions. Handbuilt builds it around your services and intake process.",
    pain: "Immigration consultants get flooded with repetitive eligibility questions and unqualified inquiries, which buries the serious clients ready to pay for a consult.",
    scenario:
      "A consultant fields dozens of daily messages asking the same program questions, most from people who won't proceed. We build AI that answers common eligibility questions, qualifies inquiries by program and situation, and books paid consults with the serious ones — plus a smoother document intake. Less noise, more booked consults.",
    steps: [
      "We map your services, programs and consult process",
      "AI answers common questions and qualifies by program",
      "It books paid consultations with qualified inquiries",
      "Document intake is guided and organised before the consult",
    ],
    gets: [
      "Repetitive eligibility questions handled automatically",
      "Inquiries qualified by program and situation",
      "Paid consults booked with serious clients",
      "Cleaner document intake",
    ],
    packageId: "business",
    ctaLabel: "Automate my practice",
    keywords: [
      "ai automation for immigration consultants",
      "immigration consultant lead qualification",
      "immigration consult booking ai",
      "rcic automation",
    ],
    related: [
      { label: "AI Automation for Law Firms", href: "/industries" },
      { label: "AI Intake Form Builder", href: "/services/ai-lead-capture-form" },
      { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
    ],
    faqs: [
      { q: "Will the AI give immigration advice?", a: "No — it handles general information, qualification and booking, and routes anything requiring professional judgement to you. It won't give regulated advice." },
      { q: "Can it collect documents securely?", a: "It guides clients through what's needed and organises intake; we design it to keep sensitive documents handled securely and only collect what your process requires." },
    ],
    schema: "Service",
    icon: "ShieldCheck",
  },

  {
    slug: "accountant-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Accountants",
    title: "AI Automation for Accountants & CPAs | Handbuilt",
    description:
      "AI that handles client questions, document collection and deadline reminders for accounting firms — reclaim time during tax season. Built for you from $1,500.",
    answer:
      "AI automation for an accounting firm answers routine client questions, chases missing documents, and sends deadline reminders — so your team focuses on the work only they can do, especially at tax time. Handbuilt builds it around your services and client workflow.",
    pain: "Accountants lose enormous time to the same client questions and to chasing documents that clients forget to send — a drag that becomes a crisis during tax season.",
    scenario:
      "A firm spends tax season answering \"what do you need from me?\" and hunting for missing paperwork. We build AI that answers common client questions, sends personalised document checklists, chases what's missing, and reminds clients of deadlines. Staff reclaim hours during the busiest weeks of the year.",
    steps: [
      "We map your services, document needs and client workflow",
      "AI answers routine client questions",
      "It sends document checklists and chases what's missing",
      "Deadline reminders go out automatically",
    ],
    gets: [
      "Routine client questions answered automatically",
      "Document collection chased without staff time",
      "Deadline reminders for clients",
      "Breathing room during tax season",
    ],
    packageId: "business",
    ctaLabel: "Automate my firm",
    keywords: [
      "ai automation for accountants",
      "accounting firm client automation",
      "tax document collection automation",
      "cpa ai assistant",
    ],
    related: [
      { label: "Automate Admin for Accountants", href: "/use-cases/automate-admin-for-accountants" },
      { label: "AI Document Generator", href: "/services/ai-document-generator" },
    ],
    faqs: [
      { q: "Can it chase clients for missing documents?", a: "Yes — it sends a personalised checklist and follows up on what's outstanding, so your team stops spending tax season hunting paperwork." },
      { q: "Is client financial data kept secure?", a: "We design intake and messaging to handle sensitive data securely and collect only what your workflow needs, aligned to your firm's requirements." },
    ],
    schema: "Service",
    icon: "Receipt",
  },
  {
    slug: "consultant-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Consultants",
    title: "AI Automation for Consultants | Handbuilt",
    description:
      "AI that qualifies leads, books discovery calls and handles proposals for independent consultants — so you spend time on clients, not admin. Built for you.",
    answer:
      "AI automation for a consultant qualifies inbound leads, books discovery calls, and speeds up proposals and onboarding — so your billable time isn't eaten by admin and follow-up. Handbuilt builds it around your niche and sales process.",
    pain: "Independent consultants sell and deliver at the same time, so leads go cold, follow-ups slip, and proposal admin steals hours that should be billable.",
    scenario:
      "A solo consultant gets referrals and inbound but can't follow up fast while delivering client work. We build AI that qualifies leads, books discovery calls, and drafts proposals from your templates. The pipeline keeps moving even in your busiest delivery weeks.",
    steps: [
      "We map your ideal client, offer and sales process",
      "AI qualifies leads and books discovery calls",
      "It follows up with prospects who go quiet",
      "Proposal drafts and onboarding are sped up from your templates",
    ],
    gets: [
      "Leads qualified and discovery calls booked",
      "Follow-up that keeps the pipeline warm",
      "Faster proposals from your templates",
      "Selling that continues while you deliver",
    ],
    packageId: "starter",
    ctaLabel: "Automate my pipeline",
    keywords: [
      "ai automation for consultants",
      "consultant lead qualification ai",
      "consulting proposal automation",
      "independent consultant ai assistant",
    ],
    related: [
      { label: "AI Automation for Agencies", href: "/industries" },
      { label: "AI Quote & Proposal Generator", href: "/services/ai-quote-generator" },
      { label: "AI Sales Assistant", href: "/services/ai-sales-assistant" },
    ],
    faqs: [
      { q: "Can it draft proposals?", a: "Yes — it drafts from your templates and the discovery details so you send tailored proposals faster and follow up automatically." },
      { q: "Will it fit my specific consulting niche?", a: "We build around your offer, ideal client and process, so qualification and messaging match your niche rather than a generic template." },
    ],
    schema: "Service",
    icon: "BarChart3",
  },

];
