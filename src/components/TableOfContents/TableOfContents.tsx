import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TableOfContentsItem {
  id: string;
  label: ReactNode;
  level?: 2 | 3 | 4;
}

export interface TableOfContentsProps extends HTMLAttributes<HTMLElement> {
  items: TableOfContentsItem[];
  title?: string;
}

export function TableOfContents({
  items,
  title = "目次",
  className,
  ...props
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={title} className={cn("slt-toc", className)} {...props}>
      <p className="slt-toc__title">{title}</p>
      <ol className="slt-toc__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "slt-toc__item",
              item.level === 3 && "slt-toc__item--l3",
              item.level === 4 && "slt-toc__item--l4",
            )}
          >
            <a className="slt-toc__link" href={`#${item.id}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
