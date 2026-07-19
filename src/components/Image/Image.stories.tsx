import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { Image } from "./Image";

const meta = {
  title: "SLT Design System/L2 Components/P2/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "Image", "padded"),
  args: {
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='100%25' height='100%25' fill='silver'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='black' font-family='sans-serif'%3ESample%3C/text%3E%3C/svg%3E",
    alt: "サンプル画像",
    caption: "キャプション付きの画像例",
    width: 640,
    height: 360,
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Decorative: Story = {
  args: {
    decorative: true,
    caption: undefined,
    alt: undefined,
  },
};
