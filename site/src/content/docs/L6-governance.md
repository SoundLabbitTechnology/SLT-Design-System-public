# L6. 運用・ガバナンス

デザインシステムの正本、互換性、公開、改善のルールを定めます。

このリポジトリは **配布ミラー**です。詳細な品質ハーネス・社内 runbook・監査記録は Private リポジトリ側にあります。

## 正本と所有権

| 領域 | 正本 | Owner の責務 |
|------|------|--------------|
| 原則 | `site/src/content/docs/L0-principles.md` | 品質優先順位（恒常原則） |
| Token | semantic / component token source | key 一致、命名、theme mapping |
| Component API | `src/` | behavior、types、a11y、互換性 |
| Pattern / content / quality | `site/src/content/docs/L3`〜`L5` | 製品横断の妥当性 |
| Public docs | `site/src/content/docs/` + site component MDX | 読者 task、ナビ、公開品質 |
| 履歴 | CHANGELOG | なぜ変わったかを残す |

生成物を正本にせず、変更は正本から build します。

## 変更フロー

1. 問題、利用者、影響する theme / product を定義する。
2. 既存 token / component / pattern で解けるか確認する。
3. 変更種別と SemVer 影響を判定する。
4. Private で実装・品質ゲート・レビューを行う。
5. 公開してよい差分を本ミラーへ反映する。
6. `npm run docs:build` を通し、CHANGELOG / version / tag を揃えて公開する。

作業の入口は [CONTRIBUTING](./CONTRIBUTING.md) と [RELEASING](./RELEASING.md) です。

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

削除・改名は代替を先に追加し、最低 1 minor の非推奨期間を基本とします。CHANGELOG に対象、代替、期限を記録します。

## 公開面

| 面 | 公開前 gate | 人間レビュー |
|----|-------------|--------------|
| Package | Private 品質ゲート + 本ミラー `docs:build` | API、SemVer、migration |
| Docs site | `npm run docs:build` | 読者 task、リンク、内容の過不足 |

情報設計の詳細は [DOCUMENTATION](./DOCUMENTATION.md) を参照してください。

## Consumer への提供

自社アプリは本リポの **release tag** を pin して参照します。

```json
"@soundlabbit/design-system": "github:SoundLabbitTechnology/SLT-Design-System-public#v0.4.6"
```

DS 更新後は代表 consumer で CSS import、theme attributes、主要 component の smoke test を行います。

## AI 可読性（公開面）

- semantic / component token のみ参照する。
- `primitives.json` の生値を UI に持ち込まない。
- component を再実装する前に `@soundlabbit/design-system/ui` を探す。
- 導入の入口はルート README と Docs site の getting-started とする。

## 貢献モデル

現段階は中央 owner が token と public API を承認します。提案は issue / PR で受け付け、owner は一貫性・互換性・L0 判断を担います。製品固有の期限だけを理由に共有 API へ例外を入れません。
