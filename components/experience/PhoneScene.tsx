"use client";

/**
 * "Missed Call, Caught" — the fixed WebGL canvas (aria-hidden).
 * Renders ONLY the phone, bench, light, and atmosphere — never a headline
 * glyph. Reads scroll/act state from the shared exp store (written by the
 * Conversion Layer); drives the ring → slip → amber catch, light temperature,
 * and the camera rig. All DOM text lives in MissedCallCaught.tsx.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { exp } from "./expStore";
import { CALLER_LABEL, MISSED_LOG, TRANSCRIPT, WEEK_PINGS, getWorker } from "@/lib/data/alwaysAnswering";

let rectAreaInit = false;
function initRectArea() {
  if (!rectAreaInit) {
    RectAreaLightUniformsLib.init();
    rectAreaInit = true;
  }
}

// ---------------------------------------------------------------------------
// Screen painter — an offscreen 2D canvas driven per-frame; the phone screen
// is the storyteller (incoming → slip → amber catch → booked).
// ---------------------------------------------------------------------------

const SW = 512;
const SH = 1114;
const MONO = `"IBM Plex Mono", ui-monospace, monospace`;

const COOL_HI = "#E7EEFF";
const COOL_MID = "#93A7CE";
const COOL_DIM = "#4A5875";
const WARM_HI = "#FFEBCC";
const WARM_MID = "#F4A24C";
const WARM_DIM = "#8A6A3E";

type ScreenState = {
  mode: "off" | "ring" | "slip" | "timer" | "catch" | "booked" | "pings" | "rest";
  k: number; // 0..1 local phase progress
  ct: number; // seconds since catch fired (catch mode)
  worker: string;
  clock: string;
};

class ScreenPainter {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  private lastSig = "";

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = SW;
    this.canvas.height = SH;
    this.ctx = this.canvas.getContext("2d")!;
  }

  /** Returns true if it repainted (texture needs update). */
  draw(s: ScreenState): boolean {
    const sig = `${s.mode}|${s.k.toFixed(3)}|${s.ct.toFixed(2)}|${s.worker}|${s.clock}`;
    if (sig === this.lastSig) return false;
    this.lastSig = sig;

    const c = this.ctx;
    c.clearRect(0, 0, SW, SH);

    switch (s.mode) {
      case "off":
        this.drawOff(s);
        break;
      case "ring":
        this.drawRing(s, 1);
        break;
      case "slip":
        this.drawSlip(s);
        break;
      case "timer":
        this.drawTimer(s);
        break;
      case "catch":
        this.drawCatch(s);
        break;
      case "booked":
        this.drawBooked(s, false);
        break;
      case "pings":
        this.drawPings(s);
        break;
      case "rest":
        this.drawBooked(s, true);
        break;
    }
    return true;
  }

  private bg(top: string, bottom: string) {
    const g = this.ctx.createLinearGradient(0, 0, 0, SH);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    this.ctx.fillStyle = g;
    this.ctx.fillRect(0, 0, SW, SH);
  }

  private statusBar(clock: string, warm: boolean) {
    const c = this.ctx;
    c.font = `500 26px ${MONO}`;
    c.fillStyle = warm ? WARM_MID : COOL_MID;
    c.textAlign = "left";
    c.fillText(clock, 36, 58);
    // signal dots
    for (let i = 0; i < 4; i++) {
      c.globalAlpha = i < 3 ? 1 : 0.35;
      c.beginPath();
      c.arc(SW - 130 + i * 22, 50, 5, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;
  }

  private drawOff(s: ScreenState) {
    this.bg("#05060A", "#07080D");
    const c = this.ctx;
    c.font = `300 92px ${MONO}`;
    c.fillStyle = "rgba(147,167,206,0.28)";
    c.textAlign = "center";
    c.fillText(s.clock, SW / 2, 300);
    c.font = `500 24px ${MONO}`;
    c.fillStyle = "rgba(147,167,206,0.16)";
    c.fillText("no new activity", SW / 2, 360);
  }

  private callerCard(y: number, pulse: number, warm: boolean) {
    const c = this.ctx;
    c.textAlign = "center";
    c.font = `500 26px ${MONO}`;
    c.fillStyle = warm ? WARM_DIM : COOL_DIM;
    c.fillText("INCOMING CALL", SW / 2, y);
    c.font = `600 44px ${MONO}`;
    c.fillStyle = warm ? WARM_HI : COOL_HI;
    c.fillText("New customer", SW / 2, y + 66);
    c.font = `500 28px ${MONO}`;
    c.fillStyle = warm ? WARM_MID : COOL_MID;
    c.fillText(CALLER_LABEL, SW / 2, y + 112);
    // pulsing answer ring
    c.beginPath();
    c.arc(SW / 2, y + 300, 64 + pulse * 10, 0, Math.PI * 2);
    c.strokeStyle = warm ? `rgba(244,162,76,${0.75 - pulse * 0.4})` : `rgba(147,167,206,${0.6 - pulse * 0.35})`;
    c.lineWidth = 5;
    c.stroke();
    c.beginPath();
    c.arc(SW / 2, y + 300, 52, 0, Math.PI * 2);
    c.fillStyle = warm ? "rgba(244,162,76,0.9)" : "rgba(120,145,190,0.85)";
    c.fill();
    // handset glyph
    c.font = `600 40px ${MONO}`;
    c.fillStyle = "#0A0E14";
    c.fillText("✆", SW / 2, y + 314);
  }

  private drawRing(s: ScreenState, brightness: number) {
    this.bg("#0B111F", "#080C16");
    this.ctx.globalAlpha = brightness;
    this.statusBar(s.clock, false);
    const pulse = (Math.sin(s.k * Math.PI * 8) + 1) / 2;
    this.callerCard(220, pulse, false);
    this.ctx.globalAlpha = 1;
  }

  private drawSlip(s: ScreenState) {
    // screen cooling toward "Missed" while the day's log stacks up
    this.bg("#080B13", "#05070C");
    const c = this.ctx;
    this.statusBar(s.clock, false);
    c.textAlign = "left";
    c.font = `500 24px ${MONO}`;
    c.fillStyle = COOL_DIM;
    c.fillText("TODAY, WHILE YOUR HANDS WERE FULL", 36, 140);

    const shown = Math.min(MISSED_LOG.length, Math.floor(s.k * 5.2));
    MISSED_LOG.forEach((row, i) => {
      if (i >= shown) return;
      const y = 200 + i * 158;
      c.fillStyle = "rgba(147,167,206,0.09)";
      c.fillRect(28, y - 44, SW - 56, 126);
      c.font = `500 24px ${MONO}`;
      c.fillStyle = COOL_MID;
      c.fillText(`${row.time} · ${row.context}`, 48, y);
      c.font = `600 30px ${MONO}`;
      c.fillStyle = COOL_HI;
      c.fillText(row.item.replace(/[“”]/g, '"'), 48, y + 46);
    });

    // the banner tipping toward Missed / Voicemail
    const slip = Math.max(0, (s.k - 0.68) / 0.32);
    if (slip > 0) {
      const y = SH - 200;
      c.globalAlpha = slip;
      c.fillStyle = "rgba(180,60,50,0.16)";
      c.fillRect(28, y - 56, SW - 56, 120);
      c.textAlign = "center";
      c.font = `600 40px ${MONO}`;
      c.fillStyle = "#D98A7E";
      c.fillText("Missed · Voicemail", SW / 2, y + 12);
      c.globalAlpha = 1;
    }
  }

  private drawTimer(s: ScreenState) {
    // Act III pre-catch: the same call, one tick from Missed
    this.bg("#0A101D", "#070A12");
    const c = this.ctx;
    this.statusBar(s.clock, false);
    const pulse = (Math.sin(s.k * Math.PI * 10) + 1) / 2;
    this.callerCard(190, pulse, false);
    // depleting arc — the tick toward voicemail
    const remain = 1 - s.k;
    c.beginPath();
    c.arc(SW / 2, 900, 92, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remain);
    c.strokeStyle = remain > 0.3 ? "rgba(147,167,206,0.8)" : "rgba(217,138,126,0.9)";
    c.lineWidth = 8;
    c.stroke();
    c.textAlign = "center";
    c.font = `500 26px ${MONO}`;
    c.fillStyle = remain > 0.3 ? COOL_MID : "#D98A7E";
    c.fillText(remain > 0.3 ? "ringing…" : "about to slip to voicemail", SW / 2, 1030);
  }

  private drawCatch(s: ScreenState) {
    // amber floods in — the reversal
    const wipe = Math.min(1, s.ct / 0.45);
    this.bg("#241407", "#140B04");
    const c = this.ctx;
    // radial amber wipe
    const g = c.createRadialGradient(SW / 2, SH / 2, 0, SW / 2, SH / 2, SH * wipe);
    g.addColorStop(0, "rgba(244,162,76,0.42)");
    g.addColorStop(0.65, "rgba(244,162,76,0.14)");
    g.addColorStop(1, "rgba(244,162,76,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, SW, SH);

    this.statusBar(s.clock, true);

    c.textAlign = "center";
    if (s.ct > 0.4) {
      c.font = `500 26px ${MONO}`;
      c.fillStyle = WARM_MID;
      c.fillText(`HANDBUILT ${s.worker.toUpperCase()}`, SW / 2, 170);
      c.font = `600 40px ${MONO}`;
      c.fillStyle = WARM_HI;
      c.fillText("answering…", SW / 2, 226);
    }

    // transcript types out
    if (s.ct > 1.1) {
      const chars = Math.floor((s.ct - 1.1) * 26);
      let used = 0;
      let y = 330;
      c.textAlign = "left";
      for (const line of TRANSCRIPT) {
        const avail = Math.max(0, chars - used);
        if (avail <= 0) break;
        const text = line.text.slice(0, avail);
        used += line.text.length + 8;
        c.font = `500 23px ${MONO}`;
        c.fillStyle = line.who === "ai" ? WARM_MID : WARM_DIM;
        c.fillText(line.who === "ai" ? "AI" : "CALLER", 44, y);
        c.font = `500 27px ${MONO}`;
        c.fillStyle = line.who === "ai" ? WARM_HI : "#D8C4A4";
        this.wrap(text, 44, y + 40, SW - 88, 38);
        y += 46 + this.wrapHeight(line.text, SW - 88, 38) + 34;
      }
    }

    // Missed → Answered → Job booked
    if (s.ct > 4.4) {
      const y = SH - 220;
      c.textAlign = "center";
      c.font = `500 30px ${MONO}`;
      c.fillStyle = "rgba(217,138,126,0.55)";
      const missed = "Missed";
      c.fillText(missed, SW / 2 - 120, y);
      const w = c.measureText(missed).width;
      c.strokeStyle = "rgba(217,138,126,0.7)";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(SW / 2 - 120 - w / 2, y - 10);
      c.lineTo(SW / 2 - 120 + w / 2, y - 10);
      c.stroke();
      c.fillStyle = WARM_MID;
      c.fillText("→ Answered ✓", SW / 2 + 90, y);
    }
    if (s.ct > 5.2) {
      c.textAlign = "center";
      c.font = `600 54px ${MONO}`;
      c.fillStyle = WARM_HI;
      c.fillText("Job booked.", SW / 2, SH - 120);
    }
  }

  private drawBooked(s: ScreenState, rest: boolean) {
    this.bg(rest ? "#1C1208" : "#120C06", rest ? "#241708" : "#0C0804");
    const c = this.ctx;
    this.statusBar(s.clock, true);
    c.textAlign = "center";
    const breathe = rest ? 0.85 + 0.15 * ((Math.sin(s.k * Math.PI * 2) + 1) / 2) : 0.9;
    c.globalAlpha = breathe;
    c.beginPath();
    c.arc(SW / 2, 420, 74, 0, Math.PI * 2);
    c.strokeStyle = "rgba(244,162,76,0.85)";
    c.lineWidth = 6;
    c.stroke();
    c.font = `600 64px ${MONO}`;
    c.fillStyle = WARM_MID;
    c.fillText("✓", SW / 2, 444);
    c.font = `600 46px ${MONO}`;
    c.fillStyle = WARM_HI;
    c.fillText("Job booked", SW / 2, 590);
    c.font = `500 26px ${MONO}`;
    c.fillStyle = WARM_DIM;
    c.fillText(rest ? "always answering" : "nothing slipped", SW / 2, 646);
    c.globalAlpha = 1;
  }

  private drawPings(s: ScreenState) {
    this.bg("#171008", "#0E0A05");
    const c = this.ctx;
    this.statusBar(s.clock, true);
    c.textAlign = "left";
    c.font = `500 24px ${MONO}`;
    c.fillStyle = WARM_DIM;
    c.fillText("CAUGHT THIS WEEK", 36, 140);
    const shown = Math.min(WEEK_PINGS.length, Math.floor(s.k * 5.4));
    WEEK_PINGS.forEach((p, i) => {
      if (i >= shown) return;
      const y = 208 + i * 200;
      c.fillStyle = "rgba(244,162,76,0.08)";
      c.fillRect(28, y - 48, SW - 56, 168);
      c.font = `500 23px ${MONO}`;
      c.fillStyle = WARM_MID;
      c.fillText(`${p.worker.toUpperCase()}  ·  ✓ caught`, 48, y);
      c.font = `500 26px ${MONO}`;
      c.fillStyle = WARM_HI;
      this.wrap(p.text, 48, y + 44, SW - 96, 36);
    });
  }

  private wrap(text: string, x: number, y: number, maxW: number, lh: number) {
    const c = this.ctx;
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (const w of words) {
      const t = line ? line + " " + w : w;
      if (c.measureText(t).width > maxW && line) {
        c.fillText(line, x, yy);
        line = w;
        yy += lh;
      } else line = t;
    }
    if (line) c.fillText(line, x, yy);
  }

  private wrapHeight(text: string, maxW: number, lh: number): number {
    const c = this.ctx;
    const words = text.split(" ");
    let line = "";
    let lines = 1;
    for (const w of words) {
      const t = line ? line + " " + w : w;
      if (c.measureText(t).width > maxW && line) {
        line = w;
        lines++;
      } else line = t;
    }
    return (lines - 1) * lh;
  }
}

/** Derive the current screen state from the shared store. */
function computeScreen(now: number): ScreenState {
  const { act, actLocal, caught, catchAt, clock } = exp;
  const worker = getWorker(exp.worker).name;
  const base = { worker, clock };

  if (caught && catchAt > 0 && (act === 3 || (act > 3 && now - catchAt < 7000))) {
    return { ...base, mode: "catch", k: 0, ct: (now - catchAt) / 1000 };
  }
  if (act === 1) return { ...base, mode: "off", k: actLocal, ct: 0 };
  if (act === 2) {
    if (actLocal < 0.3) return { ...base, mode: "ring", k: actLocal / 0.3, ct: 0 };
    return { ...base, mode: "slip", k: (actLocal - 0.3) / 0.7, ct: 0 };
  }
  if (act === 3) return { ...base, mode: "timer", k: Math.min(1, actLocal / 0.62), ct: 0 };
  if (act === 4) return { ...base, mode: "booked", k: actLocal, ct: 0 };
  if (act === 5) return { ...base, mode: "pings", k: actLocal, ct: 0 };
  if (act === 6) return { ...base, mode: "booked", k: actLocal, ct: 0 };
  return { ...base, mode: "rest", k: (now / 4000) % 1, ct: 0 };
}

// ---------------------------------------------------------------------------
// The phone + bench
// ---------------------------------------------------------------------------

function useSmudgeTexture() {
  // faint scuff/oil map so the glass reads used, not showroom-CG
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#B8B8B8";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 46; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = 8 + Math.random() * 42;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const v = 140 + Math.floor(Math.random() * 70);
      g.addColorStop(0, `rgba(${v},${v},${v},0.5)`);
      g.addColorStop(1, "rgba(184,184,184,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);
}

function radialTexture(inner: string, outer: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

function Phone() {
  const smudge = useSmudgeTexture();
  const painter = useMemo(() => new ScreenPainter(), []);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(painter.canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [painter]);
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);
  const spill = useRef<THREE.PointLight>(null);
  const frame = useRef(0);

  // repaint once fonts arrive so Plex Mono replaces the fallback
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) texture.needsUpdate = true;
    });
    return () => {
      alive = false;
    };
  }, [texture]);

  useFrame(() => {
    frame.current++;
    if (frame.current % 2) return; // paint at ~30fps — plenty for UI motion
    const now = performance.now();
    const s = computeScreen(now);
    if (painter.draw(s)) texture.needsUpdate = true;

    // screen brightness + light spill onto the bench/frame
    const warm = s.mode === "catch" || s.mode === "booked" || s.mode === "rest" || s.mode === "pings";
    const lit = s.mode !== "off";
    const catching = s.mode === "catch" && s.ct < 1.4;
    const em = !lit ? 0.35 : catching ? 2.6 : warm ? 1.5 : 1.35;
    if (screenMat.current) screenMat.current.emissiveIntensity = em;
    if (spill.current) {
      spill.current.intensity = !lit ? 0.05 : catching ? 3.2 : warm ? 1.2 : 0.9;
      spill.current.color.set(warm ? "#F4A24C" : "#AFC4E8");
    }
  });

  return (
    <group rotation={[0, -0.38, 0]}>
      {/* brushed metal frame / body */}
      <RoundedBox args={[0.78, 0.085, 1.62]} radius={0.042} smoothness={8} position={[0, 0.0425, 0]}>
        <meshStandardMaterial color="#3A3D44" metalness={0.85} roughness={0.42} envMapIntensity={0.65} />
      </RoundedBox>
      {/* glass face — micro-rough, scuffed, not CG-glossy */}
      <RoundedBox args={[0.735, 0.012, 1.575]} radius={0.035} smoothness={6} position={[0, 0.088, 0]}>
        <meshPhysicalMaterial
          color="#0A0C10"
          metalness={0}
          roughness={0.16}
          roughnessMap={smudge}
          clearcoat={1}
          clearcoatRoughness={0.28}
          envMapIntensity={0.7}
        />
      </RoundedBox>
      {/* the screen — emissive storyteller */}
      <mesh position={[0, 0.0955, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <planeGeometry args={[0.66, 1.435]} />
        <meshStandardMaterial
          ref={screenMat}
          color="#000000"
          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={1.2}
          roughness={0.4}
          toneMapped
        />
      </mesh>
      {/* screen light spilling onto bench + frame — primary source in the cold acts */}
      <pointLight ref={spill} position={[0, 0.55, 0]} intensity={0.9} distance={3.4} decay={2} color="#AFC4E8" />
    </group>
  );
}

function Bench() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const pool = useRef<THREE.MeshBasicMaterial>(null);
  const poolTex = useMemo(() => radialTexture("rgba(244,162,76,0.95)", "rgba(244,162,76,0)"), []);

  useFrame(() => {
    // bench lifts from near-black wood to warm cream-lit as the grade turns
    if (mat.current) {
      const t = Math.min(1, Math.max(0, (exp.progress - 0.6) / 0.35));
      mat.current.color.lerpColors(new THREE.Color("#151110"), new THREE.Color("#C4AA87"), t * t);
    }
    // the amber pool of light that spreads around the phone on the catch
    if (pool.current) {
      const now = performance.now();
      const catching = exp.caught && exp.catchAt > 0 && now - exp.catchAt < 2600;
      const settled = exp.progress > 0.62;
      const target = catching ? 0.5 : settled ? 0.26 : 0;
      pool.current.opacity += (target - pool.current.opacity) * 0.06;
    }
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial ref={mat} color="#151110" roughness={0.93} metalness={0} envMapIntensity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <circleGeometry args={[2.3, 48]} />
        <meshBasicMaterial
          ref={pool}
          map={poolTex}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} opacity={0.62} scale={7} blur={2.6} far={1.6} resolution={512} color="#000000" />
    </>
  );
}

