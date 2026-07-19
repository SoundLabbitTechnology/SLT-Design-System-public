# E2E smoke — 最小チェックリスト（G5）

自動化フレームワーク（Playwright 推奨）へ落とし込む **必須シナリオ**です。  
DS コンポーネントの回帰と product のクリティカルパスを分け、まずは薄く広くカバーします。

## 必須（3 本）

| # | シナリオ | 合格条件 |
|---|----------|----------|
| 1 | **トップ表示** | 代表 URL が 200。主要見出しまたは hero が visible |
| 2 | **テーマ属性** | `document.documentElement` に期待の `data-theme`（と `data-color-mode` があれば一致） |
| 3 | **キーボードフォーカス** | Tab で最初のインタラクティブ要素に `:focus-visible` が付く（または skip link 到達） |

## 推奨（product ごとに 1〜2 本追加）

| 領域 | 例（アプリ型） | 例（LP 型） |
|------|---------------|-------------|
| ナビ | ログインまたは主要導線 | 主要 LP へのリンク |
| フォーム | 認証フィールドの label 関連 | 問い合わせフォームの送信ボタン |
| DS 部品 | `Button` primary が 1 画面 1 つ | CTA セクションの primary ボタン |

## 実装メモ

- **認証画面**: storage state または test user を product が用意。DS は資格情報を持たない
- **タイムアウト**: ネットワーク idle より `getByRole` の visible を優先（INP / flake 対策）
- **スクリーンショット**: 失敗時のみ（CI artifact）。G4 Chromatic の代替ではない
- **DS release 後**: この smoke を 1 回実行し、結果を vendor bump PR にリンク

## Playwright スケルトン（参考）

```ts
import { test, expect } from "@playwright/test";

test("top page renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading").first()).toBeVisible();
});

test("theme attributes on html", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "ai-dash");
});

test("keyboard focus visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus-visible");
  await expect(focused).toBeVisible();
});
```

`data-theme` の期待値は product ごとに変更する。
