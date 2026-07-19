# @soundlabbit/design-system

Sound Labbit Technology のマルチブランド・デザインシステムです。DTCG トークン、テーマ対応 CSS、React コンポーネントを GitHub から導入できます。

**公開ドキュメントの入口は Docs site**（`npm run docs:dev`）。設計・プロセスの長文執筆は Private リポジトリ側です。この Public ミラーの閲覧用コンテンツは `site/` にあります。

## まず選ぶ

| 目的 | 入口 |
|------|------|
| プロダクトへ導入する | [5 分で導入](#5-分で導入) |
| コンポーネントを探す | `npm run docs:dev` → `/components/` / `npm run storybook` |
| デザイン判断を確認する | `npm run docs:dev`（[site/README.md](./site/README.md)） |
| 変更を提案する | Docs site `/guidelines/contributing/` |
| リリースする | Docs site `/guidelines/releasing/` |
| AI エージェントで作業する | [CLAUDE.md](./CLAUDE.md) / Docs site `/guidelines/harness/` |

## 提供物

| Export / 面 | 内容 |
|-------------|------|
| `@soundlabbit/design-system/tokens.css` | 全テーマ対応 CSS variables + Tailwind v4 bridge |
| `@soundlabbit/design-system/<brand>/<mode>.css` | ブランド・モード別の軽量 CSS |
| `@soundlabbit/design-system/components.css` | React コンポーネントのスタイル |
| `@soundlabbit/design-system/utilities.css` | 任意の共有 utility |
| `@soundlabbit/design-system/ui` | React コンポーネントと型 |
| `@soundlabbit/design-system/tokens.json` | ツール向け生成済み token bundle |
| Storybook | props、状態、操作、テーマ、a11y のライブカタログ |
| Docs site | 導入、基盤、利用ガイド、品質、運用 — **当面はローカル**（`npm run docs:dev`） |

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

トークン名はテーマ間で同一です。ブランドごとの条件分岐ではなく、`data-theme` と `data-color-mode` で値を切り替えます。

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

破壊的操作は確認とキャンセルを含む `Dialog` を使います。各 API と利用判断は Docs site の `/components/`（`npm run docs:dev`）または Storybook を参照してください。

## コンポーネント

| Tier | Components |
|------|------------|
| P0 | Button, Input, Textarea, Card, Dialog, Badge |
| P1 | BrandBackground, WaveBackground, GridBackground, Toast, SiteHeader |
| P2 | Skeleton, Table / DataTable |

Tier は利用可否ではなく、システム内の優先度を表します。公開コンポーネントの一覧は Docs site `/components/` が正です。

## トークン利用ルール

- UI は semantic / component token のみ参照する。
- CSS は `var(--color-surface-primary)`、`var(--space-4)` など用途名で書く。
- raw color、任意の寸法、`primitives.json` の生値を UI へ持ち込まない（参照は semantic / component のみ）。
- Tailwind v4 の `@theme` にカスタム `--spacing-*` を追加しない。
- 生成物である `dist/` と `dist-ui/` を直接編集しない。

詳しくは Docs site `/foundations/tokens/`（`npm run docs:dev`）を参照してください。

## 開発

```bash
npm ci
npm run build:all
npm run check:fast      # 実装中
npm run check           # handoff 前
npm run storybook       # http://localhost:6006
npm run docs:dev        # http://localhost:4321
```

| コマンド | 保証すること |
|----------|--------------|
| `npm run check` | tokens、raw value、types、Storybook/a11y、docs contract、構造 |
| `npm run storybook:check` | Storybook tests + static build |
| `npm run docs:check` | docs contract + Docs site static build |
| `npm run ci` | パッケージと両公開面の統合検証 |

失敗時の自己修正ループは Docs site `/guidelines/harness/` を参照してください。

## リポジトリ構成

| パス | 責務 |
|------|------|
| [`design-tokens/`](./design-tokens/) | DTCG token source |
| [`src/`](./src/) | React components と型 |
| [`styles/`](./styles/) | component / utility CSS |
| [`site/`](./site/) | Astro Docs site（公開閲覧面 + Markdown コンテンツ） |
| [`stories/`](./stories/) | Storybook の入口と判断用 samples |
| [`scripts/harness/`](./scripts/harness/) | 自動品質ゲートとメトリクス |

変更履歴は [CHANGELOG](./CHANGELOG.md) を参照してください。

## ライセンス

UNLICENSED（All Rights Reserved）。公開ミラーとして閲覧・クローンは可。利用・改変・再配布は Sound Labbit Technology および許可された消費者プロダクトに限定。詳細は [LICENSE](./LICENSE)。
