import {
  useId,
  type FormEvent,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export interface SearchBoxProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  label: string;
  /** ラベルを視覚的に隠す（sr-only） */
  hideLabel?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  submitLabel?: ReactNode;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "onChange" | "placeholder" | "name"
  >;
}

export function SearchBox({
  label,
  hideLabel = false,
  placeholder = "キーワードを入力",
  defaultValue,
  value,
  onValueChange,
  onSearch,
  submitLabel = "検索",
  className,
  inputProps,
  ...props
}: SearchBoxProps) {
  const autoId = useId();
  const inputId = inputProps?.id ?? autoId;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const q = String(data.get("q") ?? "");
    onSearch?.(q);
  };

  return (
    <form
      role="search"
      className={cn("slt-search", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <label
        className={cn("slt-search__label", hideLabel && "slt-search__label--sr")}
        htmlFor={inputId}
      >
        {label}
      </label>
      <div className="slt-search__row">
        <input
          {...inputProps}
          id={inputId}
          name="q"
          type="search"
          className={cn("slt-search__input", inputProps?.className)}
          placeholder={placeholder}
          defaultValue={value === undefined ? defaultValue : undefined}
          value={value}
          onChange={(event) => onValueChange?.(event.target.value)}
          enterKeyHint="search"
        />
        <button type="submit" className="slt-search__submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
