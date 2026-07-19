#!/usr/bin/env node
/**
 * build-tokens.mjs
 * Reads tokens/{foundation,semantic,brand}.json and emits:
 *   dist/slt-tokens.css  — :root CSS variables + Tailwind v4 @theme inline
 *   dist/slt-tokens.ts   — typed exports + COLORS compat
 *   dist/slt-tokens.json — flattened token map
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

function load(name) {
  return JSON.parse(readFileSync(join(ROOT, "tokens", name), "utf8"));
}

const foundation = load("foundation.json");
const semantic = load("semantic.json");
const brand = load("brand.json");

mkdirSync(DIST, { recursive: true });

/** @type {{ cssVar: string, value: string, description?: string, group: string }[]} */
const flat = [];

function collectGroup(obj, group) {
  if (!obj || typeof obj !== "object") return;
  for (const [key, entry] of Object.entries(obj)) {
    if (!entry || typeof entry !== "object") continue;
    if (typeof entry.value === "string" && typeof entry.cssVar === "string") {
      flat.push({
        key: `${group}.${key}`,
        cssVar: entry.cssVar,
        value: entry.value,
        description: entry.description,
        themeAlias: entry.themeAlias,
        group,
      });
    }
  }
}

collectGroup(foundation.color, "color");
collectGroup(foundation.typography, "typography");
collectGroup(foundation.radius, "radius");
collectGroup(foundation.shadow, "shadow");
collectGroup(foundation.transition, "transition");
collectGroup(semantic.text, "text");
collectGroup(semantic.surface, "surface");
collectGroup(semantic.border, "border");
collectGroup(semantic.interactive, "interactive");
collectGroup(semantic.aliases, "aliases");

// --- CSS generation ---

function cssRootBlock() {
  const lines = [
    "/**",
    " * AUTO-GENERATED — do not edit by hand.",
    " * Run: npm run build",
    " * Source: tokens/{foundation,semantic,brand}.json",
    " */",
    "",
    ":root {",
  ];

  const sections = [
    ["Foundation — color", "color"],
    ["Foundation — typography", "typography"],
    ["Foundation — radius", "radius"],
    ["Foundation — shadow", "shadow"],
    ["Foundation — transition", "transition"],
    ["Semantic — text", "text"],
    ["Semantic — surface", "surface"],
    ["Semantic — border", "border"],
    ["Semantic — interactive", "interactive"],
    ["Semantic — aliases", "aliases"],
  ];

  for (const [label, group] of sections) {
    lines.push(`  /* ${label} */`);
    for (const t of flat.filter((x) => x.group === group)) {
      if (t.description) {
        lines.push(`  /* ${t.description} */`);
      }
      lines.push(`  ${t.cssVar}: ${t.value};`);
    }
    lines.push("");
  }

  // Default brand (ai-dash product stack already via --font-sans)
  lines.push("  /* Default brand accents (ai-dash / corporate shared gold) */");
  lines.push("  --brand-accent-primary: #D3C193;");
  lines.push("  --brand-accent-secondary: #C59367;");
  lines.push("}");
  return lines.join("\n");
}

function themeInlineBlock() {
  const lines = [
    "",
    "/* Tailwind CSS v4 theme bridge.",
    " * NOTE: Do NOT add --spacing-* here — collides with max-w-md etc.",
    " */",
    "@theme inline {",
    "  --color-background: var(--background);",
    "  --color-foreground: var(--foreground);",
    "",
  ];

  // Palette colors
  lines.push("  /* Color palette */");
  for (const t of flat.filter((x) => x.group === "color")) {
    // Map --color-* and --grid-* into theme; skip if cssVar already starts with --color-
    const themeName = t.cssVar.startsWith("--color-")
      ? t.cssVar
      : t.cssVar.startsWith("--grid-")
        ? t.cssVar
        : null;
    if (themeName) {
      lines.push(`  ${themeName}: var(${t.cssVar});`);
    }
  }
  lines.push("");

  // Semantic text / surface / border via themeAlias
  lines.push("  /* Semantic tokens (Tailwind color-* aliases) */");
  for (const t of flat) {
    if (t.themeAlias) {
      lines.push(`  ${t.themeAlias}: var(${t.cssVar});`);
    }
  }
  lines.push("");

  lines.push("  /* Typography */");
  lines.push("  --font-sans: var(--font-sans);");
  lines.push("  --font-mono: var(--font-mono);");
  lines.push("");

  lines.push("  /* Radius */");
  for (const t of flat.filter((x) => x.group === "radius")) {
    lines.push(`  ${t.cssVar}: ${t.value};`);
  }
  lines.push("");

  lines.push("  /* Shadow */");
  for (const t of flat.filter((x) => x.group === "shadow")) {
    lines.push(`  ${t.cssVar}: ${t.value};`);
  }
  lines.push("");

  lines.push("  /* Transition */");
  for (const t of flat.filter((x) => x.group === "transition")) {
    lines.push(`  ${t.cssVar}: ${t.value};`);
  }

  lines.push("}");
  return lines.join("\n");
}

function brandThemeBlocks() {
  const out = ["", "/* Brand theme overlays — apply via [data-theme='...'] */"];
  for (const theme of Object.values(brand.themes)) {
    out.push(`[data-theme='${theme.id}'] {`);
    for (const [k, v] of Object.entries(theme.cssVars || {})) {
      out.push(`  ${k}: ${v};`);
    }
    out.push("}");
    out.push("");
  }

  out.push("/* Dark scheme preference — switch page background/foreground */");
  out.push("@media (prefers-color-scheme: dark) {");
  out.push("  :root {");
  out.push("    --background: var(--color-dark-bg);");
  out.push("    --foreground: var(--color-dark-text-primary);");
  out.push("    --grid-color-major: transparent;");
  out.push("    --grid-color-minor: transparent;");
  out.push("  }");
  out.push("}");

  return out.join("\n");
}

