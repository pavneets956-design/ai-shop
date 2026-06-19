// Blueprint backdrop: structural grid + faint cool teal/slate washes on drafting paper.
// Pure CSS, server-rendered, zero JS. Place inside a `relative` section.
export default function GlowBackground({
  variant = "default",
}: {
  variant?: "default" | "hero" | "subtle";
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* structural blueprint grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />

      {/* faint neutral ink washes — subtle depth, no orange halo */}
      <div
        className="absolute left-1/2 top-[-12%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(25,23,22,0.05), transparent 70%)" }}
      />
      {variant !== "subtle" && (
        <>
          <div
            className="absolute left-[6%] top-[28%] h-[40vh] w-[40vh] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(25,23,22,0.06), transparent 70%)" }}
          />
          <div
            className="absolute right-[5%] top-[10%] h-[36vh] w-[36vh] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(25,23,22,0.045), transparent 70%)" }}
          />
        </>
      )}

      {variant === "hero" && (
        <div
          className="absolute inset-x-0 bottom-0 h-[36%]"
          style={{ background: "linear-gradient(to top, #FAF7F2 10%, transparent)" }}
        />
      )}
    </div>
  );
}
