import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getStripe, appUrl } from "@/lib/stripe";

export const runtime = "nodejs";

/** Open the Stripe billing portal so a subscriber can manage/cancel their plan. */
export async function POST() {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });
  }

  const sessionUser = await getCurrentUser().catch(() => null);
  const userId = (sessionUser as { id?: string } | null)?.id;
  if (!userId) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "No billing account found." }, { status: 400 });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${appUrl()}/account`,
  });

  return NextResponse.json({ url: portal.url });
}
