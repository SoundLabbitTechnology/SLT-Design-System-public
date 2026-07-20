"use client";

import {
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** YYYY-MM-DD */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 表示月の基準（YYYY-MM-DD または YYYY-MM）。未指定時は value / 今日 */
  displayMonth?: string;
  onDisplayMonthChange?: (yearMonth: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  "aria-label"?: string;
}

function yearMonthFrom(value?: string): string {
  if (value && /^\d{4}-\d{2}/.test(value)) return value.slice(0, 7);
  return toIsoDate(new Date()).slice(0, 7);
}

export function Calendar({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  displayMonth: displayMonthProp,
  onDisplayMonthChange,
  min,
  max,
  disabled = false,
  previousMonthLabel = "前の月",
  nextMonthLabel = "次の月",
  "aria-label": ariaLabel = "カレンダー",
  className,
  ...props
}: CalendarProps) {
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = isControlled ? valueProp : uncontrolled;

  const isMonthControlled = displayMonthProp !== undefined;
  const [uncontrolledMonth, setUncontrolledMonth] = useState(() =>
    yearMonthFrom(value || defaultValue),
  );
  const displayMonth = isMonthControlled
    ? yearMonthFrom(displayMonthProp)
    : uncontrolledMonth;

  const [year, month] = displayMonth.split("-").map(Number);
  const monthStart = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = monthStart.getDay();

  const cells = useMemo(() => {
    const out: Array<{ iso: string; day: number; outside: boolean } | null> = [];
    for (let i = 0; i < startWeekday; i += 1) out.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = `${displayMonth}-${String(day).padStart(2, "0")}`;
      out.push({ iso, day, outside: false });
    }
    return out;
  }, [daysInMonth, displayMonth, startWeekday]);

  const setMonth = (next: Date) => {
    const ym = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
    if (!isMonthControlled) setUncontrolledMonth(ym);
    onDisplayMonthChange?.(ym);
  };

  const select = (iso: string) => {
    if (disabled) return;
    if (min && iso < min) return;
    if (max && iso > max) return;
    if (!isControlled) setUncontrolled(iso);
    onValueChange?.(iso);
  };

  const title = `${year}年${month}月`;

  return (
    <div
      className={cn("slt-calendar", className)}
      role="group"
      aria-label={ariaLabel}
      {...props}
    >
      <div className="slt-calendar__header">
        <button
          type="button"
          className="slt-calendar__nav"
          aria-label={previousMonthLabel}
          disabled={disabled}
          onClick={() => setMonth(new Date(year, month - 2, 1))}
        >
          ‹
        </button>
        <div className="slt-calendar__title">{title}</div>
        <button
          type="button"
          className="slt-calendar__nav"
          aria-label={nextMonthLabel}
          disabled={disabled}
          onClick={() => setMonth(new Date(year, month, 1))}
        >
          ›
        </button>
      </div>
      <div className="slt-calendar__grid" role="grid" aria-label={title}>
        <div className="slt-calendar__weekdays" role="row">
          {WEEKDAYS.map((day) => (
            <div key={day} className="slt-calendar__weekday" role="columnheader">
              {day}
            </div>
          ))}
        </div>
        <div className="slt-calendar__days" role="rowgroup">
          {Array.from({ length: Math.ceil(cells.length / 7) }, (_, week) => (
            <div key={week} className="slt-calendar__week" role="row">
              {cells.slice(week * 7, week * 7 + 7).map((cell, index) => {
                if (!cell) {
                  return <div key={`e-${week}-${index}`} className="slt-calendar__cell" role="gridcell" />;
                }
                const outOfRange =
                  (min != null && cell.iso < min) || (max != null && cell.iso > max);
                const selected = cell.iso === value;
                return (
                  <div key={cell.iso} className="slt-calendar__cell" role="gridcell">
                    <button
                      type="button"
                      className={cn(
                        "slt-calendar__day",
                        selected && "slt-calendar__day--selected",
                      )}
                      aria-pressed={selected}
                      disabled={disabled || outOfRange}
                      onClick={() => select(cell.iso)}
                    >
                      {cell.day}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** true のときカレンダーグリッドも表示 */
  showCalendar?: boolean;
}

export function DatePicker({
  label,
  hint,
  error = false,
  errorMessage,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  showCalendar = false,
  id,
  className,
  disabled,
  min,
  max,
  "aria-describedby": ariaDescribedBy,
  ...props
}: DatePickerProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = isControlled ? valueProp : uncontrolled;

  const setValue = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn("slt-field", "slt-datepicker", className)}>
      {label ? (
        <label className="slt-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        {...props}
        id={inputId}
        type="date"
        className={cn("slt-datepicker__input", error && "slt-datepicker__input--error")}
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        onChange={(event) => setValue(event.target.value)}
      />
      {showCalendar ? (
        <Calendar
          className="slt-datepicker__calendar"
          value={value}
          onValueChange={setValue}
          min={typeof min === "string" ? min : undefined}
          max={typeof max === "string" ? max : undefined}
          disabled={disabled}
          displayMonth={value || undefined}
        />
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
