// Minimal, dependency-free PNG decoder (8-bit, colorType 2/6, non-interlaced —
// what Chromium's page.screenshot()/elementHandle.screenshot() produce) plus
// WCAG contrast math. Used to sample real rendered pixels when a text
// element's background can't be resolved analytically (gradient/image bg).
import zlib from "node:zlib";

export function decodePNG(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47) throw new Error("not a PNG (bad signature)");
  let offset = 8;
  let width, height, bitDepth, colorType, interlace;
  const idatChunks = [];
  while (offset < buffer.length) {
    const len = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
      interlace = data.readUInt8(12);
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += 8 + len + 4;
  }
  if (bitDepth !== 8) throw new Error(`unsupported bitDepth=${bitDepth}`);
  if (interlace !== 0) throw new Error("interlaced PNG not supported");
  if (colorType !== 2 && colorType !== 6) throw new Error(`unsupported colorType=${colorType}`);
  const channels = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = channels; // bitDepth 8 => 1 byte per channel
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let rawOffset = 0;
  for (let y = 0; y < height; y++) {
    const filterType = raw[rawOffset];
    rawOffset += 1;
    const rowStart = y * stride;
    const prevRowStart = (y - 1) * stride;
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[rawOffset + x];
      const a = x >= bpp ? out[rowStart + x - bpp] : 0;
      const b = y > 0 ? out[prevRowStart + x] : 0;
      const c = y > 0 && x >= bpp ? out[prevRowStart + x - bpp] : 0;
      let value;
      switch (filterType) {
        case 0:
          value = rawByte;
          break;
        case 1:
          value = rawByte + a;
          break;
        case 2:
          value = rawByte + b;
          break;
        case 3:
          value = rawByte + Math.floor((a + b) / 2);
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          value = rawByte + pr;
          break;
        }
        default:
          throw new Error(`unsupported filter type ${filterType}`);
      }
      out[rowStart + x] = value & 0xff;
    }
    rawOffset += stride;
  }
  return { width, height, channels, data: out };
}

// Mode-color sampling: for a text element's screenshot, the background
// occupies more area than thin glyph strokes, so the most frequent
// quantized colour is a reliable estimate of the effective background.
// Returns { r,g,b, coverage } for the top colour, and the 2nd most frequent
// (candidate foreground / anti-aliasing edge) for sanity-checking.
export function samplePixelBackground(pngBuffer) {
  const { width, height, channels, data } = decodePNG(pngBuffer);
  const freq = new Map();
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    // quantize to reduce anti-aliasing noise
    const qr = Math.min(255, Math.round(r / 8) * 8);
    const qg = Math.min(255, Math.round(g / 8) * 8);
    const qb = Math.min(255, Math.round(b / 8) * 8);
    const key = `${qr},${qg},${qb}`;
    freq.set(key, (freq.get(key) || 0) + 1);
  }
  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const total = width * height;
  const top = sorted[0];
  const [r, g, b] = top[0].split(",").map(Number);
  return { r, g, b, coverage: top[1] / total, distinctColors: sorted.length, totalPixels: total };
}

export function parseCssColor(str) {
  if (!str) return null;
  const m = str.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  return { r, g, b, a };
}

function srgbToLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

export function relativeLuminance({ r, g, b }) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function contrastRatio(c1, c2) {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Composite src-over-dst with alpha.
export function compositeOver(src, dst) {
  const a = src.a + dst.a * (1 - src.a);
  if (a === 0) return { r: 255, g: 255, b: 255, a: 0 };
  const r = (src.r * src.a + dst.r * dst.a * (1 - src.a)) / a;
  const g = (src.g * src.a + dst.g * dst.a * (1 - src.a)) / a;
  const b = (src.b * src.a + dst.b * dst.a * (1 - src.a)) / a;
  return { r, g, b, a };
}
