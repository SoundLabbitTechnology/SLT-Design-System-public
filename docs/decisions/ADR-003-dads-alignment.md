# ADR-003: デジタル庁デザインシステム（DADS）への参照モデル追従

**Status**: Accepted
**Date**: 2026-07-16

| 項目 | 内容 |
|------|------|
| 影響範囲 | トークン構造・コンポーネント網羅性・a11y 基準・ドキュメント標準（値・既存トークン名は不変） |
| 追従先 | [デジタル庁デザインシステムβ版（DADS）](https://design.digital.go.jp/dads/) |
| ギャップ分析 | [ADR-003](./ADR-003-dads-alignment.md)（本文） / [ROADMAP](../ROADMAP.md) |

## Context

SLT Design System は DADS を参考に設計を始めたが、リポジトリ内に DADS への言及・対応表・バージョン記録は存在しなかった（2026-07-16 時点で `digital.go.jp` / `DADS` / `デジタル庁` の一致 0 件）。DADS は v2 系で基本デザイン 8 カテゴリ・約 50 コンポーネント・npm 配布・AI 可読 Markdown 提供まで進化しており、追従関係を明示しないと差分が発見できない。

SLT は独自ブランド（navy / coral / gold、4 ブランド × 6 テーマモード）を持ち、G0 が全 semantic ファイルのキー同一性を強制するため、DADS の値やパッケージをそのまま採用する構成は取れない。

## Decision

DADS を **参照モデル** として追従する。

1. **値は SLT ブランドを維持**する。DADS から取り込むのは構造（基本デザインのカテゴリ体系）、コンポーネント網羅性、アクセシビリティ基準、ドキュメント標準のみ
2. **アンカーバージョンを本 ADR に記録**し、追従作業は常にアンカーとの差分として計画する
3. **四半期ごとに同期レビュー**を行う（四半期 L0 review #17 と同周期）。確認対象は下表の 5 面。差分があればアンカーを更新し、影響を [ROADMAP](../ROADMAP.md) の優先順位に落とす

### アンカー（2026-07-16 時点）

| 対象 | バージョン | 参照 |
|------|-----------|------|
| DADS 本体（Figma / ドキュメント） | v2.16.0（2026-07-08） | <https://design.digital.go.jp/dads/> |
| `@digital-go-jp/design-tokens` | v2.0.1（2026-05-28） | <https://github.com/digital-go-jp/design-tokens> |
| デザインデータ（Figma） | v2 系 | Figma Community |

### 同期レビューの確認面

| 面 | URL |
|----|-----|
| お知らせ（ドキュメント） | <https://design.digital.go.jp/dads/updates-dads/> |
| お知らせ（デザインデータ） | <https://design.digital.go.jp/dads/updates-design/> |
| お知らせ（コードスニペット） | <https://design.digital.go.jp/dads/updates-code-snippet/> |
| お知らせ（その他） | <https://design.digital.go.jp/dads/updates-misc/> |
| design-tokens リリース | <https://github.com/digital-go-jp/design-tokens/releases> |

## Consequences

- DADS との差分は [CHANGELOG](../../CHANGELOG.md) を初期スナップショットとし、以後の実装フェーズ（基盤整合 → コンポーネント拡充 wave）は ROADMAP で管理する
- 新規コンポーネント・トークン追加時は、DADS に対応物があれば命名・仕様の参照元として DADS を優先する（invent しない）
- アンカー更新（DADS 側のバージョンアップ取り込み）は本 ADR の表を書き換え、CHANGELOG に記録する

## Alternatives considered

1. **`@digital-go-jp/design-tokens` を直接依存に採用** — 却下。政府ブランド値が前提であり、SLT 4 ブランドの primitives 差し替え設計・G0 のキー同一性制約と両立しない
2. **semantic トークン名を DADS 準拠に全面改名** — 却下。全消費者プロダクトへの破壊的変更に見合う便益がない。既存名を維持し、対応はギャップ分析の対応表で担保する
3. **追従せず独自進化** — 却下。a11y 基準・コンポーネント仕様の設計コストを DADS の蓄積で削減できる機会を失う
