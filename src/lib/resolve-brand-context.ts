import type { BrandId } from "../components/brand-backgrounds";

export type ColorMode = "light" | "dark";

const BRAND_IDS: BrandId[] = ["ai-dash", "sound-laboratory", "slt-corporate"];

/** Production: `<html data-theme>`. Storybook: themed decorator div. */
export function resolveThemedHost(root: HTMLElement = document.documentElement): HTMLElement {
 if (root.hasAttribute("data-theme")) return root;
 const themed = root.querySelector("[data-theme]");
 if (themed instanceof HTMLElement) return themed;
 return root;
}

export function resolveBrandFromDom(root: HTMLElement = document.documentElement): BrandId {
 const host = resolveThemedHost(root);
 const theme = host.getAttribute("data-theme");
 if (theme && BRAND_IDS.includes(theme as BrandId)) {
 return theme as BrandId;
 }
 return "ai-dash";
}

export function resolveColorModeFromDom(root: HTMLElement = document.documentElement): ColorMode {
 const host = resolveThemedHost(root);
 const mode = host.getAttribute("data-color-mode");
 if (mode === "light" || mode === "dark") return mode;
 if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
 return "dark";
 }
 return "dark";
}
