"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductShowcase.module.css";

// Adapted from RoomRush's PixelRoom.tsx. Same promotional art, paths and timing.
// This is the homepage's decorative snake loop, not a connected multiplayer room.
type Point = readonly [number, number];
function rectangle(x: number, y: number, width: number, height: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < width; i++) points.push([x + i, y]);
  for (let i = 0; i < height; i++) points.push([x + width, y + i]);
  for (let i = width; i > 0; i--) points.push([x + i, y + height]);
  for (let i = height; i > 0; i--) points.push([x, y + i]);
  return points;
}
const PATHS = [rectangle(2, 2, 10, 3), rectangle(18, 1, 9, 4), rectangle(15, 7, 11, 3), rectangle(3, 7, 8, 3)];
const APPLES: Point[] = [[15, 3], [8, 1], [29, 8], [12, 9], [1, 6]];
const COLORS = ["#33dafa", "#9cee34", "#ee67d1", "#ffb443"];

export default function RoomRushScene({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artRef = useRef<HTMLImageElement>(null);
  const tickRef = useRef(0);
  const [artState, setArtState] = useState<"loading" | "ready" | "error">("ready");
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const image = artRef.current;
    if (image?.complete) setArtState(image.naturalWidth ? "ready" : "error");
    else setArtState("loading");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    setCanvasReady(true);
    let frame = 0;
    let timer = 0;
    let inView = false;
    let disposed = false;
    const draw = (tick: number) => {
      ctx.fillStyle = "#080f25";
      ctx.fillRect(0, 0, 352, 144);
      ctx.fillStyle = "#122449";
      for (let x = 0; x < 352; x += 11) ctx.fillRect(x, 0, 1, 144);
      for (let y = 0; y < 144; y += 12) ctx.fillRect(0, y, 352, 1);
      APPLES.forEach(([x, y]) => {
        ctx.fillStyle = "#ff586e"; ctx.fillRect(x * 11, y * 12, 7, 7);
        ctx.fillStyle = COLORS[1]; ctx.fillRect(x * 11 + 4, y * 12 - 3, 4, 3);
      });
      PATHS.forEach((path, i) => {
        const head = (tick + i * 7) % path.length;
        for (let j = 8; j >= 0; j--) {
          const [x, y] = path[(head - j + path.length) % path.length];
          ctx.fillStyle = COLORS[i]; ctx.fillRect(x * 11, y * 12, 11, 11);
          ctx.globalAlpha = .4; ctx.fillStyle = "#fff5d6";
          ctx.fillRect(x * 11 + 2, y * 12 + 2, 5, 2); ctx.globalAlpha = 1;
          if (j === 0) {
            ctx.fillStyle = "#fff5d6"; ctx.fillRect(x * 11 + 4, y * 12 + 2, 7, 7);
            ctx.fillStyle = "#080f25"; ctx.fillRect(x * 11 + 7, y * 12 + 3, 3, 4);
          }
        }
      });
      ctx.fillStyle = "#ffe052"; ctx.fillRect(171, 71, 11, 11); ctx.fillRect(174, 68, 5, 3);
      ctx.fillStyle = "#fff5d6"; ctx.fillRect(172, 72, 3, 3);
    };
    const run = () => {
      if (disposed || paused || !inView || document.hidden) { frame = 0; return; }
      frame = 0;
      tickRef.current += 1;
      draw(tickRef.current);
      // Sleep between pixel-game steps instead of waking on every display frame.
      timer = window.setTimeout(() => { frame = requestAnimationFrame(run); }, 140);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      frame = 0;
      if (!paused && inView && !document.hidden) frame = requestAnimationFrame(run);
    };
    draw(tickRef.current);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

  return (
    <div className={styles.roomArt} data-art-state={artState}>
      {/* Same atlas crop as RoomRush's SVG viewBox, with native image load/error events. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={artRef} src="/showcase/roomrush/approved-art.webp" width={1536} height={1024}
        alt="" draggable={false} onLoad={() => setArtState("ready")} onError={() => setArtState("error")} />
      <canvas className={styles.snakes} ref={canvasRef} width={352} height={144} aria-hidden="true"
        hidden={!canvasReady || artState !== "ready"} />
      {artState === "loading" && <span className={styles.artMessage}>Loading the room…</span>}
      {artState === "error" && <span className={styles.artMessage}>Preview unavailable. Explore RoomRush ↗</span>}
      {artState === "ready" && !canvasReady && <span className={styles.artMessage}>Static preview · Explore RoomRush ↗</span>}
    </div>
  );
}
