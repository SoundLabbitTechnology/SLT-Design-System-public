import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Breadcrumb } from "./Breadcrumb";

const sampleItems = [
  { label: "ホーム", href: "/" },
  { label: "サービス", href: "/services" },
  { label: "デザインシステム" },
];

const meta = {
  title: "SLT Design System/L2 Components/P1/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "Breadcrumb", "padded"),
  args: {
    items: sampleItems,
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "パンくずリスト" });
    expect(nav).toBeInTheDocument();
    expect(canvas.getByText("デザインシステム")).toHaveAttribute("aria-current", "page");
    const home = canvas.getByRole("link", { name: "ホーム" });
    await userEvent.tab();
    expect(home).toHaveFocus();
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: "ホーム", href: "/" },
      { label: "組織", href: "/org" },
      { label: "プロダクト", href: "/org/products" },
      { label: "ドキュメント", href: "/org/products/docs" },
      { label: "コンポーネント詳細" },
    ],
  },
};

export const ScrollOverflow: Story = {
  args: {
    overflow: "scroll",
    items: [
      { label: "ホーム", href: "/" },
      { label: "とても長い階層名のセクション", href: "/a" },
      { label: "さらに長いカテゴリ名", href: "/a/b" },
      { label: "現在のページタイトルが長い場合" },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "280px", border: "1px dashed var(--color-border-default)" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomSeparator: Story = {
  args: {
    separator: "/",
  },
};
