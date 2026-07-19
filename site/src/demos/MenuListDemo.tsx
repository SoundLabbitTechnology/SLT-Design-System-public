import { MenuList } from "@soundlabbit/design-system/ui";

export default function MenuListDemo() {
  return (
    <MenuList
      aria-label="メニュー"
      items={[
        { label: "ダッシュボード", href: "#", current: true },
        { label: "設定", href: "#" },
        { label: "ヘルプ", href: "#" },
      ]}
    />
  );
}
