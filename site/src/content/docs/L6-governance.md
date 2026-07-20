# L6. 運用・ガバナンス

文書番号: SLT-DS-001 §9

デザインシステムの正本、変更権限、互換性、公開、改善のルールを定めます。

## 正本と所有権

| 領域 | 正本 | Owner の責務 |
|------|------|--------------|
| 原則 | `site/src/content/docs/L0-principles.md`（site 公開・恒常原則） | 品質優先順位。事業戦略は `（社内戦略・非公開）` |
| Token | semantic / component token source | key 一致、命名、theme mapping。[Figma sync](../design-tokens/figma-sync-runbook.md) は Git 正本 |
| Component API | `src/` | behavior、types、a11y、互換性 |
| Pattern / content / quality | `site/src/content/docs/L3`〜`L5` | 製品横断の妥当性 |
| Public docs | `site/src/content/docs/` + site component MDX | 読者 task、ナビ、公開品質 |
| Locale / 用語 | `ja` 正本 + [L4 用語](./L4-terminology.md) | 翻訳 ownership、glossary 同期。ADR-005（Private ADR） |
| Harness | `scripts/harness/` + 本文書群 | 自動化、失敗時の修正可能性 |
| 履歴 | CHANGELOG / ADR / audits | なぜ変わったかを残す |

生成物を正本にせず、変更は正本から build します。

## 変更フロー

