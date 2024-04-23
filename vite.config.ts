import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      [
        "/home/paje/Backend/Api-node-Solid/src/http/controllers/test/**",
        "prisma",
      ],
    ],
  },
});
