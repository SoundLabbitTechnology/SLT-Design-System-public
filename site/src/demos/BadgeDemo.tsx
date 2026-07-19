import { Badge } from "@soundlabbit/design-system/ui";

export default function BadgeDemo() {
  return (
    <div className="docs-demo-row">
      <Badge>デフォルト</Badge>
      <Badge variant="success">完了</Badge>
      <Badge variant="warning">要確認</Badge>
      <Badge variant="danger">エラー</Badge>
      <Badge variant="info">新着</Badge>
    </div>
  );
}
