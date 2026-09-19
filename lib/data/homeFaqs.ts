import { carePlan, packagePriceLabel, phonePlan } from "./packages";
/** Shared visible answers and FAQ schema. */
export const HOME_OBJECTIONS = [
  {
    q: "What can you build?",
    a: "Custom websites, landing pages, interactive 3D web experiences, web apps, internal tools, AI agents and business automations. We start with your idea, agree a realistic scope and build a first version you can review. Complex integrations and specialist requirements are assessed before I quote.",
  },
  {
    q: "Do I need a finished brief?",
    a: "No. A rough idea, an example you like or a task you keep repeating is enough to start. I will ask about the people using it, what it needs to do and the tools you already have, then suggest a practical scope.",
  },
  {
    q: "How much does a project cost?",
    a: `Websites and interactive experiences are quoted for their scope. AI Starter builds are ${packagePriceLabel("starter").toLowerCase()} CAD, connected AI Business Systems are ${packagePriceLabel("business")} CAD, and custom AI apps are ${packagePriceLabel("custom").toLowerCase()} CAD. These are one-time build prices. Hosting, paid tools and usage are agreed separately; optional care starts at $${carePlan.monthly}/month CAD.`,
  },
  {
    q: "How is phone reception priced?",
    a: `Phone reception is scoped separately from a text-based AI worker. Setup is ${packagePriceLabel("starter").toLowerCase()} CAD, with service from $${phonePlan.monthly}/month CAD plus phone and AI provider usage. We agree call routing, integrations, usage limits and the fallback before launch. The demo on this site is text-based and simulates business actions.`,
  },
  {
    q: "Who owns the finished work?",
    a: "Your custom code, content, accounts and business data are handed over to you under the agreed scope. Third-party software, fonts and assets retain their own licences. You receive a walkthrough and the information needed to run the work or take it to another developer.",
  },
  {
    q: "How do we work together?",
    a: "You work directly with Pavneet. We clarify the brief, agree a fixed quote, review the design or working prototype, then build and test it before handover. Changes outside the agreed scope are discussed before extra work begins.",
  },
  {
    q: "What happens after launch?",
    a: "The build includes the support period specified in your package or quote. After that, you can request changes or choose an optional care plan. Hosting and third-party services still need to be maintained and paid for, even if you stop using my support.",
  },
];
export const HOME_FAQS = HOME_OBJECTIONS;
