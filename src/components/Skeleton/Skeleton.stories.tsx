import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { Card } from "../Card/Card";
import { Skeleton, SkeletonCard, SkeletonList } from "./Skeleton";

const meta = {
  title: "SLT Design System/L2 Components/P2/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "Skeleton", "padded"),
  argTypes: {
    variant: { control: "select", options: ["rect", "text", "circle"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rect: Story = {
  args: { variant: "rect" },
};

export const Text: Story = {
  args: { variant: "text", width: "60%" },
};

export const Circle: Story = {
  args: { variant: "circle" },
};

export const List: Story = {
  render: () => <SkeletonList count={4} />,
};

export const CardLoading: Story = {
  render: () => (
    <div style={{ width: "min(100%, 360px)" }}>
      <SkeletonCard />
    </div>
  ),
};

export const WithCard: Story = {
  render: () => (
    <Card style={{ width: "min(100%, 400px)" }} aria-busy="true">
      <Skeleton variant="text" width="50%" height="var(--font-size-xl, 24px)" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="75%" />
    </Card>
  ),
};
