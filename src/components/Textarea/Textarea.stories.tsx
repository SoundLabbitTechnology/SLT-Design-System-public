import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Textarea } from "./Textarea";

const meta = {
  title: "SLT Design System/L2 Components/P0/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Textarea", "centered"),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "お問い合わせ内容",
    placeholder: "ご用件をご記入ください",
    rows: 4,
  },
};

export const WithHint: Story = {
  args: {
    label: "フィードバック",
    hint: "具体的な改善点があると助かります",
    rows: 5,
  },
};

export const Error: Story = {
  args: {
    label: "コメント",
    error: true,
    errorMessage: "1文字以上入力してください",
    rows: 3,
  },
};

export const Disabled: Story = {
  args: {
    label: "メモ",
    defaultValue: "編集不可のテキスト",
    disabled: true,
    rows: 4,
  },
};

export const KeyboardFocus: Story = {
  args: {
    label: "コメント",
    placeholder: "入力してください",
    rows: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "コメント" });
    await userEvent.tab();
    await expect(textarea).toHaveFocus();
  },
};
