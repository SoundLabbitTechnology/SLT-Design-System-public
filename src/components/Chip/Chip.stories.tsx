import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Chip } from "./Chip";

const meta = {
  title: "SLT Design System/L2 Components/P1/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "Chip", "padded"),
  args: {
    children: "デザインシステム",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
    children: "選択中",
  },
};

export const Removable: Story = {
  args: { children: null },
  render: function RemovableChip() {
    const [visible, setVisible] = useState(true);
    if (!visible) return <p>削除済み</p>;
    return (
      <Chip onRemove={() => setVisible(false)} removeLabel="タグを削除">
        フィルタ: 公開中
      </Chip>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "タグを削除" }));
    expect(canvas.getByText("削除済み")).toBeInTheDocument();
  },
};
