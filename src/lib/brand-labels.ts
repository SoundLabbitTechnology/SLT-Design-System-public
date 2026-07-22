import type { BrandId } from "../components/brand-backgrounds";

/** ヘッダーロゴ・ヒーロー eyebrow 等に使う正式ブランド名（省略形は使わない） */
export const BRAND_DISPLAY_NAMES: Record<BrandId, string> = {
  "ai-dash": "AI-DASH",
  "sound-laboratory": "Sound Laboratory",
  "slt-corporate": "Sound Labbit Technology",
};

export const ADMIN_DISPLAY_NAME = "AI-DASH Admin";

export function getBrandDisplayName(brand: BrandId): string {
  return BRAND_DISPLAY_NAMES[brand];
}
