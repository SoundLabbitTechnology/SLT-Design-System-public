import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { SampleLandingPage } from "./SampleLandingPage";
import type { SampleBrand } from "./sample-landing-content";

const meta = {
  title: "SLT Design System/Samples/Landing Canvas",
  component: SampleLandingPage,
  parameters: {
    layout: "fullscreen",
    // G4: Landing Canvas は判断用の主要ビジュアル面としてスナップショット対象
    chromatic: { disableSnapshot: false },
    docs: {
      subtitle: "本番統合前のパーツ判断用キャンバス（一枚もの LP）",
      description: {
        component:
          "現行 P0〜P2 を一枚の LP / 運用画面に合成した Storybook 専用サンプルです。Theme / Mode を切り替えながら、パーツの是非・不足・余白を判断してください。製品配布には含まれません。",
      },
    },
  },
  render: (args, { globals }) => (
    <SampleLandingPage
      {...args}
      brand={(globals.theme as SampleBrand) ?? args.brand ?? "ai-dash"}
    />
  ),
} satisfies Meta<typeof SampleLandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** AI-DASH 向けマーケティング LP 想定 */
export const AiDashMarketing: Story = {
  name: "AI-DASH / Marketing",
  args: { variant: "marketing" },
  globals: { theme: "ai-dash", colorMode: "dark" },
};

export const AiDashMarketingLight: Story = {
  name: "AI-DASH / Marketing (light)",
  args: { variant: "marketing" },
  globals: { theme: "ai-dash", colorMode: "light" },
};

/** Sound Laboratory — 低密度・グリッド背景 */
export const SoundLaboratoryMarketing: Story = {
  name: "Sound Laboratory / Marketing",
  args: { variant: "marketing" },
  globals: { theme: "sound-laboratory", colorMode: "dark" },
};

export const SoundLaboratoryMarketingLight: Story = {
  name: "Sound Laboratory / Marketing (light)",
  args: { variant: "marketing" },
  globals: { theme: "sound-laboratory", colorMode: "light" },
};

/** コーポレート LP 想定 */
export const SltCorporateMarketing: Story = {
  name: "SLT Corporate / Marketing",
  args: { variant: "marketing" },
  globals: { theme: "slt-corporate", colorMode: "dark" },
};

/** Admin — 高密度（Table 含む） */
export const AdminOps: Story = {
  name: "Admin / Ops",
  args: { variant: "admin" },
  globals: { theme: "admin", colorMode: "light" },
};

export const Smoke: Story = {
  name: "Smoke",
  args: { variant: "marketing" },
  globals: { theme: "ai-dash", colorMode: "dark" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(canvas.getByRole("navigation", { name: "メイン" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "デモを見る" })).toBeVisible();
  },
};
