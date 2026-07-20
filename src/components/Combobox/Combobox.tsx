"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cn } from "../../lib/cn";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  options: ComboboxOption[];
  /** 選択値（controlled） */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** 一致なし時の listbox 文言（既定: 該当なし） */
  emptyLabel?: string;
  /** リスト開閉ボタンの accessible name（既定: 候補を開く） */
  toggleLabel?: string;
  name?: string;
  id?: string;
}

function normalize(text: string): string {
  return text.trim().toLocaleLowerCase("ja");
}

export function Combobox({
  label,
  hint,
  error = false,
  errorMessage,
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  placeholder = "選択または入力",
  disabled = false,
  emptyLabel = "該当なし",
  toggleLabel = "候補を開く",
  name,
  id,
  className,
  ...props
}: ComboboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listboxId = `${inputId}-listbox`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = isControlled ? valueProp : uncontrolledValue;

  const selectedOption = options.find((o) => o.value === selectedValue);
  const [inputText, setInputText] = useState(selectedOption?.label ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const next = options.find((o) => o.value === selectedValue);
    if (next) setInputText(next.label);
    else if (!selectedValue) setInputText("");
  }, [selectedValue, options]);

  const filtered = useMemo(() => {
    const q = normalize(inputText);
    if (!q || (selectedOption && normalize(selectedOption.label) === q)) {
      return options;
    }
    return options.filter((o) => normalize(o.label).includes(q));
  }, [inputText, options, selectedOption]);

  const setSelected = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
      const opt = options.find((o) => o.value === next);
      if (opt) setInputText(opt.label);
      setOpen(false);
      setActiveIndex(-1);
    },
    [isControlled, onValueChange, options],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
        if (selectedOption) setInputText(selectedOption.label);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, selectedOption]);

  const moveActive = (delta: number) => {
    if (filtered.length === 0) return;
    setActiveIndex((prev) => {
      let next = prev;
      for (let i = 0; i < filtered.length; i += 1) {
        next = (next + delta + filtered.length) % filtered.length;
        if (!filtered[next]?.disabled) return next;
      }
      return prev;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) setOpen(true);
        moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) setOpen(true);
        moveActive(-1);
        break;
      case "Home":
        if (open && filtered.length) {
          event.preventDefault();
          setActiveIndex(filtered.findIndex((o) => !o.disabled));
        }
        break;
      case "End":
        if (open && filtered.length) {
          event.preventDefault();
          for (let i = filtered.length - 1; i >= 0; i -= 1) {
            if (!filtered[i]?.disabled) {
              setActiveIndex(i);
              break;
            }
          }
        }
        break;
      case "Enter":
        if (open && activeIndex >= 0 && filtered[activeIndex] && !filtered[activeIndex].disabled) {
          event.preventDefault();
          setSelected(filtered[activeIndex].value);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
          setActiveIndex(-1);
          if (selectedOption) setInputText(selectedOption.label);
        }
        break;
      default:
        break;
    }
  };

  const activeOption = activeIndex >= 0 ? filtered[activeIndex] : undefined;

  return (
    <div
      ref={rootRef}
      className={cn("slt-field", "slt-combobox", className)}
      {...props}
    >
      {label ? (
        <label className="slt-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {name ? <input type="hidden" name={name} value={selectedValue} /> : null}
      <div className={cn("slt-combobox__control", error && "slt-combobox__control--error")}>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          className="slt-combobox__input"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          placeholder={placeholder}
          value={inputText}
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && activeOption ? `${listboxId}-opt-${activeOption.value}` : undefined
          }
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          onChange={(event) => {
            setInputText(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />
        <button
          type="button"
          className="slt-combobox__toggle"
          tabIndex={-1}
          disabled={disabled}
          aria-label={toggleLabel}
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => {
            if (disabled) return;
            setOpen((prev) => !prev);
            inputRef.current?.focus();
          }}
        />
      </div>
      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          className="slt-combobox__list"
          aria-label={label}
        >
          {filtered.length === 0 ? (
            <li className="slt-combobox__empty" role="presentation">
              {emptyLabel}
            </li>
          ) : (
            filtered.map((option, index) => {
              const selected = option.value === selectedValue;
              const active = index === activeIndex;
              return (
                <li
                  key={option.value}
                  id={`${listboxId}-opt-${option.value}`}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={option.disabled || undefined}
                  className={cn(
                    "slt-combobox__option",
                    selected && "slt-combobox__option--selected",
                    active && "slt-combobox__option--active",
                    option.disabled && "slt-combobox__option--disabled",
                  )}
                  onMouseEnter={() => {
                    if (!option.disabled) setActiveIndex(index);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    if (!option.disabled) setSelected(option.value);
                  }}
                >
                  {option.label}
                </li>
              );
            })
          )}
        </ul>
      ) : null}
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
