"use client";

import { Analytics } from "@vercel/analytics/next";
import { filterAnalyticsEvent } from "@/lib/analyticsPreference";

export default function SiteAnalytics() {
  return <Analytics beforeSend={filterAnalyticsEvent} />;
}
