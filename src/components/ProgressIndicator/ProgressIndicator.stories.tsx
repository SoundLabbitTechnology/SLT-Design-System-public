import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { ProgressIndicator } from "./ProgressIndicator";

const meta = {
  title: "SLT Design System/L2 Components/P1/ProgressIndicator",
  component: ProgressIndicator,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "ProgressIndicator", "padded"),
  args: {
    label: "アップロード",
    value: 40,
    id: "upload-progress",
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Indeterminate: Story = {
  args: {
    value: undefined,
    label: "処理中",
    showValueLabel: false,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    label: "完了",
  },
};
