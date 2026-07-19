import { useState } from "react";
import { Input } from "@soundlabbit/design-system/ui";

export default function InputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="docs-field-stack">
      <Input label="メールアドレス" placeholder="you@example.com" value={value} onChange={(e) => setValue(e.target.value)} />
      <Input label="パスワード" type="password" hint="8文字以上" />
      <Input label="ユーザー名" error errorMessage="このユーザー名は既に使われています" />
      <Input label="申請番号" defaultValue="APP-2026-00142" readOnly />
      <Input label="氏名" placeholder="山田 太郎" layout="horizontal" />
    </div>
  );
}
