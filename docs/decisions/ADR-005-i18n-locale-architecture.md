# ADR-005: i18n / locale アーキテクチャ

**Status**: Accepted  
**Date**: 2026-07-16

| 項目 | 内容 |
|------|------|
| 影響範囲 | Docs / Storybook / 共有 UI 文言の正本言語、用語集、翻訳 ownership（値・トークン名・API 名は不変） |
| Issue | #38 |
| 運用面 | [L6 ガバナンス — i18n](../L6-governance.md#i18n--用語拡張) / [L4 用語](../L4-terminology.md) / [L4 コンテンツ](../L4-content.md) |
| 次の実装 | 最初の locale 拡張（`en`）は #39 |

## Context

SLT Design System の正本 Markdown（L0〜L6）、Docs site、Storybook、コンポーネント既定の accessible name は **日本語（`ja`）** で書かれている。消費者プロダクトは将来 `en` 等の locale を要する可能性があるが、DS 側に locale 優先順位・翻訳 ownership・用語同期ルールが未定義だと、次の問題が起きる。

1. 製品 glossary と [L4 用語集](../L4-terminology.md) が分岐する
2. Docs / Storybook / package 既定文言のどれを誰が翻訳するか不明になる
3. 「フル locale 実装」を待たずに起票できる最初の拡張 issue が作れない

本 ADR は **フル i18n 実装をしない**前提で、方針と最初の拡張チェックリストだけを固定する。

## Decision

### 1. Locale 優先順位

| 優先 | Locale | 役割 |
|------|--------|------|
| 0（正本） | `ja` | すべての DS 正本（`docs/`、L4 用語の定義列、Storybook 既定、コンポーネント既定 accessible name） |
| 1（最初の拡張） | `en` | 製品・対外向けに必要な面だけを段階翻訳。`ja` と意味を揃える |
| 2+ | 需要確定後 | ROADMAP / 単独 issue。正本は常に `ja` |

- BCP 47 タグを使う（`ja` / `en`。地域差が必要なときだけ `en-US` 等を明示）。
- 日付・数値・通貨は文言連結せず locale formatter（[L4 コンテンツ](../L4-content.md#日付数値多言語)）。

### 2. 翻訳 ownership（DS vs product vs docs）

| 面 | Owner | 正本 / 置き場所 | 翻訳対象か |
|----|-------|-----------------|------------|
| L0〜L6 原則・運用 | DS docs | `docs/**/*.md` | **当面 `ja` のみ**。`en` は需要確定後に別 issue（全文翻訳は必須にしない） |
| L4 横断用語 | DS content | [L4-terminology.md](../L4-terminology.md) | `ja` 定義が正本。`en` 列は用語拡張時に追加 |
| Docs site ナビ / ページ | DS docs | `site/` は `docs/` を読む | `ja` 正本。locale 切替 UI は #39 以降 |
| Storybook ストーリー・MDX | DS components | `*.stories.tsx` / `stories/` | **当面 `ja` のみ**。addon-i18n は導入しない（需要後） |
| コンポーネント既定文言（aria-label 等） | DS components | `src/components/` | `ja` 既定を維持。override props で product が差し替え可能にする |
| 製品 UI 文言・機能名 | **Product** | 各 product repo / product glossary | 製品固有。横断語のみ L4 へ昇格 |
| パッケージ公開名（export / token key） | DS | `src/` / semantic keys | **翻訳しない**（コード識別子は英語固定） |

原則: **正本は一つ（`ja`）**。翻訳面は閲覧・配布の派生であり、意味の変更は正本 PR で行う。

### 3. L4 用語 / product glossary 同期

| 語彙の種類 | 正本 | 同期ルール |
|------------|------|------------|
| 横断 UI・AI 体験語 | [L4-terminology.md](../L4-terminology.md) | DS が承認。product は参照のみ |
| ブランド表示名 | L4「ブランド表示」+ `BRAND_DISPLAY_NAMES` | コードと表を同時更新 |
| 製品固有機能名 | product glossary | L4 に持ち込まない。横断化したときだけ L4 へ PR |
| DADS 由来の日本語正式名 | L4 + 四半期 #35 | 名称変更は L4 対応表を更新（[L6 DADS Runbook](../L6-governance.md#差分発見時の反映ルール)） |

変更手順の詳細は [L4 用語 — 追加・変更・locale 同期](../L4-terminology.md#追加変更locale-同期)。

### 4. 最初の locale 拡張（`en`）の境界

#39 で実施してよい範囲:

- L4 用語表への `en` 推奨訳列（定義の正本は `ja` のまま）
- 共有コンポーネントの **override 可能な** 既定文言一覧（inventory）と、必要な props 整備
- Docs / Storybook は **翻訳しない**か、パイロット 1 ページまでに限定

[#39] でやらないこと:

- 全 Docs / 全 Story の機械翻訳
- トークン名・props 名の多言語化
- Storybook i18n addon の必須化
- product アプリ本体の i18n フレームワーク選定（product 責務）

## Consequences

- AI / 人間は UI 文言を invent せず、まず L4 用語と本 ADR の ownership 表を見る
- `en` 需要が来たら [#39] のチェックリストに従い、正本 `ja` を壊さず列・inventory から着手する
- コンポーネント既定の日本語 accessible name は a11y 上の意図的既定であり、英語 UI の product は props で上書きする
- 四半期 DADS 同期で名称が動いたら L4 を更新し、翻訳列がある場合は同 PR で揃える

## Alternatives considered

1. **正本を英語にする** — 却下。既存正本・採用製品・DADS 日本語名との整合が崩れる
2. **今すぐフル i18n（ICU / next-intl 等）を DS に入れる** — 却下。消費者が枠を持っており、DS は横断語彙と override 可能な既定に留める
3. **Docs と Storybook を同時に全翻訳** — 却下。保守コストが正本同期を壊す。用語列と inventory を先にする
