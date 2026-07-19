import { useId, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  /** 選択ファイル名の表示（制御しない場合は内部表示） */
  onFilesChange?: (files: FileList | null) => void;
  buttonLabel?: ReactNode;
}

export function FileUpload({
  label,
  hint,
  error = false,
  errorMessage,
  onFilesChange,
  buttonLabel = "ファイルを選択",
  id,
  className,
  disabled,
  "aria-describedby": ariaDescribedBy,
  ...props
}: FileUploadProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onFilesChange?.(files);
    if (files && files.length > 0) {
      setFileName(
        files.length === 1 ? files[0].name : `${files.length} 件のファイル`,
      );
    } else {
      setFileName(null);
    }
  };

  return (
    <div className={cn("slt-field", "slt-file-upload", className)}>
      <span className="slt-field__label" id={`${inputId}-label`}>
        {label}
      </span>
      <div className={cn("slt-file-upload__row", error && "slt-file-upload__row--error")}>
        <input
          {...props}
          id={inputId}
          type="file"
          className="slt-file-upload__input"
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          aria-labelledby={`${inputId}-label`}
          onChange={handleChange}
        />
        <label htmlFor={inputId} className="slt-file-upload__button">
          {buttonLabel}
        </label>
        <span className="slt-file-upload__name">
          {fileName ?? "選択されていません"}
        </span>
      </div>
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
