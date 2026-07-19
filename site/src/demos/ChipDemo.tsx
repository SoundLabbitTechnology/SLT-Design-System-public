import { Chip } from "@soundlabbit/design-system/ui";

export default function ChipDemo() {
  return (
    <div className="docs-field-stack" style={{ flexDirection: "row", flexWrap: "wrap", gap: "var(--space-sm)" }}>
      <Chip>デザインシステム</Chip>
      <Chip selected>選択中</Chip>
      <Chip onRemove={() => undefined} removeLabel="削除">
        フィルタ
      </Chip>
    </div>
  );
}
