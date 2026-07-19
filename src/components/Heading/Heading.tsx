import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 見た目の階層。未指定時は `as` に合わせる */
  level?: HeadingLevel;
  /** セマンティックな見出し要素 */
  as?: HeadingLevel;
}

export function Heading({
  level,
  as = 2,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${as}` as const;
  const visualLevel = level ?? as;

  return (
    <Tag className={cn("slt-heading", `slt-heading--${visualLevel}`, className)} {...props}>
      {children}
    </Tag>
  );
}
