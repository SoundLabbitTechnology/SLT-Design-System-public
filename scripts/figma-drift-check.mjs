#!/usr/bin/env node
/**
 * Compare a Tokens Studio / Figma JSON export against the repo manifest.
 * No Figma API — pass a local export file path.
 *
 * Usage:
 *   npm run tokens:figma-manifest -- --out design-tokens/figma-manifest.json
 *   npm run tokens:figma-drift -- design-tokens/figma-export/semantic.json
 *
 * Supported export shapes:
 *   - DTCG tree (same as semantic.*.json / components.json)
 *   - Flat map: { "color.surface.primary": { "$value": "...", "$type": "color" } }
 *   - Tokens Studio multi-set: { "color.surface.primary": { "ai-dash / dark": "#...", ... } }
 */

import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DEFAULT_MANIFEST = join(ROOT, "design-tokens/figma-manifest.json");

function isTokenNode(obj) {
  return obj && typeof obj === "object" && "$value" in obj && !Array.isArray(obj);
}

function flattenPaths(obj, prefix = "") {
  /** @type {string[]} */
  const paths = [];
  if (!obj || typeof obj !== "object") return paths;
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (isTokenNode(value)) {
      paths.push(path);
    } else if (value && typeof value === "object") {
      paths.push(...flattenPaths(value, path));
    }
  }
  return paths;
}

function extractKeysFromExport(data) {
  if (!data || typeof data !== "object") return new Set();

  const topKeys = Object.keys(data).filter((k) => !k.startsWith("$"));
  if (topKeys.length === 0) return new Set();

  const first = data[topKeys[0]];
  if (isTokenNode(first)) {
    return new Set(flattenPaths(data));
  }

  if (first && typeof first === "object" && !Array.isArray(first)) {
    const modeLike = Object.values(first).every(
      (v) => typeof v === "string" || (v && typeof v === "object" && "$value" in v)
    );
    if (modeLike) {
      return new Set(topKeys);
    }
  }

  return new Set(flattenPaths(data));
}

function ensureManifest(manifestPath) {
  if (existsSync(manifestPath)) return manifestPath;

  const result = spawnSync(
    process.execPath,
    [
      join(__dirname, "figma-token-manifest.mjs"),
      "--out",
      manifestPath,
    ],
    { stdio: "inherit", cwd: ROOT }
  );
  if (result.status !== 0) {
    console.error("Failed to generate figma-manifest.json");
    process.exit(result.status ?? 1);
  }
  return manifestPath;
}

function diffSets(expected, actual) {
  const missing = [...expected].filter((k) => !actual.has(k)).sort();
  const extra = [...actual].filter((k) => !expected.has(k)).sort();
  return { missing, extra };
}

function parseArgs(argv) {
  const manifestIdx = argv.indexOf("--manifest");
  const positional = argv.filter((a, i) => {
    if (a.startsWith("--")) return false;
    if (manifestIdx >= 0 && i === manifestIdx + 1) return false;
    return true;
  });
  return {
    exportPath: positional[0] ?? null,
    manifestPath: manifestIdx >= 0 ? argv[manifestIdx + 1] : DEFAULT_MANIFEST,
    layer: argv.includes("--components") ? "components" : "semantic",
  };
}

const { exportPath, manifestPath, layer } = parseArgs(process.argv.slice(2));

if (!exportPath) {
  console.error("Usage: node scripts/figma-drift-check.mjs <export.json> [--manifest path] [--components]");
  process.exit(1);
}

if (!existsSync(exportPath)) {
  console.error(`Export file not found: ${exportPath}`);
  console.error("Export from Tokens Studio to design-tokens/figma-export/ (see design-tokens/README.md)");
  process.exit(1);
}

const resolvedManifest = ensureManifest(manifestPath);
const manifest = JSON.parse(readFileSync(resolvedManifest, "utf8"));
const exportData = JSON.parse(readFileSync(exportPath, "utf8"));

const expectedKeys = new Set(
  layer === "components" ? manifest.components.keys : manifest.semantic.keys
);
const actualKeys = extractKeysFromExport(exportData);
const { missing, extra } = diffSets(expectedKeys, actualKeys);

console.log(`Figma drift check (${layer})`);
console.log(`  manifest: ${resolvedManifest}`);
console.log(`  export:   ${exportPath}`);
console.log(`  expected: ${expectedKeys.size} keys`);
console.log(`  actual:   ${actualKeys.size} keys`);

if (missing.length === 0 && extra.length === 0) {
  console.log("PASS — key sets match");
  process.exit(0);
}

console.error("FAIL — key drift detected\n");

if (missing.length) {
  console.error(`Missing in Figma export (${missing.length}):`);
  for (const key of missing.slice(0, 20)) {
    console.error(`  - ${key}`);
  }
  if (missing.length > 20) console.error(`  … and ${missing.length - 20} more`);
}

if (extra.length) {
  console.error(`Extra in Figma export (${extra.length}):`);
  for (const key of extra.slice(0, 20)) {
    console.error(`  + ${key}`);
  }
  if (extra.length > 20) console.error(`  … and ${extra.length - 20} more`);
}

console.error("\nFix: align Figma collections to design-tokens/ or update repo keys, then re-export.");
process.exit(1);
