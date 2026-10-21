import { defineConfig } from "vitest/config";
import path from "node:path";

// Mirrors the "@/*" path alias from tsconfig.json so modules under
// lib/content (e.g. cosmic.ts) that import via "@/..." can be unit tested,
// not just modules that stick to relative imports.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
});
