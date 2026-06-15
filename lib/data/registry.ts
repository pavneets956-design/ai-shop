// Central registry of every programmatic landing page. Single source for
// sitemap.xml and llms.txt so they never drift from the data files.
import { moneyPages } from "./money";
import { services } from "./services";
import { industries } from "./industries";
import { comparisons } from "./compare";
import { resources } from "./resources";
import { howtos } from "./howto";
import { useCases } from "./useCases";
import { type PageType, type LandingContent, landingPath } from "./landing";

export interface RegistryGroup {
  type: PageType;
  /** Hub page path for this group, e.g. "/services". */
  hub: string;
  label: string;
  priority: number;
  items: LandingContent[];
}

export const landingGroups: RegistryGroup[] = [
  { type: "money", hub: "/services", label: "Core AI Services", priority: 0.9, items: moneyPages },
  { type: "service", hub: "/services", label: "AI Services", priority: 0.8, items: services },
  { type: "industry", hub: "/industries", label: "AI by Industry", priority: 0.8, items: industries },
  { type: "resource", hub: "/resources", label: "Resources & Guides", priority: 0.7, items: resources },
  { type: "howto", hub: "/how-to", label: "How-to Guides", priority: 0.6, items: howtos },
  { type: "compare", hub: "/compare", label: "Comparisons", priority: 0.6, items: comparisons },
];

export interface RegistryEntry {
  path: string;
  priority: number;
  type: string;
  h1: string;
  description: string;
}

/** Every landing page (incl. money pages + use-cases) as flat sitemap rows. */
export function allLandingEntries(): RegistryEntry[] {
  const out: RegistryEntry[] = [];
  for (const g of landingGroups) {
    for (const it of g.items) {
      out.push({
        path: landingPath(g.type, it.slug),
        priority: g.priority,
        type: g.type,
        h1: it.h1,
        description: it.description,
      });
    }
  }
  for (const u of useCases) {
    out.push({
      path: `/use-cases/${u.slug}`,
      priority: 0.7,
      type: "usecase",
      h1: `${u.solution} for ${u.industry}`,
      description: u.answer,
    });
  }
  return out;
}
