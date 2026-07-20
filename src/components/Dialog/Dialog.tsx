import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Button } from "../Button/Button";

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 閉じるボタンの accessible name（既定: 閉じる） */
  closeLabel?: string;
  onConfirm?: () => void;
  destructive?: boolean;
  showClose?: boolean;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
}

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel = "確認",
  cancelLabel = "キャンセル",
  closeLabel = "閉じる",
  onConfirm,
  destructive = false,
  showClose = true,
  confirmLoading = false,
  confirmDisabled = false,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="slt-dialog__overlay" />
        <DialogPrimitive.Content className="slt-dialog__content">
          {showClose ? (
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                className="slt-dialog__close"
                aria-label={closeLabel}
              >
                ×
              </Button>
            </DialogPrimitive.Close>
          ) : null}
          <DialogPrimitive.Title className="slt-dialog__title">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="slt-dialog__description">
              {description}
            </DialogPrimitive.Description>
          ) : null}
          {children}
          {(onConfirm || cancelLabel) && (
            <div className="slt-dialog__actions">
              <DialogPrimitive.Close asChild>
                <Button variant="secondary">{cancelLabel}</Button>
              </DialogPrimitive.Close>
              {onConfirm ? (
                <Button
                  variant={destructive ? "danger" : "primary"}
                  onClick={onConfirm}
                  loading={confirmLoading}
                  disabled={confirmDisabled}
                >
                  {confirmLabel}
                </Button>
              ) : null}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const DialogClose = DialogPrimitive.Close;
export const DialogTrigger = DialogPrimitive.Trigger;
