"use client";

import {
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export interface MegaMenuLink {
  label: ReactNode;
  href: string;
  description?: ReactNode;
}

export interface MegaMenuSection {
  title?: ReactNode;
  links: MegaMenuLink[];
}

export interface MegaMenuItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
  /** あるときメガパネルを開く */
  sections?: MegaMenuSection[];
}

export interface MegaMenuProps extends HTMLAttributes<HTMLElement> {
  items: MegaMenuItem[];
  "aria-label"?: string;
}

export function MegaMenu({
  items,
  className,
  "aria-label": ariaLabel = "メインメニュー",
  ...props
}: MegaMenuProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  const close = () => setOpenIndex(null);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") close();
  };

  return (
    <nav
      ref={rootRef}
      aria-label={ariaLabel}
      className={cn("slt-mega-menu", className)}
      onKeyDown={onKeyDown}
      {...props}
    >
      <ul className="slt-mega-menu__list">
        {items.map((item, index) => {
          const panelId = `${baseId}-panel-${index}`;
          const hasPanel = Boolean(item.sections?.length);
          const open = openIndex === index;

          return (
            <li
              key={index}
              className="slt-mega-menu__item"
              onMouseEnter={() => {
                if (hasPanel) setOpenIndex(index);
                else close();
              }}
              onMouseLeave={() => {
                if (open) close();
              }}
            >
              {hasPanel ? (
                <button
                  type="button"
                  className={cn(
                    "slt-mega-menu__trigger",
                    item.current && "slt-mega-menu__trigger--current",
                    open && "slt-mega-menu__trigger--open",
                  )}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  onFocus={() => setOpenIndex(index)}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href ?? "#"}
                  className={cn(
                    "slt-mega-menu__link",
                    item.current && "slt-mega-menu__link--current",
                  )}
                  aria-current={item.current ? "page" : undefined}
                  onFocus={close}
                >
                  {item.label}
                </a>
              )}
              {hasPanel && open ? (
                <div id={panelId} className="slt-mega-menu__panel" role="region" aria-label={typeof item.label === "string" ? item.label : "サブメニュー"}>
                  <div className="slt-mega-menu__panel-inner">
                    {item.sections!.map((section, sIndex) => (
                      <div key={sIndex} className="slt-mega-menu__section">
                        {section.title ? (
                          <div className="slt-mega-menu__section-title">{section.title}</div>
                        ) : null}
                        <ul className="slt-mega-menu__section-list">
                          {section.links.map((link, lIndex) => (
                            <li key={lIndex}>
                              <a href={link.href} className="slt-mega-menu__section-link">
                                <span className="slt-mega-menu__section-link-label">{link.label}</span>
                                {link.description ? (
                                  <span className="slt-mega-menu__section-link-desc">
                                    {link.description}
                                  </span>
                                ) : null}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
