import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
  label?: string;
  hint?: string;
}

export function Switch({
  label,
  hint,
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SwitchProps) {
  const inputId = id ?? (label ? `slt-switch-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const describedBy = [ariaDescribedBy, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="slt-field">
      <span className="slt-switch-row">
        <input
          type="checkbox"
          role="switch"
          id={inputId}
          className={cn("slt-switch", className)}
          aria-describedby={describedBy}
          {...props}
        />
        {label ? (
          <label className="slt-switch-row__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
      </span>
      {hint ? (
        <span id={hintId} className="slt-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
