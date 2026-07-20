# Docs site (`site/`)

SLT Design System のドキュメント閲覧面（Astro）。

| 項目 | 値 |
|------|-----|
| 公開 URL | [https://soundlabbittechnology.github.io/SLT-Design-System-public/](https://soundlabbittechnology.github.io/SLT-Design-System-public/) |
| デプロイ | `main` push → GitHub Pages（[`docs-deploy.yml`](../.github/workflows/docs-deploy.yml)） |
| ローカル | `npm run docs:dev` |
| 技術 | Astro + MDX + React デモ |
| テーマ | `data-theme` / `data-color-mode`（DS トークン） |

公開 Markdown の正本もこの `site/` 配下（`src/content/docs/`）にあります。設計・プロセスの長文や品質ハーネスは Private リポジトリ側です。

## 正本との役割

| 内容 | 正本 | Site の役割 |
|------|------|-------------|
| L0 / L1 / L3〜L6 | [`src/content/docs/`](./src/content/docs/) | 直接 render |
| Component usage | `src/content/components/*.mdx` | demo と要約 |
| React API | [`../src/`](../src/) | props 表へ要約 |
| Token values | 生成済み `dist/slt-tokens.json` | semantic / component のみ表示 |
| 情報設計 | [DOCUMENTATION](./src/content/docs/DOCUMENTATION.md) | nav と route へ反映 |

## 起動と検証

リポジトリ root から:

```bash
npm run docs:dev       # build:all + Astro dev → http://localhost:4321
npm run docs:build     # build:all + static build → site/dist/
npm run docs:preview   # site/dist を preview
```

CI は `npm run docs:build`（Pagefind インデックス含む）で検証します。`main` への push で Pages へデプロイします。ヘッダーの「検索」でサイト内検索できます。

貢献は **社内メンバーのみ**です。外部からの Issue / PR は受け付けません。

## ページ構成

| Route | 内容 / Source |
|-------|---------------|
| `/` | 対象読者と主要入口 |
| `/getting-started/` | 導入手順 |
| `/principles/` | `src/content/docs/L0-principles.md` |
| `/foundations/*` | L1 Markdown + live token reference |
| `/components/*` | public component の demo / code / props / usage |
| `/guidelines/*` | L3〜L6、メンテナー向け（社内）、releasing 等 |

ADR、consumer 固有 migration、監査 snapshot、roadmap は GitHub へリンクし、ガイド本文へ混在させません。

## 主要ファイル

| Path | 責務 |
|------|------|
| `src/lib/nav.ts` | sidebar と component / guideline 順序 |
| `src/lib/doc-routes.ts` | canonical Markdown と route の対応 |
| `src/content.config.ts` | content collections |
| `src/content/docs/*.md` | 原則・基盤・ガイドラインの Markdown |
| `src/content/components/*.mdx` | component ごとの demo / usage summary |
| `remark-doc-links.mjs` | Markdown / MDX の内部リンクを base path / GitHub へ変換 |

## 環境変数（Pages ビルド時）

| Variable | 本番値 | ローカル既定 |
|----------|--------|--------------|
| `DOCS_SITE` | `https://soundlabbittechnology.github.io` | 未設定で可 |
| `DOCS_BASE` | `/SLT-Design-System-public/` | `/` |
