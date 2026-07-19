import { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ScrollTopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 表示を開始するスクロール量（px）。既定 400 */
  threshold?: number;
  label?: string;
}

export function ScrollTopButton({
  threshold = 400,
  label = "ページ上部へ",
  className,
  onClick,
  ...props
}: ScrollTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  if (!visible) return null;

  return (
    <button
      type="button"
      className={cn("slt-scroll-top", className)}
      aria-label={label}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      {...props}
    >
      <span aria-hidden="true" className="slt-scroll-top__icon" />
      <span className="slt-scroll-top__label">{label}</span>
    </button>
  );
}
