"use client";

import { useId, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SiteHeaderProps {
  /** ロゴ・ブランドマーク（リンクは呼び出し側で内包） */
  logo?: ReactNode;
  /** デスクトップ / ドロワー共通のナビゲーション */
  nav?: ReactNode;
  /** 右端アクション（ログイン・CTA 等）。マーケ LP では通常省略 */
  actions?: ReactNode;
  /** marketing = 半透明ブラー・下線ナビ（sound-laboratory.org 等） */
  variant?: "default" | "marketing";
  /**
   * 内側バーの最大幅。本文コンテナと揃えるときに指定する（例: "75rem" / "var(--docs-content-max)"）。
   * 未指定時は full bleed 背景のままバーも全幅（padding-x のみ）。
   */
  contentMaxWidth?: string;
  className?: string;
}

export function SiteHeader({
  logo,
  nav,
  actions,
  variant = "default",
  contentMaxWidth,
  className,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const barStyle = contentMaxWidth
    ? ({ maxWidth: contentMaxWidth } satisfies CSSProperties)
    : undefined;

  return (
    <header className={cn("slt-site-header", `slt-site-header--${variant}`, className)}>
      <div className="slt-site-header__bar" style={barStyle}>
        {logo ? <div className="slt-site-header__logo">{logo}</div> : null}
        {nav ? (
          <nav className="slt-site-header__nav" aria-label="メイン">
            {nav}
          </nav>
        ) : null}
        {actions ? <div className="slt-site-header__actions">{actions}</div> : null}
        {(nav || actions) && (
          <button
            type="button"
            className="slt-site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="slt-site-header__menu-label">
              {menuOpen ? "メニューを閉じる" : "メニューを開く"}
            </span>
          </button>
        )}
      </div>
      {(nav || actions) && menuOpen ? (
        <div
          id={menuId}
          className="slt-site-header__drawer"
          onClick={() => setMenuOpen(false)}
        >
          {nav ? (
            <nav className="slt-site-header__drawer-nav" aria-label="モバイルメニュー">
              {nav}
            </nav>
          ) : null}
          {actions ? <div className="slt-site-header__drawer-actions">{actions}</div> : null}
        </div>
      ) : null}
    </header>
  );
}

export interface SiteHeaderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  /** marketing = 下線アクティブ（公式サイト Header 準拠） */
  variant?: "default" | "marketing";
}

export function SiteHeaderLink({
  active = false,
  variant = "default",
  className,
  ...props
}: SiteHeaderLinkProps) {
  return (
    <a
      className={cn(
        "slt-site-header__link",
        variant === "marketing" && "slt-site-header__link--marketing",
        active && "slt-site-header__link--active",
        className,
      )}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  );
}
