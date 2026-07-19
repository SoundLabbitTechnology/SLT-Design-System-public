import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface NavItem {
  label: ReactNode;
  href: string;
  current?: boolean;
}

export interface HorizontalMenuProps extends HTMLAttributes<HTMLElement> {
  items: NavItem[];
  "aria-label"?: string;
}

/** ヘッダー等の水平ナビ。メガメニューは別途。 */
export function HorizontalMenu({
  items,
  className,
  "aria-label": ariaLabel = "メインメニュー",
  ...props
}: HorizontalMenuProps) {
  return (
    <nav aria-label={ariaLabel} className={cn("slt-horizontal-menu", className)} {...props}>
      <ul className="slt-horizontal-menu__list">
        {items.map((item, index) => (
          <li key={index} className="slt-horizontal-menu__item">
            <a
              href={item.href}
              className={cn(
                "slt-horizontal-menu__link",
                item.current && "slt-horizontal-menu__link--current",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
