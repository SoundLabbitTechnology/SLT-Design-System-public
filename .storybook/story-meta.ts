/** Storybook CSF 用の共通定数 */
export const STORY_TAGS = ["autodocs"] as const;

export type StoryTier = "P0" | "P1" | "P2";
export type StoryLayout = "padded" | "centered" | "fullscreen";

/**
 * parameters.layout + docs.subtitle の標準セット。
 * title は Storybook 10 の静的解析制約により各 stories で文字列リテラル指定。
 * G4 Chromatic: P0 のみスナップショット対象（P1/P2 は disableSnapshot）。
 */
export function storyParameters(tier: StoryTier, name: string, layout: StoryLayout = "padded") {
  return {
    layout,
    docs: { subtitle: `${tier} — ${name}` },
    chromatic: {
      disableSnapshot: tier !== "P0",
    },
  };
}

/** タイトル命名規則: `SLT Design System/L2 Components/{tier}/{name}` */
export const STORY_TITLE_PREFIX = "SLT Design System/L2 Components" as const;
