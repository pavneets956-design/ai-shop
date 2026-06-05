import Reveal from "./Reveal";
import { Workflow, MessagesSquare, Target, Layers, Zap, KeyRound } from "lucide-react";

const points = [
  { icon: Workflow, title: "Built around your workflow", body: "Not a template you bend to fit. We build to how you already work." },
  { icon: MessagesSquare, title: "Plain language, no tech confusion", body: "You describe the outcome. We handle every technical decision." },
  { icon: Target, title: "Business-first, not AI hype", body: "We build the thing that saves time or makes money — nothing else." },
  { icon: Layers, title: "Design + automation + deployment", body: "One person who designs it, builds it, and ships it live." },
  { icon: Zap, title: "Fast iteration", body: "Live in days, tuned in real time. No six-month agency timelines." },
  { icon: KeyRound, title: "You own what we build", body: "Custom apps ship on an ownable stack. No lock-in, ever." },
];

export default function WhyAIShop() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p, idx) => {
        const Icon = p.icon;
        return (
          <Reveal key={p.title} delay={(idx % 3) * 0.06}>
            <div className="glass-card h-full">
              <Icon className="h-6 w-6 text-electric" />
              <h3 className="mt-4 font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
