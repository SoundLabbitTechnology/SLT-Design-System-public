import { useState } from "react";
import { Button } from "@soundlabbit/design-system/ui";

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="docs-demo-row">
      <Button>保存する</Button>
      <Button variant="secondary">キャンセル</Button>
      <Button variant="ghost">ゴースト</Button>
      <Button variant="danger">削除する</Button>
      <Button loading={loading} onClick={handleLoadingClick}>
        {loading ? "送信中…" : "ローディングを試す"}
      </Button>
    </div>
  );
}
