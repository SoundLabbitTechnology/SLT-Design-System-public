import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface HamburgerMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  openLabel?: string;
  closeLabel?: string;
}

export function HamburgerMenuButton({
  open = false,
  openLabel = "メニューを開く",
  closeLabel = "メニューを閉じる",
  className,
  ...props
}: HamburgerMenuButtonProps) {
  return (
    <button
      type="button"
      className={cn("slt-hamburger", open && "slt-hamburger--open", className)}
      aria-expanded={open}
      aria-label={open ? closeLabel : openLabel}
      {...props}
    >
      <span className="slt-hamburger__bars" aria-hidden="true">
        <span className="slt-hamburger__bar" />
        <span className="slt-hamburger__bar" />
        <span className="slt-hamburger__bar" />
      </span>
    </button>
  );
}