const css =
  cssRootBlock() + "\n" + themeInlineBlock() + "\n" + brandThemeBlocks() + "\n";

writeFileSync(join(DIST, "slt-tokens.css"), css, "utf8");

// --- JSON flattened ---

const flatMap = {};
for (const t of flat) {
  flatMap[t.key] = {
    cssVar: t.cssVar,
    value: t.value,
    description: t.description ?? null,
    themeAlias: t.themeAlias ?? null,
  };
}
flatMap["brand.themes"] = Object.fromEntries(
  Object.entries(brand.themes).map(([id, t]) => [
    id,
    {
      label: t.label,
      usage: t.usage,
      accentPrimary: t.accentPrimary,
      accentSecondary: t.accentSecondary,
      gradient: t.gradient,
      wavePalette: t.wavePalette,
      fontSans: t.fontSans,
    },
  ])
);
flatMap["compat.COLORS"] = brand.homepagesCompat.COLORS;

writeFileSync(
  join(DIST, "slt-tokens.json"),
  JSON.stringify({ version: "0.1.0", tokens: flatMap }, null, 2) + "\n",
  "utf8"
);

// --- TypeScript ---

function tsStringLiteral(s) {
  return JSON.stringify(s);
}

const colorsCompat = brand.homepagesCompat.COLORS;
const colorEntries = Object.entries(foundation.color)
  .map(
    ([k, e]) =>
      `  ${JSON.stringify(k)}: ${tsStringLiteral(e.value)} as const,`
  )
  .join("\n");

const semanticText = Object.entries(semantic.text)
  .map(([k, e]) => `  ${k}: ${tsStringLiteral(e.value)} as const,`)
  .join("\n");
const semanticSurface = Object.entries(semantic.surface)
  .map(([k, e]) => `  ${JSON.stringify(k)}: ${tsStringLiteral(e.value)} as const,`)
  .join("\n");

const brandThemesTs = Object.entries(brand.themes)
  .map(([id, t]) => {
    return `  ${JSON.stringify(id)}: {
    id: ${tsStringLiteral(t.id)},
    label: ${tsStringLiteral(t.label)},
    usage: ${tsStringLiteral(t.usage)},
    fontSans: ${tsStringLiteral(t.fontSans)},
    accentPrimary: ${tsStringLiteral(t.accentPrimary)},
    accentSecondary: ${tsStringLiteral(t.accentSecondary)},
    gradient: ${JSON.stringify(t.gradient)} as const,
    wavePalette: ${JSON.stringify(t.wavePalette)} as const,
  },`;
  })
  .join("\n");

const colorsCompatTs = Object.entries(colorsCompat)
  .map(([k, v]) => `  ${k}: ${tsStringLiteral(v)},`)
  .join("\n");

const ts = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Run: npm run build
 * Source: tokens/{foundation,semantic,brand}.json
 */

/** Primitive foundation colors */
export const color = {
${colorEntries}
} as const;

export type ColorToken = keyof typeof color;

/** Semantic text colors (dark-first UI) */
export const text = {
${semanticText}
} as const;

/** Semantic surfaces */
export const surface = {
${semanticSurface}
} as const;

export const radius = {
${Object.entries(foundation.radius)
  .map(([k, e]) => `  ${JSON.stringify(k)}: ${tsStringLiteral(e.value)} as const,`)
  .join("\n")}
} as const;

export const shadow = {
${Object.entries(foundation.shadow)
  .map(([k, e]) => `  ${JSON.stringify(k)}: ${tsStringLiteral(e.value)} as const,`)
  .join("\n")}
} as const;

export const transition = {
${Object.entries(foundation.transition)
  .map(([k, e]) => `  ${k}: ${tsStringLiteral(e.value)} as const,`)
  .join("\n")}
} as const;

export const fonts = {
  sans: ${tsStringLiteral(foundation.typography["font-sans"].value)},
  sansCorporate: ${tsStringLiteral(foundation.typography["font-sans-corporate"].value)},
  sansProduct: ${tsStringLiteral(foundation.typography["font-sans-product"].value)},
  mono: ${tsStringLiteral(foundation.typography["font-mono"].value)},
  heading: ${tsStringLiteral(foundation.typography["font-heading"].value)},
  body: ${tsStringLiteral(foundation.typography["font-body"].value)},
} as const;

export const themes = {
${brandThemesTs}
} as const;

export type ThemeId = keyof typeof themes;

/**
 * Aggregate token object for structured access.
 */
export const tokens = {
  color,
  text,
  surface,
  radius,
  shadow,
  transition,
  fonts,
  themes,
} as const;

/**
 * Backward-compatible COLORS map matching マーケ／コーポレート LP/constants/colors.ts
 */
export const COLORS = {
${colorsCompatTs}
} as const;

export type ColorsCompat = typeof COLORS;

export default tokens;
`;

writeFileSync(join(DIST, "slt-tokens.ts"), ts, "utf8");

console.log("Built:");
console.log("  dist/slt-tokens.css");
console.log("  dist/slt-tokens.ts");
console.log("  dist/slt-tokens.json");
console.log(`  (${flat.length} foundation/semantic tokens, ${Object.keys(brand.themes).length} brand themes)`);
