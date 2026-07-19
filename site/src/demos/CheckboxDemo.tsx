import { Checkbox } from "@soundlabbit/design-system/ui";

export default function CheckboxDemo() {
  return (
    <div className="docs-field-stack">
      <Checkbox label="利用規約に同意する" />
      <Checkbox label="メール通知を受け取る" defaultChecked />
      <Checkbox label="続行するには同意が必要です" error errorMessage="このチェックは必須です" />
      <Checkbox label="変更不可の項目" defaultChecked disabled />
    </div>
  );
}
