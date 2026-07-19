import type { ProgressHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ProgressIndicatorProps
  extends Omit<ProgressHTMLAttributes<HTMLProgressElement>, "value"> {
  /** 0〜max。省略時は indeterminate */
  value?: number;
  max?: number;
  /** 視覚ラベル（progress の accessible name にも使う） */
  label?: string;
  showValueLabel?: boolean;
}

export function ProgressIndicator({
  value,
  max = 100,
  label,
  showValueLabel = true,
  className,
  id,
  ...props
}: ProgressIndicatorProps) {
  const determinate = value != null && Number.isFinite(value);
  const clamped = determinate ? Math.min(Math.max(0, value), max) : undefined;
  const percent =
    determinate && max > 0 ? Math.round(((clamped as number) / max) * 100) : undefined;

  return (
    <div className={cn("slt-progress", className)}>
      {(label || (showValueLabel && percent != null)) && (
        <div className="slt-progress__meta">
          {label ? (
            <span className="slt-progress__label" id={id ? `${id}-label` : undefined}>
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValueLabel && percent != null ? (
            <span className="slt-progress__value">{percent}%</span>
          ) : null}
        </div>
      )}
      <progress
        id={id}
        className="slt-progress__bar"
        value={clamped}
        max={max}
        aria-labelledby={label && id ? `${id}-label` : undefined}
        aria-label={!label ? "進捗" : undefined}
        {...props}
      />
    </div>
  );
}
