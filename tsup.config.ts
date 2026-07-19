import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  banner: {
    js: '"use client";',
  },
  external: [
    "react",
    "react-dom",
    "@radix-ui/react-dialog",
    "@radix-ui/react-slot",
    "clsx",
  ],
  outDir: "dist-ui",
});
