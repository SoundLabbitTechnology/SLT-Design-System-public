#!/usr/bin/env node
/**
 * G0 — design-tokens/ 妥当性
 * - raw hex 禁止（semantic / components）
 * - DTCG 参照解決（primitives + semantic）
 * - 全 semantic.*.json のトークンキー集合一致
 * - dist 成果物存在
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const TOKENS_DIR = join(ROOT, "design-tokens");
const DIST = join(ROOT, "dist");

const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/;
const REF_RE = /^\{(.+)\}$/;

/** @type {Array<{ gate: string, file: string, line?: number, message: string, fix?: string }>} */
const failures = [];

function lineOf(content, needle) {
  const idx = content.indexOf(needle);
  if (idx < 0) return undefined;
  return content.slice(0, idx).split("\n").length;
}

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

function buildTokenMap(obj, prefix = "", map = new Map()) {
  if (!obj || typeof obj !== "object") return map;
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (isTokenNode(value)) {
      map.set(path, value.$value);
    } else if (value && typeof value === "object") {
      buildTokenMap(value, path, map);
    }
  }
  return map;
}

function collectRefs(value, refs = new Set()) {
  if (typeof value === "string" && REF_RE.test(value)) {
    refs.add(value.match(REF_RE)[1]);
    return refs;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectRefs(item, refs);
    return refs;
  }
  if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectRefs(v, refs);
  }
  return refs;
}

function walkJson(obj, file, content, path = "") {
  if (typeof obj === "string") return;
  if (!obj || typeof obj !== "object") return;
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const tokenPath = path ? `${path}.${key}` : key;
    if (key === "$value" && typeof value === "string" && HEX_RE.test(value)) {
      failures.push({
        gate: "G0",
        file,
        line: lineOf(content, `"$value": "${value}"`) ?? lineOf(content, value),
        message: `Found raw hex ${value} at ${tokenPath}`,
        fix: `Use a DTCG reference like {color.surface.primary} in semantic.*.json`,
      });
    }
    walkJson(value, file, content, tokenPath);
  }
}

function checkRefs(file, obj, tokenMap, content) {
  const paths = flattenPaths(obj);
  for (const tokenPath of paths) {
    const node = getNode(obj, tokenPath);
    if (!node || !isTokenNode(node)) continue;
    const refs = collectRefs(node.$value);
    for (const ref of refs) {
      if (!tokenMap.has(ref)) {
        failures.push({
          gate: "G0",
          file,
          line: lineOf(content, `"${ref}"`) ?? lineOf(content, `{${ref}}`),
          message: `Unresolved reference {${ref}} at ${tokenPath}`,
          fix: `Define {${ref}} in primitives.json or semantic token set`,
        });
      }
    }
  }
}

function getNode(obj, dotPath) {
  return dotPath.split(".").reduce((acc, key) => acc?.[key], obj);
}

const primitives = JSON.parse(
  readFileSync(join(TOKENS_DIR, "primitives.json"), "utf8")
);
const primitiveMap = buildTokenMap(primitives);

const representativeSemantic = JSON.parse(
  readFileSync(join(TOKENS_DIR, "semantic.ai-dash.dark.json"), "utf8")
);
const semanticMap = buildTokenMap(representativeSemantic);
const combinedForComponents = new Map([...primitiveMap, ...semanticMap]);

const semanticFiles = readdirSync(TOKENS_DIR).filter(
  (f) => f.startsWith("semantic.") && f.endsWith(".json")
);

/** @type {Map<string, Set<string>>} */
const semanticKeySets = new Map();

for (const file of semanticFiles) {
  const content = readFileSync(join(TOKENS_DIR, file), "utf8");
  const data = JSON.parse(content);
  semanticKeySets.set(file, new Set(flattenPaths(data)));
  walkJson(data, file, content);
  checkRefs(file, data, primitiveMap, content);
}

const componentsContent = readFileSync(
  join(TOKENS_DIR, "components.json"),
  "utf8"
);
const components = JSON.parse(componentsContent);
walkJson(components, "components.json", componentsContent);
checkRefs("components.json", components, combinedForComponents, componentsContent);

// Brand key consistency
const [firstFile, firstSet] = [...semanticKeySets.entries()][0];
for (const [file, keySet] of semanticKeySets.entries()) {
  if (file === firstFile) continue;
  const onlyInFirst = [...firstSet].filter((k) => !keySet.has(k));
  const onlyInFile = [...keySet].filter((k) => !firstSet.has(k));
  if (onlyInFirst.length || onlyInFile.length) {
    failures.push({
      gate: "G0",
      file,
      message: `Token key mismatch vs ${firstFile}`,
      fix: `Align keys. Missing in ${file}: ${onlyInFirst.slice(0, 5).join(", ")}${onlyInFirst.length > 5 ? "…" : ""}. Extra: ${onlyInFile.slice(0, 5).join(", ")}${onlyInFile.length > 5 ? "…" : ""}`,
    });
  }
}

const requiredDist = [
  "slt-tokens.css",
  "slt-tokens.ts",
  "slt-tokens.json",
  "ai-dash/dark/tokens.css",
  "ai-dash/light/tokens.css",
  "sound-laboratory/dark/tokens.css",
  "sound-laboratory/light/tokens.css",
  "slt-corporate/dark/tokens.css",
  "admin/light/tokens.css",
];

for (const rel of requiredDist) {
  if (!existsSync(join(DIST, rel))) {
    failures.push({
      gate: "G0",
      file: `dist/${rel}`,
      message: "Missing dist output",
      fix: "Run npm run build",
    });
  }
}

if (failures.length > 0) {
  console.error("G0 FAIL — token validation\n");
  for (const f of failures) {
    const loc = f.line ? `${f.file}:${f.line}` : f.file;
    console.error(`G0 FAIL ${loc}`);
    console.error(`  ${f.message}`);
    if (f.fix) console.error(`  Fix: ${f.fix}`);
    console.error("");
  }
  process.exit(1);
}

console.log("G0 PASS — token validation");
console.log(`  ${semanticFiles.length} semantic files + components.json`);
console.log(`  ${requiredDist.length} dist artifacts verified`);
