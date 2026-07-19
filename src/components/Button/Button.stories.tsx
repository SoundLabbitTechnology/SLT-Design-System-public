import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Button } from "./Button";

const meta = {
  title: "SLT Design System/L2 Components/P0/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Button", "centered"),
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "送信する", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "キャンセル", variant: "secondary" },
};

export const Danger: Story = {
  args: { children: "削除する", variant: "danger" },
};

export const Ghost: Story = {
  args: { children: "詳細を見る", variant: "ghost" },
};

export const Loading: Story = {
  args: { children: "処理中…", variant: "primary", loading: true },
};

export const Disabled: Story = {
  args: { children: "無効", variant: "primary", disabled: true },
};

export const DangerWithCancel: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-2, 8px)" }}>
      <Button variant="secondary">キャンセル</Button>
      <Button variant="danger">削除する</Button>
    </div>
  ),
};

export const KeyboardFocus: Story = {
  args: { children: "フォーカス対象", variant: "primary" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "フォーカス対象" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