// ---------------------------------------------------------------------------
// Lights — the biggest cheap→premium lever. Color temp + intensity shift with
// scroll: cold and low → the amber CATCH flood → golden calm.
// ---------------------------------------------------------------------------

function LightRig() {
  const key = useRef<THREE.RectAreaLight>(null);
  const fill = useRef<THREE.RectAreaLight>(null);
  const ray = useRef<THREE.MeshBasicMaterial>(null);
  const rayTex = useMemo(() => radialTexture("rgba(244,162,76,0.5)", "rgba(244,162,76,0)"), []);

  useEffect(() => {
    key.current?.lookAt(0, 0, 0);
    fill.current?.lookAt(0, 0, 0);
  }, []);

  useFrame(() => {
    if (key.current) {
      key.current.color.setRGB(exp.key.r, exp.key.g, exp.key.b);
      key.current.intensity = exp.keyIntensity;
    }
    if (fill.current) {
      fill.current.color.setRGB(exp.key.r, exp.key.g, exp.key.b);
      fill.current.intensity = exp.keyIntensity * 0.22;
    }
    if (ray.current) {
      // low warm god-ray, Act VII only
      const t = Math.min(1, Math.max(0, (exp.progress - 0.86) / 0.14));
      ray.current.opacity = t * 0.2;
    }
  });

  return (
    <>
      {/* key softbox — above-left, temperature tells the story */}
      <rectAreaLight ref={key} args={["#7A90B8", 0.55, 3.4, 2.6]} position={[-2.6, 3.1, 1.6]} />
      {/* low fill — opposite side, whisper */}
      <rectAreaLight ref={fill} args={["#7A90B8", 0.12, 2.4, 2]} position={[2.8, 1.4, -1.8]} />
      <ambientLight intensity={0.06} />
      {/* Act VII god-ray sheet */}
      <mesh position={[-1.4, 2.2, -1.6]} rotation={[0, 0.5, -0.5]}>
        <planeGeometry args={[7, 9]} />
        <meshBasicMaterial ref={ray} map={rayTex} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

// ---------------------------------------------------------------------------
// Camera rig — one slow product-film move, scroll-scrubbed.
// Odd acts frame the phone right, even acts left (§4 composition rule).
// ---------------------------------------------------------------------------

type CamKey = { pos: [number, number, number]; tgt: [number, number, number]; bokeh: number };

const CAM: CamKey[] = [
  { pos: [-0.15, 1.35, 2.5], tgt: [-0.5, 0.05, 0], bokeh: 3.2 }, // I — cold, phone right
  { pos: [1.55, 1.05, 1.95], tgt: [0.52, 0.05, 0], bokeh: 3.0 }, // II — phone left
  { pos: [-0.62, 0.92, 1.65], tgt: [-0.42, 0.06, 0.05], bokeh: 3.6 }, // III — close, phone right
  { pos: [1.7, 1.3, 1.4], tgt: [0.5, 0.05, 0], bokeh: 2.8 }, // IV — phone left
  { pos: [-1.1, 2.1, 3.3], tgt: [-0.45, 0.02, 0], bokeh: 2.2 }, // V — pull back, phone right
  { pos: [2.4, 1.9, 3.2], tgt: [0.62, 0.02, 0], bokeh: 1.8 }, // VI — far, phone left
  { pos: [-0.5, 0.95, 2.0], tgt: [-0.42, 0.08, 0], bokeh: 3.4 }, // VII — settle, warm push-in
];

function smoother(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function CameraRig({ dof }: { dof: React.MutableRefObject<{ bokehScale: number } | null> }) {
  const { camera, pointer } = useThree();
  const cur = useRef({ pos: new THREE.Vector3(...CAM[0].pos), tgt: new THREE.Vector3(...CAM[0].tgt) });

  useFrame((state, dt) => {
    const u = Math.min(6.999, Math.max(0, exp.act - 1 + exp.actLocal));
    const i = Math.floor(u);
    const k = smoother(u - i);
    const a = CAM[i];
    const b = CAM[Math.min(6, i + 1)];
    const pos = new THREE.Vector3(...a.pos).lerp(new THREE.Vector3(...b.pos), k);
    const tgt = new THREE.Vector3(...a.tgt).lerp(new THREE.Vector3(...b.tgt), k);

    // soft push-in on the catch
    const now = performance.now();
    if (exp.caught && exp.catchAt > 0) {
      const ct = (now - exp.catchAt) / 1000;
      if (ct < 2.4) {
        const push = Math.sin(Math.min(1, ct / 2.4) * Math.PI) * 0.28;
        pos.lerp(tgt, push * 0.35);
      }
    }

    // idle drift + slight pointer parallax — alive, never nauseating
    const t = state.clock.elapsedTime;
    pos.y += Math.sin(t * 0.22) * 0.02;
    pos.x += pointer.x * 0.05;
    pos.y += pointer.y * 0.03;

    const alpha = 1 - Math.exp(-dt * 3.2);
    cur.current.pos.lerp(pos, alpha);
    cur.current.tgt.lerp(tgt, alpha);
    camera.position.copy(cur.current.pos);
    camera.lookAt(cur.current.tgt);

    if (dof.current) {
      const bok = a.bokeh + (b.bokeh - a.bokeh) * k;
      dof.current.bokehScale = bok;
    }
  });
  return null;
}

// Applies the OKLab-interpolated grade (computed by the DOM controller) to the scene.
function Grade() {
  const { scene } = useThree();
  const bg = useMemo(() => new THREE.Color("#06080D"), []);
  const fog = useMemo(() => new THREE.Fog("#0A0E14", 5.5, 16), []);
  useEffect(() => {
    scene.background = bg;
    scene.fog = fog;
  }, [scene, bg, fog]);
  useFrame(() => {
    bg.setRGB(exp.bg.r, exp.bg.g, exp.bg.b);
    fog.color.setRGB(exp.fog.r, exp.fog.g, exp.fog.b);
  });
  return null;
}

function Motes({ mobile }: { mobile: boolean }) {
  const ignite = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ignite.current) {
      const now = performance.now();
      const on =
        exp.progress > 0.56 ||
        (exp.caught && exp.catchAt > 0 && now - exp.catchAt < 6000);
      ignite.current.visible = on;
    }
  });
  return (
    <>
      <Sparkles count={mobile ? 40 : 90} scale={[5.5, 2.6, 5.5]} position={[0, 1.3, 0]} size={1.6} speed={0.16} opacity={0.35} color="#C8CFE0" />
      <group ref={ignite} visible={false}>
        <Sparkles count={mobile ? 26 : 60} scale={[2.6, 1.6, 2.6]} position={[0, 0.8, 0]} size={2.6} speed={0.3} opacity={0.7} color="#F4C285" />
      </group>
    </>
  );
}

