import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const meta = {
  title: "SLT Design System/L2 Components/P1/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "Accordion", "padded"),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Accordion type="multiple" defaultValue={["q1"]}>
      <AccordionItem value="q1">
        <AccordionTrigger>申請には何が必要ですか？</AccordionTrigger>
        <AccordionContent>
          本人確認書類（運転免許証など）と、申請内容に応じた添付資料が必要です。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="q2">
        <AccordionTrigger>審査にはどのくらい時間がかかりますか？</AccordionTrigger>
        <AccordionContent>通常は受付から5〜10営業日程度です。</AccordionContent>
      </AccordionItem>
      <AccordionItem value="q3">
        <AccordionTrigger>オンラインで完結できますか？</AccordionTrigger>
        <AccordionContent>多くの手続きはオンラインで完結できます。</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("button", { name: /申請には何が必要/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await userEvent.click(canvas.getByRole("button", { name: /審査にはどのくらい/ }));
    expect(canvas.getByRole("button", { name: /審査にはどのくらい/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  },
};

export const Single: Story = {
  args: { children: null },
  render: () => (
    <Accordion type="single" defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger>2026-07-01 更新</AccordionTrigger>
        <AccordionContent>トークンと Docs 契約を更新しました。</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>2026-06-15 更新</AccordionTrigger>
        <AccordionContent>P0 コンポーネントを追加しました。</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
