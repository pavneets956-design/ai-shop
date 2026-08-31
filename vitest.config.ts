import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit tests for server code (API route handlers). Node environment, `@/` alias
// mirrors tsconfig paths so mocks like `@/lib/prisma` resolve.
export default defineConfig({
  test: {
    environment: "node",
    // tests/** = server/API route handler tests.
    // lib/tools/** = co-located pure-calculation unit tests for the free tools.
    include: ["tests/**/*.test.ts", "lib/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
  // `tests/admin-leads-authorization.test.ts` imports the /admin/leads server
  // component to pin the order of authorisation and query. esbuild's default is
  // the classic JSX runtime, which needs `React` in scope — Next uses the
  // automatic runtime and never imports it. Without this, importing any TSX
  // file into a test throws "React is not defined" at the first `return (`.
  esbuild: { jsx: "automatic" },
});
