import type { BlockquoteHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface BlockquoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
  /** 出典表示（視覚）。cite 属性とは別に渡す */
  attribution?: ReactNode;
}

export function Blockquote({
  className,
  children,
  attribution,
  ...props
}: BlockquoteProps) {
  return (
    <figure className={cn("slt-blockquote", className)}>
      <blockquote className="slt-blockquote__quote" {...props}>
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="slt-blockquote__attribution">{attribution}</figcaption>
      ) : null}
    </figure>
  );
}
