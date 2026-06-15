import { NextResponse } from "next/server";
import { site } from "@/lib/data/site";
import { allLandingEntries } from "@/lib/data/registry";

// Submit all known URLs to IndexNow (Bing, Yandex, etc.) in one call.
// Protected by a secret so randoms can't trigger mass pings.
//   GET /api/indexnow?secret=<INDEXNOW_PING_SECRET>
// Set INDEXNOW_PING_SECRET in the environment. Call manually after a deploy,
// or wire to a Vercel Cron / deploy hook.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  const expected = process.env.INDEXNOW_PING_SECRET;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_PING_SECRET not configured" },
      { status: 500 }
    );
  }
  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const host = new URL(site.url).host;
  const staticPaths = [
    "",
    "/services",
    "/industries",
    "/resources",
    "/how-to",
    "/compare",
    "/pricing",
    "/use-cases",
    "/solutions",
  ];
  const urlList = [
    ...staticPaths.map((p) => `${site.url}${p}`),
    ...allLandingEntries().map((e) => `${site.url}${e.path}`),
  ];

  const body = {
    host,
    key: site.indexNowKey,
    keyLocation: `${site.url}/${site.indexNowKey}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({
    ok: res.ok,
    status: res.status,
    submitted: urlList.length,
  });
}
