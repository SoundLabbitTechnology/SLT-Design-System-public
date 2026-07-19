import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** 選択状態（フィルタ等） */
  selected?: boolean;
  /** 削除可能なとき。ボタンに accessible name を付ける */
  onRemove?: () => void;
  removeLabel?: string;
}

export function Chip({
  children,
  selected = false,
  onRemove,
  removeLabel = "削除",
  className,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "slt-chip",
        selected && "slt-chip--selected",
        onRemove && "slt-chip--removable",
        className,
      )}
      {...props}
    >
      <span className="slt-chip__label">{children}</span>
      {onRemove ? (
        <button
          type="button"
          className="slt-chip__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
