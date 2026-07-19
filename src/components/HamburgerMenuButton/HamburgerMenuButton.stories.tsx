import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { HamburgerMenuButton } from "./HamburgerMenuButton";

const meta = {
  title: "SLT Design System/L2 Components/P2/HamburgerMenuButton",
  component: HamburgerMenuButton,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "HamburgerMenuButton", "padded"),
} satisfies Meta<typeof HamburgerMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { open: false },
  render: function HamburgerStory() {
    const [open, setOpen] = useState(false);
    return <HamburgerMenuButton open={open} onClick={() => setOpen((v) => !v)} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: "メニューを開く" });
    await userEvent.click(btn);
    expect(canvas.getByRole("button", { name: "メニューを閉じる" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  },
};
