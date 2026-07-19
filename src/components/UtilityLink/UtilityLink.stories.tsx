import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { UtilityLink } from "./UtilityLink";

const meta = {
  title: "SLT Design System/L2 Components/P2/UtilityLink",
  component: UtilityLink,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "UtilityLink", "padded"),
  args: {
    href: "#",
    children: "ヘルプ",
  },
} satisfies Meta<typeof UtilityLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  args: { children: null, href: "#" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)" }}>
      <UtilityLink href="#">サイトマップ</UtilityLink>
      <UtilityLink href="#">プライバシーポリシー</UtilityLink>
      <UtilityLink href="#">お問い合わせ</UtilityLink>
    </div>
  ),
};
