import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  label,
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "slt-divider",
        !label && "slt-divider--plain",
        isVertical && "slt-divider--vertical",
        className,
      )}
      {...props}
    >
      {label ? <span className="slt-divider__label">{label}</span> : null}
    </div>
  );
}
