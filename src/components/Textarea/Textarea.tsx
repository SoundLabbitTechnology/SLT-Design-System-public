import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
}

export function Textarea({
  label,
  hint,
  error = false,
  errorMessage,
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaProps) {
  const inputId =
    id ?? (label ? `slt-textarea-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const errorId = errorMessage && inputId ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="slt-field">
      {label ? (
        <label className="slt-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={cn("slt-textarea", error && "slt-textarea--error", className)}
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
