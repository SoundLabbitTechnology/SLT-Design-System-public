# SLT Design System — ドキュメント索引

このディレクトリは、SLT Design System の設計判断と運用ルールの正本です。Docs site と Storybook は、この正本を用途別に見せる閲覧面です。

Docs site は **当面ローカル運用**（`npm run docs:dev`）。固定の公開 URL は使いません（再開時は #28）。

## 迷ったときの入口

| 読者 / 目的 | 最初に読む | 次に読む |
|-------------|------------|----------|
| プロダクトへ導入する | [ルート README](../README.md#5-分で導入) | [L1 トークン](./L1-foundations/tokens.md) / [L2 コンポーネント](./L2-components/README.md) |
| UI を設計・実装する | [L0 原則（公開）](./L0-principles.md) | [L3 パターン](./L3-patterns.md) / [L4 コンテンツ](./L4-content.md) / [L5 品質](./L5-quality.md) |
| 公開ミラーの位置づけ | [MIRROR](./MIRROR.md) | [DOCUMENTATION](./DOCUMENTATION.md) |
| コンポーネントを追加する | [CONTRIBUTING](./CONTRIBUTING.md) | [L2 DoD](./L2-components/dod.md) / [Storybook 標準](./L2-components/storybook.md) |
| リリースする | [RELEASING](./RELEASING.md) | [L6 ガバナンス](./L6-governance.md) / [CHANGELOG](../CHANGELOG.md) |
| AI エージェントで変更する | [CLAUDE.md](../CLAUDE.md) | [ハーネスとループ](./L6-harness-and-loops.md) / [DOCUMENTATION](./DOCUMENTATION.md) |
| 現在地と次の投資を知る | [ROADMAP](./ROADMAP.md) | [CHANGELOG](../CHANGELOG.md) / [ADR](./decisions/) |

## 正本と閲覧面

| 面 | 責務 | 正本にしないもの |
|----|------|------------------|
| [`docs/`](./) | 原則、仕様、ガイド、運用 | ライブデモ |
| Docs site（`site/`・ローカル） | 導入・基盤・利用ガイド | コンポーネント挙動の網羅テスト |
| Storybook | props、状態、操作、テーマ、a11y | ガバナンス全文 |
| [`design-tokens/`](../design-tokens/) | DTCG トークンの機械可読な正本 | 説明文や利用判断 |
| [`src/`](../src/) | React API と挙動の正本 | 設計意図 |

編集責務は [DOCUMENTATION.md](./DOCUMENTATION.md) を参照してください。

## 7 レイヤー

| レイヤー | 正本 | 主な内容 |
|----------|------|----------|
| L0 原則 | [L0-principles.md](./L0-principles.md) | 品質判断の優先順位 |
| L1 基盤 | [tokens](./L1-foundations/tokens.md) / [colors](./L1-foundations/colors.md) / [typography](./L1-foundations/typography.md) / [spacing & motion](./L1-foundations/spacing-motion.md) / [motion craft](./L1-foundations/motion-craft.md) | トークン、テーマ、モーション |
| L2 部品 | [L2-components/README.md](./L2-components/README.md) | API、使用判断、DoD、Storybook |
| L3 パターン | [L3-patterns.md](./L3-patterns.md) | フォーム、状態、AI、データ、ナビ |
| L4 コンテンツ | [L4-content.md](./L4-content.md) / [L4-terminology.md](./L4-terminology.md) | ボイス、用語 |
| L5 品質 | [L5-quality.md](./L5-quality.md) | a11y、テスト、性能 |
| L6 運用 | [L6-governance.md](./L6-governance.md) / [L6-harness-and-loops.md](./L6-harness-and-loops.md) | 変更管理、品質ゲート |

## 保守ドキュメント

| ドキュメント | 役割 |
|--------------|------|
| [CONTRIBUTING.md](./CONTRIBUTING.md) | 変更の進め方 |
| [RELEASING.md](./RELEASING.md) | バージョン判定と公開手順 |
| [DOCUMENTATION.md](./DOCUMENTATION.md) | Markdown / Docs site / Storybook の情報設計 |
| [ROADMAP.md](./ROADMAP.md) | 現在地と未完了事項 |
| [decisions/](./decisions/) | ADR |
| [MIRROR.md](./MIRROR.md) | Public ミラーの境界 |
| [reference/emilkowalski-skills/](./reference/emilkowalski-skills/README.md) | モーションクラフト原本（MIT） |
| [`templates/consumer-g5/`](../templates/consumer-g5/) | 消費者向け Lighthouse / E2E テンプレ |

## 閲覧と検証

```bash
npm run docs:dev        # Docs site（ローカル http://localhost:4321）
npm run storybook       # コンポーネントカタログ
npm run check:docs      # Docs 契約検証
npm run check           # L1 フルループ
```
