# @soundlabbit/design-system

Sound Labbit Technology のマルチブランド・デザインシステムです。  
DTCG トークン、テーマ対応 CSS、React コンポーネントを **GitHub tag** から導入できます。

このリポジトリは **配布ミラー**です。品質ハーネス・Storybook・社内運用文書は Private リポジトリ側にあります。

**Docs site**: https://soundlabbittechnology.github.io/SLT-Design-System-public/（`main` push で GitHub Pages へ自動デプロイ。サイト内検索あり）

**貢献**: Sound Labbit Technology **社内メンバーのみ**（Private 正本経由）。外部からの Issue / PR / Fork のマージは受け付けません。脆弱性は [SECURITY.md](./SECURITY.md) へ。

## 5 分で導入

### 1. インストール

再現可能なビルドでは `main` ではなく **release tag** を固定してください。

```json
{
  "dependencies": {
    "@soundlabbit/design-system": "github:SoundLabbitTechnology/SLT-Design-System-public#v0.4.7"
  }
}
```

### 2. CSS を読み込む

```css
@layer theme, base, components, utilities;

@import '@soundlabbit/design-system/tokens.css';
@import '@soundlabbit/design-system/components.css' layer(components);
@import '@soundlabbit/design-system/utilities.css';
@import 'tailwindcss';
```

Tailwind を使わない場合は `@layer` / `layer(components)` / `tailwindcss` 行を省略して構いません。

### 3. テーマを指定する

```html
<html data-theme="ai-dash" data-color-mode="dark">
```

| `data-theme` | 対応 mode | 既定 |
|--------------|-----------|------|
| `ai-dash` | light / dark | dark |
| `sound-laboratory` | light / dark | dark |
| `slt-corporate` | dark | dark |
| `admin` | light | light |

### 4. React コンポーネントを使う

```tsx
import { Button, Card, Dialog } from '@soundlabbit/design-system/ui';

export function DeleteProject() {
  return (
    <Dialog
      trigger={<Button variant="danger">削除する</Button>}
      title="プロジェクトを削除しますか？"
      destructive
      onConfirm={() => undefined}
    />
  );
}
```

API と利用判断は Docs site の [コンポーネント](https://soundlabbittechnology.github.io/SLT-Design-System-public/components/) を参照してください。

## トークン利用ルール

- UI は semantic / component token のみ参照する。
- CSS は `var(--color-surface-primary)` など用途名で書く。
- raw color、任意の寸法、非公開の primitive token source を UI へ持ち込まない。
- Tailwind v4 の `@theme` にカスタム `--spacing-*` を追加しない。
- 生成物である `dist/` と `dist-ui/` を直接編集しない。

## リポジトリ構成

| パス | 責務 |
|------|------|
| [`design-tokens/`](./design-tokens/) | DTCG token source |
| [`src/`](./src/) | React components と型 |
| [`styles/`](./styles/) | component / utility CSS |
| [`dist/`](./dist/) / [`dist-ui/`](./dist-ui/) | 生成済みトークンと UI 配布物 |
| [`site/`](./site/) | Astro Docs site（公開正本 Markdown 含む） |

変更履歴は [CHANGELOG](./CHANGELOG.md) を参照してください。現行バージョン: **v0.4.7**。

## ライセンス

UNLICENSED — Sound Labbit Technology 内部利用。第三者による再配布・外部からの Issue / PR は受け付けません。
