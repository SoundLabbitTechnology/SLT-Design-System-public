import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

const meta = {
  title: "SLT Design System/L2 Components/P0/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: storyParameters("P0", "Dialog", "centered"),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  trigger: <Button variant="primary">ダイアログを開く</Button>,
  title: "変更を保存しますか？",
  description: "未保存の変更があります。保存してから移動することをおすすめします。",
  confirmLabel: "保存する",
  cancelLabel: "キャンセル",
  onConfirm: () => undefined,
} as const;

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Destructive: Story = {
  args: {
    trigger: <Button variant="danger">削除</Button>,
    title: "本当に削除しますか？",
    description: "この操作は取り消せません。関連データも削除されます。",
    confirmLabel: "削除する",
    cancelLabel: "キャンセル",
    destructive: true,
    onConfirm: () => undefined,
  },
};

export const WithoutDescription: Story = {
  args: {
    trigger: <Button variant="secondary">通知</Button>,
    title: "送信が完了しました",
    confirmLabel: "OK",
    onConfirm: () => undefined,
  },
};

export const ConfirmLoading: Story = {
  args: {
    trigger: <Button variant="primary">保存</Button>,
    title: "変更を保存しますか？",
    description: "保存処理中はダイアログを閉じないでください。",
    confirmLabel: "保存中…",
    cancelLabel: "キャンセル",
    confirmLoading: true,
    onConfirm: () => undefined,
  },
};

export const ConfirmDisabled: Story = {
  args: {
    trigger: <Button variant="primary">送信</Button>,
    title: "送信の確認",
    description: "必須項目を入力すると送信できます。",
    confirmLabel: "送信する",
    confirmDisabled: true,
    onConfirm: () => undefined,
  },
};

export const KeyboardEscape: Story = {
  args: { ...defaultArgs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "ダイアログを開く" }));
    await waitFor(() => {
      expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();
    });
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(document.body.querySelector('[role="dialog"]')).toBeNull();
    });
  },
};

export const KeyboardFocusTrap: Story = {
  args: { ...defaultArgs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "ダイアログを開く" }));
    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByRole("dialog")).toBeInTheDocument();
    });
    await userEvent.tab();
    await expect(body.getByRole("button", { name: "キャンセル" })).toHaveFocus();
    await userEvent.tab();
    await expect(body.getByRole("button", { name: "保存する" })).toHaveFocus();
  },
};
