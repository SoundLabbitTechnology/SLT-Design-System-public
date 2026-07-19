import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { MenuList } from "./MenuList";

const meta = {
  title: "SLT Design System/L2 Components/P2/MenuList",
  component: MenuList,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "MenuList", "padded"),
  args: {
    "aria-label": "メニュー",
    items: [
      { label: "ダッシュボード", href: "#", current: true },
      { label: "設定", href: "#" },
      { label: "ログアウト", onSelect: fn() },
    ],
  },
} satisfies Meta<typeof MenuList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "ログアウト" }));
    expect(args.items[2].onSelect).toHaveBeenCalled();
  },
};
