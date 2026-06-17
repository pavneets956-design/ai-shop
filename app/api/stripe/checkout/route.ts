import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getStripe, appUrl } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Create a Stripe Checkout session for a Tools Pro subscription.
 * Requires a signed-in user. Returns { url } to redirect the browser to.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });
  }

  const sessionUser = await getCurrentUser().catch(() => null);
  const userId = (sessionUser as { id?: string } | null)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  let priceId = "";
  try {
    const body = (await req.json()) as { priceId?: string };
    priceId = typeof body.priceId === "string" ? body.priceId : "";
  } catch {
    /* no body */
  }
  if (!priceId) {
    return NextResponse.json({ error: "Missing plan." }, { status: 400 });
  }

  // Only allow the two configured Tools Pro prices — never trust a client-sent
  // Price ID (a user could otherwise POST a cheaper Price from the account).
  const allowed = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL,
  ].filter(Boolean);
  if (!allowed.includes(priceId)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  // Reuse or create the Stripe customer.
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: { userId },
    });
    customerId = customer.id;
    await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${appUrl()}/account?checkout=success`,
    cancel_url: `${appUrl()}/tools/pro?checkout=cancelled`,
    metadata: { userId },
    subscription_data: { metadata: { userId } },
  });

  return NextResponse.json({ url: checkout.url });
}
