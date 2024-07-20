import { defineConfig } from "vitest/config";
import * as path from "node:path";

export default defineConfig({
  test: {
    alias: {
      "@root": path.resolve(__dirname, "./src"),
    },
    coverage: {
      clean: true,
      provider: "istanbul",
      reportOnFailure: true,
      reportsDirectory: path.resolve(__dirname, "./coverage"),
    },
    dir: path.resolve(__dirname, "./test"),
    cache: false,
    globals: true,
  },
});
