import { Divider } from "@soundlabbit/design-system/ui";

export default function DividerDemo() {
  return (
    <div className="docs-field-stack">
      <p>上のコンテンツ</p>
      <Divider />
      <p>区切り線の下</p>
      <Divider label="または" />
      <p>ラベル付き区切り</p>
    </div>
  );
}
