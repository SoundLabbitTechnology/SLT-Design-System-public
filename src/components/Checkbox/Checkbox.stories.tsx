import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "SLT Design System/L2 Components/P0/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Checkbox", "centered"),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "利用規約に同意する",
  },
};

export const Checked: Story = {
  args: {
    label: "メール通知を受け取る",
    defaultChecked: true,
  },
};

export const WithHint: Story = {
  args: {
    label: "マーケティング情報を受け取る",
    hint: "いつでも設定から変更できます",
  },
};

export const Error: Story = {
  args: {
    label: "利用規約に同意する",
    error: true,
    errorMessage: "続行するには同意が必要です",
  },
};

export const Disabled: Story = {
  args: {
    label: "変更不可の項目",
    defaultChecked: true,
    disabled: true,
  },
};

export const KeyboardFocus: Story = {
  args: {
    label: "キーボード操作の確認",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: "キーボード操作の確認" });
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(checkbox).toBeChecked();
  },
};
