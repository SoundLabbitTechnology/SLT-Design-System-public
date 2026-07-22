# L6. 運用・ガバナンス

## このページの読み方

誰が何を正本とし、どう変更・公開するかを定めた**社内運用**のページです。
貢献（コードや文書の変更）は **Sound Labbit Technology の社内メンバーのみ**です。外部からの Issue / PR は受け付けません。用語は [用語と命名](./L4-terminology.md#基盤運用用語) を参照してください。

## 正本と所有権

| 領域 | 正本 | Owner の責務 |
|------|------|--------------|
| 原則 | `site/src/content/docs/L0-principles.md`（site 公開・恒常原則） | 品質優先順位。事業戦略は社内正本 |
| Token | semantic / component token source | key 一致、命名、theme mapping。Figma sync は Git 正本 |
| Component API | `src/` | behavior、types、a11y、互換性 |
| Pattern / content / quality | `site/src/content/docs/L3`〜`L5` | 製品横断の妥当性 |
| Public docs | `site/src/content/docs/` + site component MDX | 読者 task、ナビ、公開品質 |
| Locale / 用語 | `ja` 正本 + [L4 用語](./L4-terminology.md) | 翻訳 ownership、glossary 同期 |
| Harness | `scripts/harness/` + 本文書群 | 自動化、失敗時の修正可能性 |
| 履歴 | CHANGELOG | なぜ変わったかを残す |

生成物を正本にせず、変更は正本から build します。

## 変更フロー

1. 問題、利用者、影響する theme / product を定義する。
2. 既存 token / component / pattern で解けるか確認する。
3. 変更種別と SemVer 影響を判定する。
4. 実装、Storybook、Docs site、正本 Markdown を同期する。
5. 品質ハーネス を green にする。
6. PR で visual と L0 判断を人間が確認する。
7. CHANGELOG、必要な migration を追加して公開する。

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
| 週次 / release ごと | L3 operations | `npm run metrics -- --since=1.week.ago --save`、alerts / trend review、3× override backlog（品質ハーネス）、G5 失敗の triage（G5 Runbook） |
| release / DS bump 後 | G5 consumer | 代表 consumer で Lighthouse + E2E smoke を 1 回（product 実施、DS はテンプレ維持） |
| 四半期 | L4 principles | 公開 L0（恒常原則）と DADS 同期のレビュー（下記）。事業戦略の反証は社内正本側 |

進捗の時点情報は CHANGELOG を参照してください。

## 四半期レビュー

公開の恒常原則（L0）とデジタル庁デザインシステム（DADS）への参照差分を、四半期ごとに確認します。詳細なアジェンダ・監査記録・issue 運用は社内正本側で行います。

## 貢献モデル

現段階は中央 owner が token と public API を承認します。変更の提案・実装は **org メンバー（社内）のみ**とし、外部コラボレータを増やしません。要望は社内チャネル経由で受け、owner は一貫性、互換性、L0 判断を担います。製品固有の期限だけを理由に共有 API へ例外を入れません。
