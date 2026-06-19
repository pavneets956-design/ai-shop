"use client";

import { useEffect, useRef } from "react";

/**
 * HeroFlowField — the live, soothing background.
 *
 * A flow-field of ~1,500 hairline ink particles drifting along an invisible
 * 3-D noise field on the cream canvas. It is FORM-driven, not colour-driven:
 * the motion is carried entirely by near-black ink at 5–8% alpha, so it stays
 * 100% premium on #FAF7F2 and never glows orange ("the orange trap"). Only
 * ~1 in 200 particles is allowed a faint amber ember — the entire orange
 * budget of the background, countable on one hand.
 *
 * Canvas 2D (not WebGL): 1,500 thin segments with a trail-fade is trivially
 * cheap, ships in one file, and degrades gracefully.
 *
 * Performance / a11y, all wired:
 *  · ~40fps frame-skip            · pause when scrolled off-screen (IO)
 *  · pause on tab blur            · prefers-reduced-motion → one static frame
 *  · DPR-aware + debounced resize · subtle pointer parallax (feels "noticed")
 */

const INK = "25,23,22"; // --text
const BG = "#FAF7F2"; // --bg
const ACCENT = "232,138,0"; // --accent (rare embers only)

/* ---- compact improved Perlin 3-D noise (public-domain algorithm) ---- */
function makeNoise3D() {
  const p = new Uint8Array(512);
  const perm = new Uint8Array(256);
  for (let i = 0; i < 256; i++) perm[i] = i;
  // deterministic shuffle (fixed seed → stable field, no Math.random dependency)
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < 512; i++) p[i] = perm[i & 255];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = p[X] + Y;
    const AA = p[A] + Z;
    const AB = p[A + 1] + Z;
    const B = p[X + 1] + Y;
    const BA = p[B] + Z;
    const BB = p[B + 1] + Z;
    return lerp(
      w,
      lerp(
        v,
        lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
        lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
      ),
      lerp(
        v,
        lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
        lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)),
      ),
    );
  };
}

type P = { x: number; y: number; px: number; py: number; life: number; max: number; ember: boolean };

export default function HeroFlowField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const noise = makeNoise3D();
    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: P[] = [];
    let raf = 0;
    let t = 0;
    let last = 0;
    let running = false;

    // pointer parallax (gentle, never gamified)
    const pointer = { x: -9999, y: -9999, active: false };

    const TAU = Math.PI * 2;
    const NOISE_SCALE = 0.0016;
    const STEP = 0.62; // px / frame — slow = soothing
    const TIME_STEP = 0.0009; // field morph speed (very slow)

    const spawn = (pp: P, initial = false) => {
      // denser on the right third, sparser on the left (text lives left)
      const bias = Math.pow(Math.random(), 0.62); // skew toward 1 (right)
      pp.x = w * (0.04 + 0.92 * bias);
      pp.y = Math.random() * h;
      pp.px = pp.x;
      pp.py = pp.y;
      pp.max = 70 + Math.random() * 90;
      pp.life = initial ? Math.random() * pp.max : 0;
      pp.ember = Math.random() < 1 / 200; // the entire orange budget
    };

    const build = () => {
      const count = Math.min(
        reduce ? 1000 : 1700,
        Math.max(320, Math.floor((w * h) / 760)),
      );
      particles = new Array(count);
      for (let i = 0; i < count; i++) {
        const pp: P = { x: 0, y: 0, px: 0, py: 0, life: 0, max: 0, ember: false };
        spawn(pp, true);
        particles[i] = pp;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      build();
      if (reduce) staticFrame();
    };

    const advance = () => {
      // trail-fade smear (the softness — no CSS blur). Lower alpha = longer,
      // more visible ink trails while staying calm.
      ctx.fillStyle = "rgba(250,247,242,0.036)";
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${INK},0.075)`;
      const embers: P[] = [];

      for (let i = 0; i < particles.length; i++) {
        const pp = particles[i];
        pp.px = pp.x;
        pp.py = pp.y;

        let angle = noise(pp.x * NOISE_SCALE, pp.y * NOISE_SCALE, t) * TAU * 2;

        // gentle pointer influence within 140px — feels "noticed", not toy-like
        if (pointer.active) {
          const dx = pointer.x - pp.x;
          const dy = pointer.y - pp.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) {
            const target = Math.atan2(dy, dx);
            let diff = target - angle;
            while (diff > Math.PI) diff -= TAU;
            while (diff < -Math.PI) diff += TAU;
            angle += diff * 0.045 * (1 - Math.sqrt(d2) / 140);
          }
        }

        pp.x += Math.cos(angle) * STEP;
        pp.y += Math.sin(angle) * STEP;
        pp.life++;

        if (pp.ember) {
          embers.push(pp);
        } else {
          ctx.moveTo(pp.px, pp.py);
          ctx.lineTo(pp.x, pp.y);
        }

        if (
          pp.life > pp.max ||
          pp.x < -20 ||
          pp.x > w + 20 ||
          pp.y < -20 ||
          pp.y > h + 20
        ) {
          spawn(pp);
        }
      }
      ctx.stroke();

      // the rare warm embers — single soft amber strokes in an ink field
      if (embers.length) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${ACCENT},0.11)`;
        for (const pp of embers) {
          ctx.moveTo(pp.px, pp.py);
          ctx.lineTo(pp.x, pp.y);
        }
        ctx.stroke();
      }

      t += TIME_STEP;
    };

    const staticFrame = () => {
      // reduced-motion: evolve silently then leave one beautiful still frame
      for (let n = 0; n < 220; n++) advance();
    };

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < 24) return; // ~40fps cap
      last = now;
      advance();
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    // pause when the hero scrolls out of view
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? start() : stop();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 180);
    };

    resize();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    if (!reduce) start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
