import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { MobileMenu } from "./MobileMenu";

const meta = {
  title: "SLT Design System/L2 Components/P2/MobileMenu",
  component: MobileMenu,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "MobileMenu", "padded"),
  args: {
    items: [
      { label: "ホーム", href: "#" },
      { label: "製品", href: "#" },
      { label: "ドキュメント", href: "#", current: true },
    ],
  },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "メニューを開く" }));
    const body = within(document.body);
    expect(await body.findByRole("dialog")).toBeInTheDocument();
    expect(body.getByRole("link", { name: "ドキュメント" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};
