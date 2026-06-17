"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { liveTools, outcomes, pricingTiers, type LiveTool } from "@/lib/data/liveTools";
import styles from "./LiveAIHome.module.css";

const byKey: Record<string, LiveTool> = Object.fromEntries(liveTools.map((t) => [t.key, t]));

/* ---- icons (no emojis) ---- */
const ICONS: Record<string, JSX.Element> = {
  receptionist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2.5" y="12.5" width="4" height="6" rx="1.4" /><rect x="17.5" y="12.5" width="4" height="6" rx="1.4" /><path d="M20 18.5a3.5 3.5 0 0 1-3.5 3.5H14" /></svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M13 2v6h6" /><path d="M9 13h6M9 17h4" /></svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77 6.8 19.5l.99-5.79-4.21-4.1 5.82-.85z" /></svg>
  ),
  followup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3L11 14" /><path d="M22 3l-7 19-4-8-8-4z" /></svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M14.6 9.3c-.5-.8-1.5-1.3-2.6-1.3-1.5 0-2.6.8-2.6 1.9 0 1.2 1.1 1.6 2.7 1.9 1.6.3 2.7.8 2.7 2 0 1.1-1.1 1.9-2.7 1.9-1.2 0-2.2-.5-2.7-1.3M12 6.6v10.8" /></svg>
  ),
  proposal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>
  ),
};
const CK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
const MSG = <svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11.1c0 2.5 1.4 4.7 3.6 6.2-.2 1.2-.8 2.4-1.8 3.4 1.7-.2 3.3-.8 4.7-1.7 1.1.3 2.3.5 3.5.5 5.5 0 10-3.6 10-8.1S17.5 3 12 3z" /></svg>;
const SND_ON = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4z" /><path d="M19 5a10 10 0 0 1 0 14M15.5 8.5a5 5 0 0 1 0 7" /></svg>;
const SND_OFF = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4z" /><path d="M22 9l-6 6M16 9l6 6" /></svg>;
const GG = (
  <svg className={styles.grG} viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.25c0-.78-.07-1.53-.2-2.25H12v4.5h6.18a5.3 5.3 0 0 1-2.29 3.46v2.78h3.7C21.7 18.67 23 15.75 23 12.25z" /><path fill="#34A853" d="M12 24c3.1 0 5.7-1.02 7.6-2.76l-3.7-2.78c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.74H1.72v2.86A11.99 11.99 0 0 0 12 24z" /><path fill="#FBBC05" d="M5.55 14.82a7.2 7.2 0 0 1 0-4.62V7.34H1.72a12 12 0 0 0 0 10.78l3.83-3z" /><path fill="#EA4335" d="M12 4.75c1.69 0 3.2.58 4.4 1.72l3.28-3.28A11.97 11.97 0 0 0 12 0 11.99 11.99 0 0 0 1.72 7.34l3.83 3C6.46 6.77 9 4.75 12 4.75z" /></svg>
);

type Block =
  | { t: "chat"; who: "ai" | "cust"; text: string }
  | { t: "quote"; title: string; svc: string; rows: [string, string][]; estLabel: string; est: string }
  | { t: "text"; head: string; text: string }
  | { t: "sms"; from: string; text: string; chip?: string }
  | { t: "proposal"; sections: [string, string][] }
  | { t: "gresponse"; biz: string; time: string; text: string };

