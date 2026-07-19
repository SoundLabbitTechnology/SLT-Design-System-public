import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { Badge } from "./Badge";

const meta = {
  title: "SLT Design System/L2 Components/P0/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Badge", "centered"),
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger", "info"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "新着" },
};

export const Success: Story = {
  args: { children: "完了", variant: "success" },
};

export const Warning: Story = {
  args: { children: "要確認", variant: "warning" },
};

export const Danger: Story = {
  args: { children: "エラー", variant: "danger" },
};

export const Info: Story = {
  args: { children: "AI 生成", variant: "info" },
};

export const Disabled: Story = {
  args: { children: "無効", "aria-disabled": true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};
