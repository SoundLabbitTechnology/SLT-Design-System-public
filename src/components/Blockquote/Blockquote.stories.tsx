import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { Blockquote } from "./Blockquote";

const meta = {
  title: "SLT Design System/L2 Components/P1/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "Blockquote", "padded"),
  args: {
    children:
      "利用者は、誰もが使いやすいデジタルサービスを通じて、必要な行政手続きを完了できるべきである。",
    attribution: "デジタル庁デザインシステム — デザイン原則より",
  },
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAttribution: Story = {
  args: {
    attribution: undefined,
    children: "アクセシビリティは後付けではなく、設計の前提である。",
  },
};
