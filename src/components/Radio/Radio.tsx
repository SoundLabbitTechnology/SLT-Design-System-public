import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: boolean;
}

export function Radio({
  label,
  error = false,
  id,
  className,
  ...props
}: RadioProps) {
  const inputId = id ?? (label ? `slt-radio-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  return (
    <span className="slt-radio-row">
      <input
        type="radio"
        id={inputId}
        className={cn("slt-radio", error && "slt-radio--error", className)}
        aria-invalid={error || undefined}
        {...props}
      />
      {label ? (
        <label className="slt-radio-row__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
    </span>
  );
}

export interface RadioGroupProps {
  legend: string;
  name: string;
  children: ReactNode;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

export function RadioGroup({
  legend,
  name,
  children,
  hint,
  error = false,
  errorMessage,
  className,
}: RadioGroupProps) {
  const hintId = hint ? `slt-radio-group-${name}-hint` : undefined;
  const errorId = errorMessage ? `slt-radio-group-${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      className={cn("slt-radio-group", className)}
      aria-describedby={describedBy}
      aria-invalid={error || undefined}
    >
      <legend className="slt-radio-group__legend">{legend}</legend>
      <div className="slt-field" role="presentation">
        {children}
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
    </fieldset>
  );
}