1. 問題、利用者、影響する theme / product を定義する。
2. 既存 token / component / pattern で解けるか確認する。
3. 変更種別と SemVer 影響を判定する。
4. 実装、Storybook、Docs site、正本 Markdown を同期する。
5. [L1 harness](./Private ハーネス
6. PR で visual と L0 判断を人間が確認する。
7. CHANGELOG、必要な migration / ADR を追加して公開する。

具体的な作業チェックリストは [CONTRIBUTING](./CONTRIBUTING.md) を参照してください。

## 変更種別

| 種別 | 承認に必要な証拠 |
|------|------------------|
| Token 追加 | 既存語彙では表せない利用例、全 theme mapping |
| Token 値変更 | before / after、contrast、影響 component |
| Component 追加 | 複数 product での需要、API、states、DoD |
| Pattern 昇格 | 実利用、再利用範囲、製品固有 logic の分離 |
| Deprecation / removal | 利用箇所、代替、migration、期限 |
| 原則変更 | 反証記録、適用例、L0 owner の判断 |

## バージョニングと非推奨

Semantic Versioning を採用します。

- patch: 互換性を保つ修正。
- minor: 互換性のある追加、意図した token 値変更。
- major: token key、export、props、既定 behavior の非互換変更。

削除・改名は代替を先に追加し、最低 1 minor の非推奨期間を基本とします。CHANGELOG と migration guide に、対象、代替、期限、codemod の有無を記録します。手順は [RELEASING](./RELEASING.md) が正本です。

## AI 可読性

AI エージェントは [`CLAUDE.md`](../CLAUDE.md) と [`llms.txt`](../llms.txt) を入口にします。

- semantic / component token のみ参照する。
- 非公開 primitive source を読まない、露出しない。
- component を再実装する前に `@soundlabbit/design-system/ui` を探す。
- 変更後は `check:fast`、完了前は `check` を実行する。
- raw value や許可リストで失敗を回避せず、正本へ知識を戻す。

新しい逸脱が見つかったら、文言だけで警告せず可能な限り harness rule を一つ追加します。

## 例外

例外は最小範囲・期限付きにします。

1. code に `@harness-allow: <reason> <expiry/issue>` を記録する。
2. CHANGELOG または issue に影響と解消条件を残す。
3. 同種例外が 3 回発生したら token / component / pattern の不足として再設計する。
4. 期限切れ例外は release blocker とする。

## 公開面

| 面 | 公開前 gate | 人間レビュー |
|----|-------------|--------------|
| Package | build、G0〜G2、isotc | API、SemVer、migration |
| Storybook | G3、static build、G4 | state、theme、visual |
| Docs site | docs contract、static build | 読者 task、リンク、内容の過不足 |

情報設計の詳細は [DOCUMENTATION](./DOCUMENTATION.md) を参照してください。

## 運用 cadence

| 頻度 | ループ | 出力 |
|------|--------|------|
| 変更ごと | L1 generation | green gates、自己修正された変更 |
| PR / main | L2 integration | CI、visual review、公開 artifact |
| 週次 / release ごと | L3 operations | `npm run metrics -- --since=1.week.ago --save`、alerts / trend review、3× override backlog（[Runbook](./Private ハーネス
| release / DS bump 後 | G5 consumer | 代表 consumer で Lighthouse + E2E smoke を 1 回（product 実施、DS はテンプレ維持） |
| 四半期 | L4 principles | 公開 L0（恒常原則）と DADS 同期のレビュー（下記）。事業戦略の反証は `（社内戦略・非公開）` |

現在の完了事項と未完了事項は [ROADMAP](./ROADMAP.md) にだけ保持し、本書へ時点依存の進捗表を複製しません。

## 四半期ガバナンスクラスタ

技術ドキュメントの健全性レビューを **2 セッション**で構成する。**#17（L0 公開原則）と [#35](（Private issue）)（DADS）は同一四半期・同一週内**に実施する。順序は L0 → DADS を推奨。

| 項目 | 内容 |
|------|------|
| Cadence | 暦四半期の第 1 営業週（1 月 / 4 月 / 7 月 / 10 月） |
| 初回実施 | **2026-Q3** — 2026-07-21 週（月曜起算） |
| Issue | [#17 L0 review](（Private issue）) / [#35 DADS sync](（Private issue）) |
| 問いの正本（公開） | [L0 恒常原則](./L0-principles.md) / [L4 原則ループ（技術）](./Private ハーネス
| 事業戦略の反証 | （社内戦略・非公開）（社内方針）（Private・二リポ運用（Private 正本）） |
| 記録先 | `site/src/content/docs/audits/`（日付付き Markdown）、必要時は ADR / CHANGELOG |

### 参加者

| 役割 | 責務 |
|------|------|
| **Facilitator**（DS owner） | アジェンダ進行、記録、PR / issue 起票 |
| **L0 owner** | 公開恒常原則 A の維持・変更拒否、Laws of UX 対応表の妥当性 |
| **Product 代表** | 公開 API / テーマ利用上の問題の証拠提示 |
| **任意: Design / Eng** | 実装コスト・DADS 差分の技術評価 |

恒常原則（A）と a11y 最低ラインは本セッションで緩和しない。

---

### Runbook: 四半期 L0 公開原則レビュー（[#17](（Private issue）)）

[公開 L0](./L0-principles.md) と ADR-004（Laws of UX）（Private ADR） アンカーの確認。事業投資・製品ロードマップの反証は （社内戦略・非公開）（社内方針） 側で行う。

#### アジェンダ（60 分目安）

| # | 議題 | 参照 | 時間 |
|---|------|------|------|
| 1 | 前回アクションの確認 | 直近 `site/src/content/docs/audits/` | 10m |
| 2 | 恒常原則 A と実装・DoD のずれ | [L0](./L0-principles.md)、[DoD](./L2-components/dod.md) | 15m |
| 3 | Laws of UX アンカー差分 | [lawsofux.com](https://lawsofux.com/)、ADR-004（Private ADR） | 15m |
| 4 | Public 移行対象の機微混入チェック | 二リポ運用（Private 正本） | 10m |
| 5 | 決定と次アクション | ROADMAP / issue 起票 | 10m |

#### 成果物

| 出力 | 条件 |
|------|------|
| `site/src/content/docs/audits/l0-quarterly-review-YYYY-MM-DD.md` | **毎回** — 公開原則側の証拠・判断・未決（事業戦略の詳細は書かない） |
| `site/src/content/docs/L0-principles.md` 更新 PR | 恒常原則 A・ブランド表現表に変更があるとき |
| ADR-004（Private ADR） 更新 PR | Laws of UX 側に追記・改名があり対応表へ影響するとき |
| [ROADMAP](./ROADMAP.md) 更新 | DS 技術投資・延期があるとき |
| GitHub issue | 実装 backlog（token / component / pattern）が出たとき |

原則を**変更しない**四半期でも監査 Markdown は残す（「変更なし」と明記）。

---

### Runbook: 四半期 DADS 同期レビュー（[#35](（Private issue）)）

ADR-003（Private ADR） アンカーと DADS 側更新の差分棚卸し。初期スナップショットは dads-alignment-audit-2026-07-16（社内監査）。

**#17 と同週内**に実施する（推奨: L0 セッションの翌営業日）。

#### 確認対象（5 面）

前回レビュー日（または ADR-003 アンカー日）以降の更新のみを対象とする。

| # | 面 | URL |
|---|-----|-----|
| 1 | お知らせ（ドキュメント） | <https://design.digital.go.jp/dads/updates-dads/> |
| 2 | お知らせ（デザインデータ） | <https://design.digital.go.jp/dads/updates-design/> |
| 3 | お知らせ（コードスニペット） | <https://design.digital.go.jp/dads/updates-code-snippet/> |
| 4 | お知らせ（その他） | <https://design.digital.go.jp/dads/updates-misc/> |
| 5 | design-tokens リリース | <https://github.com/digital-go-jp/design-tokens/releases> |

#### Diff 手順

| Step | Action |
|------|--------|
| 1 | 上表 5 URL を開き、前回レビュー日以降のエントリを一覧化する |
| 2 | 各エントリを 監査の観点 A〜D（社内監査） に分類する（トークン構造 / コンポーネント / a11y / ドキュメント） |
| 3 | 既存 SLT コンポーネントへの**差分追従**（例: Input Readonly、Table 行選択）と**新規ギャップ**を分ける |
| 4 | 新規ギャップはティア（P0 / P1 / P2 / 保留）を付け、需要の有無を product 代表と確認する |
| 5 | 差分なしの場合も「変更なし」を記録する |

#### 差分発見時の反映ルール

| 影響 | 更新先 |
|------|--------|
| DADS 本体・tokens のバージョン変更 | ADR-003（Private ADR） のアンカー表 + [CHANGELOG](../CHANGELOG.md) |
| 既存コンポーネントの仕様差分 | 実装 issue（優先: 対応済み 9 種の差分追従） |
| 新規コンポーネント（需要あり） | [#34 wave 3 backlog](（Private issue）) へ追記、または単体 issue |
| 新規コンポーネント（需要なし） | 監査に「保留」と記録。ROADMAP は変更不要 |
| トークン構造・a11y 方針 | [ROADMAP](./ROADMAP.md) 優先表 / 新規 issue。実装は L1 harness green を維持 |
| 名称変更・用語 | [L4 用語集](./L4-terminology.md) 対応表を検討（[#38](（Private issue）) と連携可） |

#### 成果物

| 出力 | 条件 |
|------|------|
| `site/src/content/docs/audits/dads-sync-review-YYYY-MM-DD.md` | **毎回** — 5 面の差分一覧、ティア付け、判断 |
| ADR-003 / CHANGELOG PR | アンカーバージョンが変わったとき |
| [#34](（Private issue）) または新規 issue | 実装 backlog が出たとき |
| [ROADMAP](./ROADMAP.md) 更新 | 優先順位・フェーズ状態が変わったとき |

親トラッカー: [#30 DADS Phase A〜E](（Private issue）)。

---

### G5 — 代表消費者検証（[#37](（Private issue）)）

L5 の product 層品質を代表 consumer で継続検証する。DS 本体はテンプレと ownership の正本、実行は product repo。

| 項目 | 内容 |
|------|------|
| Issue | [#37 G5](（Private issue）)（前史 [#3](（Private issue）)） |
| 代表 | AI-Dash（P1）、Homepages（P1） |
| 正本 | G5 consumer Runbook（社内 adoption） |
| テンプレ | [`templates/consumer-g5/`](../templates/consumer-g5/) |
| L3 連携 | 週次 metrics Step 5 と併用（`designSystemImportLines` + 定性メモ） |

#### 参加者

| 役割 | 責務 |
|------|------|
| **Product CI 担当**（各 consumer） | workflow 維持、失敗 triage、E2E 更新 |
| **DS Facilitator** | テンプレ・閾値・Runbook、DS 起因 regression の修正 |
| **DS component owner** | a11y / performance regression が component に起因する場合の patch |

#### Runbook 要約

1. consumer に `templates/consumer-g5/` をコピーし代表 URL を設定する。
2. PR または release 前に Lighthouse CI を green にする（performance は初回 warn 可）。
3. E2E smoke 必須 3 本（[checklist](../templates/consumer-g5/e2e-smoke-checklist.md)）を CI に載せる。
4. 失敗時は ownership 表（社内 adoption）で DS / product を切り分ける。
5. 週次 L3 で metrics とあわせ、consumer の例外・閾値緩和を issue に記録する。

初回 consumer green までのブロッカーは **consumer repo への PR**（本 DS リポジトリ外）。完了後 [#37](（Private issue）) に repo 名・workflow・代表 URL を記録する。

---

### i18n / 用語拡張（[#38](（Private issue）)）

方針の正本は ADR-005（Private ADR）。ここでは運用で参照する要約と、最初の locale 拡張チェックリストだけを置く。

| 項目 | 内容 |
|------|------|
| 正本 locale | **`ja`**（docs / L4 定義 / Storybook 既定 / コンポーネント既定 accessible name） |
| 最初の拡張 | **`en`** — [#39](（Private issue）) |
| 識別子 | export 名・token key・props 名は **翻訳しない**（英語固定） |

#### 翻訳 ownership

| 面 | Owner | 備考 |
|----|-------|------|
| L0〜L6 / Docs site 本文 | DS docs | 当面 `ja` のみ。全文 `en` は需要後 |
| L4 横断用語 | DS content | `ja` 定義正本。`en` 列は #39 で追加可 |
| Storybook | DS components | 当面 `ja`。i18n addon は必須化しない |
| コンポーネント既定文言 | DS components | `ja` 既定 + product が props で override |
| 製品 UI・機能名 | **Product** | product glossary。横断化時のみ L4 へ昇格 |

#### L4 / product glossary 同期

1. 横断語の追加・改名は [L4 用語](./L4-terminology.md) の手順に従う。
2. 製品固有名は L4 に入れない。昇格時は影響検索と CHANGELOG を必須とする。
3. DADS 名称変更は四半期 [#35](（Private issue）) の差分ルール経由で L4 対応表を更新する。
4. `en` 列がある語は、`ja` 定義変更と同じ PR で訳を揃える（後追い差分を残さない）。

#### 最初の locale 拡張チェックリスト（`en` / #39）

| # | Check |
|---|-------|
| 1 | ADR-005 の境界（やること / やらないこと）を issue 本文に再掲している |
| 2 | [L4-terminology.md](./L4-terminology.md) に `en` 推奨訳列（または同等の対応表）を追加する案がある |
| 3 | 共有コンポーネントの既定文言 inventory（aria-label 等）を列挙する |
| 4 | override 不能な hardcoded 文言があれば props 化の PR 範囲を切っている |
| 5 | Docs / Storybook は翻訳しない、またはパイロット 1 ページまでに限定している |
| 6 | product glossary との差分確認担当（DS content + product 1 名）を明記している |
| 7 | 完了後に ROADMAP の i18n 行を「`en` 用語列 + inventory 済」等へ更新する |

フル locale 実装（アプリ枠・ICU・切替 UI）は本セクションの範囲外。需要が来たら別 issue。

---

### 四半期セッション後チェックリスト

| # | Check |
|---|-------|
| 1 | L0 監査 Markdown が `site/src/content/docs/audits/` にコミットされている |
| 2 | DADS 監査 Markdown が `site/src/content/docs/audits/` にコミットされている |
| 3 | 変更があった場合、ADR / L0 / ROADMAP / CHANGELOG が同期されている |
| 4 | [#17](（Private issue）) / [#35](（Private issue）) に実施日とリンクをコメントした |
| 5 | 次回四半期（cadence 表の次の月第 1 週）をカレンダーに登録した |

## 貢献モデル

現段階は中央 owner が token と public API を承認します。外部 contributor は issue / PR を通じて提案でき、owner は一貫性、互換性、L0 判断を担います。製品固有の期限だけを理由に共有 API へ例外を入れません。
