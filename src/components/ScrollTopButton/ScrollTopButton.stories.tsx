import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { ScrollTopButton } from "./ScrollTopButton";

const meta = {
  title: "SLT Design System/L2 Components/P2/ScrollTopButton",
  component: ScrollTopButton,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "ScrollTopButton", "padded"),
  args: {
    threshold: 0,
  },
} satisfies Meta<typeof ScrollTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("button", { name: "ページ上部へ" })).toBeInTheDocument();
  },
};
