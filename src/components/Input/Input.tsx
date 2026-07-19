import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  /** DADS ラベル横並び作例。既定は縦並び */
  layout?: "vertical" | "horizontal";
}

export function Input({
  label,
  hint,
  error = false,
  errorMessage,
  layout = "vertical",
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? `slt-input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const errorId = errorMessage && inputId ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("slt-field", layout === "horizontal" && "slt-field--horizontal")}>
      {label ? (
        <label className="slt-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn("slt-input", error && "slt-input--error", className)}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        {...props}
      />
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
