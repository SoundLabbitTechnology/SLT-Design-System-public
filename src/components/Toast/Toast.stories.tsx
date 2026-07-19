import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Button } from "../Button/Button";
import { Toast, ToastProvider, useToast } from "./Toast";

const meta = {
  title: "SLT Design System/L2 Components/P1/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "Toast", "padded"),
  args: { title: "通知" },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo({
  variant,
  title,
  description,
}: {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  title: string;
  description?: string;
}) {
  const { toast } = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() => toast({ title, description, variant })}
    >
      Toast を表示
    </Button>
  );
}

export const Default: Story = {
  render: () => (
    <ToastDemo title="通知" description="変更を保存しました。" />
  ),
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="保存完了"
      description="プロジェクト設定を更新しました。"
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="要確認"
      description="未保存の変更があります。"
    />
  ),
};

export const Danger: Story = {
  render: () => (
    <ToastDemo
      variant="danger"
      title="エラー"
      description="接続に失敗しました。再度お試しください。"
    />
  ),
};

export const Info: Story = {
  render: () => (
    <ToastDemo
      variant="info"
      title="AI 生成"
      description="この回答は AI により生成されています。"
    />
  ),
};

export const Stack: Story = {
  render: () => {
    function StackDemo() {
      const { toast } = useToast();
      return (
        <Button
          variant="primary"
          onClick={() => {
            toast({ title: "1 件目", variant: "info" });
            toast({ title: "2 件目", variant: "success" });
            toast({ title: "3 件目", variant: "warning" });
          }}
        >
          3 件まとめて表示
        </Button>
      );
    }
    return <StackDemo />;
  },
};

export const KeyboardDismiss: Story = {
  render: () => (
    <ToastDemo title="キーボードで閉じる" description="Close ボタンにフォーカスして Enter。" />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Toast を表示" }));
    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByRole("status")).toBeInTheDocument();
    });
    const closeBtn = body.getByRole("button", { name: "閉じる" });
    closeBtn.focus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(body.queryByRole("status")).toBeNull();
    });
  },
};
