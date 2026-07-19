import { ResourceList } from "@soundlabbit/design-system/ui";

export default function ResourceListDemo() {
  return (
    <ResourceList
      items={[
        {
          title: "デザイン原則",
          description: "L0 の恒常原則と戦略原則",
          href: "#",
          meta: "ドキュメント",
        },
        {
          title: "Storybook",
          description: "コンポーネントの状態と交互作用",
          href: "#",
          meta: "ツール",
        },
      ]}
    />
  );
}
