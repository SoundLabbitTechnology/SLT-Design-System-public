"use client";

import { useId, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface MenuListBoxOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface MenuListBoxProps extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
  options: MenuListBoxOption[];
  /** 単一選択（既定） */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 複数選択 */
  multiple?: boolean;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  "aria-label"?: string;
}

import { useState } from "react";

export function MenuListBox({
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  multiple = false,
  values: valuesProp,
  defaultValues = [],
  onValuesChange,
  className,
  "aria-label": ariaLabel = "選択肢",
  ...props
}: MenuListBoxProps) {
  const listId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [uncontrolledMulti, setUncontrolledMulti] = useState(defaultValues);

  const singleValue = valueProp !== undefined ? valueProp : uncontrolled;
  const multiValues = valuesProp !== undefined ? valuesProp : uncontrolledMulti;

  const selectSingle = (next: string) => {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const toggleMulti = (next: string) => {
    const set = new Set(multiValues);
    if (set.has(next)) set.delete(next);
    else set.add(next);
    const arr = [...set];
    if (valuesProp === undefined) setUncontrolledMulti(arr);
    onValuesChange?.(arr);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const enabled = options.filter((o) => !o.disabled);
    if (!enabled.length) return;
    const current = multiple
      ? enabled.findIndex((o) => multiValues.includes(o.value))
      : enabled.findIndex((o) => o.value === singleValue);
    const focusIndex = current >= 0 ? current : 0;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const next = enabled[(focusIndex + delta + enabled.length) % enabled.length];
      if (multiple) toggleMulti(next.value);
      else selectSingle(next.value);
      document.getElementById(`${listId}-opt-${next.value}`)?.focus();
    }
  };

  return (
    <ul
      id={listId}
      role="listbox"
      aria-label={ariaLabel}
      aria-multiselectable={multiple || undefined}
      className={cn("slt-menu-listbox", className)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...props}
    >
      {options.map((option) => {
        const selected = multiple
          ? multiValues.includes(option.value)
          : option.value === singleValue;
        return (
          <li key={option.value} role="presentation">
            <button
              type="button"
              id={`${listId}-opt-${option.value}`}
              role="option"
              className={cn(
                "slt-menu-listbox__option",
                selected && "slt-menu-listbox__option--selected",
              )}
              aria-selected={selected}
              disabled={option.disabled}
              tabIndex={selected ? 0 : -1}
              onClick={() => {
                if (option.disabled) return;
                if (multiple) toggleMulti(option.value);
                else selectSingle(option.value);
              }}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
