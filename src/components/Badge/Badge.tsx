import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn("slt-badge", `slt-badge--${variant}`, className)} {...props}>
      {children}
    </span>
  );
}
