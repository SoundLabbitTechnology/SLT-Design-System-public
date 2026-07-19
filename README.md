# @soundlabbit/design-system

> **Public mirror** of the SLT Design System. See [docs/MIRROR.md](./docs/MIRROR.md).

Sound Labbit Technology のマルチブランド・デザインシステムです。DTCG トークン、テーマ対応 CSS、React コンポーネント、Storybook、Docs site（当面はローカル）を一つのリポジトリで管理します。

## まず選ぶ

| 目的 | 入口 |
|------|------|
| プロダクトへ導入する | [5 分で導入](#5-分で導入) |
| コンポーネントを探す | [L2 コンポーネント索引](./docs/L2-components/README.md) / `npm run storybook` |
| デザイン判断を確認する | `npm run docs:dev`（[site/README.md](./site/README.md)） / [ドキュメント索引](./docs/README.md) |
| 変更を提案する | [CONTRIBUTING](./docs/CONTRIBUTING.md) |
| リリースする | [RELEASING](./docs/RELEASING.md) |
| AI エージェントで作業する | [CLAUDE.md](./CLAUDE.md) / [ハーネス](./docs/L6-harness-and-loops.md) |

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

正本と公開面の役割分担は [ドキュメント運用標準](./docs/DOCUMENTATION.md) を参照してください。

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

破壊的操作は確認とキャンセルを含む `Dialog` を使います。各 API と利用判断は [コンポーネント索引](./docs/L2-components/README.md) を参照してください。

## コンポーネント

| Tier | Components |
|------|------------|
| P0 | Button, Input, Textarea, Card, Dialog, Badge |
| P1 | BrandBackground, WaveBackground, GridBackground, Toast, SiteHeader |
| P2 | Skeleton, Table / DataTable |

Tier は利用可否ではなく、システム内の優先度を表します。公開されている全コンポーネントは同じ DoD を満たします。

## トークン利用ルール

- UI は semantic / component token のみ参照する。
- CSS は `var(--color-surface-primary)`、`var(--space-4)` など用途名で書く。
- raw color、任意の寸法、`primitives.json` の生値を UI へ持ち込まない（参照は semantic / component のみ）。
- Tailwind v4 の `@theme` にカスタム `--spacing-*` を追加しない。
- 生成物である `dist/` と `dist-ui/` を直接編集しない。

詳しくは [L1 トークン標準](./docs/L1-foundations/tokens.md) を参照してください。

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

失敗時の自己修正ループと CI / Chromatic / 運用メトリクスは [L6 ハーネス](./docs/L6-harness-and-loops.md) が正本です。

## リポジトリ構成

| パス | 責務 |
|------|------|
| [`design-tokens/`](./design-tokens/) | DTCG token source |
| [`src/`](./src/) | React components と型 |
| [`styles/`](./styles/) | component / utility CSS |
| [`docs/`](./docs/) | 原則・仕様・運用の正本 |
| [`stories/`](./stories/) | Storybook の入口と判断用 samples |
| [`site/`](./site/) | Astro Docs site |
| [`scripts/harness/`](./scripts/harness/) | 自動品質ゲートとメトリクス |

現在地は [ROADMAP](./docs/ROADMAP.md)、変更履歴は [CHANGELOG](./CHANGELOG.md) を参照してください。

## ライセンス

UNLICENSED（All Rights Reserved）。公開ミラーとして閲覧・クローンは可。利用・改変・再配布は Sound Labbit Technology および許可された消費者プロダクトに限定。詳細は [LICENSE](./LICENSE)。
