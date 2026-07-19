import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Switch } from "./Switch";

const meta = {
  title: "SLT Design System/L2 Components/P0/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Switch", "centered"),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "メール通知",
  },
};

export const Checked: Story = {
  args: {
    label: "プッシュ通知",
    defaultChecked: true,
  },
};

export const WithHint: Story = {
  args: {
    label: "自動保存",
    hint: "切り替えるとその場で反映されます",
  },
};

export const Disabled: Story = {
  args: {
    label: "変更不可の設定",
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
    const sw = canvas.getByRole("switch", { name: "キーボード操作の確認" });
    await userEvent.tab();
    await expect(sw).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(sw).toBeChecked();
  },
};
