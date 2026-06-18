"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { businessTypes, buildPlan, type BuildPlan } from "@/lib/data/builder";
import styles from "./HeroBuilder.module.css";

type Phase = "working" | "done";

/**
 * The hero's interactive "Build my AI system" moment — the calm-premium amber
 * expression of "tell me what you want, watch the system + estimate appear".
 *
 * Fully deterministic (lib/data/builder.ts): a business type + free-text want
 * maps to a tailored blueprint + an ESTIMATE RANGE. No API, no auto-quote, no
 * voice latency — it's instant, which is the whole point vs the old slow call.
 */
export default function HeroBuilder() {
  const [bizKey, setBizKey] = useState(businessTypes[0].key);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("working");
  const [plan, setPlan] = useState<BuildPlan | null>(null);
  const [shownSteps, setShownSteps] = useState(0);
  const [showEstimate, setShowEstimate] = useState(false);
  const [workIdx, setWorkIdx] = useState(0);

  const runId = useRef(0);
  const reduceRef = useRef(false);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduceRef.current ? Math.min(ms, 30) : ms));

  const run = useCallback(async (key: string, want: string) => {
    const myId = ++runId.current;
    const stale = () => myId !== runId.current;
    const p = buildPlan(key, want);

    setPhase("working");
    setPlan(p);
    setShownSteps(0);
    setShowEstimate(false);
    setWorkIdx(0);

    // staged "designing…" lines
    for (let i = 0; i < p.workingLabels.length; i++) {
      setWorkIdx(i);
      await sleep(360); if (stale()) return;
    }

    setPhase("done");
    for (let i = 1; i <= p.steps.length; i++) {
      await sleep(240); if (stale()) return;
      setShownSteps(i);
    }
    await sleep(300); if (stale()) return;
    setShowEstimate(true);
  }, []);

  useEffect(() => {
    reduceRef.current =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    // Auto-demo the first business so the hero is alive on load, then invites "type yours".
    void run(businessTypes[0].key, businessTypes[0].sample);
    return () => {
      runId.current++;
    };
  }, [run]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const biz = businessTypes.find((b) => b.key === bizKey) || businessTypes[0];
    void run(bizKey, text.trim() || biz.sample);
  };

  const pickBiz = (key: string) => {
    setBizKey(key);
    const biz = businessTypes.find((b) => b.key === key) || businessTypes[0];
    void run(key, text.trim() || biz.sample);
  };

  const curBiz = businessTypes.find((b) => b.key === bizKey) || businessTypes[0];
  // Carry the designed plan into /create as a pre-filled goal (the form reads ?goal=).
  const createHref = plan
    ? `/create?goal=${encodeURIComponent(`${plan.system} for my ${curBiz.noun}`)}`
    : "/create";

  return (
    <div className={styles.host}>
      <div className={styles.console}>
        <div className={styles.head}>
          <div className={styles.ttl}>
            <i aria-hidden="true" />
            Build my AI system
          </div>
          <div className={styles.meta}>builds in real time</div>
        </div>

        {/* persistent control: business + want */}
        <form className={styles.control} onSubmit={submit}>
          <div className={styles.promptLbl}>What do you want off your plate?</div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. answer my calls and book jobs"
              aria-label="What do you want the AI to do?"
            />
            <button className={styles.build} type="submit" aria-label="Build my AI system">
              Build <span className={styles.arrow}>→</span>
            </button>
          </div>
          <div className={styles.chips}>
            {businessTypes.map((b) => (
              <button
                key={b.key}
                type="button"
                aria-pressed={bizKey === b.key}
                className={`${styles.chip} ${bizKey === b.key ? styles.chipOn : ""}`}
                onClick={() => pickBiz(b.key)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </form>

        {/* output */}
        <div className={styles.output} aria-live="polite">
          {phase === "working" && plan && (
            <div className={styles.working} role="status" key={`w-${workIdx}`}>
              <span className={styles.spinner} aria-hidden="true" />
              <span>{plan.workingLabels[workIdx]}</span>
            </div>
          )}

          {phase === "done" && plan && (
            <>
              <div className={styles.sysTag}>
                <span className={styles.sysName}>{plan.system}</span>
                <span className={styles.sysWhy}>{plan.tagline}</span>
              </div>

              <div className={styles.blueprint}>
                {plan.steps.map((s, i) => (
                  <div
                    key={`${plan.intent}-${i}`}
                    className={`${styles.node} ${i < shownSteps ? styles.nodeOn : ""}`}
                  >
                    <div className={styles.rail}>
                      <span className={styles.dot} />
                      {i < plan.steps.length - 1 && <span className={styles.line} />}
                    </div>
                    <div className={styles.nbody}>
                      <div className={styles.nlabel}>{s.label}</div>
                      {s.sub && <div className={styles.nsub}>{s.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`${styles.estimate} ${showEstimate ? styles.estOn : ""}`}>
                <div className={styles.estItem}>
                  <div className={styles.estLbl}>Build</div>
                  <div className={styles.estVal}>{plan.priceRange}</div>
                </div>
                <div className={styles.estItem}>
                  <div className={styles.estLbl}>Live in</div>
                  <div className={styles.estVal}>{plan.timeline}</div>
                </div>
                <div className={styles.estItem}>
                  <div className={styles.estLbl}>Impact</div>
                  <div className={styles.estVal}>{plan.impact}</div>
                </div>
              </div>

              {showEstimate && (
                <>
                  <div className={styles.connects}>Connects with {plan.connects}</div>
                  <div className={styles.ctaRow}>
                    <Link className={styles.getBuilt} href={createHref}>
                      Get this built <span className={styles.arrow}>→</span>
                    </Link>
                    <a className={styles.again} href="#lab">
                      Try a live demo ↓
                    </a>
                  </div>
                  <div className={styles.disclaimer}>
                    Estimate only — final scope &amp; price confirmed on a quick call. <b>We reply within 1 business day.</b>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <Link className={styles.talk} href="/start">
          <span className={styles.talkDot} aria-hidden="true" />
          <span className={styles.talkTxt}>
            Or just talk to the AI — it asks what you need, then takes you to the right page
          </span>
          <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </div>
  );
}
