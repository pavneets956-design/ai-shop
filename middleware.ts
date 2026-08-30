import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import withAuth, { type NextRequestWithAuth } from "next-auth/middleware";

/**
 * Edge gate for the outbound-calling "agent" subsystem.
 *
 * BEFORE (2026-08-12 → 2026-08-30) this file was three lines:
 *
 *     export { default } from "next-auth/middleware";
 *     export const config = { matcher: ["/agent/:path*"] };
 *
 * The matcher covered the `/agent/*` **pages** only. Every `/api/agent/*`
 * **handler** was therefore reachable by anyone on the internet: contacts PII
 * dump, mass-assignment contact writes, and a `PUT /api/agent/call` that dials
 * an arbitrary number through Twilio. See `research/transformation-2026-08-30/
 * 08-tests-prod-risk.md` §2.1.
 *
 * NOW, two locks:
 *
 *   1. KILL SWITCH. Unless `AGENT_SUBSYSTEM_ENABLED === "true"`, both the pages
 *      and the API answer **404** — the subsystem is indistinguishable from a
 *      route that was never built. The variable is set in no environment, so
 *      this ships dark. Nothing is deleted and no data is dropped; flipping one
 *      env var brings it all back.
 *
 *   2. SESSION. When the switch is on, `/agent/*` pages go through NextAuth as
 *      before. `/api/agent/*` is deliberately passed through here and checked
 *      inside each handler via `guardAgentApi()` — NextAuth's middleware answers
 *      an unauthenticated API request with a 307 to an HTML login page, which a
 *      `fetch()` caller cannot read and a smoke test can mistake for "reachable".
 *      A JSON 401 from the handler is the honest answer.
 *
 * The matcher only ever runs on agent paths; the rest of the site is untouched.
 */

const requireSession = withAuth({ pages: { signIn: "/login" } });

function isAgentPath(pathname: string): boolean {
  return (
    pathname === "/agent" ||
    pathname.startsWith("/agent/") ||
    pathname === "/api/agent" ||
    pathname.startsWith("/api/agent/")
  );
}

/** JSON 404 for API callers. */
function apiNotFound(): NextResponse {
  return NextResponse.json(
    { error: "Not found" },
    { status: 404, headers: { "x-robots-tag": "noindex, nofollow" } },
  );
}

/**
 * HTML 404 for page callers. Middleware cannot render `app/not-found.tsx`, and
 * an empty 404 body is a silent state — so this is a small, self-contained page
 * with a real way back to the site.
 */
function pageNotFound(): NextResponse {
  const html = `<!doctype html><html lang="en-CA"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Page not found | Handbuilt AI</title>
<style>
 :root{color-scheme:light}
 body{margin:0;min-height:100vh;display:grid;place-items:center;background:#FBFAF8;color:#191716;
      font:16px/1.5 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:24px}
 main{max-width:32rem;text-align:center}
 h1{font-size:1.75rem;margin:0 0 .75rem}
 p{margin:0 0 1.5rem;color:#5b5754}
 a{display:inline-block;padding:.7rem 1.25rem;border-radius:.6rem;background:#191716;color:#fff;text-decoration:none}
</style></head>
<body><main>
<h1>Page not found</h1>
<p>This page isn&rsquo;t part of the site.</p>
<a href="/">Go to the homepage</a>
</main></body></html>`;
  return new NextResponse(html, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "no-store",
    },
  });
}

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (!isAgentPath(pathname)) return NextResponse.next();

  // Lock 1 — kill switch.
  if (process.env.AGENT_SUBSYSTEM_ENABLED !== "true") {
    return pathname.startsWith("/api/") ? apiNotFound() : pageNotFound();
  }

  // Lock 2 — API auth is enforced in the handlers (JSON 401, not an HTML
  // login redirect). Pages keep the NextAuth redirect, which is right for a
  // browser navigation.
  if (pathname.startsWith("/api/")) return NextResponse.next();

  return requireSession(req as NextRequestWithAuth, event);
}

export const config = {
  matcher: [
    "/agent/:path*", // agent dashboard & CRM pages
    "/api/agent/:path*", // agent API — was unprotected until 2026-08-30
  ],
};
