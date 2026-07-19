import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { Heading } from "./Heading";

const meta = {
  title: "SLT Design System/L2 Components/P0/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Heading", "padded"),
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 2,
    children: "セクション見出し",
  },
};

export const Levels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Heading as={1}>見出しレベル 1</Heading>
      <Heading as={2}>見出しレベル 2</Heading>
      <Heading as={3}>見出しレベル 3</Heading>
      <Heading as={4}>見出しレベル 4</Heading>
      <Heading as={5}>見出しレベル 5</Heading>
      <Heading as={6}>見出しレベル 6</Heading>
    </div>
  ),
};

export const VisualOverride: Story = {
  args: {
    as: 2,
    level: 3,
    children: "h2 だが見た目は level 3",
  },
};
