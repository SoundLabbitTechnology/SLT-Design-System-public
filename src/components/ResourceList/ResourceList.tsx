import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ResourceListItem {
  title: ReactNode;
  description?: ReactNode;
  href: string;
  meta?: ReactNode;
}

export interface ResourceListProps extends HTMLAttributes<HTMLUListElement> {
  items: ResourceListItem[];
}

export function ResourceList({ items, className, ...props }: ResourceListProps) {
  return (
    <ul className={cn("slt-resource-list", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="slt-resource-list__item">
          <a className="slt-resource-list__link" href={item.href}>
            <span className="slt-resource-list__title">{item.title}</span>
            {item.description ? (
              <span className="slt-resource-list__description">{item.description}</span>
            ) : null}
            {item.meta ? <span className="slt-resource-list__meta">{item.meta}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
