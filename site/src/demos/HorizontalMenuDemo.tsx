import { HorizontalMenu } from "@soundlabbit/design-system/ui";

export default function HorizontalMenuDemo() {
  return (
    <HorizontalMenu
      items={[
        { label: "ホーム", href: "#", current: true },
        { label: "製品", href: "#" },
        { label: "ドキュメント", href: "#" },
      ]}
    />
  );
}
