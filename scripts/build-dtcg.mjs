#!/usr/bin/env node
/**
 * build-dtcg.mjs
 * DTCG design-tokens/ → dist/{brand}/{mode}/tokens.css + backward-compatible slt-tokens.*
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TOKENS_DIR = join(ROOT, "design-tokens");
const DIST = join(ROOT, "dist");

const THEMES = [
  { id: "ai-dash", mode: "light", semantic: "semantic.ai-dash.light.json" },
  { id: "ai-dash", mode: "dark", semantic: "semantic.ai-dash.dark.json" },
  {
    id: "sound-laboratory",
    mode: "light",
    semantic: "semantic.sound-laboratory.light.json",
  },
  {
    id: "sound-laboratory",
    mode: "dark",
    semantic: "semantic.sound-laboratory.dark.json",
  },
  {
    id: "slt-corporate",
    mode: "dark",
    semantic: "semantic.slt-corporate.dark.json",
  },
  { id: "admin", mode: "light", semantic: "semantic.admin.light.json" },
];

const DEFAULT_THEME = { id: "ai-dash", mode: "dark" };

/** @type {Record<string, { path: string, type: string, raw: unknown, description?: string }>} */
let tokenMap = {};

function loadJson(name) {
  return JSON.parse(readFileSync(join(TOKENS_DIR, name), "utf8"));
}

function isTokenNode(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    "$value" in obj &&
    !Array.isArray(obj)
  );
}

function flattenTokens(obj, prefix = "") {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (isTokenNode(value)) {
      tokenMap[path] = {
        path,
        type: value.$type ?? "unknown",
        raw: value.$value,
        description: value.$description,
      };
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenTokens(value, path);
    }
  }
}

function resolveRef(ref, stack = new Set()) {
  if (typeof ref !== "string") return ref;
  const match = ref.match(/^\{(.+)\}$/);
  if (!match) return ref;
  const path = match[1];
  if (stack.has(path)) {
    throw new Error(`Circular reference: ${path}`);
  }
  const token = tokenMap[path];
  if (!token) {
    throw new Error(`Unresolved token reference: ${path}`);
  }
  return resolveValue(token.raw, new Set(stack).add(path));
}

function resolveValue(value, stack = new Set()) {
  if (typeof value === "string" && value.startsWith("{")) {
    return resolveRef(value, stack);
  }
  if (Array.isArray(value)) {
    return value.map((v) =>
      typeof v === "string" && v.startsWith("{") ? resolveRef(v, stack) : v
    );
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] =
        typeof v === "string" && v.startsWith("{")
          ? resolveRef(v, stack)
          : typeof v === "object" && v !== null && "value" in v && "unit" in v
            ? resolveDimension(v)
            : v;
    }
    return out;
  }
  return value;
}

function resolveDimension(dim) {
  if (typeof dim === "object" && dim !== null && "value" in dim && "unit" in dim) {
    const unit = dim.unit === "ms" ? "ms" : dim.unit;
    return `${dim.value}${unit}`;
  }
  return dim;
}

function formatShadow(shadow) {
  if (typeof shadow === "string") return shadow;
  const {
    color = "#00000000",
    offsetX = { value: 0, unit: "px" },
    offsetY = { value: 0, unit: "px" },
    blur = { value: 0, unit: "px" },
    spread = { value: 0, unit: "px" },
  } = shadow;
  const ox = resolveDimension(offsetX);
  const oy = resolveDimension(offsetY);
  const b = resolveDimension(blur);
  const s = resolveDimension(spread);
  return `${ox} ${oy} ${b} ${s} ${color}`;
}

function toCssValue(token) {
  const resolved = resolveValue(token.raw);
  switch (token.type) {
    case "color":
      return String(resolved);
    case "dimension":
    case "duration":
      return resolveDimension(resolved);
    case "fontWeight":
    case "number":
      return String(resolved);
    case "fontFamily":
      return Array.isArray(resolved)
        ? resolved.map((f) => (f.includes(" ") ? `'${f}'` : f)).join(", ")
        : String(resolved);
    case "cubicBezier":
      return Array.isArray(resolved)
        ? `cubic-bezier(${resolved.join(", ")})`
        : String(resolved);
    case "shadow":
      return formatShadow(resolved);
    case "typography": {
      const t = resolved;
      const parts = [];
      if (t.fontWeight) parts.push(t.fontWeight);
      if (t.fontSize) parts.push(resolveDimension(t.fontSize));
      if (t.lineHeight) parts.push(`/${t.lineHeight}`);
      if (t.fontFamily) {
        const fam = Array.isArray(t.fontFamily)
          ? t.fontFamily.map((f) => (f.includes(" ") ? `'${f}'` : f)).join(", ")
          : t.fontFamily;
        parts.push(fam);
      }
      return parts.join(" ");
    }
    default:
      if (typeof resolved === "object") return JSON.stringify(resolved);
      return String(resolved);
  }
}

