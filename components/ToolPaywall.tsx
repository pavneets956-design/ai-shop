import { Lock } from "lucide-react";
import ProCheckout from "@/components/ProCheckout";

/**
 * Shown in place of a tool's generator when the visitor isn't a subscriber.
 * Server-rendered wrapper; ProCheckout (client) handles sign-in/checkout.
 */
export default function ToolPaywall({
  toolName,
  callbackUrl,
}: {
  toolName: string;
  callbackUrl: string;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-clay/20 bg-clay/[0.06] px-4 py-3 text-sm text-ink/75">
        <Lock className="h-4 w-4 flex-none text-clay-dark" />
        <span>
          <span className="font-semibold text-ink">{toolName}</span> is a Tools Pro tool. Subscribe
          to use it and every other tool, unlimited.
        </span>
      </div>
      <ProCheckout callbackUrl={callbackUrl} />
    </div>
  );
}
