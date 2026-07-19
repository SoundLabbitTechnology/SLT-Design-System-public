import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { PageNavigation } from "./PageNavigation";

const meta = {
  title: "SLT Design System/L2 Components/P1/PageNavigation",
  component: PageNavigation,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "PageNavigation", "padded"),
  args: {
    page: 1,
    totalPages: 10,
  },
} satisfies Meta<typeof PageNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { page: 1, totalPages: 10 },
  render: function PageNavStory(args) {
    const [page, setPage] = useState(args.page);
    return <PageNavigation {...args} page={page} onPageChange={setPage} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "次へ" }));
    expect(canvas.getByRole("button", { name: "2ページ" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

export const Middle: Story = {
  args: { page: 5, totalPages: 12 },
  render: function MiddleStory(args) {
    const [page, setPage] = useState(args.page);
    return <PageNavigation {...args} page={page} onPageChange={setPage} />;
  },
};
