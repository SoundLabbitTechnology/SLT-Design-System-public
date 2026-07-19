import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { FileUpload } from "./FileUpload";

const meta = {
  title: "SLT Design System/L2 Components/P2/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "FileUpload", "padded"),
  args: {
    label: "添付ファイル",
    hint: "PDF または画像（10MB まで）",
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: "ファイル形式が正しくありません。",
  },
};
