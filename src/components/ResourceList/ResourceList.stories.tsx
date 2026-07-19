import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { ResourceList } from "./ResourceList";

const meta = {
  title: "SLT Design System/L2 Components/P2/ResourceList",
  component: ResourceList,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "ResourceList", "padded"),
  args: {
    items: [
      {
        title: "デザイン原則",
        description: "L0 の恒常原則と戦略原則",
        href: "#",
        meta: "ドキュメント",
      },
      {
        title: "Storybook",
        description: "コンポーネントの状態と交互作用",
        href: "#",
        meta: "ツール",
      },
    ],
  },
} satisfies Meta<typeof ResourceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
