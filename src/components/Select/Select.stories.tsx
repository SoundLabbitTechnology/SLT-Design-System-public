import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Select } from "./Select";

const meta = {
  title: "SLT Design System/L2 Components/P0/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Select", "centered"),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const prefectureOptions = (
  <>
    <option value="">選択してください</option>
    <option value="hokkaido">北海道</option>
    <option value="tokyo">東京都</option>
    <option value="osaka">大阪府</option>
    <option value="fukuoka">福岡県</option>
    <option value="okinawa">沖縄県</option>
    <option value="other">その他</option>
  </>
);

export const Default: Story = {
  args: {
    label: "都道府県",
    children: prefectureOptions,
  },
};

export const WithHint: Story = {
  args: {
    label: "都道府県",
    hint: "選択肢が6個以上のときにセレクトを使います",
    children: prefectureOptions,
  },
};

export const Error: Story = {
  args: {
    label: "都道府県",
    error: true,
    errorMessage: "都道府県を選択してください",
    children: prefectureOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: "都道府県",
    disabled: true,
    defaultValue: "tokyo",
    children: prefectureOptions,
  },
};

export const KeyboardFocus: Story = {
  args: {
    label: "都道府県",
    children: prefectureOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "都道府県" });
    await userEvent.tab();
    await expect(select).toHaveFocus();
  },
};
