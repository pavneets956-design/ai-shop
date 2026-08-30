import { NextResponse } from "next/server";
import { site } from "@/lib/data/site";
import { sitemapUrls } from "@/app/sitemap";

// Submit all known URLs to IndexNow (Bing, Yandex, etc.) in one call.
// Protected by a secret so randoms can't trigger mass pings.
//   GET /api/indexnow?secret=<INDEXNOW_PING_SECRET>
// Set INDEXNOW_PING_SECRET in the environment. Call manually after a deploy,
// or wire to a Vercel Cron / deploy hook.
//
// The key file is public/<indexNowKey>.txt — verified present and matching
// site.indexNowKey on 2026-08-30, and 200 on production.
//
// 2026-08-30: the URL list is now `sitemapUrls()` instead of a hand-typed set
// of nine paths. The old list silently omitted /tools and the five tool pages,
// /shop, /faq, /about, /create and /locations — a third of the indexable site
// was never submitted.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  const expected = process.env.INDEXNOW_PING_SECRET;

  if (!expected) {
    // NO SILENT STATES: an unset secret is a configuration gap, not a crash.
    // 503 + a message that names the variable and what to do, and a server log
    // so the failure is visible to a human, not only to the caller.
    console.error(
      "[indexnow] INDEXNOW_PING_SECRET is not set in this environment — ping refused, nothing submitted."
    );
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured",
        message:
          "IndexNow is not configured on this deployment. Set INDEXNOW_PING_SECRET in the Vercel project's environment variables, redeploy, then retry.",
      },
      { status: 503 }
    );
  }
  if (secret !== expected) {
    return NextResponse.json(
      { ok: false, error: "unauthorized", message: "Wrong or missing ?secret= value." },
      { status: 401 }
    );
  }

  const host = new URL(site.url).host;
  const urlList = sitemapUrls();

  const body = {
    host,
    key: site.indexNowKey,
    keyLocation: `${site.url}/${site.indexNowKey}.txt`,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`[indexnow] api.indexnow.org responded ${res.status}; ${urlList.length} URLs not accepted.`);
    }

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        submitted: res.ok ? urlList.length : 0,
        ...(res.ok
          ? {}
          : { message: `IndexNow rejected the submission with HTTP ${res.status}. Nothing was indexed.` }),
      },
      { status: res.ok ? 200 : 502 }
    );
  } catch (err) {
    // A network failure must not be silent either.
    console.error("[indexnow] submission failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "upstream_unreachable",
        message: "Could not reach api.indexnow.org. Nothing was submitted; retry later.",
      },
      { status: 502 }
    );
  }
}
