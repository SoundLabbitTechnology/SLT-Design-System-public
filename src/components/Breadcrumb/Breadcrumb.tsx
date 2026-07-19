import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface BreadcrumbItem {
  label: ReactNode;
  /** 省略または最終項目は現在地（リンクにしない） */
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** 項目間の区切り。既定は › */
  separator?: ReactNode;
  /**
   * はみ出し時の挙動（DADS 準拠）。
   * - `wrap`: 改行（既定。デスクトップ / モバイル改行仕様）
   * - `scroll`: 単一行の横スクロール（長い階層向け。ページ下部に wrap 版の併置を推奨）
   */
  overflow?: "wrap" | "scroll";
}

export function Breadcrumb({
  items,
  separator = "›",
  overflow = "wrap",
  className,
  "aria-label": ariaLabel = "パンくずリスト",
  ...props
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "slt-breadcrumb",
        overflow === "scroll" && "slt-breadcrumb--scroll",
        className,
      )}
      {...props}
    >
      <ol className="slt-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="slt-breadcrumb__item">
              {index > 0 ? (
                <span className="slt-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span
                  className={cn("slt-breadcrumb__current", !isLast && "slt-breadcrumb__text")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a className="slt-breadcrumb__link" href={item.href}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
