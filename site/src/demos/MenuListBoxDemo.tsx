import { MenuListBox } from "@soundlabbit/design-system/ui";

export default function MenuListBoxDemo() {
  return (
    <MenuListBox
      aria-label="ステータス"
      defaultValue="draft"
      options={[
        { value: "draft", label: "下書き" },
        { value: "review", label: "確認中" },
        { value: "done", label: "完了" },
      ]}
    />
  );
}
