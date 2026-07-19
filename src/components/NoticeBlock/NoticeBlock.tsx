import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type NoticeBlockVariant = "info" | "success" | "warning" | "danger";

export interface NoticeBlockProps extends HTMLAttributes<HTMLElement> {
  variant?: NoticeBlockVariant;
  title?: string;
  children: ReactNode;
}

export function NoticeBlock({
  variant = "info",
  title,
  className,
  children,
  ...props
}: NoticeBlockProps) {
  return (
    <aside
      className={cn("slt-notice", `slt-notice--${variant}`, className)}
      {...props}
    >
      {title ? <p className="slt-notice__title">{title}</p> : null}
      <div className="slt-notice__body">{children}</div>
    </aside>
  );
}
