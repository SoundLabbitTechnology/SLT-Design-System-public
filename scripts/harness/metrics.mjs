#!/usr/bin/env node
/**
 * L3 operations metrics.
 * Diff-only token compliance proxy — trend input, not an L1 acceptance gate.
 *
 * Usage:
 *   npm run metrics
 *   npm run metrics -- --since=1.week.ago
 *   npm run metrics -- --base=origin/main
 *   npm run metrics -- --since=1.week.ago --save
 *   npm run metrics -- --help
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const HISTORY_DIR = join(ROOT, "metrics", "history");
const THRESHOLDS_PATH = join(ROOT, "metrics", "thresholds.json");
const SCOPES = ["src", "styles", "site/src"];

const RAW_COLOR_RE = /#[0-9a-f]{3,8}\b/i;
const ARBITRARY_VALUE_RE =
  /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration|w|h|min-w|min-h|max-w|max-h|p[trblxy]?|m[trblxy]?|gap|inset)-\[[^\]]+\]/;
const TOKEN_REFERENCE_RE = /var\(--[a-z0-9-]+/i;

function parseArgs(argv) {
  const opts = { since: null, base: null, save: false, help: false };
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg === "--save") opts.save = true;
    else if (arg.startsWith("--since=")) opts.since = arg.slice("--since=".length);
    else if (arg.startsWith("--base=")) opts.base = arg.slice("--base=".length);
  }
  return opts;
}

function git(args) {
  try {
    return execFileSync("git", args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    return "";
  }
}

function loadThresholds() {
  try {
    return JSON.parse(readFileSync(THRESHOLDS_PATH, "utf8"));
  } catch {
    return {
      tokenComplianceProxyMin: 0.85,
      rawValueViolationLinesMax: 0,
      exceptionLinesWarn: 3,
    };
  }
}

/** Resolve --since to a commit: rev-parse, else --before date (supports 1.week.ago). */
function resolveSince(since) {
  const trimmed = since.trim();
  const asRev = git(["rev-parse", "--verify", trimmed]).trim();
  if (asRev) return { rev: asRev, label: trimmed };

  const phrase = trimmed.includes(" ") ? trimmed : trimmed.replace(/\./g, " ");
  const hash = git(["rev-list", "-1", `--before=${phrase}`, "HEAD"]).trim();
  if (hash) return { rev: hash, label: `${trimmed} → ${hash.slice(0, 7)}` };

  console.error(`Could not resolve --since=${since} (try a commit SHA or "1 week ago")`);
  process.exit(1);
}

function collectDiff(opts) {
  let nameArgs;
  let unifiedArgs;
  let compare;

  if (opts.since) {
    const { rev, label } = resolveSince(opts.since);
    nameArgs = ["diff", "--name-only", rev, "HEAD", "--", ...SCOPES];
    unifiedArgs = ["diff", "--unified=0", "--no-color", rev, "HEAD", "--", ...SCOPES];
    compare = label;
  } else if (opts.base) {
    // Three-dot: changes on HEAD since merge-base with base
    nameArgs = ["diff", "--name-only", `${opts.base}...HEAD`, "--", ...SCOPES];
    unifiedArgs = ["diff", "--unified=0", "--no-color", `${opts.base}...HEAD`, "--", ...SCOPES];
    compare = `${opts.base}...HEAD`;
  } else {
    nameArgs = ["diff", "--name-only", "HEAD", "--", ...SCOPES];
    unifiedArgs = ["diff", "--unified=0", "--no-color", "HEAD", "--", ...SCOPES];
    compare = "HEAD (worktree)";
  }

  const changedFiles = git(nameArgs)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const addedLines = git(unifiedArgs)
    .split("\n")
    .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
    .map((line) => line.slice(1));

  return { changedFiles, addedLines, compare };
}

