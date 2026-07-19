import { Switch } from "@soundlabbit/design-system/ui";

export default function SwitchDemo() {
  return (
    <div className="docs-field-stack">
      <Switch label="メール通知" />
      <Switch label="プッシュ通知" defaultChecked />
      <Switch label="自動保存" hint="切り替えるとその場で反映されます" defaultChecked />
    </div>
  );
}
