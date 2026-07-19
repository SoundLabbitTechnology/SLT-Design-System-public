#!/usr/bin/env node
/**
 * Documentation contract gate.
 * Checks local Markdown links, required canonical docs, version markers, and
 * parity between public components, Storybook stories, docs-site pages, and nav.
 */

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import {
  dirname,
  extname,
  join,
  relative,
  resolve,
} from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const SKIP_NAMES = new Set([
  ".git",
  ".astro",
  "dist",
  "dist-ui",
  "node_modules",
  "storybook-static",
]);

const SITE_DOCS = "site/src/content/docs";

const REQUIRED_DOCS = [
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "llms.txt",
  "CHANGELOG.md",
  `${SITE_DOCS}/README.md`,
  `${SITE_DOCS}/L0-principles.md`,
  `${SITE_DOCS}/L1-foundations/tokens.md`,
  `${SITE_DOCS}/L1-foundations/colors.md`,
  `${SITE_DOCS}/L1-foundations/typography.md`,
  `${SITE_DOCS}/L1-foundations/spacing-motion.md`,
  `${SITE_DOCS}/L1-foundations/motion-craft.md`,
  `${SITE_DOCS}/L2-components/storybook.md`,
  `${SITE_DOCS}/L3-patterns.md`,
  `${SITE_DOCS}/L4-content.md`,
  `${SITE_DOCS}/L4-terminology.md`,
  `${SITE_DOCS}/L5-quality.md`,
  `${SITE_DOCS}/L6-governance.md`,
  `${SITE_DOCS}/L6-harness-and-loops.md`,
  `${SITE_DOCS}/CONTRIBUTING.md`,
  `${SITE_DOCS}/DOCUMENTATION.md`,
  `${SITE_DOCS}/RELEASING.md`,
  "site/README.md",
  "stories/Introduction.mdx",
  "stories/L1/Theming.mdx",
  "stories/L1/Accessibility.mdx",
];

const REQUIRED_PUBLIC_DOCS = [
  `${SITE_DOCS}/L0-principles.md`,
  `${SITE_DOCS}/L1-foundations/tokens.md`,
  `${SITE_DOCS}/L1-foundations/colors.md`,
  `${SITE_DOCS}/L1-foundations/typography.md`,
  `${SITE_DOCS}/L1-foundations/spacing-motion.md`,
  `${SITE_DOCS}/L1-foundations/motion-craft.md`,
  `${SITE_DOCS}/L2-components/storybook.md`,
  `${SITE_DOCS}/L3-patterns.md`,
  `${SITE_DOCS}/L4-content.md`,
  `${SITE_DOCS}/L4-terminology.md`,
  `${SITE_DOCS}/L5-quality.md`,
  `${SITE_DOCS}/L6-governance.md`,
  `${SITE_DOCS}/L6-harness-and-loops.md`,
  `${SITE_DOCS}/CONTRIBUTING.md`,
  `${SITE_DOCS}/DOCUMENTATION.md`,
  `${SITE_DOCS}/RELEASING.md`,
];

/** @type {string[]} */
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(relPath) {
  return readFileSync(join(ROOT, relPath), "utf8");
}

function rel(absPath) {
  return relative(ROOT, absPath).split("\\").join("/");
}

function isSkipped(absPath) {
  const pathFromRoot = rel(absPath);
  return pathFromRoot.split("/").some((segment) => SKIP_NAMES.has(segment));
}

function walk(absDir, predicate) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(absDir, { withFileTypes: true })) {
    const absPath = join(absDir, entry.name);
    if (isSkipped(absPath)) continue;
    if (entry.isDirectory()) files.push(...walk(absPath, predicate));
    else if (predicate(absPath)) files.push(absPath);
  }
  return files;
}

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function normalizeMarkdownTarget(rawTarget) {
  const trimmed = rawTarget.trim();
  if (trimmed.startsWith("<")) {
    const end = trimmed.indexOf(">");
    return end >= 0 ? trimmed.slice(1, end) : trimmed;
  }
  return trimmed.split(/\s+["']/)[0];
}

function checkMarkdownLinks() {
  const roots = [
    ...walk(ROOT, (path) => [".md", ".mdx"].includes(extname(path))),
  ];
  const linkPatterns = [
    /!?\[[^\]]*\]\(([^)]+)\)/g,
    /^\s*\[[^\]]+\]:\s*(\S+)/gm,
    /\b(?:href|src)=["']([^"']+)["']/g,
  ];

  for (const file of roots) {
    const content = readFileSync(file, "utf8");
    for (const linkPattern of linkPatterns) {
      let match;
      while ((match = linkPattern.exec(content)) !== null) {
        const target = normalizeMarkdownTarget(match[1]);
        if (
          !target ||
          target.startsWith("#") ||
          target.startsWith("/") ||
          target.startsWith("?") ||
          /^[a-z][a-z0-9+.-]*:/i.test(target)
        ) {
          continue;
        }

        const pathOnly = target.split("#")[0].split("?")[0];
        if (!pathOnly) continue;
        let decoded = pathOnly;
        try {
          decoded = decodeURIComponent(pathOnly);
        } catch {
          // Invalid escaping is reported as a missing target below.
        }
        const targetPath = resolve(dirname(file), decoded);
        if (!existsSync(targetPath)) {
          fail(`${rel(file)}:${lineOf(content, match.index)} missing link target: ${target}`);
        }
      }
    }
  }
}

function checkRequiredDocs() {
  for (const path of REQUIRED_DOCS) {
    if (!existsSync(join(ROOT, path))) fail(`missing required document: ${path}`);
  }
}

