import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Disclosure } from "./Disclosure";

const meta = {
  title: "SLT Design System/L2 Components/P1/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "Disclosure", "padded"),
  args: {
    summary: "詳細を表示",
    children: "特定条件に該当する場合のみ、追加の添付書類が必要になることがあります。",
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const summary = canvas.getByText("詳細を表示");
    expect(canvas.queryByText(/特定条件に該当/)).not.toBeVisible();
    await userEvent.click(summary);
    expect(canvas.getByText(/特定条件に該当/)).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    summary: "元データ（表）",
    defaultOpen: true,
    children: "表形式の数値データをここに表示します。",
  },
};
