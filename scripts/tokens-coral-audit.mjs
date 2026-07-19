#!/usr/bin/env node
/**
 * Audit coral token references across editable sources (not dist/).
 * Issue #14 / ADR-001 — no Figma API, no primitives.json value read.
 *
 * Usage: npm run tokens:coral-audit
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SEMANTIC_GLOB = /^semantic\..+\.json$/;
const SKIP_DIRS = new Set(["node_modules", "dist", "dist-ui", ".git", "storybook-static"]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

function scanFile(path, patterns) {
  const text = readFileSync(path, "utf8");
  const hits = [];
  for (const { label, re } of patterns) {
    const matches = text.match(re);
    if (matches?.length) hits.push({ label, count: matches.length });
  }
  return hits;
}

const coralRefRe = /\{color\.coral\.[^}]+\}/g;
const coralKeyRe = /color\.coral\./g;
const coralCssRe = /--color-coral-/g;

const patterns = [
  { label: "semantic alias {color.coral.*}", re: coralRefRe },
  { label: "key color.coral.", re: coralKeyRe },
  { label: "CSS --color-coral-", re: coralCssRe },
];

const tokenDir = join(ROOT, "design-tokens");
const semanticFiles = readdirSync(tokenDir).filter((f) => SEMANTIC_GLOB.test(f));

console.log("=== coral audit (#14) ===\n");

let semanticRefs = 0;
for (const file of semanticFiles) {
  const path = join(tokenDir, file);
  const hits = scanFile(path, [{ label: "alias", re: coralRefRe }]);
  const count = hits[0]?.count ?? 0;
  semanticRefs += count;
  console.log(`${file}: ${count} semantic alias(es)`);
}

const componentsPath = join(tokenDir, "components.json");
const compHits = scanFile(componentsPath, [{ label: "alias", re: coralRefRe }]);
const compRefs = compHits[0]?.count ?? 0;
console.log(`components.json: ${compRefs} semantic alias(es)\n`);

const scanRoots = [
  join(ROOT, "src"),
  join(ROOT, "styles"),
  join(ROOT, "stories"),
  join(ROOT, "site/src"),
];

const sourceHits = [];
for (const root of scanRoots) {
  try {
    for (const file of walk(root)) {
      if (!/\.(tsx?|css|mdx?)$/.test(file)) continue;
      if (file.endsWith("semantic-tokens.d.ts")) continue;
      const hits = scanFile(file, patterns);
      if (hits.length) {
        sourceHits.push({ file: relative(ROOT, file), hits });
      }
    }
  } catch {
    // optional tree
  }
}

console.log("Source files with coral mentions (excl. generated types):");
if (sourceHits.length === 0) {
  console.log("  (none)\n");
} else {
  for (const { file, hits } of sourceHits) {
    console.log(`  ${file}: ${hits.map((h) => `${h.label}×${h.count}`).join(", ")}`);
  }
  console.log();
}

const blocked = semanticRefs === 0 && compRefs === 0;
console.log("Summary:");
console.log(`  semantic {color.coral.*} refs: ${semanticRefs}`);
console.log(`  components.json refs: ${compRefs}`);
console.log(
  blocked
    ? "  Status: BLOCKED on brand decision — primitives-only placeholder; UI decoupled."
    : "  Status: coral referenced in semantic/component — review before swap.",
);
console.log("\nRunbook: design-tokens/README.md / CHANGELOG.md");

process.exit(0);
