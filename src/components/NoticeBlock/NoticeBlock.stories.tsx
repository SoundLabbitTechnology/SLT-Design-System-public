import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { NoticeBlock } from "./NoticeBlock";

const meta = {
  title: "SLT Design System/L2 Components/P0/NoticeBlock",
  component: NoticeBlock,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "NoticeBlock", "padded"),
} satisfies Meta<typeof NoticeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "本人確認書類の例",
    children: "運転免許証、マイナンバーカード、在留カードのいずれか1点をご用意ください。",
  },
};

export const Variants: Story = {
  args: {
    children: "placeholder",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <NoticeBlock variant="info" title="補足">
        入力例や必要書類など、手続きに役立つ情報を示します。
      </NoticeBlock>
      <NoticeBlock variant="success" title="完了">
        申請を受け付けました。確認メールをお送りしています。
      </NoticeBlock>
      <NoticeBlock variant="warning" title="注意">
        期限が近いため、早めの提出をおすすめします。
      </NoticeBlock>
      <NoticeBlock variant="danger" title="重要">
        未入力の必須項目があります。送信前に確認してください。
      </NoticeBlock>
    </div>
  ),
};
