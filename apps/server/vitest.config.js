import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.js"],
    coverage: {
      include: ["*.js"],
      exclude: ["vitest.config.js"],
    },
  },
});
