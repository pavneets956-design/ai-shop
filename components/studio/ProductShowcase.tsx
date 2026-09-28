"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowUpRight, Bell, Check, LockKeyhole, Pause, Play, ShieldCheck } from "lucide-react";
import RoomRushScene from "./RoomRushScene";
import styles from "./ProductShowcase.module.css";

function subscribeMotion(listener: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
const reducedSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverSnapshot = () => true;

function BrowserFrame({ domain, children }: { domain: string; children: ReactNode }) {
  return <div className={styles.browser}>
    <div className={styles.chrome} aria-hidden="true">
      <span className={styles.dots}><i /><i /><i /></span>
      <span className={styles.address}><LockKeyhole size={8} />{domain}</span>
      <ArrowUpRight size={10} />
    </div>
    {children}
  </div>;
}

function RoomRushPreview({ paused }: { paused: boolean }) {
  return <div className={styles.roomScreen} aria-hidden="true">
    <div className={styles.roomNav}>
      <span className={styles.roomBrand}>
        <svg viewBox="0 0 44 48" shapeRendering="crispEdges">
          <path d="M7 8H34V46H4V15H7Z" fill="#080f25" stroke="#ffe052" strokeWidth="3" />
          <path d="M15 2H28V6H15ZM9 8H15V12H9Z" fill="#52e8f4" />
          <path d="M12 17H27V21H31V29H26V33H30V39H23V33H19V39H12ZM19 23V28H24V23Z" fill="#52e8f4" fillRule="evenodd" />
        </svg>RoomRush
      </span>
      <span className={styles.roomNavLinks}>Games <span>How it works</span></span>
      <span className={styles.roomMiniButton}>Host a room</span>
    </div>
    <div className={styles.roomHero}>
      <div className={styles.roomCopy}>
        <p>YOUR PEOPLE. YOUR ARCADE.</p>
        <strong>BIG GAMES.<br />SMALL SCREENS.<br />GREAT COMPANY.</strong>
        <span>Turn your TV into game night.<br />Everyone plays with their phone.</span>
        <span className={styles.roomCta}><Play size={14} fill="currentColor" />Host a room</span>
      </div>
      <RoomRushScene paused={paused} />
    </div>
    <div className={styles.roomFoot}><span>No downloads</span><span>Phones as controllers</span><span>One shared screen</span></div>
  </div>;
}

// These are the fictional examples on the products' public landing pages.
// They are never connected to a customer account or presented as studio results.
const vendors = [
  ["AP", "Acme Plumbing", "General liability", "Expired", "expired"],
  ["BH", "BlueSky HVAC", "Workers’ compensation", "Due this week", "due"],
  ["GL", "Greenway Landscaping", "Commercial auto", "Expiring soon", "due"],
  ["NE", "North Star Electric", "Umbrella", "Safe", "safe"],
];
function CoiPreview() {
  return <div className={styles.coiScreen} aria-hidden="true">
    <div className={styles.productNav}><span><ShieldCheck />COI Tracker<span className={styles.purple}>.</span></span><span className={styles.productNavSmall}>Vendor workspace</span></div>
    <div className={styles.coiIntro}>COI tracking.<br /><em>Without the chase.</em></div>
    <div className={styles.vendorPanel}>
      <div className={styles.panelHeading}><strong>Vendor overview</strong><span className={styles.addCoi}>+ Add COI</span></div>
      <div className={styles.vendorStats}><span>Total vendors<b>4 <small>tracked</small></b></span><span>Due within 30 days<b>2 <small>upcoming</small></b></span><span>Expired<b>1 <small>to review</small></b></span></div>
      <div className={styles.vendorTabs}><b>All vendors</b><span>Needs attention</span><span>Safe</span></div>
      {vendors.map(([initials, name, type, status, tone]) => <div className={styles.vendorRow} key={name}>
        <span className={styles.initials}>{initials}</span>
        <span><b>{name}</b><small>{type}</small></span>
        <span className={styles.status} data-tone={tone}>{status}</span>
      </div>)}
      <div className={styles.panelFoot}>Example workspace · fictional vendors</div>
    </div>
  </div>;
}
function PayPreview() {
  return <div className={styles.payScreen} aria-hidden="true">
    <div className={styles.productNav}><span><Bell className={styles.bell} />PayNudge</span><span className={styles.productNavSmall}>Invoice follow-up</span></div>
    <div className={styles.payIntro}>Invoice reminders.<br /><span>Without the awkward follow-up.</span></div>
    <div className={styles.invoicePanel}>
      <div className={styles.invoiceTotal}><div><span>TOTAL OUTSTANDING</span><strong>$1,625<small>.00</small></strong><b>4 overdue</b></div><div className={styles.chart}>{[30,48,43,63,70,94].map((h,i) => <i key={i} style={{height:h+"%"}} />)}</div></div>
      {[["SD","Sunrise Dental","INV-1041","25d","$480"],["ML","Marlow & Sons","INV-1042","13d","$720"],["BJ","Blue Jay Café","INV-1044","1d","$240"]].map(([initials,name,id,days,total]) => <div className={styles.invoiceRow} key={id}>
        <span className={styles.invoiceInitials}>{initials}</span><span><b>{name}</b><small>{id}</small></span><em>{days}</em><strong>{total}</strong>
      </div>)}
      <div className={styles.paidToast}><Check /><span><b>Blue Jay Café paid</b><small>$240.00 · reminders stopped</small></span></div>
    </div>
    <div className={styles.paySample}>Product preview · sample data</div>
  </div>;
}

export default function ProductShowcase() {
  const reduced = useSyncExternalStore(subscribeMotion, reducedSnapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);
  const still = reduced || paused;
  return <section className={styles.showcase} id="work" aria-labelledby="showcase-title" data-paused={still}>
    <div className={styles.toolbar}>
      <h2 id="showcase-title">A few things I’ve built</h2>
      <button type="button" onClick={() => setPaused(!paused)} disabled={reduced} aria-pressed={still}
        aria-label={reduced ? "Animation paused for reduced motion" : paused ? "Play showcase animation" : "Pause showcase animation"}>
        {still ? <Play size={12} /> : <Pause size={12} />}
        {reduced ? "Reduced motion" : paused ? "Play animation" : "Pause animation"}
      </button>
    </div>
    <div className={styles.stage}>
      <a className={styles.roomWindow} href="https://playroomrush.com" target="_blank" rel="noopener noreferrer" aria-label="Explore RoomRush — phone-controlled party games (opens in a new tab)">
        <BrowserFrame domain="playroomrush.com"><RoomRushPreview paused={still} /></BrowserFrame>
        <span className={styles.caption}><b>RoomRush</b><span>Multiplayer games</span><ArrowUpRight size={14} /></span>
      </a>
      <a className={styles.coiWindow} href="https://coitracker.co" target="_blank" rel="noopener noreferrer" aria-label="Explore COITracker — document workflows (opens in a new tab)">
        <BrowserFrame domain="coitracker.co"><CoiPreview /></BrowserFrame>
        <span className={styles.caption}><b>COITracker</b><span>Document workflows</span><ArrowUpRight size={14} /></span>
      </a>
      <a className={styles.payWindow} href="https://paynudge.xyz" target="_blank" rel="noopener noreferrer" aria-label="Explore PayNudge — invoice follow-up (opens in a new tab)">
        <BrowserFrame domain="paynudge.xyz"><PayPreview /></BrowserFrame>
        <span className={styles.caption}><b>PayNudge</b><span>Invoice follow-up</span><ArrowUpRight size={14} /></span>
      </a>
    </div>
    <p className={styles.note}>Products I build and run. Animated preview and sample data.</p>
  </section>;
}
