// Answer-first FAQs — written to be cited by AI search (ChatGPT, Perplexity,
// Google AI Overviews) AND rendered as FAQPage schema. Keep answers 2–4 sentences.
export interface FAQ {
  q: string;
  a: string;
  category: "general" | "pricing" | "process" | "technical";
}

export const faqs: FAQ[] = [
  {
    category: "general",
    q: "What can Handbuilt build for my business?",
    a: "Handbuilt builds custom AI tools, agents, automations, chatbots, dashboards and full apps. Common builds include an AI receptionist that answers calls 24/7, a lead follow-up agent, an invoice reminder system, a website chatbot, and custom business dashboards. If a task is repetitive or you're losing leads to slow replies, it can probably be automated.",
  },
  {
    category: "general",
    q: "Can you build a custom AI app?",
    a: "Yes. Custom AI apps are a core service — web apps, internal tools, customer portals and SaaS MVPs with AI logic, user accounts, databases and payments built in. You own the code. Custom apps start from $7,500 CAD and are scoped on a short call.",
  },
  {
    category: "general",
    q: "Do I need technical knowledge to work with Handbuilt?",
    a: "No. You describe the outcome you want in plain language — \"answer my phone\", \"stop chasing invoices\", \"get more leads\" — and Handbuilt designs and builds the system. There's nothing to install or configure on your end.",
  },
  {
    category: "technical",
    q: "Can you connect AI to my existing website?",
    a: "Yes. Handbuilt can add a chatbot, AI search, smart lead-capture forms or product recommendations to a site you already have, without rebuilding it. Adding AI to an existing website typically starts from $1,000 CAD.",
  },
  {
    category: "general",
    q: "Can AI help local service businesses like trades, clinics and salons?",
    a: "Absolutely — local service businesses are a primary focus. The highest-impact builds are an AI receptionist (so you never miss a call on a job), automated booking and no-show reminders, and instant lead follow-up. Most local businesses start seeing time savings within the first week.",
  },
  {
    category: "general",
    q: "Do you build personal AI apps, not just business tools?",
    a: "Yes. Handbuilt builds private personal apps too — planners, finance trackers, study and coaching assistants, and habit tools — built around how you actually live, not a generic template.",
  },
  {
    category: "pricing",
    q: "How much does it cost to build an AI tool or app?",
    a: "Handbuilt has three clear tiers: Starter AI Setup at $1,000 CAD flat for one tool, Business AI System from $2,500 CAD for a connected system, and Custom AI App from $7,500 CAD for a full build. There's also an optional AI Care Plan at $250/month for hosting, monitoring and ongoing tweaks.",
  },
  {
    category: "pricing",
    q: "How much does an AI receptionist cost for a small business?",
    a: "An AI receptionist starts at $1,000 CAD as a Starter AI Setup — it answers calls and messages 24/7, books appointments and texts you the details. If you want it connected to your CRM, calendar and follow-up workflows, that's the Business AI System from $2,500 CAD.",
  },
  {
    category: "process",
    q: "How long does it take to build?",
    a: "A Starter AI Setup is usually live in about 5 business days. A Business AI System takes 2–3 weeks. A Custom AI App is typically 4–8 weeks depending on scope. You get a clear timeline before any work begins.",
  },
  {
    category: "process",
    q: "How do I start?",
    a: "Use the AI Solution Finder on the homepage — pick what you want AI to do and answer two quick questions, and you'll get a recommended build and price in seconds. From there you book a free 15-minute call to confirm scope, then the build begins.",
  },
  {
    category: "process",
    q: "What happens after the build is done?",
    a: "Every tier includes post-launch support (14–60 days depending on tier). After that, the optional AI Care Plan ($250/month) covers hosting, monitoring, monthly tweaks and priority support so your AI keeps running without you thinking about it.",
  },
  {
    category: "technical",
    q: "Will I own what you build?",
    a: "Yes — for custom apps you own the code and it's built on a modern, ownable stack with no lock-in. For tools and automations, you own your data and accounts. You're never trapped in a proprietary platform you can't leave.",
  },
];

export function faqsByCategory(category: FAQ["category"]): FAQ[] {
  return faqs.filter((f) => f.category === category);
}
