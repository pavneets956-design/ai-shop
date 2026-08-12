"use client";

import { useEffect } from "react";

/**
 * Root error boundary. This replaces the entire root layout when it fires,
 * which means globals.css is NOT loaded and no Tailwind class will resolve.
 * Every style here is therefore inline and self-sufficient by necessity —
 * do not "tidy" these into utility classes, the page would render unstyled.
 *
 * Palette values are copied literally from tailwind.config.ts rather than
 * imported, for the same reason.
 */

const INK = "#1D1D1F";
const INK_SOFT = "#6E6E73";
const PAPER = "#FBFBFD";
const LINE = "#D2D2D7";
const DANGER = "#B42318";
const EMAIL = "pavneets956@gmail.com";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  const subject = encodeURIComponent(
    `Site down on aibuiltbyhand.com${error.digest ? ` (ref ${error.digest})` : ""}`,
  );

  return (
    <html lang="en-CA">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: PAPER,
          color: INK,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: "34rem", width: "100%" }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: DANGER,
            }}
          >
            Site error
          </p>

          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(30px, 5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              fontWeight: 650,
            }}
          >
            The site failed to load.
          </h1>

          <p style={{ margin: "16px 0 0", fontSize: "17px", lineHeight: 1.6, color: INK_SOFT }}>
            This is a fault on our end, not yours. Nothing you entered was saved or sent.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                appearance: "none",
                border: "none",
                borderRadius: "6px",
                background: INK,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px 20px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: "6px",
                border: `1px solid ${LINE}`,
                color: INK,
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px 20px",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>

          <p style={{ margin: "28px 0 0", fontSize: "14px", color: INK_SOFT }}>
            Still broken?{" "}
            <a href={`mailto:${EMAIL}?subject=${subject}`} style={{ color: INK }}>
              Email Pavneet
            </a>{" "}
            — it reaches the person who can fix it.
          </p>

          {error.digest && (
            <p
              style={{
                margin: "12px 0 0",
                fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
                fontSize: "12px",
                color: "#A1A1A6",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
