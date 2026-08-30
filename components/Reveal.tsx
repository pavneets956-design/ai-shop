/**
 * The site-wide Reveal.
 *
 * This used to be a framer-motion component with `initial="hidden"`, which put
 * `opacity: 0` into the server-rendered HTML of roughly 210 landing routes —
 * H1, lead and CTA included — and had no `prefers-reduced-motion` handling. It
 * is now a thin re-export of the CSS reveal, which renders visible and only
 * animates below-the-fold content after hydration.
 *
 * Keeping the module path means the 13 importing files did not have to change,
 * and framer-motion is no longer pulled into pages that only faded content in.
 */
export { default } from "@/components/marketing/Reveal";
export type { RevealTag } from "@/components/marketing/Reveal";
