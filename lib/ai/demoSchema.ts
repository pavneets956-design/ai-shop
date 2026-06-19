import { z } from "zod";

/**
 * Zod validation for the AI Worker Showroom structured output. Mirrors
 * DEMO_JSON_SCHEMA in lib/data/showroom.ts. If GPT returns anything that fails
 * this, the route falls back to scriptedResponse() — never a broken error.
 */

const nullableStr = z.string().nullable();

export const capturedFieldsSchema = z.object({
  name: nullableStr,
  phone: nullableStr,
  email: nullableStr,
  service: nullableStr,
  location: nullableStr,
  urgency: nullableStr,
  budget: nullableStr,
  preferredTime: nullableStr,
  missingInfo: z.array(z.string()).max(6),
});

export const demoResponseSchema = z.object({
  assistantMessage: z.string().min(1).max(800),
  capturedFields: capturedFieldsSchema,
  leadSummary: z.string().max(300),
  nextActions: z.array(z.string()).max(6),
  systemEvents: z.array(z.string()).max(4),
  suggestedReplies: z.array(z.string()).max(4),
  cta: z.object({
    show: z.boolean(),
    label: z.string().max(80),
    href: z.string().max(120),
  }),
});

export type DemoResponseParsed = z.infer<typeof demoResponseSchema>;
