import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../Button/Button";

export type DrawerSide = "left" | "right";

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  side?: DrawerSide;
  showClose?: boolean;
}

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  side = "right",
  showClose = true,
}: DrawerProps) {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="slt-drawer__overlay" />
        <DialogPrimitive.Content
          className={cn("slt-drawer__content", `slt-drawer__content--${side}`)}
        >
          <div className="slt-drawer__header">
            <DialogPrimitive.Title className="slt-drawer__title">{title}</DialogPrimitive.Title>
            {showClose ? (
              <DialogPrimitive.Close asChild>
                <Button variant="ghost" className="slt-drawer__close" aria-label="閉じる">
                  ×
                </Button>
              </DialogPrimitive.Close>
            ) : null}
          </div>
          {description ? (
            <DialogPrimitive.Description className="slt-drawer__description">
              {description}
            </DialogPrimitive.Description>
          ) : null}
          <div className="slt-drawer__body">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const DrawerClose = DialogPrimitive.Close;
export const DrawerTrigger = DialogPrimitive.Trigger;
