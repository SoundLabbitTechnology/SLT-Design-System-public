#!/usr/bin/env node
/**
 * G4 — Chromatic ビジュアル回帰ゲート
 * CI / ローカルとも CHROMATIC_PROJECT_TOKEN があるときのみ実行。
 * 既定の `npm run check`（L1）には含めない（L2 / 明示ゲート）。
 */

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const token = process.env.CHROMATIC_PROJECT_TOKEN?.trim();
if (!token) {
  console.log("G4 skipped: CHROMATIC_PROJECT_TOKEN is not set");
  console.log("Fix: set the token (Chromatic project Manage page) and re-run.");
  process.exit(0);
}

console.log("=== G4 Chromatic ===\n");

const build = spawnSync("npm", ["run", "build:all"], {
  cwd: ROOT,
  stdio: "inherit",
  shell: process.platform === "win32",
});
if ((build.status ?? 1) !== 0) {
  process.exit(build.status ?? 1);
}

const result = spawnSync(
  "npx",
  [
    "chromatic",
    "--project-token",
    token,
    "--exit-zero-on-changes=false",
    "--only-changed",
  ],
  {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  },
);

process.exit(result.status ?? 1);
