import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";

const meta = {
  title: "SLT Design System/L2 Components/P1/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "Tabs", "padded"),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="overview">
      <TabList aria-label="製品情報">
        <Tab value="overview">概要</Tab>
        <Tab value="specs">仕様</Tab>
        <Tab value="support">サポート</Tab>
      </TabList>
      <TabPanel value="overview">製品の概要テキストです。</TabPanel>
      <TabPanel value="specs">仕様の詳細です。</TabPanel>
      <TabPanel value="support">サポート情報です。</TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("tab", { name: "概要", selected: true })).toBeInTheDocument();
    expect(canvas.getByRole("tabpanel")).toHaveTextContent("製品の概要");
    await userEvent.click(canvas.getByRole("tab", { name: "仕様" }));
    expect(canvas.getByRole("tab", { name: "仕様", selected: true })).toBeInTheDocument();
    expect(canvas.getByRole("tabpanel")).toHaveTextContent("仕様の詳細");
  },
};

export const Vertical: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="a" orientation="vertical">
      <TabList aria-label="設定">
        <Tab value="a">アカウント</Tab>
        <Tab value="b">通知</Tab>
        <Tab value="c">セキュリティ</Tab>
      </TabList>
      <TabPanel value="a">アカウント設定</TabPanel>
      <TabPanel value="b">通知設定</TabPanel>
      <TabPanel value="c">セキュリティ設定</TabPanel>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="one">
      <TabList aria-label="段階">
        <Tab value="one">利用可能</Tab>
        <Tab value="two" disabled>
          準備中
        </Tab>
        <Tab value="three">完了</Tab>
      </TabList>
      <TabPanel value="one">最初のパネル</TabPanel>
      <TabPanel value="three">完了パネル</TabPanel>
    </Tabs>
  ),
};
