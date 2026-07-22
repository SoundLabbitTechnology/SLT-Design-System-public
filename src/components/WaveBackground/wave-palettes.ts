import { resolveCssVarRgb } from "../../lib/resolve-css-color";
export const WAVE_PALETTE_VARS = {
  /** Matches tokens/brand.json ai-dash wavePalette: blue / copper / gold */
  "ai-dash": [
    "--color-action-secondary",
    "--color-action-primary-hover",
    "--color-action-primary",
  ],
  "slt-corporate": [
    "--color-action-primary",
    "--color-action-secondary",
    "--color-text-brand",
  ],
} as const;

export type WavePalette = keyof typeof WAVE_PALETTE_VARS;

export const WAVE_PALETTE_RENDER = {
  "ai-dash": { opacityScale: 0.85, minOpacity: 0.22, lineWidth: 1.25 },
  "slt-corporate": { opacityScale: 0.6, minOpacity: 0.1, lineWidth: 1 },
} as const satisfies Record<
  WavePalette,
  { opacityScale: number; minOpacity: number; lineWidth: number }
>;

export function resolvePalette(varNames: readonly string[], host?: HTMLElement) {
  return varNames.map((name) => resolveCssVarRgb(name, host));
}

export { resolveCssVarRgb } from "../../lib/resolve-css-color";
