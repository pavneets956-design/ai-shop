/**
 * First-touch attribution, captured client-side and carried into analytics
 * events and the lead payload.
 *
 * PRIVACY CONTRACT (read before adding a field):
 *  - Only marketing metadata. Never a name, email, phone, address, free text,
 *    a full referrer query string, or anything a person typed.
 *  - sessionStorage, not a cookie: it dies with the tab, is never sent to a
 *    third party by the browser, and needs no consent banner.
 *  - Every accessor is failure-safe. Private mode, blocked storage and SSR all
 *    return an empty object rather than throwing — attribution must never be
 *    the reason a form cannot submit.
 */

const KEY = "hb_attr_v1";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  /** Referring host only — never the full URL, which can carry a query. */
  referrer_host?: string;
  /** Path the visitor first landed on, without its query string. */
  landing_path?: string;
  /** Coarse device class, from viewport width at first load. */
  device?: "mobile" | "tablet" | "desktop";
  /** ISO date (day precision) of first touch. */
  first_seen?: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
] as const;

/** Cap every value so a hostile URL cannot bloat the payload or the log line. */
const MAX = 120;
const clean = (v: string | null): string | undefined => {
  if (!v) return undefined;
  const s = v.trim().slice(0, MAX);
  return s.length ? s : undefined;
};

function deviceClass(width: number): Attribution["device"] {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Capture first touch. Safe to call on every page load — it only writes once
 * per session, so the campaign that brought someone in survives their journey
 * through the site.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const existing = read();
  if (existing) return existing;

  const attr: Attribution = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = clean(params.get(k));
      if (v) attr[k] = v;
    }
    if (document.referrer) {
      try {
        const host = new URL(document.referrer).host;
        if (host && host !== window.location.host) attr.referrer_host = host.slice(0, MAX);
      } catch {
        /* malformed referrer — skip it */
      }
    }
    attr.landing_path = window.location.pathname.slice(0, MAX);
    attr.device = deviceClass(window.innerWidth);
    attr.first_seen = new Date().toISOString().slice(0, 10);
    window.sessionStorage.setItem(KEY, JSON.stringify(attr));
  } catch {
    /* storage blocked — return whatever we assembled, persist nothing */
  }
  return attr;
}

/** Read first-touch attribution. Returns {} when unavailable. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return read() ?? captureAttribution();
}
