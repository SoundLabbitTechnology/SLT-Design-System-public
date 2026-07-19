import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Drawer } from "../Drawer/Drawer";
import { HamburgerMenuButton } from "../HamburgerMenuButton/HamburgerMenuButton";
import { MenuList, type MenuListItem } from "../MenuList/MenuList";

export interface MobileMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  items: MenuListItem[];
  side?: "left" | "right";
  className?: string;
  triggerClassName?: string;
  children?: ReactNode;
}

/**
 * ハンバーガー + ドロワー + メニューリストの複合。
 * SiteHeader 内蔵ドロワーの代替として単体利用できる。
 */
export function MobileMenu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  title = "メニュー",
  items,
  side = "right",
  className,
  triggerClassName,
  children,
}: MobileMenuProps) {
  const controlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlled ? openProp : uncontrolledOpen;

  const handleOpenChange = (next: boolean) => {
    if (!controlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("slt-mobile-menu", className)}>
      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
        side={side}
        title={title}
        trigger={<HamburgerMenuButton className={triggerClassName} open={open} />}
      >
        <MenuList items={items} aria-label={title} />
        {children}
      </Drawer>
    </div>
  );
}
