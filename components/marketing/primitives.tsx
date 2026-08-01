import type { ReactNode } from "react";

/**
 * Shared primitives for the Verseo-derived marketing system.
 * Design contract: docs/design/VERSE0-REFERENCE-AUDIT.md
 *
 * These are server components by default — nothing here needs client JS.
 */

/* -------------------------------------------------------------------------
   Eyebrow — the reference's signature bracketed micro-label.
   Brackets are real characters so they stay selectable; the red dot comes
   from the `.v-eyebrow::before` rule and is one of red's few permitted uses.
   ------------------------------------------------------------------------- */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`v-eyebrow ${className}`}>
      <span aria-hidden="true">[</span>
      <span>{children}</span>
      <span aria-hidden="true">]</span>
    </p>
  );
}

/* -------------------------------------------------------------------------
   PegIcon — our translation of the reference's 5x5 dot-matrix glyph.
   Difference is deliberate: the empty grid is VISIBLE (holes), the glyph is
   formed by solid pegs, and exactly one peg is red. Reads as a hand-placed
   object on a pegboard rather than an LED sign. Audit section 5.4.
   ------------------------------------------------------------------------- */
const PEG_GLYPHS: Record<string, number[][]> = {
  // [col,row] pairs on a 5x5 grid. First pair is rendered red.
  phone: [[2, 0], [1, 1], [3, 1], [0, 2], [4, 2], [1, 3], [3, 3], [2, 4]],
  quote: [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [3, 2], [0, 4], [2, 4]],
  review: [[2, 0], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [3, 3]],
  office: [[0, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [4, 3], [0, 4], [4, 4]],
  clock: [[2, 2], [2, 1], [3, 2], [1, 0], [3, 0], [0, 1], [4, 1], [0, 3], [4, 3], [1, 4], [3, 4]],
  tools: [[1, 0], [2, 1], [3, 2], [0, 3], [1, 3], [2, 3], [4, 1], [0, 4]],
};

export function PegIcon({
  glyph,
  className = "",
  size = 40,
}: {
  glyph: keyof typeof PEG_GLYPHS;
  className?: string;
  size?: number;
}) {
  const pegs = PEG_GLYPHS[glyph] ?? PEG_GLYPHS.phone;
  const pitch = 8;
  const off = 4;
  const holes = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) holes.push([c, r]);
  }
  const isPeg = (c: number, r: number) => pegs.some(([pc, pr]) => pc === c && pr === r);
  const [redC, redR] = pegs[0];

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* every hole in the board, including empty ones */}
      {holes.map(([c, r]) => (
        <circle
          key={`h-${c}-${r}`}
          cx={c * pitch + off}
          cy={r * pitch + off}
          r={1.6}
          fill="rgba(29,29,31,0.10)"
        />
      ))}
      {/* the pegs actually placed */}
      {pegs.map(([c, r]) => {
        const red = c === redC && r === redR;
        return (
          <circle
            key={`p-${c}-${r}`}
            cx={c * pitch + off}
            cy={r * pitch + off}
            r={2.6}
            fill={red ? "var(--v-accent)" : "var(--v-ink)"}
          />
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Section heading — eyebrow + H2 + optional lead, in the reference's
   centred 680px measure.
   ------------------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  const centred = align === "center";
  return (
    <div className={centred ? "v-measure" : "max-w-[680px]"}>
      <div className={centred ? "flex justify-center" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="v-h2 mt-4 text-balance">{title}</h2>
      {lead ? <p className="v-lead mt-4">{lead}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Recessed strip — the band that card rows sit ON TOP of. This stacking is
   what gives the reference depth without heavy shadows.
   ------------------------------------------------------------------------- */
export function Recess({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`v-recess ${className}`}>{children}</div>;
}

/* -------------------------------------------------------------------------
   Window chrome — the reference wraps its accordion in a fake app window.
   We reuse it to say "this runs inside your own accounts".
   ------------------------------------------------------------------------- */
export function WindowChrome({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[var(--v-r-panel)] ${className}`} style={{ boxShadow: "var(--v-shadow-card)" }}>
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: "var(--v-recess)", boxShadow: "inset 0 -1px 0 var(--v-hairline)" }}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        </span>
        <span className="v-micro font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
