import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
}

export function Checkbox({
  label,
  hint,
  error = false,
  errorMessage,
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CheckboxProps) {
  const inputId = id ?? (label ? `slt-checkbox-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const errorId = errorMessage && inputId ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="slt-field">
      <span className="slt-checkbox-row">
        <input
          type="checkbox"
          id={inputId}
          className={cn("slt-checkbox", error && "slt-checkbox--error", className)}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {label ? (
          <label className="slt-checkbox-row__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
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
