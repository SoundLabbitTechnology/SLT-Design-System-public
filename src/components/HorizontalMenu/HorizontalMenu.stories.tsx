import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { HorizontalMenu } from "./HorizontalMenu";

const meta = {
  title: "SLT Design System/L2 Components/P2/HorizontalMenu",
  component: HorizontalMenu,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "HorizontalMenu", "padded"),
  args: {
    items: [
      { label: "ホーム", href: "#", current: true },
      { label: "製品", href: "#" },
      { label: "ドキュメント", href: "#" },
      { label: "サポート", href: "#" },
    ],
  },
} satisfies Meta<typeof HorizontalMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
