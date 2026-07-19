# SLT Design System — ドキュメント索引

本リポジトリの **公開ドキュメント正本は Astro Docs site（`site/`）に載せるものだけ**です。
`site/src/content/docs/` の Markdown はサイトが読み込むソースであり、サイトに出ない運用メモ・ADR・参考原本は置きません。

閲覧: `npm run docs:dev` → http://localhost:4321（当面ローカルのみ。[site/README.md](../../../README.md)）

## Docs site に載る文書

| サイト経路 | ソース |
|------------|--------|
| `/principles/` | [L0-principles.md](./L0-principles.md) |
| `/foundations/tokens/` ほか | [L1-foundations/](./L1-foundations/) |
| `/components/` | `site/src/content/components/*.mdx` |
| `/guidelines/patterns/` | [L3-patterns.md](./L3-patterns.md) |
| `/guidelines/content/` | [L4-content.md](./L4-content.md) |
| `/guidelines/terminology/` | [L4-terminology.md](./L4-terminology.md) |
| `/guidelines/quality/` | [L5-quality.md](./L5-quality.md) |
| `/guidelines/documentation/` | [DOCUMENTATION.md](./DOCUMENTATION.md) |
| `/guidelines/contributing/` | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| `/guidelines/releasing/` | [RELEASING.md](./RELEASING.md) |
| `/guidelines/governance/` | [L6-governance.md](./L6-governance.md) |

ルート定義: `site/src/lib/doc-routes.ts` / `site/src/lib/nav.ts` / `site/src/content.config.ts`

## 迷ったときの入口

| 目的 | 入口 |
|------|------|
| 導入する | `npm run docs:dev` → はじめに / 導入方法、または [ルート README](../../../../README.md) |
| UI を設計・実装する | デザイン原則 → スタイル → コンポーネント → ガイドライン |
| コンポーネントを追加する | [CONTRIBUTING](./CONTRIBUTING.md) |
| リリースする | [RELEASING](./RELEASING.md) / [CHANGELOG](../../../../CHANGELOG.md) |

## 正本と閲覧面

| 面 | 責務 |
|----|------|
| `site/src/content/docs/`（本ディレクトリ） | サイトに載せる Markdown 正本のみ |
| Docs site（`site/`） | 導入・基盤・コンポーネント要約・ガイドライン |
| `design-tokens/` | DTCG トークンの機械可読正本 |
| `src/` | React API と挙動の正本 |

編集ルールは [DOCUMENTATION.md](./DOCUMENTATION.md) を参照してください。

## 検証

```bash
npm run docs:dev     # Docs site（ローカル）
npm run docs:build   # package + Docs site 静的ビルド
```
