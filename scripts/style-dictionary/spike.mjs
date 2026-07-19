#!/usr/bin/env node
/**
 * Style Dictionary spike — single theme CSS only.
 * Output: .cache/sd-spike/ai-dash/dark/tokens.css
 * Does NOT replace build-dtcg.mjs. See design-tokens/README.md
 */

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import StyleDictionary from "style-dictionary";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const OUT = join(ROOT, ".cache/sd-spike/ai-dash/dark");

mkdirSync(OUT, { recursive: true });

const sd = new StyleDictionary({
  log: { verbosity: "silent", warnings: "disabled" },
  source: [
    join(ROOT, "design-tokens/primitives.json"),
    join(ROOT, "design-tokens/semantic.ai-dash.dark.json"),
    join(ROOT, "design-tokens/components.json"),
  ],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: OUT + "/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log(`Style Dictionary spike → ${OUT}/tokens.css`);