function Effects({ mobile, dof }: { mobile: boolean; dof: React.MutableRefObject<{ bokehScale: number } | null> }) {
  // refs carry the underlying postprocessing effect instances
  const bloom = useRef<any>(null);
  useFrame(() => {
    if (bloom.current) {
      const now = performance.now();
      const catching = exp.caught && exp.catchAt > 0 && now - exp.catchAt < 2200;
      bloom.current.intensity = catching ? 0.6 : 0.25;
    }
  });
  if (mobile) {
    return (
      <EffectComposer>
        <Bloom ref={bloom} mipmapBlur luminanceThreshold={0.9} intensity={0.25} radius={0.4} />
        <Noise opacity={0.04} />
        <Vignette offset={0.26} darkness={0.62} />
      </EffectComposer>
    );
  }
  return (
    <EffectComposer>
      <Bloom ref={bloom} mipmapBlur luminanceThreshold={0.9} intensity={0.25} radius={0.4} />
      <DepthOfField ref={dof as any} target={[0, 0.08, 0]} focalLength={0.028} bokehScale={3.2} height={520} />
      <Noise opacity={0.04} />
      <Vignette offset={0.26} darkness={0.62} />
    </EffectComposer>
  );
}

// ---------------------------------------------------------------------------

export default function PhoneScene({ mobile }: { mobile: boolean }) {
  initRectArea();
  const dof = useRef<{ bokehScale: number } | null>(null);

  return (
    <Canvas
      camera={{ position: CAM[0].pos, fov: 34 }}
      dpr={[1, mobile ? 1.2 : 1.5]}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.95;
      }}
      frameloop="always"
    >
      <Grade />
      <Bench />
      <Phone />
      <LightRig />
      <Motes mobile={mobile} />

      {/* soft window-strip reflections on the glass — never a bare white dot */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={1.6} position={[0, 3, 2.5]} scale={[8, 1.4, 1]} color="#DCE4F2" />
        <Lightformer intensity={0.8} position={[-4, 1.4, 1]} scale={[2.4, 3.2, 1]} color="#B9C6DE" />
        <Lightformer intensity={0.5} position={[4.5, 1.8, -1]} scale={[3, 2.4, 1]} color="#E8B579" />
      </Environment>

      <CameraRig dof={dof} />
      <Effects mobile={mobile} dof={dof} />
    </Canvas>
  );
}
