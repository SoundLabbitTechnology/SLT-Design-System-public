import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { SearchBox } from "./SearchBox";

const meta = {
  title: "SLT Design System/L2 Components/P1/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "SearchBox", "padded"),
  args: {
    label: "サイト内検索",
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox");
    await userEvent.type(input, "トークン");
    await userEvent.click(canvas.getByRole("button", { name: "検索" }));
    expect(args.onSearch).toHaveBeenCalledWith("トークン");
  },
};

export const HideLabel: Story = {
  args: {
    hideLabel: true,
    label: "検索",
  },
};
