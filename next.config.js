/** @type {import('next').NextConfig} */

// Central redirect registry (Lane D owns its contents; see lib/redirects.js for
// the contract). Merged FIRST in redirects() so a row added there always wins
// over the long-standing entries below. Required with a defensive fallback so a
// malformed/absent file can never break the build.
let registryRedirects = [];
try {
  // eslint-disable-next-line global-require
  const mod = require('./lib/redirects.js');
  if (Array.isArray(mod && mod.redirects)) registryRedirects = mod.redirects;
} catch (err) {
  console.warn('[next.config] lib/redirects.js not loaded:', err && err.message);
}

// Security headers. The strict CSP is scoped to the Form Filler route so it can't
// break the rest of the site. It allows the in-browser WASM engines (MuPDF + the
// Tesseract OCR worker) and the one-time engine-asset download, but blocks any
// outbound connection that could carry a user's document.
// Next's dev hot-reload uses eval(); production does not. wasm-unsafe-eval is all
// the WASM engines need at runtime, so 'unsafe-eval' is added in dev only.
const devEval = process.env.NODE_ENV !== 'production' ? " 'unsafe-eval'" : '';

const formFillerCsp = [
  "default-src 'self'",
  `script-src 'self' 'wasm-unsafe-eval' 'unsafe-inline'${devEval}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // connect-src is the privacy boundary: self + the OCR engine CDNs only. No analytics, no upload endpoint.
  "connect-src 'self' blob: data: https://cdn.jsdelivr.net https://unpkg.com https://tessdata.projectnaptha.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const baseSecurityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async redirects() {
    const base = [
      // ---------------------------------------------------------------------
      // /products — was a Server Component `redirect("/solutions")` inside
      // app/products/page.tsx. On production that answered **307 with NO
      // `Location` header** (verified 2026-08-30, research/…/06-technical-seo.md
      // "Read this first" #3): an indexable, non-disallowed URL that redirects
      // nowhere. A next.config rule runs BEFORE the filesystem/app router, so
      // this is authoritative regardless of whether app/products/** still
      // exists — deleting those files is another lane's job.
      // `:path*` matches zero segments too, but /products is listed explicitly
      // so the intent survives any path-to-regexp change.
      { source: '/products', destination: '/solutions', permanent: true },
      { source: '/products/:path*', destination: '/solutions', permanent: true },

      // /v2 — public/v2/index.html is a 610 KB stray "Bundled Page" that is
      // live, 200, with no canonical and no robots directive (06-technical-seo
      // defect #11). Redirects are evaluated before public/ is served, so this
      // takes it off the index today; deleting the file is a separate lane's.
      { source: '/v2', destination: '/', permanent: true },
      { source: '/v2/:path*', destination: '/', permanent: true },

      // Legacy cinematic showpieces retired in favour of the Molten Forge site.
      // Point straight at the on-brand equivalents (no redirect chains).
      // Permanent (308) — retirement confirmed for production.
      { source: '/quiet-hours', destination: '/ai-receptionist', permanent: true },
      { source: '/ai-front-desk', destination: '/ai-receptionist', permanent: true },
      { source: '/forge', destination: '/', permanent: true },

      // /tools RECLAIMED 2026-07-15 for the FREE contractor tools suite (hub +
      // 5 browser calculators). The old paid "Tools Pro" ($29/mo) product stays
      // retired: its dashboard + the 9 self-serve tool slugs keep permanent
      // redirects so no discontinued paid pages resurface. The free Form Filler
      // (/tools/form-filler) is untouched — it keeps its own route + strict CSP.
      { source: '/tools/pro', destination: '/pricing', permanent: true },
      { source: '/tools/proposal-generator', destination: '/shop', permanent: true },
      { source: '/tools/quote-estimate-generator', destination: '/shop', permanent: true },
      { source: '/tools/review-reply-generator', destination: '/shop', permanent: true },
      { source: '/tools/business-brief-generator', destination: '/shop', permanent: true },
      { source: '/tools/invoice-reminder-generator', destination: '/shop', permanent: true },
      { source: '/tools/quote-builder', destination: '/shop', permanent: true },
      { source: '/tools/sop-builder', destination: '/shop', permanent: true },
      { source: '/tools/hiring-assistant', destination: '/shop', permanent: true },
      { source: '/tools/customer-reactivation', destination: '/shop', permanent: true },

      // SEO canonicalisation (308). These buyer-intent root/alias URLs are the
      // ones people type or link, but the ranking page already lives elsewhere.
      // Redirecting instead of duplicating keeps one canonical page per keyword
      // (no content cannibalisation) while the requested URL still resolves.
      { source: '/ai-quote-generator', destination: '/services/ai-quote-generator', permanent: true },
      { source: '/ai-workflow-automation', destination: '/services/ai-workflow-automation', permanent: true },
      { source: '/ai-crm-automation', destination: '/services/ai-crm-automation', permanent: true },
      { source: '/ai-invoice-reminder-system', destination: '/services/ai-invoice-reminder-system', permanent: true },
      { source: '/ai-email-automation', destination: '/services/ai-email-automation', permanent: true },
      { source: '/ai-booking-assistant', destination: '/services/ai-calendar-booking-agent', permanent: true },
      { source: '/ai-customer-support-bot', destination: '/services/ai-customer-support-agent', permanent: true },
      { source: '/ai-voice-agent-for-business', destination: '/services/ai-voice-agent', permanent: true },
      { source: '/custom-ai-app-development-canada', destination: '/custom-ai-app-development', permanent: true },
      // Resource aliases → canonical resource/how-to pages.
      { source: '/resources/how-to-automate-quote-requests', destination: '/how-to/automate-quote-requests', permanent: true },
      { source: '/resources/how-to-automate-invoice-reminders', destination: '/how-to/automate-invoice-reminders', permanent: true },
      { source: '/resources/best-ai-tools-for-small-business-canada', destination: '/resources/best-ai-tools-for-small-business', permanent: true },
      { source: '/resources/ai-automation-examples-small-business', destination: '/resources/ai-automation-examples-for-small-business', permanent: true },
      // Comparison alias.
      { source: '/compare/custom-ai-app-vs-saas-tool', destination: '/compare/custom-ai-tool-vs-saas', permanent: true },
    ];

    // Registry first, then the base list minus anything the registry already
    // claims — one source can only redirect to one destination, and Next takes
    // the first match, so de-duplicating here keeps the map single-valued.
    const claimed = new Set(registryRedirects.map((r) => r.source));
    return [...registryRedirects, ...base.filter((r) => !claimed.has(r.source))];
  },
  async headers() {
    return [
      { source: '/:path*', headers: baseSecurityHeaders },
      {
        source: '/tools/form-filler/:path*',
        headers: [
          ...baseSecurityHeaders,
          { key: 'Content-Security-Policy', value: formFillerCsp },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
  webpack(config, { webpack }) {
    // MuPDF / Tesseract ship WASM; enable async WASM and stub Node-only builtins.
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    // MuPDF's universal build does `require('node:fs')` for Node; rewrite the
    // node: scheme to the bare name so the browser fallback can stub it out.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, path: false, crypto: false, os: false, child_process: false,
      module: false, worker_threads: false, url: false,
    };
    return config;
  },
};

module.exports = nextConfig;
