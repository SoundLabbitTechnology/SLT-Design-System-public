import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface BottomNavigationItem {
  label: ReactNode;
  href: string;
  current?: boolean;
  /** アイコン等のスロット（任意） */
  icon?: ReactNode;
}

export interface BottomNavigationProps extends HTMLAttributes<HTMLElement> {
  items: BottomNavigationItem[];
  "aria-label"?: string;
}

/** モバイル向け下部タブナビ（4〜5 項目想定） */
export function BottomNavigation({
  items,
  className,
  "aria-label": ariaLabel = "ボトムナビゲーション",
  ...props
}: BottomNavigationProps) {
  return (
    <nav aria-label={ariaLabel} className={cn("slt-bottom-nav", className)} {...props}>
      <ul className="slt-bottom-nav__list">
        {items.map((item, index) => (
          <li key={index} className="slt-bottom-nav__item">
            <a
              href={item.href}
              className={cn(
                "slt-bottom-nav__link",
                item.current && "slt-bottom-nav__link--current",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.icon ? (
                <span className="slt-bottom-nav__icon" aria-hidden="true">
                  {item.icon}
                </span>
              ) : null}
              <span className="slt-bottom-nav__label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
