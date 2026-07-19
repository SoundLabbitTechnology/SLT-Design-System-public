#!/usr/bin/env node
/** @deprecated Use scripts/harness/gate-g0-tokens.mjs or npm run check */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const result = spawnSync(
  process.execPath,
  [join(__dirname, "harness/gate-g0-tokens.mjs")],
  { stdio: "inherit" }
);
process.exit(result.status ?? 1);
