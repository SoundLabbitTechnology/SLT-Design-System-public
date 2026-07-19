import { useState, type DetailsHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DisclosureProps
  extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "open"> {
  /** トリガー文言（summary） */
  summary: ReactNode;
  /** 制御: 開閉状態 */
  open?: boolean;
  /** 非制御の初期開閉 */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/**
 * メイン情報に対する追加・補足を折りたたむ（DADS ディスクロージャー）。
 * セクション全体の連続折りたたみは Accordion を使う。
 */
export function Disclosure({
  summary,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  onToggle,
  ...props
}: DisclosureProps) {
  const controlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlled ? openProp : uncontrolledOpen;

  return (
    <details
      className={cn("slt-disclosure", className)}
      open={open}
      onToggle={(event) => {
        onToggle?.(event);
        const next = event.currentTarget.open;
        if (!controlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
      }}
      {...props}
    >
      <summary className="slt-disclosure__summary">
        <span className="slt-disclosure__summary-label">{summary}</span>
        <span className="slt-disclosure__icon" aria-hidden="true" />
      </summary>
      <div className="slt-disclosure__content">{children}</div>
    </details>
  );
}
