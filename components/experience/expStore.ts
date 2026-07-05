// Shared mutable state for the "Missed Call, Caught" film.
// The DOM scroll controller writes here every frame; the R3F scene reads it in
// useFrame without triggering React renders. Discrete changes (act, theme,
// worker, catch) bump `version` so React chrome can subscribe cheaply.

export type WorkerId = "receptionist" | "quote" | "followup" | "invoice" | "custom";

// ---------------------------------------------------------------------------
// OKLab color math — the grade arc interpolates in OKLab (not sRGB) so the
// cold→amber→golden ramp never passes through muddy grey.
// ---------------------------------------------------------------------------

export type RGB = { r: number; g: number; b: number }; // linear-light 0..1? no — sRGB 0..1

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function srgbToLin(c: number) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function linToSrgb(c: number) {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

type Lab = { L: number; a: number; b: number };

export function rgbToOklab({ r, g, b }: RGB): Lab {
  const lr = srgbToLin(r), lg = srgbToLin(g), lb = srgbToLin(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function oklabToRgb({ L, a, b }: Lab): RGB {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const clamp = (x: number) => Math.min(1, Math.max(0, x));
  return {
    r: clamp(linToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    g: clamp(linToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    b: clamp(linToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  };
}

export function rgbToCss({ r, g, b }: RGB): string {
  const to = (c: number) => Math.round(c * 255);
  return `rgb(${to(r)},${to(g)},${to(b)})`;
}

/** Piecewise-OKLab sample of [position, hex] stops at t (0..1). */
export function sampleGradeHex(stops: [number, string][], t: number): RGB {
  if (t <= stops[0][0]) return hexToRgb(stops[0][1]);
  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, c0] = stops[i];
    const [p1, c1] = stops[i + 1];
    if (t <= p1) {
      const k = (t - p0) / (p1 - p0);
      const a = rgbToOklab(hexToRgb(c0));
      const b = rgbToOklab(hexToRgb(c1));
      return oklabToRgb({ L: a.L + (b.L - a.L) * k, a: a.a + (b.a - a.a) * k, b: a.b + (b.b - a.b) * k });
    }
  }
  return hexToRgb(stops[stops.length - 1][1]);
}

export function sampleNumber(stops: [number, number][], t: number): number {
  if (t <= stops[0][0]) return stops[0][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, v0] = stops[i];
    const [p1, v1] = stops[i + 1];
    if (t <= p1) return v0 + ((t - p0) / (p1 - p0)) * (v1 - v0);
  }
  return stops[stops.length - 1][1];
}

// ---------------------------------------------------------------------------
// The grade arc (§2 of the spec) — scene background + fog + key light.
// A 0.80 stop is added so Act VI (pricing) sits fully inside the golden grade.
// ---------------------------------------------------------------------------

export const GRADE_BG: [number, string][] = [
  [0.0, "#06080D"],
  [0.4, "#04060B"],
  [0.58, "#07070A"],
  [0.62, "#171310"],
  [0.8, "#EFE2CC"],
  [1.0, "#F4E9D6"],
];
export const GRADE_FOG: [number, string][] = [
  [0.0, "#0A0E14"],
  [0.4, "#080B11"],
  [0.58, "#0D0B0C"],
  [0.62, "#3A2A1B"],
  [0.8, "#E4D2B4"],
  [1.0, "#EAD8BD"],
];
export const KEY_COLOR: [number, string][] = [
  [0.0, "#7A90B8"],
  [0.4, "#64789E"],
  [0.56, "#6E82A6"],
  [0.58, "#8A7C74"],
  [0.63, "#F4A24C"],
  [0.8, "#F4B36B"],
  [1.0, "#F2C289"],
];
export const KEY_INTENSITY: [number, number][] = [
  [0.0, 0.55],
  [0.4, 0.35],
  [0.56, 0.42],
  [0.58, 0.6],
  [0.63, 3.4],
  [0.8, 2.4],
  [1.0, 1.9],
];
export const DUST: [number, number][] = [
  [0.0, 0.28],
  [0.55, 0.32],
  [0.66, 0.9],
  [0.8, 0.55],
  [1.0, 0.45],
];

// Act section heights (vh). Weighted so the catch (Act III, local ~0.62)
// lands near 55–60% of total scroll, per the spec's grade keyframes.
export const ACT_VH = [200, 280, 300, 120, 160, 130, 110] as const;
export const CATCH_LOCAL = 0.62; // Act III local progress where the catch fires on scroll

/** Scroll progress → the chrome clock. One working day: 7:00 AM → 8:00 PM. */
export function clockLabel(progress: number): string {
  const startMin = 7 * 60;
  const endMin = 20 * 60;
  const m = Math.round(startMin + (endMin - startMin) * Math.min(1, Math.max(0, progress)));
  let h = Math.floor(m / 60);
  const min = m % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 === 0 ? 12 : h % 12;
  return `${h}:${String(min).padStart(2, "0")} ${ampm}`;
}

// ---------------------------------------------------------------------------
// The store
// ---------------------------------------------------------------------------

type Listener = () => void;

class ExpStore {
  // continuous (written per frame, read by the scene — never rendered by React)
  progress = 0;
  act = 1; // 1..7
  actLocal = 0; // 0..1 inside the current act
  bg: RGB = hexToRgb("#06080D");
  fog: RGB = hexToRgb("#0A0E14");
  key: RGB = hexToRgb("#7A90B8");
  keyIntensity = 0.55;
  dust = 0.28;
  clock = "7:00 AM";

  // discrete (bumps version → React chrome re-renders)
  theme: "dark" | "golden" = "dark";
  worker: WorkerId = "receptionist";
  caught = false; // scroll has passed the catch point
  catchAt = -1; // performance.now() when the catch (or a replay) fired
  replaySeq = 0; // bumps on every pain-button / replay re-run
  soundOn = false;
  version = 0;

  private listeners = new Set<Listener>();

  subscribe = (fn: Listener) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };
  getVersion = () => this.version;
  bump() {
    this.version++;
    this.listeners.forEach((fn) => fn());
  }

  setAct(act: number) {
    if (act !== this.act) {
      this.act = act;
      this.bump();
    }
  }
  setTheme(theme: "dark" | "golden") {
    if (theme !== this.theme) {
      this.theme = theme;
      this.bump();
    }
  }
  fireCatch() {
    if (!this.caught) {
      this.caught = true;
      this.catchAt = performance.now();
      this.replaySeq++;
      this.bump();
    }
  }
  resetCatch() {
    if (this.caught) {
      this.caught = false;
      this.catchAt = -1;
      this.bump();
    }
  }
  replay(worker?: WorkerId) {
    if (worker) this.worker = worker;
    this.caught = true;
    this.catchAt = performance.now();
    this.replaySeq++;
    this.bump();
  }
  setSound(on: boolean) {
    this.soundOn = on;
    this.bump();
  }
}

export const exp = new ExpStore();
