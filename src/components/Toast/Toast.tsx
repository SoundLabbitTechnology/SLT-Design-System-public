"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export type ToastVariant = "default" | "success" | "warning" | "danger" | "info";

export interface ToastItemProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 閉じるボタンの accessible name（既定: 閉じる） */
  closeLabel?: string;
}

interface ToastRecord extends ToastItemProps {
  id: string;
}

interface ToastContextValue {
  toast: (item: Omit<ToastRecord, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

export interface ToastProviderProps {
  children: ReactNode;
  /** デフォルトの自動 dismiss 時間（ms）。個別 toast で上書き可 */
  duration?: number;
}

export function ToastProvider({ children, duration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((item: Omit<ToastRecord, "id">) => {
    const id = String(++toastId);
    setToasts((prev) => [...prev, { ...item, id }]);
    return id;
  }, []);

  return (
    <ToastPrimitive.Provider duration={duration} swipeDirection="right">
      <ToastContext.Provider value={{ toast, dismiss }}>
        {children}
        {toasts.map((item) => (
          <Toast
            key={item.id}
            {...item}
            onOpenChange={(open) => {
              item.onOpenChange?.(open);
              if (!open) dismiss(item.id);
            }}
          />
        ))}
        <ToastPrimitive.Viewport className="slt-toast-viewport" />
      </ToastContext.Provider>
    </ToastPrimitive.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

export function Toast({
  title,
  description,
  variant = "default",
  duration,
  open,
  defaultOpen = true,
  onOpenChange,
  closeLabel = "閉じる",
}: ToastItemProps) {
  return (
    <ToastPrimitive.Root
      className={cn("slt-toast", `slt-toast--${variant}`)}
      duration={duration}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <div className="slt-toast__body">
        <ToastPrimitive.Title className="slt-toast__title">{title}</ToastPrimitive.Title>
        {description ? (
          <ToastPrimitive.Description className="slt-toast__description">
            {description}
          </ToastPrimitive.Description>
        ) : null}
      </div>
      <ToastPrimitive.Close className="slt-toast__close" aria-label={closeLabel}>
        ×
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}
