"use client";

import dynamic from "next/dynamic";

// Keep the browser-only WASM engines out of server rendering. Next 15 requires
// ssr:false to live inside a client component; the page still owns its metadata.
const FormFiller = dynamic(() => import("./FormFiller"), {
  ssr: false,
  loading: () => <p className="px-4 py-10 font-mono text-sm text-teal-400">Loading the filler…</p>,
});

export default FormFiller;
