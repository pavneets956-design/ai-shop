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
      // Temporary (307) while on the branch so it's cleanly reversible; promote
      // to permanent once the retirement is confirmed on prod.
      { source: '/quiet-hours', destination: '/ai-receptionist', permanent: true },
      { source: '/ai-front-desk', destination: '/ai-receptionist', permanent: false },
      { source: '/forge', destination: '/', permanent: false },
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
