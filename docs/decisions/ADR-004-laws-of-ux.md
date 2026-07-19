# ADR-004: Laws of UX を UX 参照モデルとする

**Status**: Accepted  
**Date**: 2026-07-16

| 項目 | 内容 |
|------|------|
| 影響範囲 | L0 品質判断の根拠付け、L3 パターン、L2 guides / DoD（値・既存トークン名は不変） |
| 追従先 | [Laws of UX](https://lawsofux.com/)（Jon Yablonski） |
| 内部ノート | （社内メモは本ミラー外。公開 ADR には私有 Notebook リンクを置かない） |
| 対応表 | [L0 原則](../L0-principles.md#ux-参照モデルlaws-of-ux) / [L3 パターン](../L3-patterns.md#ux-参照モデルlaws-of-ux) |

## Context

SLT Design System は [ADR-003](./ADR-003-dads-alignment.md) で DADS を **構造・網羅・a11y・ドキュメント標準** の参照モデルとした。一方、認知負荷・意思決定・操作のしやすさといった **UX 心理原則** は L0 恒常原則（A-1 明瞭さ等）に散在し、法則名と L2 / L3 の対応が明示されていなかった。

[Laws of UX](https://lawsofux.com/) は Fitts / Hick / Jakob / Doherty / Gestalt / Postel 等を実務向けに整理した公開リファレンスである。ブランド値やトークン名を置き換えるものではなく、パターンとガイドの「なぜそうするか」を共通語彙に落とすのに適する。

## Decision

Laws of UX を **UX 参照モデル** として採用する。

1. **値・トークン名・ブランド表現は SLT を維持**する。Laws of UX から取り込むのは認知・操作・フィードバックの判断基準と、L2 / L3 への落とし込み方のみ
2. **DADS（ADR-003）と役割を分ける** — DADS = 構造・網羅・a11y・ドキュメント標準 / Laws of UX = 利用心理とインタラクション品質
3. **正本の対応表**は L0（恒常原則との接続）と L3（パターンへの適用）に置く。個別コンポーネントの Do / Don't は [L2 guides](../L2-components/guides.md) が詳細を持つ
4. **アンカー**を本 ADR に記録し、四半期 L0 review（#17）と同周期で差分を確認する。差分があれば ROADMAP に落とす

### アンカー（2026-07-16 時点）

| 対象 | 参照 |
|------|------|
| Laws of UX（公開サイト） | <https://lawsofux.com/> |

### 初期適用の優先順位（実装 backlog）

| 優先 | 法則 | SLT での次アクション | 状態 |
|------|------|----------------------|------|
| P1 | Law of Proximity | Form field の label↔control 近接 / 項目間ギャップを L3・`.slt-field-stack` で標準化 | 反映済み（2026-07-16） |
| P1 | Von Restorff / Hick | Primary は 1 ビュー 1 つを DoD / guides で強制、Button 階層のコントラストを維持 | 反映済み（2026-07-16） |
| P2 | Doherty Threshold | Toast / Dialog / loading の duration を &lt;400ms 方針で棚卸し、L3 非同期パターンに明記 | 方針反映済み（実装は fast/base 利用を維持） |
| P2 | Jakob's Law | SiteHeader 等の慣習レイアウトを維持（[ADR-002](./ADR-002-site-header-slots.md)） | 維持 |
| P3 | Postel's Law | Input の入力寛容さはガイド化（正規化は主に consumer） | ガイド反映済み（2026-07-16） |

## Consequences

- 新規パターン・コンポーネントガイドを書くとき、該当する Laws of UX があれば対応表または guides から参照する（invent した独自心理用語を増やさない）
- L0 A-1（明瞭さ）・A-4（人間が主役）と矛盾する場合は L0 が優先。Laws of UX は A 層を補強する参照であり、組織の事業戦略文書を上書きしない
- 見た目の流行や「法則のための装飾」を理由にトークン値やブランドを変更しない
- アンカー更新は本 ADR の表を書き換え、CHANGELOG に記録する

## Alternatives considered

1. **Laws of UX を L0 恒常原則そのものに昇格** — 却下。L0 は MVV / Core Values 由来の会社固有優先順位。外部リファレンスを恒常原則に混ぜると四半期反証と所有が曖昧になる
2. **DADS だけで UX も賄う** — 却下。DADS は行政 UI の構造・a11y に強く、認知心理の共通語彙としては Laws of UX の方が明示的
3. **追従せず属人判断のまま** — 却下。ガイド・レビュー・AI 生成 UI の根拠が再現できない
