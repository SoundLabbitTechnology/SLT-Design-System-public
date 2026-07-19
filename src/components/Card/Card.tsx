import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type CardVariant = "default" | "glass";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn("slt-card", variant === "glass" && "slt-card--glass", className)}
      {...props}
    >
      {children}
    </div>
  );
}
