import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit tests for server code (API route handlers). Node environment, `@/` alias
// mirrors tsconfig paths so mocks like `@/lib/prisma` resolve.
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
});
