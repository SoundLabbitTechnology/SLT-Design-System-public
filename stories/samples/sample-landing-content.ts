import type { BrandId } from "../../src/index";
import { ADMIN_DISPLAY_NAME, BRAND_DISPLAY_NAMES } from "../../src/index";
import type { SampleLandingVariant } from "./SampleLandingPage";

export type SampleBrand = BrandId | "admin";

export interface SampleBrandCopy {
  label: string;
  headline: string;
  lede: string;
}

const MARKETING_COPY: Record<BrandId, SampleBrandCopy> = {
  "ai-dash": {
    label: BRAND_DISPLAY_NAMES["ai-dash"],
    headline: "HCD × SDD × AI で、人間が主役の導入を支援する。",
    lede:
      "論理的な信頼とゴールド CTA。Wave 背景・高密度 admin との差を、この一枚で確認する判断用キャンバスです。",
  },
  /** 全文・セクションは sound-laboratory-home-content.ts が正本 */
  "sound-laboratory": {
    label: BRAND_DISPLAY_NAMES["sound-laboratory"],
    headline: "音楽とテクノロジーの力で、人と人、人とアイデアをつなぐ。",
    lede:
      "感性と論理を掛け合わせ、研究・発信・ものづくりを通じて音楽文化の新しいつながりを設計する音楽メディアです。",
  },
  "slt-corporate": {
    label: BRAND_DISPLAY_NAMES["slt-corporate"],
    headline: "感性と論理をつなぎ、創造の波をデザインする。",
    lede:
      "コーポレート LP 想定。Wave 背景とゴールドアクセントの見え方を確認します。",
  },
};

const ADMIN_COPY: SampleBrandCopy = {
  label: ADMIN_DISPLAY_NAME,
  headline: "運用画面の密度と可読性を、一枚で確認する。",
  lede:
    "Table / Skeleton / Toast / Dialog を同じ画面に置き、admin 向けパーツの是非を判断するためのキャンバスです。",
};

export function getSampleCopy(
  brand: SampleBrand,
  variant: SampleLandingVariant,
): SampleBrandCopy {
  if (variant === "admin" || brand === "admin") return ADMIN_COPY;
  return MARKETING_COPY[brand];
}
