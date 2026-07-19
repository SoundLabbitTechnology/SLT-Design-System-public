import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface MenuListItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface MenuListProps extends HTMLAttributes<HTMLUListElement> {
  items: MenuListItem[];
  /** listbox 的な選択 UI ではなくナビ / アクション一覧 */
  "aria-label"?: string;
}

/** 縦並びのメニュー項目一覧（ドロワー・モバイルメニュー内など） */
export function MenuList({ items, className, ...props }: MenuListProps) {
  return (
    <ul className={cn("slt-menu-list", className)} {...props}>
      {items.map((item, index) => {
        const content = (
          <>
            <span className="slt-menu-list__label">{item.label}</span>
          </>
        );

        if (item.href && !item.disabled) {
          return (
            <li key={index} className="slt-menu-list__item">
              <a
                href={item.href}
                className={cn(
                  "slt-menu-list__action",
                  item.current && "slt-menu-list__action--current",
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {content}
              </a>
            </li>
          );
        }

        return (
          <li key={index} className="slt-menu-list__item">
            <button
              type="button"
              className={cn(
                "slt-menu-list__action",
                item.current && "slt-menu-list__action--current",
              )}
              disabled={item.disabled}
              aria-current={item.current ? "true" : undefined}
              onClick={() => item.onSelect?.()}
            >
              {content}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
