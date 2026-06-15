import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export interface SubStatus {
  authed: boolean;
  subscribed: boolean;
  userId?: string;
  email?: string;
  currentPeriodEnd?: Date | null;
}

/** True if the user has a Stripe period that hasn't ended (small grace window). */
export function isActive(currentPeriodEnd?: Date | null): boolean {
  if (!currentPeriodEnd) return false;
  // 1-day grace so a brief webhook delay near renewal doesn't lock a payer out.
  return currentPeriodEnd.getTime() + 24 * 60 * 60 * 1000 > Date.now();
}

/**
 * Resolve the current session's subscription status. Used to gate the tools
 * (page + API). Fails safe to "not subscribed" if anything is misconfigured.
 */
export async function getSubStatus(): Promise<SubStatus> {
  const sessionUser = await getCurrentUser().catch(() => null);
  const id = (sessionUser as { id?: string } | null)?.id;
  if (!id) return { authed: false, subscribed: false };

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, stripeCurrentPeriodEnd: true },
    });
    if (!user) return { authed: true, subscribed: false };
    return {
      authed: true,
      subscribed: isActive(user.stripeCurrentPeriodEnd),
      userId: user.id,
      email: user.email,
      currentPeriodEnd: user.stripeCurrentPeriodEnd,
    };
  } catch {
    // DB unreachable — don't grant access on error.
    return { authed: true, subscribed: false, userId: id };
  }
}
