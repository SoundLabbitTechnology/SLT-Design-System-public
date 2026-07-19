import { MobileMenu } from "@soundlabbit/design-system/ui";

export default function MobileMenuDemo() {
  return (
    <MobileMenu
      items={[
        { label: "ホーム", href: "#" },
        { label: "製品", href: "#" },
        { label: "ドキュメント", href: "#", current: true },
      ]}
    />
  );
}
