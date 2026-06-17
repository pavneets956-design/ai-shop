import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
// Stripe needs the raw, unparsed body to verify the signature.
export const dynamic = "force-dynamic";

/**
 * Stripe webhook → keeps each User's subscription fields in sync.
 * Set STRIPE_WEBHOOK_SECRET and point a Stripe webhook at /api/stripe/webhook
 * for: checkout.session.completed, customer.subscription.updated|deleted.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("[STRIPE] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        if (s.subscription && s.customer) {
          const sub = await stripe.subscriptions.retrieve(s.subscription as string);
          await syncSubscription(sub, s.customer as string);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await syncSubscription(sub, sub.customer as string);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("[STRIPE] handler error", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function syncSubscription(sub: Stripe.Subscription, customerId: string) {
  // Keep access during a brief failed-renewal retry (past_due); only truly drop
  // it once Stripe reports the sub canceled/unpaid/expired (or fires .deleted).
  const active =
    sub.status === "active" || sub.status === "trialing" || sub.status === "past_due";
  const data = {
    stripeCustomerId: customerId,
    stripeSubscriptionId: sub.id,
    stripePriceId: sub.items.data[0]?.price.id ?? null,
    // Null out the period when lapsed so access ends.
    stripeCurrentPeriodEnd: active ? new Date(sub.current_period_end * 1000) : null,
  };

  const res = await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data,
  });

  // If no row matched the customer (e.g. the webhook beat the customer-link
  // write, or the customer was created out-of-band), fall back to the userId we
  // stamped on the subscription metadata at checkout. Never silently drop a sub.
  if (res.count === 0) {
    const userId = sub.metadata?.userId;
    if (userId) {
      await prisma.user
        .update({ where: { id: userId }, data })
        .catch((e) => console.error("[STRIPE] metadata-userId sync failed", e));
    } else {
      console.error("[STRIPE] no user matched customer", customerId, "and no metadata.userId");
    }
  }
}
