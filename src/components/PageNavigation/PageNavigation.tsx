import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface PageNavigationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  /** 省略記号の前後に表示する隣ページ数（既定 1） */
  siblingCount?: number;
}

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

function buildPages(page: number, total: number, sibling: number): Array<number | "ellipsis"> {
  if (total <= 1) return [1];
  const start = Math.max(2, page - sibling);
  const end = Math.min(total - 1, page + sibling);
  const pages: Array<number | "ellipsis"> = [1];
  if (start > 2) pages.push("ellipsis");
  pages.push(...range(start, end));
  if (end < total - 1) pages.push("ellipsis");
  if (total > 1) pages.push(total);
  return pages;
}

export function PageNavigation({
  page,
  totalPages,
  onPageChange,
  previousLabel = "前へ",
  nextLabel = "次へ",
  siblingCount = 1,
  className,
  "aria-label": ariaLabel = "ページナビゲーション",
  ...props
}: PageNavigationProps) {
  const total = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, page), total);
  const pages = buildPages(current, total, siblingCount);

  const go = (next: number) => {
    if (next < 1 || next > total || next === current) return;
    onPageChange?.(next);
  };

  return (
    <nav aria-label={ariaLabel} className={cn("slt-page-nav", className)} {...props}>
      <ul className="slt-page-nav__list">
        <li>
          <button
            type="button"
            className="slt-page-nav__btn"
            disabled={current <= 1}
            onClick={() => go(current - 1)}
          >
            {previousLabel}
          </button>
        </li>
        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <li key={`e-${index}`} className="slt-page-nav__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cn(
                  "slt-page-nav__btn",
                  "slt-page-nav__page",
                  item === current && "slt-page-nav__page--current",
                )}
                aria-current={item === current ? "page" : undefined}
                aria-label={`${item}ページ`}
                onClick={() => go(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            className="slt-page-nav__btn"
            disabled={current >= total}
            onClick={() => go(current + 1)}
          >
            {nextLabel}
          </button>
        </li>
      </ul>
    </nav>
  );
}
