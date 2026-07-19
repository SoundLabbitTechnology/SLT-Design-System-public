import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { TableOfContents } from "./TableOfContents";

const meta = {
  title: "SLT Design System/L2 Components/P2/TableOfContents",
  component: TableOfContents,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "TableOfContents", "padded"),
  args: {
    items: [
      { id: "intro", label: "はじめに", level: 2 },
      { id: "tokens", label: "トークン", level: 2 },
      { id: "colors", label: "色", level: 3 },
      { id: "components", label: "コンポーネント", level: 2 },
    ],
  },
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
