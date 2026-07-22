# L1. デザイントークン標準

正本: [`design-tokens/`](../../design-tokens/)

判断の上位: [L0 原則](../L0-principles.md)

用語のやさしい言い方: [用語と命名 — 基盤・運用用語](../L4-terminology.md#基盤運用用語)

## 目的

**デザイン変数（トークン）**は、ブランドや明るさが変わっても、同じ用途名で画面を書けるようにするための約束です。
「どの色を使うか」を決める仕組みと、「画面コードが参照する名前」を分けます。

## 3 層の考え方

| 層 | やさしい言い方 | 役割 | 画面コードからの参照 |
|----|----------------|------|----------------------|
| Primitive | 内部の生の色・数値 | ビルド内部の材料 | 禁止 |
| Semantic | 用途つきのデザイン変数 | `color.action.primary` など用途の共有語彙 | 標準（これを使う） |
| Component | 部品用の変数 | `button.primary.bg` など部品固有の決定 | 部品の実装の中で使う |

内部の生値（primitive）は、用途つき変数を組み立てるための材料です。画面コード・文書のコード例・AI エージェントは読み取り・転載しません。

## どれを使うか

1. 画面やパターンでは、用途つきのデザイン変数（セマンティック）を使う。
2. 共有部品の内側では、部品用の変数（コンポーネント）を優先する。
3. 既存の名前で意図を表せないときは、色コードでごまかさず、変数の追加を提案する。
4. 同じ上書きが 3 回出たら、用途つき変数か部品化を検討する。

```css
.product-panel {
  color: var(--color-text-primary);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--shape-radius-md);
  padding: var(--space-md);
}
```

```tsx
import { Button } from '@soundlabbit/design-system/ui';

<Button variant="primary">保存する</Button>;
```

## 命名規則

- 構文: `{category}.{target}.{variant}-{state}`。
- 見た目ではなく用途で命名する。
- ブランド名、色名、画面名を semantic token に含めない。
- ブランド・モード間で semantic key を一致させ、値だけを差し替える。
- CSS variable は `.` を `-` に変換する: `color.text.primary` → `--color-text-primary`。

## ブランド × 明るさ

| ブランド（data-theme） | 明るさ（data-color-mode） | 指定しないときの既定 |
|------------------------|---------------------------|----------------------|
| `ai-dash` | light / dark | dark |
| `sound-laboratory` | light / dark | dark |
| `slt-corporate` | dark | dark |
| `admin` | light | light |

```html
<html data-theme="ai-dash" data-color-mode="dark">
```

対応していない組み合わせへ勝手に切り替えません。製品は上表の組み合わせを指定し、Docs site（必要なら社内 Storybook）で結果を確認します。

## CSS の読み込み

全テーマを切り替えるアプリ:

```css
@import '@soundlabbit/design-system/tokens.css';
@import '@soundlabbit/design-system/components.css';
```

単一テーマだけを配信するアプリ:

```css
@import '@soundlabbit/design-system/ai-dash/dark.css';
@import '@soundlabbit/design-system/components.css';
```

## カテゴリ

| カテゴリ | 用途 | 詳細 |
|----------|------|------|
| color | surface、text（link / link-hover 含む）、border、action、feedback、interactive | [colors.md](./colors.md) |
| typography | family、size、weight、line-height の役割 | [typography.md](./typography.md) |
| space / shape / elevation | 余白、角の形状、高さの度合い（semantic 層で公開） | [spacing-motion.md](./spacing-motion.md) |
| motion | duration、easing、reduced motion | [spacing-motion.md](./spacing-motion.md) / [motion-craft.md](./motion-craft.md) |
| breakpoint / z-index / focus | responsive、重なり、keyboard focus | [spacing-motion.md](./spacing-motion.md) |
| component | Button、Input、Dialog、SiteHeader などの局所仕様（例: `site-header.padding-x`、高さ駆動の chrome） | L2 コンポーネント |

DADS の基本デザイン（カラー・タイポグラフィ・余白・角の形状・エレベーション等）との対応関係はデジタル庁デザインシステム（DADS）を参照モデルとする。

## 編集と生成物

`dist/` と型定義は生成物です。正本を変更して再生成します。

```bash
npm run build
npm run check:fast
```

| 出力 | 用途 |
|------|------|
| `dist/{brand}/{mode}/tokens.css` | 単一テーマ import |
| `dist/slt-tokens.css` | 全テーマ bundle |
| `dist/slt-tokens.ts` / `.json` | TypeScript / tool integration |
| `src/types/semantic-tokens.d.ts` | token key type |
| `styles/components.css` | component token を使う共有 CSS |

追加・変更時は全テーマで key が一致すること、参照が解決すること、公開ドキュメントが primitive 値を露出しないことを G0 と docs contract で検証します。

Figma Variables との同期手順は社内正本側の runbook を参照してください。

## Tailwind v4

カスタム `--spacing-*` を `@theme` に定義しません。`max-w-md` など Tailwind の名前空間と衝突します。余白は Tailwind 既定スケールまたは `var(--space-*)` を使います。

導入時の CSS レイヤー順はルート [README](../../README.md#5-分で導入) を参照してください。
