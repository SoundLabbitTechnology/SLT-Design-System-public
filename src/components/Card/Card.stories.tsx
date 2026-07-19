import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { Card } from "./Card";

const meta = {
  title: "SLT Design System/L2 Components/P0/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Card", "centered"),
  argTypes: {
    variant: { control: "select", options: ["default", "glass"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>AI-DASH スプリント</h3>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
          HCD × SDD メソッドで、人間が主役の AI 導入を支援します。
        </p>
      </>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: "glass",
    children: (
      <>
        <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>グラスカード</h3>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          半透明 + blur の SLT シグネチャスタイル
        </p>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    "aria-busy": true,
    children: (
      <>
        <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>読み込み中</h3>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          コンテンツを取得しています…
        </p>
      </>
    ),
  },
};
