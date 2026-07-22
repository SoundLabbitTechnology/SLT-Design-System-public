import type { WavePalette } from "./WaveBackground/wave-palettes";

/** Brands with a registered site background treatment */
export type BrandId = "ai-dash" | "sound-laboratory" | "slt-corporate";

export type BrandBackgroundKind = "wave-mesh" | "grid";

export interface GridBackgroundSpec {
  light: { minorVar: string; majorVar: string };
  dark: { minorVar: string; majorVar: string };
  minorSize: number;
  majorSize: number;
  /** Mouse parallax max shift in px; 0 disables */
  parallaxMax: number;
  surfaceVar: string;
}

export type BrandBackgroundEntry =
  | { kind: "wave-mesh"; palette: WavePalette }
  | { kind: "grid"; grid: GridBackgroundSpec };

/**
 * Per-brand background registry.
 * - ai-dash / slt-corporate: 3D wave mesh (canvas)
 * - sound-laboratory: 2D graph-paper grid + parallax (official site pattern)
 *
 * Aligns with tokens/brand.json `wavePalette` for mesh brands;
 * Sound Laboratory uses grid per sound-laboratory-official-site.
 */
export const BRAND_BACKGROUNDS: Record<BrandId, BrandBackgroundEntry> = {
  "ai-dash": {
    kind: "wave-mesh",
    palette: "ai-dash",
  },
  "sound-laboratory": {
    kind: "grid",
    grid: {
      light: {
        minorVar: "--color-grid-minor-light",
        majorVar: "--color-grid-major-light",
      },
      dark: {
        minorVar: "--color-grid-minor-dark",
        majorVar: "--color-grid-major-dark",
      },
      minorSize: 25,
      majorSize: 100,
      parallaxMax: 20,
      surfaceVar: "--color-surface-primary",
    },
  },
  "slt-corporate": {
    kind: "wave-mesh",
    palette: "slt-corporate",
  },
};

export function getBrandBackground(brand: BrandId): BrandBackgroundEntry {
  return BRAND_BACKGROUNDS[brand];
}