function checkVersionMarkers() {
  const { version } = JSON.parse(read("package.json"));
  const markers = [
    ["README.md", `#v${version}`],
    ["AGENTS.md", `**Version**: v${version}`],
    ["CLAUDE.md", `**Version**: v${version}`],
    ["llms.txt", `> Version: ${version}`],
    ["CHANGELOG.md", `## ${version}`],
  ];
  for (const [path, marker] of markers) {
    if (!read(path).includes(marker)) fail(`${path} must contain current version marker: ${marker}`);
  }
}

function kebabCase(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function checkComponentParity() {
  const componentRoot = join(ROOT, "src/components");
  const components = readdirSync(componentRoot)
    .filter((name) => {
      const path = join(componentRoot, name);
      return statSync(path).isDirectory() && existsSync(join(path, `${name}.tsx`));
    })
    .sort();

  const expectedSlugs = components.map(kebabCase).sort();
  for (const name of components) {
    const story = `src/components/${name}/${name}.stories.tsx`;
    const page = `site/src/content/components/${kebabCase(name)}.mdx`;
    if (!existsSync(join(ROOT, story))) fail(`${name} is public but has no Storybook story: ${story}`);
    if (!existsSync(join(ROOT, page))) fail(`${name} is public but has no docs-site page: ${page}`);
  }

  const siteSlugs = readdirSync(join(ROOT, "site/src/content/components"))
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""))
    .sort();
  const navSlugs = [...read("site/src/lib/nav.ts").matchAll(/\{\s*slug:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .sort();

  if (expectedSlugs.join("|") !== siteSlugs.join("|")) {
    fail(`component docs mismatch: expected [${expectedSlugs}], found [${siteSlugs}]`);
  }
  if (expectedSlugs.join("|") !== navSlugs.join("|")) {
    fail(`component nav mismatch: expected [${expectedSlugs}], found [${navSlugs}]`);
  }
}

function checkPublicRoutes() {
  const routeSource = read("site/src/lib/doc-routes.ts");
  const routes = [
    ...routeSource.matchAll(/"(site\/src\/content\/docs\/[^"]+\.md)"\s*:\s*"([^"]+)"/g),
  ];
  const bySource = new Map(routes.map((match) => [match[1], match[2]]));
  const routeValues = routes.map((match) => match[2]);

  for (const source of REQUIRED_PUBLIC_DOCS) {
    if (!bySource.has(source)) fail(`public canonical document has no DOC_ROUTES entry: ${source}`);
  }
  for (const [source] of bySource) {
    if (!existsSync(join(ROOT, source))) fail(`DOC_ROUTES source does not exist: ${source}`);
    if (source.includes("/internal/")) {
      fail(`internal document must not be in DOC_ROUTES: ${source}`);
    }
  }
  if (new Set(routeValues).size !== routeValues.length) fail("DOC_ROUTES contains duplicate public routes");

  const contentConfig = read("site/src/content.config.ts");
  if (/content\/docs\/internal|internal\/L0/.test(contentConfig)) {
    fail("site/src/content.config.ts must not load internal docs into content collections");
  }
  if (/\.\.\/docs/.test(contentConfig)) {
    fail("site/src/content.config.ts must not load content from ../docs/ (use site/src/content/docs)");
  }
}

/** Keep internal authoring off the Docs site public surface. */
function checkInternalNotOnSite() {
  const routeSource = read("site/src/lib/doc-routes.ts");
  if (/\/internal\//.test(routeSource)) {
    fail("internal paths must not appear in DOC_ROUTES");
  }
  const contentConfig = read("site/src/content.config.ts");
  if (/content\/docs\/internal|internal\/L0/.test(contentConfig)) {
    fail("site/src/content.config.ts must not load internal docs into content collections");
  }
  if (existsSync(join(ROOT, "docs"))) {
    fail("standalone docs/ must not exist; public Markdown lives under site/src/content/docs/");
  }
}

/** Autodocs IDs must stay English `--docs` so Introduction.mdx deep links resolve. */
function checkStorybookDocsIds() {
  const mainTs = read(".storybook/main.ts");
  if (!/defaultName:\s*["']docs["']/.test(mainTs)) {
    fail('.storybook/main.ts must set docs.defaultName to "docs" (English autodocs IDs)');
  }
  if (/defaultName:\s*["']ドキュメント["']/.test(mainTs)) {
    fail('.storybook/main.ts must not use Japanese docs.defaultName "ドキュメント"');
  }

  const intro = read("stories/Introduction.mdx");
  const docsLinks = [...intro.matchAll(/path=\/docs\/[^\s)"']+/g)].map((m) => m[0]);
  for (const link of docsLinks) {
    if (link.endsWith("--ドキュメント")) {
      fail(`stories/Introduction.mdx uses Japanese docs ID: ${link}`);
    }
    if (!link.endsWith("--docs")) {
      fail(`stories/Introduction.mdx docs deep link must end with --docs: ${link}`);
    }
  }
}

checkRequiredDocs();
checkMarkdownLinks();
checkVersionMarkers();
checkComponentParity();
checkPublicRoutes();
checkInternalNotOnSite();
checkStorybookDocsIds();

if (errors.length > 0) {
  console.error("DOCS FAIL — documentation contract violations\n");
  for (const error of errors) console.error(`- ${error}`);
  console.error("\nFix: update the canonical source, navigation, or referenced file, then rerun npm run check:docs");
  process.exit(1);
}

console.log("DOCS PASS — links, canonical docs, versions, components, and public routes are in sync");
