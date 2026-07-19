import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface UtilityLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

/** フッター等の補助リンク（言語切替・ヘルプなど） */
export function UtilityLink({ className, children, ...props }: UtilityLinkProps) {
  return (
    <a className={cn("slt-utility-link", className)} {...props}>
      {children}
    </a>
  );
}
