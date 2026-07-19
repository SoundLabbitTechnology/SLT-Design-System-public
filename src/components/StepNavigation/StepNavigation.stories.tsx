import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { StepNavigation } from "./StepNavigation";

const meta = {
  title: "SLT Design System/L2 Components/P1/StepNavigation",
  component: StepNavigation,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "StepNavigation", "padded"),
  args: {
    current: 2,
    steps: [
      { label: "申請内容", description: "基本情報の入力" },
      { label: "確認", description: "内容の確認" },
      { label: "完了", description: "受付完了" },
    ],
  },
} satisfies Meta<typeof StepNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstStep: Story = {
  args: { current: 1 },
};
