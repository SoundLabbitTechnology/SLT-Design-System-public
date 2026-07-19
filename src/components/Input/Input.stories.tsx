import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Input } from "./Input";

const meta = {
  title: "SLT Design System/L2 Components/P0/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Input", "centered"),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "メールアドレス",
    placeholder: "name@example.com",
    type: "email",
  },
};

export const WithHint: Story = {
  args: {
    label: "パスワード",
    type: "password",
    hint: "8文字以上で設定してください",
  },
};

export const Error: Story = {
  args: {
    label: "メールアドレス",
    defaultValue: "invalid",
    error: true,
    errorMessage: "有効なメールアドレスを入力してください",
  },
};

export const Disabled: Story = {
  args: {
    label: "変更不可",
    defaultValue: "編集できません",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "申請番号",
    defaultValue: "APP-2026-00142",
    readOnly: true,
  },
};

export const Horizontal: Story = {
  args: {
    label: "氏名",
    placeholder: "山田 太郎",
    layout: "horizontal",
  },
};

export const KeyboardFocus: Story = {
  args: {
    label: "氏名",
    placeholder: "山田 太郎",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "氏名" });
    await userEvent.tab();
    await expect(input).toHaveFocus();
  },
};
