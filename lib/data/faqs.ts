import { HOME_OBJECTIONS } from "./homeFaqs";
import { packagePriceLabel, phonePlan, carePlan } from "./packages";
export interface FAQ {
  q: string;
  a: string;
  category: "general" | "pricing" | "process" | "technical";
}
export const faqs: FAQ[] = [
  ...HOME_OBJECTIONS.map((faq): FAQ => ({ ...faq, category: "general" })),
  { category: "pricing", q: "How much does an AI tool or app cost?", a: `Starter builds are ${packagePriceLabel("starter").toLowerCase()} CAD; Business systems are ${packagePriceLabel("business")} CAD; custom apps are ${packagePriceLabel("custom").toLowerCase()} CAD. Websites and 3D experiences are quoted to scope. Provider subscriptions and usage are explained separately.` },
  { category: "pricing", q: "How much does phone reception cost?", a: `Phone reception is separately scoped, with setup ${packagePriceLabel("starter").toLowerCase()} CAD, service from $${phonePlan.monthly}/month CAD, plus phone and AI provider usage. Agreed capabilities, limits and human handover are tested before launch.` },
  { category: "process", q: "How do I start?", a: "Use the project request form and describe what you want to build. Pavneet replies within one business day to discuss the scope and next steps. You do not need a finished technical brief." },
  { category: "technical", q: "Can you work with my existing website or tools?", a: "Yes, where the platform supports the integration. We check API access, account permissions, data handling and ongoing costs before including an integration in the scope." },
];
export function faqsByCategory(category: FAQ["category"]): FAQ[] { return faqs.filter(f => f.category === category); }
export function pricingPageFaqs(): FAQ[] { return [
  { category: "process", q: "What does the quote include?", a: "Your written scope sets out the deliverables, milestones, review rounds, handover and support period. Hosting, subscriptions, licensed assets and usage costs are identified separately. Changes to scope are agreed before work is added." },
  { category: "process", q: "Will I own the finished work?", a: "You receive the custom source code, business data and accounts under the agreed scope. Third-party services and assets keep their own licences, which we identify before the build." },
  { category: "technical", q: "Can you connect it to my existing tools?", a: "We check the integrations your project needs, including whether your account has the right API access and permissions. The quote includes the specific connections we agree to support." },
  { category: "process", q: "How long does a build take?", a: "Indicative AI package timelines are about 5 business days for a focused Starter build, 2–3 weeks for a Business system and 4–8 weeks for a custom app. Design, 3D assets, integrations and review time can change the schedule. Your project gets its own timeline before we start." },
  { category: "pricing", q: "Are there ongoing costs?", a: `Hosting, domain renewals and third-party subscriptions or usage may be needed. Optional AI care starts at $${carePlan.monthly}/month CAD. Phone reception has a separate service fee from $${phonePlan.monthly}/month CAD plus provider usage. These costs are explained before launch.` },
  { category: "process", q: "Can I start small?", a: "Yes. A focused first version helps us test the idea and learn what is useful. Later additions are scoped separately; some may need changes to the original system." },
]; }