export default function LiveAIHome() {
  const [active, setActive] = useState("receptionist");
  const [working, setWorking] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [notif, setNotif] = useState<{ title: string; text: string } | null>(null);
  const [muted, setMuted] = useState(false);

  const runId = useRef(0);
  const ctx = useRef<AudioContext | null>(null);
  const mutedRef = useRef(false);
  const reduceRef = useRef(false);

  const ensureAudio = () => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!ctx.current) ctx.current = new AC();
      if (ctx.current.state === "suspended") void ctx.current.resume();
    } catch { /* no-op */ }
  };
  const blip = (f: number, d: number, type: OscillatorType, when: number, v: number) => {
    const c = ctx.current;
    if (!c || mutedRef.current) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = f;
    const t = c.currentTime + when;
    o.connect(g); g.connect(c.destination);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.start(t); o.stop(t + d + 0.03);
  };
  const popRecv = () => { blip(560, 0.09, "sine", 0, 0.11); blip(880, 0.11, "sine", 0.06, 0.11); };
  const popSent = () => blip(840, 0.08, "triangle", 0, 0.09);
  const chime = () => { blip(680, 0.1, "sine", 0, 0.14); blip(1020, 0.16, "sine", 0.09, 0.14); blip(1360, 0.18, "sine", 0.18, 0.1); };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduceRef.current ? Math.min(ms, 40) : ms));

  const play = useCallback(async (key: string) => {
    const myId = ++runId.current;
    const tool = byKey[key];
    if (!tool) return;
    setActive(key);
    setWorking(false); setBlocks([]); setResult(null); setNotif(null);
    const stale = () => myId !== runId.current;

    await sleep(680); if (stale()) return;
    setWorking(true);
    await sleep(1300); if (stale()) return;
    setWorking(false);

    const o = tool.output;
    if (o.type === "chat") {
      for (const m of o.messages) {
        await sleep(560); if (stale()) return;
        setBlocks((b) => [...b, { t: "chat", who: m.who, text: m.t }]);
        m.who === "ai" ? popRecv() : popSent();
      }
    } else {
      await sleep(440); if (stale()) return;
      if (o.type === "quote") { setBlocks([{ t: "quote", title: o.title, svc: o.svc, rows: o.rows, estLabel: o.estLabel, est: o.est }]); popRecv(); }
      else if (o.type === "text") { setBlocks([{ t: "text", head: o.head, text: o.text }]); popRecv(); }
      else if (o.type === "sms") { setBlocks([{ t: "sms", from: o.from, text: o.text, chip: o.chip }]); popSent(); }
      else if (o.type === "proposal") { setBlocks([{ t: "proposal", sections: o.sections }]); popRecv(); }
      else if (o.type === "gresponse") { setBlocks([{ t: "gresponse", biz: o.biz, time: o.time, text: o.text }]); popRecv(); }
    }

    await sleep(340); if (stale()) return;
    setResult(tool.result); chime();

    if (tool.notif) {
      await sleep(520); if (stale()) return;
      setNotif(tool.notif);
    }
  }, []);

  useEffect(() => {
    reduceRef.current = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    void play("receptionist");
    return () => { runId.current++; };
  }, [play]);

  const toggleSound = () => {
    setMuted((m) => { mutedRef.current = !m; return !m; });
    ensureAudio();
  };
  const onTab = (key: string) => { ensureAudio(); void play(key); };

  const tool = byKey[active];
  const isGoogle = tool.input.kind === "google";

  return (
    <div className={styles.root}>
      <div className={styles.aurora}><b className={styles.a1} /><b className={styles.a2} /><b className={styles.a3} /></div>

      <div className={styles.inner}>
        {/* HERO */}
        <div className={styles.wrap}>
          <section className={styles.hero}>
            <div>
              <div className={styles.eyebrow}><i />Live AI tools for local business · Surrey BC → worldwide</div>
              <h1 className={styles.headline}>AI tools that answer calls, send quotes, reply to reviews, follow up &amp; <span className={styles.hl}>get work booked</span>.</h1>
              <p className={styles.lead}>Pick a tool. Watch it handle real business work in seconds — trained on your services, pricing, and brand.</p>
              <div className={styles.ctas}>
                <Link className={`${styles.btn} ${styles.btnGreen}`} href="/create">Get my AI system <span className={styles.arrow}>→</span></Link>
                <a className={`${styles.btn} ${styles.btnGhost}`} href="#lab">See the tools live</a>
              </div>
              <div className={styles.trustline}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                <b>No fake demos</b> — these are the real tools, running live.
              </div>
            </div>

            <div className={styles.consoleHost}>
              <div className={styles.console}>
                <div className={styles.consoleHead}>
                  <div className={styles.ttl}><i />AI Command Center</div>
                  <div className={styles.cmeta}>7 tools · always on</div>
                </div>
                <div className={styles.tiles}>
                  <div className={styles.tile}>
                    <div className={styles.th}>{ICONS.receptionist}Calls answered</div>
                    <div className={styles.wave}><i /><i /><i /><i /><i /><i /><i /><i /></div>
                    <div className={styles.tsub}>triaging live · 24/7</div>
                  </div>
                  <div className={styles.tile}>
                    <div className={styles.th}>{ICONS.quote}Quotes sent</div>
                    <div className={`${styles.big} ${styles.shine}`}>$1,250</div>
                    <div className={styles.tsub}>generated in 6s</div>
                  </div>
                  <div className={styles.tile}>
                    <div className={styles.th}>{ICONS.review}Reviews handled</div>
                    <div className={styles.stars}><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></div>
                    <div className={styles.tsub}>on-brand replies</div>
                  </div>
                  <div className={styles.tile}>
                    <div className={styles.th}>{ICONS.followup}Follow-ups</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <span className={styles.sendring}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></span>
                      <div><div className={styles.big} style={{ fontSize: 19 }}>0 missed</div><div className={styles.tsub}>every lead chased</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* LAB */}
        <section className={styles.sec} id="lab">
          <div className={styles.wrap}>
            <div className={styles.labhead}>
              <div className={styles.kicker}>Live AI Tools Lab</div>
              <h2 className={styles.h2grad}>See every AI tool working — live, on a phone</h2>
              <p className={styles.labsub}>Tap a tool. Watch it do the actual job inside the phone, and land the real business result.</p>
            </div>

            <div className={styles.tabs}>
              {liveTools.map((t) => (
                <button key={t.key} className={`${styles.tab} ${active === t.key ? styles.tabActive : ""}`} onClick={() => onTab(t.key)}>
                  {ICONS[t.key]}<span>{t.tab}</span>
                </button>
              ))}
            </div>

            <div className={styles.phoneHost}>
              <div className={styles.phone}>
                <div className={styles.screen}>
                  <div className={styles.island} />
                  <div className={styles.pstatus}><span>9:41</span><span>5G&nbsp;&nbsp;100%</span></div>
                  {notif && (
                    <div className={`${styles.pnotif} ${styles.pnotifShow}`}>
                      <div className={styles.msgic}>{MSG}</div>
                      <div className={styles.nb}>
                        <div className={styles.nh}><span>Messages</span><span>now</span></div>
                        <div className={styles.nt}>{notif.title}</div>
                        <div className={styles.nx}>{notif.text}</div>
                      </div>
                    </div>
                  )}
                  <div className={styles.papp}>
                    <div className={styles.papphead}>
                      <div className={styles.ic}>{ICONS[active]}</div>
                      <div style={{ flex: 1 }}><div className={styles.nm}>{tool.name}</div><div className={styles.st}><i />Working live</div></div>
                      <button className={styles.soundbtn} onClick={toggleSound} aria-label="Toggle sound">{muted ? SND_OFF : SND_ON}</button>
                    </div>
                    <div className={styles.pflow}>
                      {/* input / trigger */}
                      {isGoogle && tool.input.kind === "google" ? (
                        <>
                          <div className={styles.plabel}>① New review on Google</div>
                          <div className={`${styles.greview} ${styles.oItem}`}>
                            <div className={styles.grTop}>
                              <div className={styles.grAv}>{tool.input.name[0]}</div>
                              <div className={styles.grId}><div className={styles.grName}>{tool.input.name}</div><div className={styles.grMeta}>{tool.input.meta}</div></div>
                              {GG}
                            </div>
                            <div className={styles.grStars}><span className={styles.grS}>{"★".repeat(tool.input.stars)}</span><span className={styles.grTime}>{tool.input.time}</span></div>
                            <div className={styles.grText}>{tool.input.text}</div>
                          </div>
                        </>
                      ) : tool.input.kind === "text" ? (
                        <>
                          <div className={styles.plabel}>① The trigger</div>
                          <div className={`${styles.pin} ${styles.oItem}`}>
                            <div className={styles.pinSrc}>{tool.input.src}</div>
                            <div>{tool.input.text}</div>
                          </div>
                        </>
                      ) : null}

                      {working && (
                        <div className={styles.pworking}><span className={styles.spinner} /><span>{tool.workingText}</span></div>
                      )}

                      {blocks.length > 0 && !isGoogle && <div className={styles.plabel}>② AI output</div>}
                      {blocks.length > 0 && isGoogle && <div className={styles.plabel}>② AI posts the owner’s reply</div>}

                      {blocks.map((b, i) => {
                        if (b.t === "chat") return (
                          <div key={i} className={`${styles.cbub} ${b.who === "ai" ? styles.cbubA : styles.cbubC} ${styles.oItem}`}>
                            <span className={styles.who}>{b.who === "ai" ? "AI" : "Customer"}</span>{b.text}
                          </div>
                        );
                        if (b.t === "quote") return (
                          <div key={i} className={`${styles.qcard} ${styles.oItem}`}>
                            <div className={styles.qtitle}>{b.title}</div>
                            <div className={styles.qsvc}>{b.svc}</div>
                            {b.rows.map((r, j) => (<div key={j} className={styles.qrow}><b>{r[0]}</b><span>{r[1]}</span></div>))}
                            <div className={styles.qest}><span className={styles.lbl}>{b.estLabel}</span><span className={styles.val}>{b.est}</span></div>
                          </div>
                        );
                        if (b.t === "text") return (
                          <div key={i} className={`${styles.tcard} ${styles.oItem}`}><div className={styles.tcardTh}>{b.head}</div>{b.text}</div>
                        );
                        if (b.t === "sms") return (
                          <div key={i} className={`${styles.smscard} ${styles.oItem}`}>
                            <div className={styles.smsfrom}><span className={styles.msgic} style={{ width: 15, height: 15, borderRadius: 5 }}>{MSG}</span>{b.from}</div>
                            <div className={styles.smsbub}>{b.text}</div>
                            {b.chip && <div className={styles.smschip}>{b.chip}</div>}
                          </div>
                        );
                        if (b.t === "proposal") return (
                          <div key={i} className={`${styles.pcard} ${styles.oItem}`}>
                            {b.sections.map((s, j) => (<div key={j} className={styles.psec}><b>{s[0]}</b>{s[1]}</div>))}
                          </div>
                        );
                        if (b.t === "gresponse") return (
                          <div key={i} className={`${styles.greview} ${styles.oItem}`}>
                            <div className={styles.grResp}>
                              <div className={styles.grRh}><span className={styles.grRlogo}>{b.biz}</span> Response from the owner · {b.time}</div>
                              <div className={styles.grRb}>{b.text}</div>
                            </div>
                          </div>
                        );
                        return null;
                      })}

                      {result && (
                        <div className={`${styles.presult} ${styles.oItem}`}><span className={styles.ck}>{CK}</span>{result}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className={styles.sec}>
          <div className={styles.wrap}>
            <div className={styles.outcomes}>
              {outcomes.map((o, i) => (<div key={i}><div className={styles.ocv}>{o.v}</div><div className={styles.ocl}>{o.l}</div></div>))}
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className={`${styles.sec} ${styles.proof}`}>
          <div className={styles.wrap}>
            <div className={styles.kicker}>Real builders, real software</div>
            <h2 className={styles.h2grad}>Built by the same studio behind live production tools</h2>
            <p className={styles.labsub} style={{ maxWidth: 560, margin: "10px auto 0" }}>Not mockups — real deployed software running payments, auth, email and monitoring in production today.</p>
            <div className={styles.plogos}>
              <a className={styles.plogo} href="https://coitracker.co" target="_blank" rel="noopener noreferrer"><i />COITracker<small>Live B2B SaaS · insurance compliance</small></a>
              <a className={styles.plogo} href="https://www.paynudge.xyz" target="_blank" rel="noopener noreferrer"><i />PayNudge<small>Live SaaS · payment recovery</small></a>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className={styles.sec}>
          <div className={styles.wrap}>
            <div className={styles.labhead}><div className={styles.kicker}>Simple, transparent pricing</div><h2 className={styles.h2grad}>Start with one tool, or a full system</h2></div>
            <div className={styles.pricing}>
              {pricingTiers.map((p, i) => (
                <div key={i} className={`${styles.pcardz} ${p.feat ? styles.pcardzFeat : ""}`}>
                  <div className={styles.ptag}>{p.tag}</div>
                  <div className={styles.pprice}>{p.price}{p.small && <small>{p.small}</small>}</div>
                  <div className={styles.pdesc}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className={styles.sec}>
          <div className={styles.wrap}>
            <div className={styles.finalcta}>
              <h2 className={styles.finalTitle}>Tell us what you want AI to handle.</h2>
              <p className={styles.finalP}>Describe the work that eats your day. We map the tool, build it around your business, and get it live in days.</p>
              <Link className={`${styles.btn} ${styles.btnGreen}`} href="/create">Get my AI system <span className={styles.arrow}>→</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
