import Reveal from "./Reveal";
import { MessageSquare, Map, Hammer, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Tell us your goal", body: "Plain language — “answer my phone”, “get more leads”, “build me an app”. No tech talk." },
  { icon: Map, title: "We map the AI system", body: "We design the exact tools, agents and automations that hit your outcome — and quote it." },
  { icon: Hammer, title: "We build & connect it", body: "We build it, train it on your business, and wire it into the tools you already use." },
  { icon: Rocket, title: "You use it in real life", body: "It goes live and starts working. We support and tune it so it keeps earning its keep." },
];

export default function HowItWorks() {
  return (
    <div className="relative">
      {/* connecting line */}
      <div className="absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={idx * 0.08}>
              <div className="relative text-center lg:text-left">
                <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-ink/10 bg-paper-100 lg:mx-0">
                  <Icon className="h-6 w-6 text-ink" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white lg:left-[52px] lg:right-auto">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
