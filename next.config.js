/** @type {import('next').NextConfig} */

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
    return [
      // Legacy cinematic showpieces retired in favour of the Molten Forge site.
      // Point straight at the on-brand equivalents (no redirect chains).
      // Permanent (308) — retirement confirmed for production.
      { source: '/quiet-hours', destination: '/ai-receptionist', permanent: true },
      { source: '/ai-front-desk', destination: '/ai-receptionist', permanent: true },
      { source: '/forge', destination: '/', permanent: true },

      // Tools Pro (the $29/mo self-serve subscription) retired 2026-07-06 — the
      // monthly option is gone; creators now buy tools one-time (you own it).
      // Redirect the whole /tools tree to the shop, EXCEPT the free Form Filler.
      { source: '/tools', destination: '/shop', permanent: true },
      { source: '/tools/:slug((?!form-filler).*)', destination: '/shop', permanent: true },

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
      // Duplicate chatbot page merged into the canonical development page (2026-07-13):
      // /ai-chatbot-for-small-business competed with /ai-chatbot-development for the
      // same intent (both Service, both $1,500). Unique content folded into the winner.
      { source: '/ai-chatbot-for-small-business', destination: '/ai-chatbot-development', permanent: true },
      // Duplicate use-case page consolidated into the canonical money page (2026-07-13):
      // /use-cases/ai-receptionist-for-contractors competed with /ai-receptionist-for-contractors
      // for the exact same query. The money page is the strengthened primary.
      { source: '/use-cases/ai-receptionist-for-contractors', destination: '/ai-receptionist-for-contractors', permanent: true },
      // Resource aliases → canonical resource/how-to pages.
      { source: '/resources/how-to-automate-quote-requests', destination: '/how-to/automate-quote-requests', permanent: true },
      { source: '/resources/how-to-automate-invoice-reminders', destination: '/how-to/automate-invoice-reminders', permanent: true },
      { source: '/resources/best-ai-tools-for-small-business-canada', destination: '/resources/best-ai-tools-for-small-business', permanent: true },
      { source: '/resources/ai-automation-examples-small-business', destination: '/resources/ai-automation-examples-for-small-business', permanent: true },
      // Comparison alias.
      { source: '/compare/custom-ai-app-vs-saas-tool', destination: '/compare/custom-ai-tool-vs-saas', permanent: true },
    ];
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
