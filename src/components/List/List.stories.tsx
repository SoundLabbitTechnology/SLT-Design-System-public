import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { List, ListItem } from "./List";

const meta = {
  title: "SLT Design System/L2 Components/P1/List",
  component: List,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "List", "padded"),
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bullet: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem>必要書類を準備する</ListItem>
      <ListItem>オンラインで申請する</ListItem>
      <ListItem>結果通知を確認する</ListItem>
    </List>
  ),
};

export const Numbered: Story = {
  args: { children: null },
  render: () => (
    <List variant="numbered">
      <ListItem marker="1.">本規約の目的</ListItem>
      <ListItem marker="2.">定義</ListItem>
      <ListItem marker="3.">禁止事項</ListItem>
    </List>
  ),
};
