# @soundlabbit/design-system

Sound Labbit Technology のマルチブランド・デザインシステムです。DTCG トークン、テーマ対応 CSS、React コンポーネントを GitHub から導入できます。

公開ドキュメントは Docs site（`site/`）。品質ハーネスや開発用ゲートは Private リポジトリ側にあります。

## 5 分で導入

### 1. インストール

現在は Git dependency として参照します。再現可能なビルドでは `main` ではなく release tag または commit を固定してください。

```json
{
  "dependencies": {
    "@soundlabbit/design-system": "github:SoundLabbitTechnology/SLT-Design-System-public#v0.4.5"
  }
}
```

### 2. CSS を読み込む

```css
@import '@soundlabbit/design-system/tokens.css';
@import '@soundlabbit/design-system/components.css';
```

必要な場合だけ utilities を追加します。

```css
@import '@soundlabbit/design-system/utilities.css';
```

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

各 API と利用判断は Docs site の `/components/`（`npm run docs:dev`）を参照してください。

## Docs site

```bash
npm ci
npm run docs:dev      # http://localhost:4321
npm run docs:build    # 静的ビルド → site/dist/
```

詳細は [site/README.md](./site/README.md)。

## 提供物

| Export | 内容 |
|--------|------|
| `@soundlabbit/design-system/tokens.css` | 全テーマ対応 CSS variables + Tailwind v4 bridge |
| `@soundlabbit/design-system/<brand>/<mode>.css` | ブランド・モード別の軽量 CSS |
| `@soundlabbit/design-system/components.css` | React コンポーネントのスタイル |
| `@soundlabbit/design-system/utilities.css` | 任意の共有 utility |
| `@soundlabbit/design-system/ui` | React コンポーネントと型 |
| `@soundlabbit/design-system/tokens.json` | ツール向け生成済み token bundle |

## トークン利用ルール

- UI は semantic / component token のみ参照する。
- CSS は `var(--color-surface-primary)`、`var(--space-4)` など用途名で書く。
- raw color、任意の寸法、`primitives.json` の生値を UI へ持ち込まない。
- Tailwind v4 の `@theme` にカスタム `--spacing-*` を追加しない。
- 生成物である `dist/` と `dist-ui/` を直接編集しない。

## リポジトリ構成

| パス | 責務 |
|------|------|
| `design-tokens/` | DTCG token source |
| `src/` | React components と型 |
| `styles/` | component / utility CSS |
| `dist/` / `dist-ui/` | 生成済み配布物（Git インストール用にコミット） |
| `site/` | Astro Docs site |
| `scripts/build-dtcg.mjs` | トークンビルド |

```bash
npm run build:all   # tokens + UI
npm run docs:build  # package build + Docs site
```

変更履歴は [CHANGELOG](./CHANGELOG.md) を参照してください。

## ライセンス

UNLICENSED（All Rights Reserved）。公開ミラーとして閲覧・クローンは可。利用・改変・再配布は Sound Labbit Technology および許可された消費者プロダクトに限定。詳細は [LICENSE](./LICENSE)。
