# L1. デザイントークン標準

文書番号: SLT-DS-001 §4

正本: [`design-tokens/`](../../design-tokens/)

判断の上位: [L0 原則](../L0-principles.md)

## 目的

トークンは、ブランドやモードが変わっても同じ用途名で UI を実装するための契約です。値を選ぶ仕組みと、値を使うコードを分離します。

## 3 層アーキテクチャ

| 層 | 役割 | UI / AI からの参照 |
|----|------|--------------------|
| Primitive | ビルド内部の生値とスケール | 禁止 |
| Semantic | `color.action.primary` など用途を表す共有語彙 | 標準 |
| Component | `button.primary.bg` など部品固有の決定 | component 実装で使用 |

Primitive source は semantic を構築する内部実装です。UI、文書のコード例、AI エージェントは読み取り・参照・転載をしません。

## 参照の選び方

1. 画面やパターンでは semantic token を使う。
2. 共有 component の内部では component token を優先する。
3. 既存語彙で意図を表せない場合、raw 値で回避せず token 追加を提案する。
4. 同種の上書きが 3 回現れたら semantic token または component 化を検討する。

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

## ブランド × カラーモード

| Theme ID | Mode | 既定 |
|----------|------|------|
| `ai-dash` | light / dark | dark |
| `sound-laboratory` | light / dark | dark |
| `slt-corporate` | dark | dark |
| `admin` | light | light |

```html
<html data-theme="ai-dash" data-color-mode="dark">
```

未対応の組み合わせへ暗黙にフォールバックさせません。製品は上表の対応 mode を指定し、Storybook と Docs site では切替結果を確認します。

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
| component | Button、Input、Dialog、SiteHeader などの局所仕様（例: `site-header.padding-x`、高さ駆動の chrome） | [L2 コンポーネント](../L2-components/README.md) |

DADS の基本デザイン（カラー・タイポグラフィ・余白・角の形状・エレベーション等）との対応関係は [ADR-003](../decisions/ADR-003-dads-alignment.md) と ギャップ分析（社内監査） を参照してください。

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

Figma Variables との同期手順は [design-tokens/figma-sync-runbook.md](../../design-tokens/figma-sync-runbook.md)（[#15](（Private issue）)）。

## Tailwind v4

カスタム `--spacing-*` を `@theme` に定義しません。`max-w-md` など Tailwind の名前空間と衝突します。余白は Tailwind 既定スケールまたは `var(--space-*)` を使います。

導入時の CSS レイヤー順はルート [README](../../README.md#5-分で導入) を参照してください。
