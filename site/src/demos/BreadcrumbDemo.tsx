import { Breadcrumb } from "@soundlabbit/design-system/ui";

export default function BreadcrumbDemo() {
  return (
    <div className="docs-field-stack">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "#" },
          { label: "コンポーネント", href: "#" },
          { label: "パンくずリスト" },
        ]}
      />
    </div>
  );
}