function buildReport(opts) {
  const thresholds = loadThresholds();
  const { changedFiles, addedLines, compare } = collectDiff(opts);

  const rawValueViolationLines = addedLines.filter(
    (line) => RAW_COLOR_RE.test(line) || ARBITRARY_VALUE_RE.test(line),
  ).length;
  const tokenReferenceLines = addedLines.filter((line) => TOKEN_REFERENCE_RE.test(line)).length;
  const exceptionLines = addedLines.filter((line) => line.includes("@harness-allow")).length;
  const designSystemImportLines = addedLines.filter((line) =>
    line.includes("@soundlabbit/design-system/ui"),
  ).length;
  const denominator = tokenReferenceLines + rawValueViolationLines;
  const tokenComplianceProxy = denominator === 0 ? null : tokenReferenceLines / denominator;

  const alerts = [];
  if (
    tokenComplianceProxy !== null &&
    tokenComplianceProxy < thresholds.tokenComplianceProxyMin
  ) {
    alerts.push({
      level: "warn",
      code: "token-compliance-below-min",
      message: `tokenComplianceProxy ${tokenComplianceProxy.toFixed(3)} < ${thresholds.tokenComplianceProxyMin}`,
    });
  }
  if (rawValueViolationLines > thresholds.rawValueViolationLinesMax) {
    alerts.push({
      level: "warn",
      code: "raw-value-in-diff",
      message: `rawValueViolationLines ${rawValueViolationLines} > ${thresholds.rawValueViolationLinesMax}`,
    });
  }
  if (exceptionLines >= thresholds.exceptionLinesWarn) {
    alerts.push({
      level: "warn",
      code: "exception-cluster",
      message: `exceptionLines ${exceptionLines} >= ${thresholds.exceptionLinesWarn} — review for 3× override → backlog`,
    });
  }

  return {
    loop: "L3",
    generatedAt: new Date().toISOString(),
    compare,
    scope: SCOPES,
    thresholds,
    changedFiles,
    addedLines: addedLines.length,
    tokenReferenceLines,
    rawValueViolationLines,
    exceptionLines,
    designSystemImportLines,
    tokenComplianceProxy,
    alerts,
    note: "Diff-only proxy. Use with gate results, consumer adoption, and qualitative review. Not an L1 gate.",
  };
}

function previousHistoryFile(excludeDay = null) {
  try {
    const files = readdirSync(HISTORY_DIR)
      .filter((name) => /^\d{4}-\d{2}-\d{2}.*\.json$/.test(name))
      .filter((name) => (excludeDay ? !name.startsWith(excludeDay) : true))
      .sort();
    if (files.length === 0) return null;
    return join(HISTORY_DIR, files[files.length - 1]);
  } catch {
    return null;
  }
}

function attachTrend(report, excludeDay = null) {
  const prevPath = previousHistoryFile(excludeDay);
  if (!prevPath) {
    report.trend = null;
    return report;
  }
  try {
    const prev = JSON.parse(readFileSync(prevPath, "utf8"));
    report.trend = {
      previousFile: prevPath.replace(`${ROOT}/`, ""),
      previousGeneratedAt: prev.generatedAt ?? null,
      deltaTokenComplianceProxy:
        report.tokenComplianceProxy === null || prev.tokenComplianceProxy == null
          ? null
          : report.tokenComplianceProxy - prev.tokenComplianceProxy,
      deltaRawValueViolationLines:
        report.rawValueViolationLines - (prev.rawValueViolationLines ?? 0),
      deltaExceptionLines: report.exceptionLines - (prev.exceptionLines ?? 0),
    };
  } catch {
    report.trend = null;
  }
  return report;
}

function saveReport(report) {
  mkdirSync(HISTORY_DIR, { recursive: true });
  const day = report.generatedAt.slice(0, 10);
  const path = join(HISTORY_DIR, `${day}.json`);
  writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return path.replace(`${ROOT}/`, "");
}

function printHelp() {
  console.log(`L3 operations metrics (diff-only token compliance proxy)

Usage:
  npm run metrics
  npm run metrics -- --since=1.week.ago
  npm run metrics -- --base=origin/main
  npm run metrics -- --since=1.week.ago --save

Options:
  --since=<git-rev>   Compare <rev>..HEAD (e.g. 1.week.ago, abc123)
  --base=<ref>        Compare <ref>...HEAD (merge-base style, e.g. origin/main)
  --save              Write metrics/history/YYYY-MM-DD.json
  --help              Show this help

Thresholds: metrics/thresholds.json
Runbook: docs/L6-harness-and-loops.md (L3 Operations)
`);
}

const opts = parseArgs(process.argv.slice(2));
if (opts.help) {
  printHelp();
  process.exit(0);
}

let report = buildReport(opts);
report = attachTrend(report, opts.save ? report.generatedAt.slice(0, 10) : null);

if (opts.save) {
  report.savedTo = saveReport(report);
}

console.log(JSON.stringify(report, null, 2));

// Soft signal only: exit 0 always for local/CI friendliness; alerts are in JSON.
process.exit(0);
