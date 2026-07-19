import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Button } from "../Button/Button";
import { Drawer } from "./Drawer";

const meta = {
  title: "SLT Design System/L2 Components/P2/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "Drawer", "padded"),
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "設定",
    children: null,
  },
  render: () => (
    <Drawer
      title="設定"
      description="表示や通知の設定を変更できます。"
      trigger={<Button variant="secondary">ドロワーを開く</Button>}
    >
      <p>ドロワー本文のコンテンツです。</p>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "ドロワーを開く" }));
    const body = within(document.body);
    expect(await body.findByRole("dialog")).toBeInTheDocument();
    expect(body.getByRole("heading", { name: "設定" })).toBeInTheDocument();
  },
};

export const Left: Story = {
  args: { title: "メニュー", children: null },
  render: () => (
    <Drawer
      side="left"
      title="メニュー"
      trigger={<Button variant="secondary">左から開く</Button>}
    >
      <p>ナビゲーション用のドロワーです。</p>
    </Drawer>
  ),
};
