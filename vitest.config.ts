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
});
