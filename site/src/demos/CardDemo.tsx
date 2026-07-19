import { Card } from "@soundlabbit/design-system/ui";

export default function CardDemo() {
  return (
    <div className="docs-demo-row">
      <Card className="docs-demo-card">
        <p className="docs-demo-card__text">デフォルトの Card。関連コンテンツをグルーピングする。</p>
      </Card>
      <Card variant="glass" className="docs-demo-card">
        <p className="docs-demo-card__text">glass バリアント。暗色背景上のヒーロー・強調セクション向け。</p>
      </Card>
    </div>
  );
}
