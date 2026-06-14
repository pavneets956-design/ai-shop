"use client";

import { AI_AGENT_PLANS, formatPrice, type PricePlan } from "@/lib/agent/pricebook";
import { formatNum } from "@/lib/format";
import { Check } from "lucide-react";

interface PricingPlansProps {
  onSelectPlan?: (plan: PricePlan) => void;
  showDescription?: boolean;
  compact?: boolean;
}

export default function PricingPlans({ onSelectPlan, showDescription = true, compact = false }: PricingPlansProps) {
  return (
    <div className={`grid ${compact ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 lg:grid-cols-4"} gap-6`}>
      {AI_AGENT_PLANS.map((plan, index) => {
        const isPopular = plan.id === "growth";
        
        return (
          <div
            key={plan.id}
            className={`border rounded-2xl p-6 shadow-sm transition-all ${
              isPopular
                ? "border-ink/30 bg-ink/5"
                : "border-ink/10 hover:border-ink/20 bg-transparent"
            }`}
          >
            {/* Plan Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-light text-ink">{plan.name}</h3>
                {isPopular && (
                  <span className="px-2 py-1 text-xs font-light bg-ink/10 text-ink border border-ink/20 rounded">
                    Most popular
                  </span>
                )}
              </div>
              
              {/* Pricing */}
              <div className="mb-2">
                {plan.monthlyPrice ? (
                  <>
                    <span className="text-4xl font-light text-ink">{formatPrice(plan.monthlyPrice)}</span>
                    <span className="text-gray-400 font-light text-sm ml-2">/month</span>
                  </>
                ) : plan.perCallPrice ? (
                  <>
                    <span className="text-4xl font-light text-ink">{formatPrice(plan.perCallPrice)}</span>
                    <span className="text-gray-400 font-light text-sm ml-2">/call</span>
                    <p className="text-xs text-gray-500 font-light mt-1">No monthly fee</p>
                  </>
                ) : null}
              </div>
              
              {showDescription && (
                <p className="text-sm text-gray-400 font-light">{plan.description}</p>
              )}
            </div>

            {/* Limits */}
            <div className="mb-4 pb-4 border-b border-ink/10">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400 font-light">Calls:</span>
                <span className="text-ink font-light">
                  {plan.includedCalls === "usage" ? "Unlimited" : `${formatNum(plan.includedCalls)}/month`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 font-light">Numbers:</span>
                <span className="text-ink font-light">
                  {plan.maxNumbers === "usage" ? "Unlimited" : plan.maxNumbers}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300 font-light">{feature}</span>
                </div>
              ))}
            </div>

            {/* Best For */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 font-light">
                <span className="text-gray-400">Best for: </span>
                {plan.bestFor}
              </p>
            </div>

            {/* Action Button */}
            {onSelectPlan && (
              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3 rounded-lg font-light transition-all ${
                  isPopular
                    ? "bg-white text-black hover:bg-gray-200"
                    : "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5"
                }`}
              >
                Select {plan.name}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

