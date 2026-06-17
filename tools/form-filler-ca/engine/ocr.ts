// Client-side OCR via tesseract.js (WASM). Runs entirely in the browser tab;
// the image bytes never leave the device.
//
// For passports we OCR only the MRZ band (the bottom ~22% of the page) with an
// OCR-B-style character whitelist — this is far more reliable than OCRing the
// whole document and feeds parsePassportMrz().

type ProgressFn = (pct: number, status: string) => void;

/** Draw an image source into a canvas, optionally cropping to a vertical band. */
async function toCanvas(
  src: Blob,
  band?: { topPct: number; bottomPct: number },
): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(src);
  const top = band ? Math.floor(bitmap.height * band.topPct) : 0;
  const bottom = band ? Math.floor(bitmap.height * band.bottomPct) : bitmap.height;
  const h = bottom - top;
  const canvas = document.createElement('canvas');
  // Upscale narrow MRZ bands a little to help Tesseract.
  const scale = band ? 2 : 1;
  canvas.width = bitmap.width * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(bitmap, 0, top, bitmap.width, h, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas;
}

/**
 * OCR the MRZ band of a passport image and return the raw text lines.
 * Pass the full passport bio-page image; we crop to the bottom band internally.
 */
export async function ocrPassportMrz(image: Blob, onProgress?: ProgressFn): Promise<string> {
  const { createWorker } = await import('tesseract.js');
  const canvas = await toCanvas(image, { topPct: 0.74, bottomPct: 1.0 });
  const worker = await createWorker('eng', 1, {
    logger: (m: { progress: number; status: string }) =>
      onProgress?.(Math.round((m.progress || 0) * 100), m.status),
  });
  try {
    // MRZ alphabet only: A-Z, 0-9, and the filler '<'.
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',
    });
    const { data } = await worker.recognize(canvas);
    return data.text || '';
  } finally {
    await worker.terminate();
  }
}

/** General full-document OCR (used for non-MRZ supporting docs). */
export async function ocrDocument(image: Blob, onProgress?: ProgressFn): Promise<string> {
  const { createWorker } = await import('tesseract.js');
  const canvas = await toCanvas(image);
  const worker = await createWorker('eng', 1, {
    logger: (m: { progress: number; status: string }) =>
      onProgress?.(Math.round((m.progress || 0) * 100), m.status),
  });
  try {
    const { data } = await worker.recognize(canvas);
    return data.text || '';
  } finally {
    await worker.terminate();
  }
}
