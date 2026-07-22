import { ADMIN_DISPLAY_NAME, BRAND_DISPLAY_NAMES } from "@soundlabbit/design-system/ui";

export type Brand = "ai-dash" | "sound-laboratory" | "slt-corporate" | "admin";
export type ColorMode = "light" | "dark";

export interface ThemeOption {
 brand: Brand;
 label: string;
 modes: ColorMode[];
}

// dist/{brand}/{mode}/tokens.css に実在する 6 組合せのみ。
export const THEME_OPTIONS: ThemeOption[] = [
 { brand: "ai-dash", label: BRAND_DISPLAY_NAMES["ai-dash"], modes: ["dark", "light"] },
 {
 brand: "sound-laboratory",
 label: BRAND_DISPLAY_NAMES["sound-laboratory"],
 modes: ["dark", "light"],
 },
 { brand: "slt-corporate", label: BRAND_DISPLAY_NAMES["slt-corporate"], modes: ["dark"] },
 { brand: "admin", label: ADMIN_DISPLAY_NAME, modes: ["light"] },
];

export const DEFAULT_BRAND: Brand = "ai-dash";
export const DEFAULT_MODE: ColorMode = "dark";

export function modesForBrand(brand: Brand): ColorMode[] {
 return THEME_OPTIONS.find((option) => option.brand === brand)?.modes ?? [DEFAULT_MODE];
}

export const THEME_STORAGE_KEY = "slt-docs-theme";
