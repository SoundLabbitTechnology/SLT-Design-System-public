#!/usr/bin/env node
/**
 * DS Harness — L1 生成ループ単一入口
 * G0 → G1 → G2 (types + tsc) → G3 (storybook vitest) → docs contract → isotc verify
 */

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const ALL_GATES = ["g0", "g1", "g2", "g3", "docs", "isotc"];

/** L1 既定外。`--gates g4` または `npm run check:g4` で明示実行（要 CHROMATIC_PROJECT_TOKEN） */

function parseArgs(argv) {
  const gatesIdx = argv.indexOf("--gates");
  const skipBuild = argv.includes("--skip-build");
  let gates = ALL_GATES;
  if (gatesIdx >= 0 && argv[gatesIdx + 1]) {
    gates = argv[gatesIdx + 1].split(",").map((g) => g.trim().toLowerCase());
  }
  return { gates, skipBuild };
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...opts,
  });
  return result.status ?? 1;
}

function runCapture(cmd, args) {
  return spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
}

const { gates, skipBuild } = parseArgs(process.argv.slice(2));

if (!skipBuild) {
  console.log("=== build:all (prerequisite) ===\n");
  const buildStatus = run("npm", ["run", "build:all"]);
  if (buildStatus !== 0) {
    emitFailure("build", buildStatus === 2 ? 2 : 1, "build:all failed");
    process.exit(buildStatus);
  }
}

const gateRunners = {
  g0: () => run("node", ["scripts/harness/gate-g0-tokens.mjs"]),
  g1: () => run("node", ["scripts/harness/gate-g1-no-raw-values.mjs"]),
  g2: () => {
    const gen = run("node", ["scripts/harness/generate-token-types.mjs"]);
    if (gen !== 0) return gen;
    return run("npx", ["tsc", "--noEmit", "-p", "tsconfig.json"]);
  },
  g3: () => run("npx", ["vitest", "run", "--project", "storybook"]),
  docs: () => run("node", ["scripts/harness/gate-docs.mjs"]),
  isotc: () => {
    const result = runCapture("npx", ["isotc", "verify", "--format", "json"]);
    if (result.status !== 0) {
      if (result.stdout) console.error(result.stdout);
      if (result.stderr) console.error(result.stderr);
      return result.status === 2 ? 2 : 1;
    }
    if (result.stdout?.trim()) {
      try {
        const json = JSON.parse(result.stdout);
        console.log(JSON.stringify(json, null, 2));
      } catch {
        console.log(result.stdout);
      }
    }
    console.log("isotc verify PASS");
    return 0;
  },
  g4: () => run("node", ["scripts/harness/gate-g4-chromatic.mjs"]),
};

for (const gate of gates) {
  if (!gateRunners[gate]) {
    console.error(`Unknown gate: ${gate}`);
    process.exit(1);
  }
  console.log(`\n=== Gate ${gate.toUpperCase()} ===\n`);
  const status = gateRunners[gate]();
  if (status !== 0) {
    emitFailure(gate, status, `Gate ${gate} failed`);
    process.exit(status);
  }
}

// G5: Lighthouse — 消費者リポジトリ側（v1.0+）

console.log("\n✅ npm run check — all gates passed:", gates.join(", "));

function emitFailure(gate, exitCode, message) {
  const payload = {
    harness: "SLT-Design-System-public",
    gate,
    exitCode,
    message,
    fix: exitCode === 2 ? "Read Fix: lines above and self-correct (L1 loop)" : message,
  };
  console.error("\n--- harness failure (JSON) ---");
  console.error(JSON.stringify(payload, null, 2));
}
