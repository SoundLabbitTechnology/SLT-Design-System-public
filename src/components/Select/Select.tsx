import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  layout?: "vertical" | "horizontal";
}

export function Select({
  label,
  hint,
  error = false,
  errorMessage,
  layout = "vertical",
  id,
  className,
  children,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectProps) {
  const selectId = id ?? (label ? `slt-select-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const hintId = hint && selectId ? `${selectId}-hint` : undefined;
  const errorId = errorMessage && selectId ? `${selectId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("slt-field", layout === "horizontal" && "slt-field--horizontal")}>
      {label ? (
        <label className="slt-field__label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <span className="slt-select-wrap">
        <select
          id={selectId}
          className={cn("slt-select", error && "slt-select--error", className)}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          {...props}
        >
          {children}
        </select>
      </span>
      {errorMessage ? (
        <span id={errorId} className="slt-field__error" role="alert">
          {errorMessage}
        </span>
      ) : hint ? (
        <span id={hintId} className="slt-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
