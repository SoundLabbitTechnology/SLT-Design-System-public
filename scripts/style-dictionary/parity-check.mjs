#!/usr/bin/env node
/**
 * Compare build-dtcg.mjs output vs Style Dictionary spike (single theme).
 * Runs spike first, then reports var-name / value gaps.
 *
 * Usage: npm run tokens:sd-parity
 * Exit 0 = names match and no unresolved [object Object] values in SD output.
 */

import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

const THEME = { id: "ai-dash", mode: "dark" };
const DTCG_CSS = join(ROOT, "dist", THEME.id, THEME.mode, "tokens.css");
const SD_CSS = join(ROOT, ".cache/sd-spike", THEME.id, THEME.mode, "tokens.css");

function runSpike() {
  const result = spawnSync("node", ["scripts/style-dictionary/spike.mjs"], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

/** @param {string} content */
function parseCssVars(content) {
  /** @type {Map<string, string>} */
  const map = new Map();
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*(--[a-z0-9-]+):\s*(.+?);/);
    if (m) map.set(m[1], m[2].trim());
  }
  return map;
}

function normalizeValue(value) {
  return value.replace(/\s+/g, " ").toLowerCase();
}

runSpike();

if (!existsSync(DTCG_CSS)) {
  console.error(`Missing ${DTCG_CSS} — run npm run build first`);
  process.exit(1);
}

const dtcg = parseCssVars(readFileSync(DTCG_CSS, "utf8"));
const sd = parseCssVars(readFileSync(SD_CSS, "utf8"));

const onlyDtcg = [...dtcg.keys()].filter((k) => !sd.has(k)).sort();
const onlySd = [...sd.keys()].filter((k) => !dtcg.has(k)).sort();
const valueDiffs = [...dtcg.keys()]
  .filter((k) => sd.has(k) && normalizeValue(dtcg.get(k)) !== normalizeValue(sd.get(k)))
  .sort();
const sdUnresolved = [...sd.entries()].filter(([, v]) => v.includes("[object Object]"));

console.log(`\n=== SD parity (${THEME.id}/${THEME.mode}) ===\n`);
console.log(`build-dtcg vars: ${dtcg.size}`);
console.log(`SD spike vars:   ${sd.size}`);
console.log(`only build-dtcg: ${onlyDtcg.length}`);
console.log(`only SD:         ${onlySd.length}`);
console.log(`value diffs:     ${valueDiffs.length}`);
console.log(`SD unresolved:   ${sdUnresolved.length}`);

if (onlyDtcg.length) {
  console.error("\nVars missing from SD (first 20):");
  for (const k of onlyDtcg.slice(0, 20)) console.error(`  ${k}`);
}

if (onlySd.length) {
  console.log("\nExtra SD vars (acceptable if internal refs):");
  for (const k of onlySd.slice(0, 20)) console.log(`  ${k}`);
}

if (sdUnresolved.length) {
  console.error("\nSD outputs unresolved composite values (need custom transforms):");
  for (const [k] of sdUnresolved.slice(0, 20)) console.error(`  ${k}`);
}

if (valueDiffs.length && valueDiffs.length <= 10) {
  console.log("\nValue diffs sample:");
  for (const k of valueDiffs) {
    console.log(`  ${k}`);
    console.log(`    dtcg: ${dtcg.get(k)}`);
    console.log(`    sd:   ${sd.get(k)}`);
  }
} else if (valueDiffs.length) {
  console.log("\nValue diff categories (custom transforms required):");
  const cats = { dimension: 0, typography: 0, shadow: 0, other: 0 };
  for (const k of valueDiffs) {
    const v = sd.get(k) ?? "";
    if (v.includes("[object Object]")) {
      if (k.includes("typography") || k.startsWith("--typography")) cats.typography++;
      else if (k.includes("shadow")) cats.shadow++;
      else cats.dimension++;
    } else cats.other++;
  }
  console.log(`  dimension/duration: ${cats.dimension}`);
  console.log(`  typography:         ${cats.typography}`);
  console.log(`  shadow:             ${cats.shadow}`);
  console.log(`  other:              ${cats.other}`);
}

const fail =
  onlyDtcg.length > 0 || sdUnresolved.length > 0 || valueDiffs.length > 0;

if (fail) {
  console.error(
    "\nSD parity FAIL — full cutover blocked until custom transforms + multi-theme formats land.",
  );
  console.error("See design-tokens/README.md Phase 2–3.");
  process.exit(1);
}

console.log("\nSD parity PASS (single theme, ai-dash/dark)");
process.exit(0);
