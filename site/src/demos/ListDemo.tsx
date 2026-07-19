import { List, ListItem } from "@soundlabbit/design-system/ui";

export default function ListDemo() {
  return (
    <div className="docs-field-stack">
      <List>
        <ListItem>必要書類を準備する</ListItem>
        <ListItem>オンラインで申請する</ListItem>
        <ListItem>結果通知を確認する</ListItem>
      </List>
    </div>
  );
}