function pathToCssVar(path) {
  return `--${path.replace(/\./g, "-")}`;
}

/** @param {Array<{ path: string }>} tokens */
function buildVarMap(tokens) {
  /** @type {Map<string, string>} */
  const map = new Map();
  for (const token of tokens) {
    try {
      map.set(pathToCssVar(token.path), toCssValue(token));
    } catch {
      /* skip unresolved */
    }
  }
  return map;
}

/** Emit CSS custom properties that differ from the default theme. */
function writeThemeOverrideBlock(lines, selector, built, defaultVarMap) {
  const themeVarMap = buildVarMap(built.tokens);
  /** @type {Array<[string, string]>} */
  const overrides = [];
  for (const [varName, value] of themeVarMap) {
    if (defaultVarMap.get(varName) !== value) {
      overrides.push([varName, value]);
    }
  }
  if (overrides.length === 0) return;
  overrides.sort(([a], [b]) => a.localeCompare(b));
  lines.push(selector);
  for (const [varName, value] of overrides) {
    lines.push(`  ${varName}: ${value};`);
  }
  lines.push("}");
  lines.push("");
}

function buildThemeCss(themeId, mode, semanticFile) {
  tokenMap = {};
  const primitives = loadJson("primitives.json");
  const semantic = loadJson(semanticFile);
  const components = loadJson("components.json");

  flattenTokens(primitives);
  flattenTokens(semantic);
  flattenTokens(components);

  const lines = [
    "/**",
    " * AUTO-GENERATED — do not edit by hand.",
    ` * Theme: ${themeId} / ${mode}`,
    " * Run: npm run build",
    " */",
    "",
    `:root {`,
  ];

  const sorted = Object.values(tokenMap).sort((a, b) =>
    a.path.localeCompare(b.path)
  );

  let lastGroup = "";
  for (const token of sorted) {
    const group = token.path.split(".")[0];
    if (group !== lastGroup) {
      lines.push(`  /* ${group} */`);
      lastGroup = group;
    }
    if (token.description) {
      lines.push(`  /* ${token.description} */`);
    }
    try {
      const cssVal = toCssValue(token);
      lines.push(`  ${pathToCssVar(token.path)}: ${cssVal};`);
    } catch (err) {
      lines.push(`  /* ERROR ${token.path}: ${err.message} */`);
    }
  }

  lines.push("}");
  return { css: lines.join("\n") + "\n", tokens: sorted };
}

function buildCompatCss() {
  const defaultBuild = buildThemeCss(
    DEFAULT_THEME.id,
    DEFAULT_THEME.mode,
    `semantic.${DEFAULT_THEME.id}.${DEFAULT_THEME.mode}.json`
  );

  const lines = [
    "/**",
    " * AUTO-GENERATED — backward-compatible bundle.",
    ` * Default: ${DEFAULT_THEME.id} / ${DEFAULT_THEME.mode}`,
    " * Brand overlays via [data-theme] + [data-color-mode].",
    " * Run: npm run build",
    " */",
    "",
    defaultBuild.css,
    "",
    "/* Tailwind CSS v4 theme bridge — semantic colors only */",
    "@theme inline {",
  ];

  for (const token of defaultBuild.tokens) {
    if (token.path.startsWith("color.")) {
      const alias = `--color-${token.path.slice("color.".length).replace(/\./g, "-")}`;
      const source = pathToCssVar(token.path);
      // alias が参照先と同名になる場合は自己参照（invalid custom property）になるためスキップ。
      // token.path が既に "color." プレフィックスのみで --color-* 形式になるトークンはこれに該当する。
      if (alias === source) continue;
      lines.push(`  ${alias}: var(${source});`);
    }
  }

  lines.push("  --font-sans: var(--font-family-display);");
  lines.push("  --font-mono: var(--font-family-mono);");
  lines.push("}");
  lines.push("");

  const defaultVarMap = buildVarMap(defaultBuild.tokens);

  for (const theme of THEMES) {
    if (
      theme.id === DEFAULT_THEME.id &&
      theme.mode === DEFAULT_THEME.mode
    ) {
      continue;
    }
    const built = buildThemeCss(theme.id, theme.mode, theme.semantic);
    lines.push(`/* ${theme.id} / ${theme.mode} */`);
    writeThemeOverrideBlock(
      lines,
      `[data-theme='${theme.id}'][data-color-mode='${theme.mode}'] {`,
      built,
      defaultVarMap,
    );
  }

  lines.push("/* Legacy: data-theme without data-color-mode */");
  lines.push("/* Product brands default to dark; admin defaults to light */");
  for (const theme of THEMES) {
    if (
      theme.id === DEFAULT_THEME.id &&
      theme.mode === DEFAULT_THEME.mode
    ) {
      continue;
    }
    const defaultMode = theme.id === "admin" ? "light" : "dark";
    if (theme.mode !== defaultMode) continue;
    const built = buildThemeCss(theme.id, theme.mode, theme.semantic);
    writeThemeOverrideBlock(
      lines,
      `[data-theme='${theme.id}']:not([data-color-mode]) {`,
      built,
      defaultVarMap,
    );
  }

  lines.push("@media (prefers-reduced-motion: reduce) {");
  lines.push("  :root {");
  lines.push("    --motion-duration-fast: 0ms;");
  lines.push("    --motion-duration-base: 0ms;");
  lines.push("    --motion-duration-slow: 0ms;");
  lines.push("  }");
  lines.push("}");

  return lines.join("\n") + "\n";
}

