import tokensJson from "@soundlabbit/design-system/tokens.json";

export interface TokensFile {
  version: string;
  themes: Record<string, Record<string, string>>;
}

const tokens = tokensJson as TokensFile;

export const THEME_IDS = Object.keys(tokens.themes);

// 内部の生カラースケールはトークンリファレンスに出さず、raw color を露出しない。
const PRIMITIVE_COLOR_GROUPS = new Set([
  "alpha",
  "amber",
  "blue",
  "coral",
  "emerald",
  "gold",
  "gray",
  "green",
  "grid",
  "navy",
  "red",
]);

export const SEMANTIC_COLOR_GROUPS = [
  "surface",
  "text",
  "border",
  "action",
  "feedback",
  "interactive",
] as const;

export function cssVar(key: string): string {
  return `--${key.replaceAll(".", "-")}`;
}

export interface TokenRow {
  key: string;
  cssVar: string;
  label: string;
  valuesByTheme: Record<string, string>;
}

const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

function collectRows(predicate: (key: string) => boolean): TokenRow[] {
  const keys = new Set<string>();
  for (const theme of Object.values(tokens.themes)) {
    for (const key of Object.keys(theme)) {
      if (predicate(key)) keys.add(key);
    }
  }
  return [...keys].sort(naturalSort).map((key) => ({
    key,
    cssVar: cssVar(key),
    label: key.split(".").slice(1).join(".") || key,
    valuesByTheme: Object.fromEntries(
      Object.entries(tokens.themes).map(([themeId, values]) => [themeId, values[key] ?? "—"]),
    ),
  }));
}

export function colorGroup(group: (typeof SEMANTIC_COLOR_GROUPS)[number]): TokenRow[] {
  return collectRows((key) => key.startsWith(`color.${group}.`));
}

export function isPrimitiveColorGroup(group: string): boolean {
  return PRIMITIVE_COLOR_GROUPS.has(group);
}

export function tokensByPrefix(prefix: string): TokenRow[] {
  return collectRows((key) => key === prefix || key.startsWith(`${prefix}.`));
}
