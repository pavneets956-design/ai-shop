// Decorative futuristic backdrop: animated grid + aurora glow blobs.
// Pure CSS, server-rendered, zero JS. Place inside a `relative` section.
export default function GlowBackground({
  variant = "default",
}: {
  variant?: "default" | "hero" | "subtle";
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* aurora blobs */}
      <div
        className="absolute left-1/2 top-[-10%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full blur-[120px] animate-aurora"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.32), transparent 70%)" }}
      />
      {variant !== "subtle" && (
        <>
          <div
            className="absolute left-[8%] top-[30%] h-[40vh] w-[40vh] rounded-full blur-[120px] animate-aurora"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.28), transparent 70%)",
              animationDelay: "3s",
            }}
          />
          <div
            className="absolute right-[6%] top-[12%] h-[38vh] w-[38vh] rounded-full blur-[120px] animate-aurora"
            style={{
              background: "radial-gradient(circle, rgba(34,211,238,0.22), transparent 70%)",
              animationDelay: "6s",
            }}
          />
        </>
      )}

      {variant === "hero" && (
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{ background: "linear-gradient(to top, #05060a 8%, transparent)" }}
        />
      )}
    </div>
  );
}