function buildTypeScript(allResolved) {
  const defaultKey = `${DEFAULT_THEME.id}/${DEFAULT_THEME.mode}`;
  const defaultTokens = allResolved[defaultKey] ?? {};

  const colorEntries = Object.entries(defaultTokens)
    .filter(([k]) => k.startsWith("color."))
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)} as const,`)
    .join("\n");

  const themesTs = THEMES.map((t) => {
    const key = `${t.id}/${t.mode}`;
    return `  ${JSON.stringify(`${t.id}-${t.mode}`)}: {
    id: ${JSON.stringify(t.id)},
    mode: ${JSON.stringify(t.mode)},
    label: ${JSON.stringify(`${t.id} (${t.mode})`)},
  },`;
  }).join("\n");

  const colorsCompat = {
    accent2: "#D3C193",
    semiAccent1: "#C59367",
    semiAccent2: "#818572",
    semiAccent3: "#9E9E70",
    sysEmerald: "#10B981",
    sysBlue: "#3B82F6",
    sysRed: "#EF4444",
    sysYellow: "#F59E0B",
  };

  const compatTs = Object.entries(colorsCompat)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join("\n");

  return `/**
 * AUTO-GENERATED — do not edit by hand.
 * Run: npm run build
 * Source: design-tokens/ (DTCG)
 */

export const semanticColors = {
${colorEntries}
} as const;

export const themes = {
${themesTs}
} as const;

export type ThemeKey = keyof typeof themes;

/** @deprecated Use semantic token CSS variables. Kept for マーケ／コーポレート LP compat. */
export const COLORS = {
${compatTs}
} as const;

export const tokens = {
  semanticColors,
  themes,
  COLORS,
} as const;

export default tokens;
`;
}

mkdirSync(DIST, { recursive: true });

/** @type {Record<string, Record<string, string>>} */
const allResolved = {};

for (const theme of THEMES) {
  const { css, tokens } = buildThemeCss(
    theme.id,
    theme.mode,
    theme.semantic
  );
  const outDir = join(DIST, theme.id, theme.mode);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "tokens.css"), css, "utf8");

  const key = `${theme.id}/${theme.mode}`;
  allResolved[key] = {};
  for (const token of tokens) {
    try {
      allResolved[key][token.path] = toCssValue(token);
    } catch {
      /* skip */
    }
  }
}

writeFileSync(join(DIST, "slt-tokens.css"), buildCompatCss(), "utf8");
writeFileSync(
  join(DIST, "slt-tokens.json"),
  JSON.stringify(
    { version: "0.2.0", themes: allResolved },
    null,
    2
  ) + "\n",
  "utf8"
);
writeFileSync(join(DIST, "slt-tokens.ts"), buildTypeScript(allResolved), "utf8");

console.log("Built DTCG tokens:");
for (const theme of THEMES) {
  console.log(`  dist/${theme.id}/${theme.mode}/tokens.css`);
}
console.log("  dist/slt-tokens.css (compat)");
console.log("  dist/slt-tokens.ts");
console.log("  dist/slt-tokens.json");
