import type { Metadata } from "next";
import QuietHoursClient from "@/components/quiet-hours/QuietHoursClient";

export const metadata: Metadata = {
  title: "The Quiet Hours",
  description:
    "The work doesn't stop when you do. A cinematic look at the AI workers Handbuilt builds to take the after-hours admin off your plate.",
  alternates: { canonical: "/quiet-hours" },
  robots: { index: false, follow: true }, // showpiece route — keep out of the index for now
};

export default function QuietHoursPage() {
  return <QuietHoursClient />;
}
