#!/usr/bin/env node
/**
 * G1 — 生値禁止（src/ + styles/*.css）
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/g;
const TAILWIND_ARBITRARY_RE =
  /(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration)-\[#[0-9A-Fa-f]{3,8}\]/g;
const TAILWIND_PX_RE =
  /\b(?:w|h|min-w|min-h|max-w|max-h|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|top|left|right|bottom|inset)-\[\d+px\]/g;

const SCAN_ROOTS = [
  { dir: join(ROOT, "src"), exts: new Set([".ts", ".tsx", ".css"]) },
  { dir: join(ROOT, "styles"), exts: new Set([".css"]) },
];

const SKIP_DIRS = new Set(["node_modules", "dist", "dist-ui", "storybook-static"]);

/** @type {Array<{ file: string, line: number, match: string, kind: string }>} */
const violations = [];

function stripComments(content, ext) {
  if (ext === ".css") {
    return content.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  }
  return content
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

function lineHasAllowMarker(lines, lineIndex) {
  const prev = lines[lineIndex - 2] ?? "";
  const curr = lines[lineIndex - 1] ?? "";
  return (
    prev.includes("@harness-allow") || curr.includes("@harness-allow")
  );
}

function scanFile(absPath) {
  const rel = relative(ROOT, absPath);
  const ext = extname(absPath);
  const raw = readFileSync(absPath, "utf8");
  const content = stripComments(raw, ext);
  const lines = raw.split("\n");

  const patterns = [
    { re: HEX_RE, kind: "raw hex" },
    { re: TAILWIND_ARBITRARY_RE, kind: "Tailwind arbitrary color" },
    { re: TAILWIND_PX_RE, kind: "Tailwind arbitrary px" },
  ];

  for (const { re, kind } of patterns) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      const before = content.slice(0, match.index);
      const line = before.split("\n").length;
      if (lineHasAllowMarker(lines, line)) continue;
      violations.push({ file: rel, line, match: match[0], kind });
    }
  }
}

function walk(dir, exts) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      walk(abs, exts);
      continue;
    }
    if (!exts.has(extname(name))) continue;
    scanFile(abs);
  }
}

for (const { dir, exts } of SCAN_ROOTS) {
  walk(dir, exts);
}

if (violations.length > 0) {
  console.error("G1 FAIL — no raw values\n");
  for (const v of violations) {
    console.error(`G1 FAIL ${v.file}:${v.line}`);
    console.error(`  Found ${v.kind} ${v.match}`);
  console.error(
      `  Fix: use var(--color-action-secondary) or class slt-btn--secondary`
    );
    console.error(
      `  See: design-tokens/semantic.ai-dash.dark.json → matching semantic token`
    );
    console.error("");
  }
  process.exit(1);
}

console.log("G1 PASS — no raw values in src/ and styles/");
