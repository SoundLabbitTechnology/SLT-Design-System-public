import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { Divider } from "./Divider";

const meta = {
  title: "SLT Design System/L2 Components/P0/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Divider", "padded"),
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "または",
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "stretch", height: "80px", gap: "8px" }}>
      <span>左</span>
      <Divider orientation="vertical" />
      <span>右</span>
    </div>
  ),
};
