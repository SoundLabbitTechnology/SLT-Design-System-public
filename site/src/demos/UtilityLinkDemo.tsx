import { UtilityLink } from "@soundlabbit/design-system/ui";

export default function UtilityLinkDemo() {
  return (
    <div style={{ display: "flex", gap: "var(--space-md)" }}>
      <UtilityLink href="#">サイトマップ</UtilityLink>
      <UtilityLink href="#">プライバシーポリシー</UtilityLink>
    </div>
  );
}
