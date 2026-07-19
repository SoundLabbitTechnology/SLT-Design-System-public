import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "SLT Design System/L2 Components/P0/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Radio", "centered"),
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup legend="連絡方法" name="contact">
      <Radio name="contact" label="メール" value="email" defaultChecked />
      <Radio name="contact" label="電話" value="phone" />
      <Radio name="contact" label="あてはまるものはない" value="none" />
    </RadioGroup>
  ),
};

export const WithHint: Story = {
  render: () => (
    <RadioGroup legend="プラン" name="plan" hint="後から変更できます">
      <Radio name="plan" label="スタンダード" value="standard" defaultChecked />
      <Radio name="plan" label="プロ" value="pro" />
    </RadioGroup>
  ),
};

export const Error: Story = {
  render: () => (
    <RadioGroup
      legend="配送方法"
      name="shipping"
      error
      errorMessage="配送方法を選択してください"
    >
      <Radio name="shipping" label="通常配送" value="standard" error />
      <Radio name="shipping" label="速達" value="express" error />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup legend="権限" name="role">
      <Radio name="role" label="閲覧のみ" value="viewer" defaultChecked disabled />
      <Radio name="role" label="編集" value="editor" disabled />
    </RadioGroup>
  ),
};

export const KeyboardFocus: Story = {
  render: () => (
    <RadioGroup legend="キーボード操作" name="kbd">
      <Radio name="kbd" label="オプション A" value="a" />
      <Radio name="kbd" label="オプション B" value="b" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("radio", { name: "オプション A" });
    await userEvent.tab();
    await expect(first).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(first).toBeChecked();
  },
};
