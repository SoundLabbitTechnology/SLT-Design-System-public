# 余白・形状・エレベーション・モーション

正本: [`design-tokens/`](../../design-tokens/) の semantic / component 層

## 基本原則

- レイアウトの余白は `space.*` を使い、意味のない任意値を増やさない。
- コンポーネント内部は component トークンを優先し、利用側から寸法を上書きしない。
- 形状と影は情報階層を伝えるために使い、装飾だけの段階を追加しない。
- 動きは状態変化の理解を助ける場合に限定し、`prefers-reduced-motion` を尊重する。

## トークンカテゴリ

| カテゴリ | 参照例 | 用途 |
|----------|--------|------|
| 余白 | `var(--space-md)` | gap、padding、margin。`space.xs`〜`space.2xl` の semantic ラベル |
| 角の形状 | `var(--shape-radius-md)` | Card、Input、Dialog。`shape.radius-sm`〜`shape.radius-full` |
| エレベーション | `var(--elevation-raised)` | 浮いた面、オーバーレイ。`elevation.raised` / `overlay` / `modal` |
| モーション | `var(--motion-duration-fast)` | hover、開閉、フィードバック |
| 重なり順 | `var(--z-index-overlay)` | header、dialog、toast |
| ブレークポイント | `breakpoint.*` | レスポンシブ境界の共有 |
| フォーカス | `var(--focus-ring-width)` | キーボードフォーカス |

余白・角の形状・エレベーションは semantic 層（`design-tokens/semantic.*.json`）で全 theme 共通のラベルとして公開しています。primitives の生スケール（`radius.sm` など）は内部実装であり、UI からは semantic ラベル経由で参照してください。DADS の「余白」「角の形状」「エレベーション」カテゴリとの対応はデジタル庁デザインシステム（DADS）を参照モデルとする。

## 余白の使い分け

| 粒度 | 主な用途 |
|------|----------|
| 小 | アイコンとラベル、密接なフィールド補助文 |
| 中 | コンポーネント内部、同一セクション内の要素 |
| 大 | セクション間、ページの主要領域 |

同じ関係には同じ余白を使います。見た目を合わせるためだけに任意値を足すのではなく、階層かコンポーネント境界を見直してください。

サイト共通ヘッダー（`SiteHeader`）は sticky full-bleed + 内側バーが正本です。縦は `site-header.height`（64px）と flex 中央寄せ、横だけ `padding-x`（`space.md`）。本文と揃えるときは `contentMaxWidth` と `--site-header-padding-x`（Docs の `--docs-content-max` / `--docs-gutter`）を使います。

フォームは Law of Proximity に沿い、`.slt-field` 内を密に、`.slt-field-stack` で項目間を `space.md` 以上にします。

## Tailwind v4

カスタム `--spacing-*` を `@theme` に追加しません。`max-w-md` など Tailwind の同名名前空間と衝突するためです。Tailwind の既定スケール、または `var(--space-*)` を使います。

## 形状とエレベーション

- 同一階層で角丸や影を混在させない。
- `Dialog` / `Toast` などオーバーレイの重なり順は component 実装に委ねる。
- Card の入れ子で影を重ねない。境界線や余白でグルーピングできるかを先に検討する。
- `glass` は暗色のブランド表現に限定し、可読性を [L5 品質基準](../L5-quality.md) で確認する。

## モーション

| 状況 | 方針 |
|------|------|
| hover / focus | `motion.duration.fast`。操作結果を妨げない |
| Dialog / Toast / drawer | `fast` または `base`（いずれも &lt;400ms）。Doherty Threshold |
| loading | 即時に busy 状態へ。1 秒以上は Skeleton。進捗が分かる場合は進捗表示を優先 |
| 装飾背景 / Skeleton pulse | `slow` 可。操作待ちには使わない |
| reduced motion | 意味を失わない範囲で停止または即時遷移 |

インタラクティブなフィードバックでユーザーを 400ms 以上待たせない。`prefers-reduced-motion: reduce` では、意味を失わない範囲でアニメーションを停止または即時遷移にします。

入退場は `var(--motion-easing-decelerate)`、ease-in（accelerate）は使わない、頻度が高い操作は動かさない、など **クラフト判断** の正本は [motion-craft.md](./motion-craft.md) です（出典: [emilkowalski/skills](https://github.com/emilkowalski/skills)）。

## レスポンシブとタッチ

- 操作要素は最小 44px のターゲットを確保する。
- ブレークポイントの前後で情報や操作を欠落させない。
- モバイル専用とデスクトップ専用で同じリンクやアクションを二重管理しない。
- 横スクロールが必要な Table は、列の優先順位と代替表示を検討する。

Docs site（`npm run docs:dev`）では `/foundations/spacing/` で、現在のテーマに解決されたトークンを確認できます。

## アイコン配置

DADS は文書構造内でアイコンが使われる位置ごとに仕様を分けています（[DADS 基本デザイン/アイコン](https://design.digital.go.jp/dads/foundations/)）。SLT では専用トークンは未整備ですが、実装時は以下の原則に従います。

| 位置 | 原則 |
|------|------|
| ラベル前後（ボタン・タブ等） | テキストと同じ `color.text.*` を継承し、単独で意味を持たせない |
| スタンドアロン（アイコンのみの操作） | `aria-label` を必須にし、44px タップターゲットを確保する |
| 装飾（見出し補助等） | `aria-hidden="true"` で支援技術から隠す |
| ステータス表示 | `color.feedback.*` と組み合わせ、色だけに依存しない（テキストラベル併記） |

アイコンサイズの semantic トークン化は DADS コンポーネント拡充 の実装時に合わせて検討します。

## レイアウト原則

- グリッド・コンテナ幅は `breakpoint.*` を基準に統一し、画面ごとに任意値を作らない。
- 情報の優先順位に沿って配置し、視覚的な近さと意味的な関係を一致させる。
- レスポンシブ切り替えで情報や操作を欠落させない（[余白の使い分け](#余白の使い分け)、[レスポンシブとタッチ](#レスポンシブとタッチ) を参照）。

詳細なグリッドシステムのトークン化は DADS 追従 Phase B 残タスク で扱います。
