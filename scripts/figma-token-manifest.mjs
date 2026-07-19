#!/usr/bin/env node
/**
 * Generate a Figma / Tokens Studio parity manifest from design-tokens/.
 * No Figma API — used for collection setup and drift checks (#15).
 *
 * Usage:
 *   node scripts/figma-token-manifest.mjs [--out design-tokens/figma-manifest.json]
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TOKENS_DIR = join(ROOT, "design-tokens");

/** @typedef {{ theme: string, mode: string, semanticFile: string, figmaCollection: string, figmaMode: string }} ThemeMode */

/** @type {ThemeMode[]} */
const THEME_MODES = [
  {
    theme: "ai-dash",
    mode: "dark",
    semanticFile: "semantic.ai-dash.dark.json",
    figmaCollection: "SLT / Semantic",
    figmaMode: "ai-dash / dark",
  },
  {
    theme: "ai-dash",
    mode: "light",
    semanticFile: "semantic.ai-dash.light.json",
    figmaCollection: "SLT / Semantic",
    figmaMode: "ai-dash / light",
  },
  {
    theme: "sound-laboratory",
    mode: "dark",
    semanticFile: "semantic.sound-laboratory.dark.json",
    figmaCollection: "SLT / Semantic",
    figmaMode: "sound-laboratory / dark",
  },
  {
    theme: "sound-laboratory",
    mode: "light",
    semanticFile: "semantic.sound-laboratory.light.json",
    figmaCollection: "SLT / Semantic",
    figmaMode: "sound-laboratory / light",
  },
  {
    theme: "slt-corporate",
    mode: "dark",
    semanticFile: "semantic.slt-corporate.dark.json",
    figmaCollection: "SLT / Semantic",
    figmaMode: "slt-corporate / dark",
  },
  {
    theme: "admin",
    mode: "light",
    semanticFile: "semantic.admin.light.json",
    figmaCollection: "SLT / Semantic",
    figmaMode: "admin / light",
  },
];

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

function buildTokenRecord(obj, prefix = "", record = new Map()) {
  if (!obj || typeof obj !== "object") return record;
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (isTokenNode(value)) {
      record.set(path, {
        type: value.$type ?? null,
        value: value.$value,
        description: value.$description ?? null,
      });
    } else if (value && typeof value === "object") {
      buildTokenRecord(value, path, record);
    }
  }
  return record;
}

function serializeValue(value) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function parseArgs(argv) {
  const outIdx = argv.indexOf("--out");
  return {
    outPath: outIdx >= 0 ? argv[outIdx + 1] : null,
  };
}

const { outPath } = parseArgs(process.argv.slice(2));

/** @type {Record<string, { keys: string[], tokens: Record<string, { type: string|null, value: unknown, description: string|null }> }>} */
const semanticByMode = {};

for (const tm of THEME_MODES) {
  const content = readFileSync(join(TOKENS_DIR, tm.semanticFile), "utf8");
  const data = JSON.parse(content);
  const record = buildTokenRecord(data);
  semanticByMode[tm.figmaMode] = {
    keys: [...record.keys()].sort(),
    tokens: Object.fromEntries(record),
  };
}

const componentsContent = readFileSync(join(TOKENS_DIR, "components.json"), "utf8");
const components = JSON.parse(componentsContent);
const componentRecord = buildTokenRecord(components);

const semanticKeySets = Object.values(semanticByMode).map((s) => new Set(s.keys));
const referenceKeys = semanticKeySets[0];
const semanticKeyParity = semanticKeySets.every(
  (set) =>
    set.size === referenceKeys.size && [...referenceKeys].every((k) => set.has(k))
);

/** @type {Record<string, Record<string, string>>} */
const crossModeValues = {};
for (const key of [...referenceKeys].sort()) {
  crossModeValues[key] = {};
  for (const [mode, data] of Object.entries(semanticByMode)) {
    const token = data.tokens[key];
    crossModeValues[key][mode] = token ? serializeValue(token.value) : null;
  }
}

const manifest = {
  $description:
    "Repo-side manifest for Figma Variables / Tokens Studio parity (#15). Regenerate after token changes.",
  generatedAt: new Date().toISOString(),
  sourceOfTruth: "design-tokens/",
  blockedWithout: [
    "Figma file edit access",
    "Tokens Studio plugin (paid) or Figma REST API token for automation",
  ],
  collections: [
    {
      name: "SLT / Primitives",
      scope: "internal",
      sourceFile: "design-tokens/primitives.json",
      figmaVisibility: "hidden from designers",
      syncDirection: "Git → Figma (owner only)",
    },
    {
      name: "SLT / Semantic",
      scope: "public",
      sourceFiles: THEME_MODES.map((tm) => `design-tokens/${tm.semanticFile}`),
      figmaModes: THEME_MODES.map((tm) => tm.figmaMode),
      syncDirection: "Git ↔ Figma (semantic values; refs to primitives)",
    },
    {
      name: "SLT / Components",
      scope: "public",
      sourceFile: "design-tokens/components.json",
      syncDirection: "Git ↔ Figma (refs to semantic only)",
    },
  ],
  themeModeMapping: THEME_MODES,
  htmlThemeAttributes: {
    pattern: '<html data-theme="{theme}" data-color-mode="{mode}">',
    examples: THEME_MODES.map((tm) => ({
      theme: tm.theme,
      mode: tm.mode,
      html: `<html data-theme="${tm.theme}" data-color-mode="${tm.mode}">`,
      figmaMode: tm.figmaMode,
    })),
  },
  counts: {
    semanticKeysPerMode: semanticByMode[THEME_MODES[0].figmaMode].keys.length,
    componentKeys: componentRecord.size,
    themeModes: THEME_MODES.length,
  },
  semanticKeyParity,
  semantic: {
    keys: [...referenceKeys].sort(),
    valuesByMode: crossModeValues,
  },
  components: {
    keys: [...componentRecord.keys()].sort(),
    tokens: Object.fromEntries(componentRecord),
  },
  componentPropsMapping: "docs/L2-components/figma-props-mapping.md",
  runbook: "design-tokens/README.md",
};

const json = `${JSON.stringify(manifest, null, 2)}\n`;

if (outPath) {
  writeFileSync(outPath, json, "utf8");
  console.log(`Wrote ${outPath}`);
  console.log(
    `  ${manifest.counts.semanticKeysPerMode} semantic keys × ${manifest.counts.themeModes} modes`
  );
  console.log(`  ${manifest.counts.componentKeys} component keys`);
} else {
  process.stdout.write(json);
}
